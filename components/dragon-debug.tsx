"use client";

import { useDragonPosition } from "@/hooks/use-dragon-position";

export function DragonDebug() {
  const position = useDragonPosition();

  console.log('DragonDebug render:', position.segments.length, 'segments');

  if (position.segments.length === 0) {
    return null;
  }

  // 只显示前 20 个段
  const displaySegments = position.segments.slice(0, 20);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {displaySegments.map((segment, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-red-500/40 border-2 border-red-500"
          style={{
            left: segment.x - segment.size / 2,
            top: segment.y - segment.size / 2,
            width: segment.size,
            height: segment.size,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="flex items-center justify-center h-full text-[8px] text-white font-mono">
            {i}
          </div>
        </div>
      ))}
      <div className="fixed top-4 left-4 bg-black/80 text-white p-4 rounded-lg font-mono text-xs">
        <div>Dragon segments: {position.segments.length}</div>
        <div>Head position: ({Math.round(position.segments[0]?.x)}, {Math.round(position.segments[0]?.y)})</div>
        <div>Head size: {Math.round(position.segments[0]?.size)}</div>
      </div>
    </div>
  );
}
