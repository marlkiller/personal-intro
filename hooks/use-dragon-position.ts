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

// 全局龙位置管理器
class DragonPositionManager {
  private subscribers: Set<(pos: DragonPosition) => void> = new Set();
  private position: DragonPosition = { segments: [], timestamp: 0 };
  private lastUpdate = 0;
  private throttleMs = 16; // 约 60fps

  update(segments: DragonSegment[]) {
    const now = performance.now();
    // 节流更新
    if (now - this.lastUpdate < this.throttleMs) return;
    this.lastUpdate = now;
    
    this.position = { segments, timestamp: now };
    this.notify();
  }

  subscribe(callback: (pos: DragonPosition) => void) {
    this.subscribers.add(callback);
    callback(this.position);
    return () => { this.subscribers.delete(callback); };
  }

  getPosition() {
    return this.position;
  }

  private notify() {
    for (const cb of this.subscribers) {
      cb(this.position);
    }
  }
}

export const dragonManager = new DragonPositionManager();

// React Hook
export function useDragonPosition() {
  const [position, setPosition] = useState<DragonPosition>(dragonManager.getPosition());

  useEffect(() => {
    return dragonManager.subscribe(setPosition);
  }, []);

  return position;
}

// 获取文字的偏移量（让文字避开龙）
// charViewportX/Y: 字符在视口中的绝对坐标
export function getTextOffsetForViewport(
  charViewportX: number,
  charViewportY: number,
  position: DragonPosition
): { offsetX: number; offsetY: number; shouldShift: boolean } {
  const maxOffset = 15; // 最大偏移量
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let affected = false;

  for (const segment of position.segments) {
    const dx = charViewportX - segment.x;
    const dy = charViewportY - segment.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influence = segment.size * 2.5; // 影响范围

    if (distance < influence && distance > 0) {
      affected = true;
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

  return {
    offsetX: totalOffsetX,
    offsetY: totalOffsetY,
    shouldShift: affected,
  };
}

// 兼容旧 API
export function getTextOffset(
  charX: number,
  charY: number,
  position: DragonPosition
): { offsetX: number; offsetY: number; shouldShift: boolean } {
  return getTextOffsetForViewport(charX, charY, position);
}
