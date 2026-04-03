"use client";

import { useEffect, useRef } from "react";
import { dragonManager, type DragonSegment as DragonSegmentType } from "@/hooks/use-dragon-position";

interface DragonSegment {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  char: string;
  size: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  char: string;
  color: string;
  size: number;
}

export function DragonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const dragonRef = useRef<DragonSegment[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const velocityRef = useRef({ x: 3, y: 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置画布尺寸
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    // 初始化龙
    const dragonSegments = 50;
    const dragonChars = "◆◆◇▼█▓▓▒╬╬╬╬╬╬╬╬╬╬╫╫╫╪╪╪╧╧╤╤╥╥║║││┃┃╎╎╏╏::····..".split("");

    dragonRef.current = Array.from({ length: dragonSegments }, (_, i) => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + i * 12,
      prevX: window.innerWidth / 2,
      prevY: window.innerHeight / 2 + i * 12,
      char: dragonChars[Math.min(i, dragonChars.length - 1)],
      size: 14 * (2.0 * (1 - (i / dragonSegments) ** 2) + 0.2),
    }));

    // 初始化龙头速度
    velocityRef.current = { 
      x: (Math.random() - 0.5) * 6, 
      y: (Math.random() - 0.5) * 6 
    };

    // 动画循环
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      timeRef.current += dt;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dragon = dragonRef.current;

      // 清空画布 - 使用画布实际尺寸
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // 更新龙头位置（自动飞行 + 边界检测）
      const head = dragon[0];
      const velocity = velocityRef.current;
      
      // 添加一些随机波动
      head.x += velocity.x + Math.sin(timeRef.current) * 0.5;
      head.y += velocity.y + Math.cos(timeRef.current * 0.7) * 0.5;

      // 边界检测 - 碰到边缘反弹
      const margin = 100;
      if (head.x < margin) {
        velocity.x = Math.abs(velocity.x) + (Math.random() - 0.5) * 2;
        head.x = margin;
      } else if (head.x > width - margin) {
        velocity.x = -Math.abs(velocity.x) + (Math.random() - 0.5) * 2;
        head.x = width - margin;
      }
      
      if (head.y < margin) {
        velocity.y = Math.abs(velocity.y) + (Math.random() - 0.5) * 2;
        head.y = margin;
      } else if (head.y > height - margin) {
        velocity.y = -Math.abs(velocity.y) + (Math.random() - 0.5) * 2;
        head.y = height - margin;
      }

      // 限制速度范围
      const maxSpeed = 5;
      const minSpeed = 2;
      velocity.x = Math.max(minSpeed, Math.min(maxSpeed, Math.abs(velocity.x))) * Math.sign(velocity.x);
      velocity.y = Math.max(minSpeed, Math.min(maxSpeed, Math.abs(velocity.y))) * Math.sign(velocity.y);

      // 计算龙头移动方向
      const dx = velocity.x;
      const dy = velocity.y;

      // 更新龙身（反向运动学）
      for (let i = 1; i < dragon.length; i++) {
        const seg = dragon[i];
        const prevSeg = dragon[i - 1];

        seg.prevX = seg.x;
        seg.prevY = seg.y;

        const segmentDx = seg.x - prevSeg.x;
        const segmentDy = seg.y - prevSeg.y;
        const distance = Math.sqrt(segmentDx * segmentDx + segmentDy * segmentDy);
        const spacing = 12;

        if (distance > spacing) {
          const ratio = spacing / distance;
          seg.x = prevSeg.x + segmentDx * ratio;
          seg.y = prevSeg.y + segmentDy * ratio;
        }

        // 添加波动效果
        const wave = Math.sin(timeRef.current * 3 - i * 0.3) * 0.5;
        seg.x += Math.cos(timeRef.current * 2 - i * 0.2) * wave;
        seg.y += Math.sin(timeRef.current * 2 - i * 0.2) * wave;
      }

      // 生成粒子
      if (Math.random() < 0.3) {
        const angle = Math.atan2(dy, dx);
        const spread = (Math.random() - 0.5) * 0.5;
        const speed = 5 + Math.random() * 5;
        
        particlesRef.current.push({
          x: head.x + Math.cos(angle) * 20,
          y: head.y + Math.sin(angle) * 20,
          vx: Math.cos(angle + spread) * speed,
          vy: Math.sin(angle + spread) * speed,
          life: 1,
          char: ["*", "✦", "✧", "⁕", "❋", "•", "∘", "˚"][Math.floor(Math.random() * 8)],
          color: ["#ff6600", "#ffaa00", "#ff4400", "#ff8800"][Math.floor(Math.random() * 4)],
          size: 8 + Math.random() * 12,
        });
      }

      // 更新粒子
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // 重力
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= dt * 1.5;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const t = 1 - p.life;
        let r: number, g: number, b: number;
        
        if (t < 0.2) {
          r = 255;
          g = 255;
          b = Math.floor(255 * (1 - t * 5));
        } else if (t < 0.5) {
          r = 255;
          g = Math.floor(255 * (1 - (t - 0.2) * 3.33));
          b = 0;
        } else {
          const f = (t - 0.5) * 2;
          r = Math.floor(255 * (1 - f * 0.6));
          g = Math.floor(80 * (1 - f));
          b = 0;
        }

        ctx.globalAlpha = p.life * 0.8;
        ctx.font = `${p.size * p.life}px "Courier New", monospace`;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      // 绘制龙
      for (let i = dragon.length - 1; i >= 0; i--) {
        const seg = dragon[i];
        const t = i / dragon.length;
        
        // 计算角度
        let angle: number;
        if (i === 0) {
          angle = Math.atan2(dy, dx);
        } else {
          const prevSeg = dragon[i - 1];
          angle = Math.atan2(prevSeg.y - seg.y, prevSeg.x - seg.x);
        }

        // 翅膀动画
        const wingPhase = Math.sin(timeRef.current * 4 + i * 0.4) * 0.5;
        
        ctx.save();
        ctx.translate(seg.x, seg.y);
        ctx.rotate(angle);

        // 绘制翅膀（中间段）
        if (i >= 5 && i <= 15 && i % 2 === 0) {
          const wingSize = seg.size * (1.8 - Math.abs(i - 10) * 0.1);
          const wingDist = seg.size * 1.2;
          
          ctx.globalAlpha = 0.4;
          ctx.font = `${wingSize}px "Courier New", monospace`;
          ctx.fillStyle = `rgba(255, ${140 + wingPhase * 60}, ${30}, ${0.6 - t * 0.3})`;
          
          // 左翅
          ctx.save();
          ctx.rotate(wingPhase);
          ctx.translate(-wingDist * 0.5, 0);
          ctx.fillText("≺", -wingDist, 0);
          ctx.restore();
          
          // 右翅
          ctx.save();
          ctx.rotate(-wingPhase);
          ctx.translate(wingDist * 0.5, 0);
          ctx.fillText("≻", wingDist, 0);
          ctx.restore();
        }

        // 绘制龙身段
        ctx.globalAlpha = 1 - t * 0.5;
        const p = Math.sin(timeRef.current * 3 + i * 0.3) * 0.1;
        
        if (i < 3) {
          ctx.fillStyle = `rgb(255, ${180 + p * 60}, ${40 + p * 30})`;
        } else {
          const w = Math.sin(timeRef.current * 2 - i * 0.15) * 0.15;
          ctx.fillStyle = `rgba(${Math.floor(255 * (1 - t * 0.5) + p * 20)}, ${Math.floor(140 * (1 - t * 0.8) + w * 60)}, ${Math.floor(30 * (1 - t) + w * 20)}, ${1 - t * 0.45})`;
        }

        ctx.font = `bold ${seg.size}px "Courier New", monospace`;
        ctx.fillText(seg.char, 0, Math.sin(timeRef.current * 5 + i * 0.35) * 2);

        // 龙头特效
        if (i < 3) {
          ctx.globalAlpha = 0.06;
          ctx.fillStyle = "#ff6600";
          ctx.beginPath();
          ctx.arc(0, 0, seg.size * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 绘制龙眼睛
      const headSeg = dragon[0];
      const eyeAngle = Math.atan2(dy, dx);
      const eyeX = headSeg.x + Math.cos(eyeAngle + 0.5) * 10;
      const eyeY = headSeg.y + Math.sin(eyeAngle + 0.5) * 10;
      
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ff8800";
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 12, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffcc00";
      ctx.font = "16px \"Courier New\", monospace";
      ctx.fillText("⊙", eyeX, eyeY);

      // 更新全局龙位置（供文字重排使用）
      const dragonSegments: DragonSegmentType[] = dragon.map(seg => ({
        x: seg.x,
        y: seg.y,
        size: seg.size * 0.5, // 缩小碰撞体积，让效果更好
      }));
      dragonManager.update(dragonSegments);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // 清理
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ touchAction: "none" }}
    />
  );
}
