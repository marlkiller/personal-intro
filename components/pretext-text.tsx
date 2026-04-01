"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { SkillType } from "@/lib/data";
import { skillsConfig } from "@/lib/data";

interface PretextTextProps {
  text: string;
  isDestroying: boolean;
  skill: SkillType | null;
  className?: string;
  delay?: number;
}

// 将文本分割成字符数组（支持 emoji 和中文）
function splitText(text: string): string[] {
  const segmenter = new Intl.Segmenter("zh", { granularity: "grapheme" });
  return [...segmenter.segment(text)].map((s) => s.segment);
}

// Java: 字节码分解 - 字符逐个变成 0 和 1 然后消失
function JavaEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "binary" | "gone">("normal");
  const [binaryChar, setBinaryChar] = useState(char);

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      setBinaryChar(char);
      return;
    }

    const delay = index * 30;
    
    const timer1 = setTimeout(() => {
      setPhase("binary");
      const interval = setInterval(() => {
        setBinaryChar(Math.random() > 0.5 ? "1" : "0");
      }, 50);
      
      setTimeout(() => {
        clearInterval(interval);
        setPhase("gone");
      }, 400);
    }, delay);

    return () => clearTimeout(timer1);
  }, [isDestroying, index, char]);

  return (
    <span
      className={cn(
        "inline-block transition-all duration-200",
        phase === "binary" && "font-mono text-[#f89820] scale-110",
        phase === "gone" && "opacity-0 scale-0 blur-sm"
      )}
    >
      {phase === "normal" ? char : phase === "binary" ? binaryChar : char}
    </span>
  );
}

// Python: 缩进蒸发 - 字符像蒸汽一样向上飘散
function PythonEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "floating" | "gone">("normal");
  const randomX = useMemo(() => (Math.random() - 0.5) * 40, []);
  const randomRotate = useMemo(() => (Math.random() - 0.5) * 60, []);

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      return;
    }

    const delay = index * 25;
    
    const timer1 = setTimeout(() => setPhase("floating"), delay);
    const timer2 = setTimeout(() => setPhase("gone"), delay + 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isDestroying, index]);

  return (
    <span
      className={cn(
        "inline-block transition-all",
        phase === "normal" && "duration-0",
        phase === "floating" && "duration-500 ease-out",
        phase === "gone" && "duration-300"
      )}
      style={{
        transform: phase === "floating" 
          ? `translateY(-60px) translateX(${randomX}px) rotate(${randomRotate}deg) scale(0.5)` 
          : phase === "gone" 
          ? `translateY(-80px) translateX(${randomX}px) scale(0)` 
          : "none",
        opacity: phase === "floating" ? 0.3 : phase === "gone" ? 0 : 1,
        color: phase === "floating" ? "#3776ab" : "inherit",
        filter: phase === "floating" ? "blur(1px)" : "none",
      }}
    >
      {char}
    </span>
  );
}

// React: 组件解构 - 字符像组件一样拆解
function ReactEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "split" | "gone">("normal");

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      return;
    }

    const delay = index * 20;
    const timer1 = setTimeout(() => setPhase("split"), delay);
    const timer2 = setTimeout(() => setPhase("gone"), delay + 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isDestroying, index]);

  if (phase === "gone") {
    return <span className="inline-block w-0 opacity-0">{char}</span>;
  }

  if (phase === "split") {
    return (
      <span className="relative inline-block">
        <span className="absolute inset-0 animate-pulse text-[#61dafb] blur-sm">{char}</span>
        <span 
          className="inline-block text-[#61dafb] transition-all duration-300"
          style={{ transform: "scale(1.2) rotate(180deg)", opacity: 0.7 }}
        >
          {char}
        </span>
      </span>
    );
  }

  return <span className="inline-block">{char}</span>;
}

// Go: 协程吞噬 - 字符被多个小方块"吃掉"
function GoEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "eating" | "gone">("normal");
  const [pixels, setPixels] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      setPixels([]);
      return;
    }

    const delay = index * 35;
    const newPixels = Array.from({ length: 6 }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
      delay: Math.random() * 200,
    }));
    
    const timer1 = setTimeout(() => {
      setPhase("eating");
      setPixels(newPixels);
    }, delay);

    const timer2 = setTimeout(() => setPhase("gone"), delay + 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isDestroying, index]);

  return (
    <span className="relative inline-block">
      {phase === "eating" && pixels.map((pixel, i) => (
        <span
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${pixel.x}px, ${pixel.y}px)`,
            transition: `all 300ms ease-out ${pixel.delay}ms`,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-sm bg-[#00add8]" />
        </span>
      ))}
      <span
        className={cn(
          "inline-block transition-all duration-300",
          phase === "eating" && "scale-90 opacity-50",
          phase === "gone" && "scale-0 opacity-0"
        )}
        style={{ color: phase === "eating" ? "#00add8" : "inherit" }}
      >
        {char}
      </span>
    </span>
  );
}

// Rust: 内存回收 - 字符像被锈蚀一样逐渐消失
function RustEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "rusting" | "gone">("normal");
  const [rustLevel, setRustLevel] = useState(0);

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      setRustLevel(0);
      return;
    }

    const delay = index * 40;
    
    const timer1 = setTimeout(() => {
      setPhase("rusting");
      let level = 0;
      const rustInterval = setInterval(() => {
        level += 0.2;
        setRustLevel(level);
        if (level >= 1) {
          clearInterval(rustInterval);
          setPhase("gone");
        }
      }, 100);
    }, delay);

    return () => clearTimeout(timer1);
  }, [isDestroying, index]);

  return (
    <span
      className={cn(
        "inline-block transition-all duration-200",
        phase === "gone" && "opacity-0 scale-75"
      )}
      style={{
        color: phase === "rusting" 
          ? `color-mix(in oklch, #dea584 ${rustLevel * 100}%, currentColor)` 
          : "inherit",
        filter: phase === "rusting" 
          ? `contrast(${1 + rustLevel * 0.5}) brightness(${1 - rustLevel * 0.3}) blur(${rustLevel * 2}px)` 
          : "none",
        transform: phase === "rusting" 
          ? `scale(${1 - rustLevel * 0.3}) rotate(${rustLevel * 10}deg)` 
          : phase === "gone" 
          ? "scale(0)" 
          : "none",
      }}
    >
      {char}
    </span>
  );
}

// C++: 指针解引用 - 字符闪烁然后崩溃消失
function CppEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "dereferencing" | "crash" | "gone">("normal");

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      return;
    }

    const delay = index * 25;
    const timer1 = setTimeout(() => setPhase("dereferencing"), delay);
    const timer2 = setTimeout(() => setPhase("crash"), delay + 300);
    const timer3 = setTimeout(() => setPhase("gone"), delay + 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isDestroying, index]);

  return (
    <span
      className={cn(
        "inline-block transition-all",
        phase === "dereferencing" && "text-[#00599C] animate-pulse duration-100",
        phase === "crash" && "text-red-500 scale-150 duration-200",
        phase === "gone" && "opacity-0 scale-0 duration-300"
      )}
      style={{
        textShadow: phase === "crash" ? "0 0 10px #ef4444" : "none",
      }}
    >
      {char}
    </span>
  );
}

// Hook: 函数劫持 - 字符被钩子勾走
function HookEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "hooking" | "pulled" | "gone">("normal");
  const randomAngle = useMemo(() => Math.random() * 360, []);

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      return;
    }

    const delay = index * 30;
    const timer1 = setTimeout(() => setPhase("hooking"), delay);
    const timer2 = setTimeout(() => setPhase("pulled"), delay + 200);
    const timer3 = setTimeout(() => setPhase("gone"), delay + 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isDestroying, index]);

  return (
    <span
      className={cn(
        "inline-block transition-all",
        phase === "hooking" && "text-[#e91e63] duration-150",
        phase === "pulled" && "duration-300",
        phase === "gone" && "opacity-0 duration-200"
      )}
      style={{
        transform: phase === "hooking" 
          ? "scale(1.3)" 
          : phase === "pulled" 
          ? `translate(${Math.cos(randomAngle) * 50}px, ${Math.sin(randomAngle) * 50}px) scale(0.5) rotate(${randomAngle}deg)` 
          : phase === "gone" 
          ? "scale(0)" 
          : "none",
        opacity: phase === "pulled" ? 0.3 : phase === "gone" ? 0 : 1,
        textShadow: phase === "hooking" ? "0 0 8px #e91e63" : "none",
      }}
    >
      {char}
    </span>
  );
}

// Reverse: 逆向解析 - 字符反转并解码
function ReverseEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "analyzing" | "decoded" | "gone">("normal");
  const [displayChar, setDisplayChar] = useState(char);
  const hexChars = useMemo(() => "0123456789ABCDEF", []);

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      setDisplayChar(char);
      return;
    }

    const delay = (index % 5) * 80 + Math.floor(index / 5) * 150;
    
    const timer1 = setTimeout(() => {
      setPhase("analyzing");
      let count = 0;
      const interval = setInterval(() => {
        setDisplayChar(hexChars[Math.floor(Math.random() * 16)]);
        count++;
        if (count > 6) {
          clearInterval(interval);
          setPhase("decoded");
        }
      }, 50);
    }, delay);

    const timer2 = setTimeout(() => setPhase("gone"), delay + 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isDestroying, index, char, hexChars]);

  return (
    <span
      className={cn(
        "inline-block font-mono transition-all",
        phase === "analyzing" && "text-[#9c27b0] duration-100",
        phase === "decoded" && "text-[#ce93d8] duration-200",
        phase === "gone" && "opacity-0 scale-0 blur-sm duration-300"
      )}
      style={{
        transform: phase === "analyzing" ? "rotateY(180deg)" : phase === "decoded" ? "rotateY(360deg) scale(0.8)" : "none",
        textShadow: phase === "analyzing" ? "0 0 10px #9c27b0" : "none",
      }}
    >
      {phase === "normal" ? char : displayChar}
    </span>
  );
}

// Assembly: 指令编码 - 字符变成汇编指令格式然后打包
function AssemblyEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "encoding" | "packed" | "gone">("normal");
  const instructions = useMemo(() => ["MOV", "ADD", "SUB", "JMP", "NOP", "XOR", "AND", "OR"], []);
  const [instruction, setInstruction] = useState("");

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      return;
    }

    const delay = index * 35;
    
    const timer1 = setTimeout(() => {
      setPhase("encoding");
      setInstruction(instructions[Math.floor(Math.random() * instructions.length)]);
    }, delay);

    const timer2 = setTimeout(() => setPhase("packed"), delay + 300);
    const timer3 = setTimeout(() => setPhase("gone"), delay + 550);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isDestroying, index, instructions]);

  return (
    <span
      className={cn(
        "inline-block transition-all",
        phase === "encoding" && "text-[#4caf50] font-mono text-xs duration-200",
        phase === "packed" && "bg-[#4caf50]/20 rounded duration-150",
        phase === "gone" && "opacity-0 scale-y-0 duration-200"
      )}
      style={{
        transform: phase === "packed" ? "scaleY(0.1)" : "none",
      }}
    >
      {phase === "encoding" ? instruction : char}
    </span>
  );
}

// Disassembly: 指令解码 - 字符像被拆解成机器码
function DisassemblyEffect({ char, index, isDestroying }: { char: string; index: number; isDestroying: boolean }) {
  const [phase, setPhase] = useState<"normal" | "breaking" | "bytes" | "gone">("normal");
  const [bytes, setBytes] = useState<string[]>([]);

  useEffect(() => {
    if (!isDestroying) {
      setPhase("normal");
      setBytes([]);
      return;
    }

    const delay = index * 40;
    
    const timer1 = setTimeout(() => {
      setPhase("breaking");
      const charCode = char.charCodeAt(0);
      setBytes([
        charCode.toString(16).padStart(2, "0").toUpperCase(),
      ]);
    }, delay);

    const timer2 = setTimeout(() => setPhase("bytes"), delay + 250);
    const timer3 = setTimeout(() => setPhase("gone"), delay + 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isDestroying, index, char]);

  if (phase === "bytes" || phase === "gone") {
    return (
      <span className="relative inline-block">
        {bytes.map((byte, i) => (
          <span
            key={i}
            className={cn(
              "inline-block font-mono text-xs transition-all duration-300",
              phase === "gone" && "opacity-0"
            )}
            style={{
              color: "#ff5722",
              transform: phase === "gone" 
                ? `translateY(${(i % 2 === 0 ? -1 : 1) * 30}px) scale(0)` 
                : `translateY(${(i % 2 === 0 ? -1 : 1) * 5}px)`,
            }}
          >
            {byte}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-block transition-all duration-200",
        phase === "breaking" && "text-[#ff5722] scale-110"
      )}
      style={{
        textShadow: phase === "breaking" ? "0 0 8px #ff5722" : "none",
      }}
    >
      {char}
    </span>
  );
}

// 主组件
export function PretextText({ text, isDestroying, skill, className, delay = 0 }: PretextTextProps) {
  const characters = useMemo(() => splitText(text), [text]);
  const [startDestroy, setStartDestroy] = useState(false);

  useEffect(() => {
    if (isDestroying) {
      const timer = setTimeout(() => setStartDestroy(true), delay);
      return () => clearTimeout(timer);
    } else {
      setStartDestroy(false);
    }
  }, [isDestroying, delay]);

  const EffectComponent = useMemo(() => {
    switch (skill) {
      case "java": return JavaEffect;
      case "python": return PythonEffect;
      case "react": return ReactEffect;
      case "go": return GoEffect;
      case "rust": return RustEffect;
      case "cpp": return CppEffect;
      case "hook": return HookEffect;
      case "reverse": return ReverseEffect;
      case "assembly": return AssemblyEffect;
      case "disassembly": return DisassemblyEffect;
      default: return JavaEffect;
    }
  }, [skill]);

  return (
    <span className={cn("inline", className)}>
      {characters.map((char, index) => (
        <EffectComponent
          key={`${index}-${char}`}
          char={char}
          index={index}
          isDestroying={startDestroy}
        />
      ))}
    </span>
  );
}
