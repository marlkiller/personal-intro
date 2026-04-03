import { useState, useEffect, useRef, useCallback } from "react";

export interface DragonSegment {
  x: number;
  y: number;
  size: number;
}

export interface DragonPosition {
  segments: DragonSegment[];
  timestamp: number;
}

// 全局龙位置管理器（优化版：使用对象池减少 GC 压力）
class DragonPositionManager {
  private subscribers: Set<(pos: DragonPosition) => void> = new Set();
  private position: DragonPosition = { segments: [], timestamp: 0 };
  private lastUpdate = 0;
  private throttleMs = 32; // 降低到 ~30fps，文字避让不需要 60fps
  private segmentPool: DragonSegment[][] = []; // 对象池

  update(segments: DragonSegment[]) {
    const now = performance.now();
    // 节流更新
    if (now - this.lastUpdate < this.throttleMs) return;
    this.lastUpdate = now;
    
    // 复用数组减少 GC
    let recycledSegments = this.segmentPool.pop();
    if (!recycledSegments) {
      recycledSegments = [];
    }
    recycledSegments.length = 0;
    for (const seg of segments) {
      recycledSegments.push({ x: seg.x, y: seg.y, size: seg.size });
    }
    
    this.position = { segments: recycledSegments, timestamp: now };
    this.notify();
  }

  subscribe(callback: (pos: DragonPosition) => void) {
    this.subscribers.add(callback);
    callback(this.position);
    return () => { 
      this.subscribers.delete(callback);
      // 回收数组
      if (this.position.segments.length > 0) {
        this.segmentPool.push(this.position.segments);
      }
    };
  }

  getPosition() {
    return this.position;
  }

  getLastPosition() {
    return this.position;
  }

  private notify() {
    for (const cb of this.subscribers) {
      cb(this.position);
    }
  }
}

export const dragonManager = new DragonPositionManager();

// 全局文字避让管理器（核心优化：只订阅一次龙位置，批量更新所有文字元素）
class TextAvoidanceManager {
  private elements: Map<string, {
    element: HTMLElement;
    chars: HTMLElement[];
    lastUpdate: number;
  }> = new Map();
  private dragonPosition: DragonPosition = { segments: [], timestamp: 0 };
  private rafId: number | null = null;
  private unsubscribeDragon: (() => void) | null = null;
  private throttleMs = 32; // ~30fps

  constructor() {
    // 订阅龙位置（全局只订阅一次）
    this.unsubscribeDragon = dragonManager.subscribe((pos) => {
      this.dragonPosition = pos;
      this.scheduleUpdate();
    });
  }

  // 注册文字容器
  register(id: string, container: HTMLElement) {
    if (this.elements.has(id)) return;

    // 自动收集容器内的所有字符元素
    const charElements = Array.from(container.querySelectorAll('[data-char-index]')) as HTMLElement[];

    this.elements.set(id, {
      element: container,
      chars: charElements,
      lastUpdate: 0,
    });
  }

  // 手动注册字符元素
  registerChar(containerId: string, charEl: HTMLElement) {
    const data = this.elements.get(containerId);
    if (!data) return;

    if (!data.chars.includes(charEl)) {
      data.chars.push(charEl);
    }
  }

  // 注销文字容器
  unregister(id: string) {
    this.elements.delete(id);
  }

  // 调度批量更新
  private scheduleUpdate() {
    if (this.rafId !== null) return;

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.updateAllElements();
    });
  }

  // 批量更新所有元素
  private updateAllElements() {
    const now = performance.now();

    // 先读取所有位置（避免布局抖动）
    const charData: Array<{
      element: HTMLElement;
      charElements: HTMLElement[];
      positions: Array<{ x: number; y: number; el: HTMLElement }>;
    }> = [];

    for (const [id, data] of this.elements) {
      if (data.chars.length === 0) continue;

      const positions: Array<{ x: number; y: number; el: HTMLElement }> = [];
      for (const charEl of data.chars) {
        const rect = charEl.getBoundingClientRect();
        positions.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          el: charEl,
        });
      }
      charData.push({ element: data.element, charElements: data.chars, positions });
    }

    // 再写入所有偏移
    for (const data of charData) {
      for (const pos of data.positions) {
        const { offsetX, offsetY } = this.calculateOffset(pos.x, pos.y);
        if (Math.abs(offsetX) > 0.5 || Math.abs(offsetY) > 0.5) {
          pos.el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          pos.el.style.zIndex = "10";
          pos.el.style.position = "relative";
        } else {
          pos.el.style.transform = "none";
          pos.el.style.zIndex = "1";
          pos.el.style.position = "static";
        }
      }
    }
  }

  // 计算单个字符的偏移
  private calculateOffset(charViewportX: number, charViewportY: number): { offsetX: number; offsetY: number } {
    const maxOffset = 12; // 减小最大偏移，让效果更自然
    let totalOffsetX = 0;
    let totalOffsetY = 0;

    for (const segment of this.dragonPosition.segments) {
      const dx = charViewportX - segment.x;
      const dy = charViewportY - segment.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = segment.size * 2.5;

      if (distance < influence && distance > 0) {
        // 使用平滑的衰减函数
        const force = Math.pow(1 - distance / influence, 2) * maxOffset;
        const angle = Math.atan2(dy, dx);
        totalOffsetX += Math.cos(angle) * force;
        totalOffsetY += Math.sin(angle) * force;
      }
    }

    // 限制最大偏移量
    const totalDistance = Math.sqrt(totalOffsetX * totalOffsetX + totalOffsetY * totalOffsetY);
    if (totalDistance > maxOffset) {
      const scale = maxOffset / totalDistance;
      totalOffsetX *= scale;
      totalOffsetY *= scale;
    }

    return { offsetX: totalOffsetX, offsetY: totalOffsetY };
  }

  // 销毁
  destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    if (this.unsubscribeDragon) {
      this.unsubscribeDragon();
    }
    this.elements.clear();
  }
}

// 全局单例
export const textAvoidanceManager = new TextAvoidanceManager();

// React Hook - 轻量级，不订阅龙位置
export function useTextAvoidance(id: string, containerRef: React.RefObject<HTMLElement | null>) {
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    textAvoidanceManager.register(id, containerRef.current);
    
    return () => {
      textAvoidanceManager.unregister(id);
    };
  }, [id, containerRef]);

  // 注册字符元素
  const registerChar = useCallback((charEl: HTMLElement | null) => {
    if (!charEl) return;
    
    // 更新字符列表
    const chars = charsRef.current;
    const index = chars.indexOf(charEl);
    if (index === -1) {
      chars.push(charEl);
    }
    
    // 更新管理器中的字符列表
    // 注意：这里不直接暴露给管理器，而是通过容器引用
  }, []);

  return { registerChar, charsRef };
}

// 兼容旧 API（保留给 DragonDebug 使用）
export function useDragonPosition() {
  const [position, setPosition] = useState<DragonPosition>(dragonManager.getPosition());

  useEffect(() => {
    return dragonManager.subscribe(setPosition);
  }, []);

  return position;
}

// 辅助函数：获取字符偏移（供旧组件使用）
export function getTextOffsetForViewport(
  charViewportX: number,
  charViewportY: number,
  position: DragonPosition
): { offsetX: number; offsetY: number; shouldShift: boolean } {
  const maxOffset = 12;
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let affected = false;

  for (const segment of position.segments) {
    const dx = charViewportX - segment.x;
    const dy = charViewportY - segment.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influence = segment.size * 2.5;

    if (distance < influence && distance > 0) {
      affected = true;
      const force = Math.pow(1 - distance / influence, 2) * maxOffset;
      const angle = Math.atan2(dy, dx);
      totalOffsetX += Math.cos(angle) * force;
      totalOffsetY += Math.sin(angle) * force;
    }
  }

  const totalDistance = Math.sqrt(totalOffsetX * totalOffsetX + totalOffsetY * totalOffsetY);
  if (totalDistance > maxOffset) {
    const scale = maxOffset / totalDistance;
    totalOffsetX *= scale;
    totalOffsetY *= scale;
  }

  return { offsetX: totalOffsetX, offsetY: totalOffsetY, shouldShift: affected };
}

export function getTextOffset(
  charX: number,
  charY: number,
  position: DragonPosition
): { offsetX: number; offsetY: number; shouldShift: boolean } {
  return getTextOffsetForViewport(charX, charY, position);
}
