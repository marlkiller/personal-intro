"use client";

import { cn } from "@/lib/utils";
import type { SkillType } from "@/lib/data";
import { skillsConfig, attackSkills } from "@/lib/data";
import { RotateCcw } from "lucide-react";

interface SkillBarProps {
  selectedSkill: SkillType;
  onSkillSelect: (skill: SkillType) => void;
  onReset: () => void;
  destroyedCount: number;
}

export function SkillBar({ selectedSkill, onSkillSelect, onReset, destroyedCount }: SkillBarProps) {
  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/90 p-3 shadow-2xl backdrop-blur-xl">
        {/* 技能选择 */}
        <div className="flex gap-2">
          {attackSkills.map((skill) => {
            const config = skillsConfig[skill];
            const isSelected = selectedSkill === skill;

            return (
              <button
                key={skill}
                onClick={() => onSkillSelect(skill)}
                className={cn(
                  "group relative flex h-14 w-14 flex-col items-center justify-center rounded-xl transition-all duration-300",
                  "hover:scale-110 active:scale-95",
                  isSelected
                    ? "ring-2 ring-offset-2 ring-offset-background"
                    : "bg-secondary/50 hover:bg-secondary"
                )}
                style={{
                  backgroundColor: isSelected ? `${config.color}20` : undefined,
                  boxShadow: isSelected
                    ? `0 0 20px ${config.color}60, 0 0 40px ${config.color}30`
                    : "none",
                  // @ts-expect-error CSS custom property
                  "--tw-ring-color": isSelected ? config.color : undefined,
                }}
              >
                <span className="text-2xl">{config.icon}</span>
                {/* Tooltip */}
                <span
                  className={cn(
                    "absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs opacity-0 transition-all",
                    "group-hover:opacity-100 group-hover:-top-14",
                    "bg-popover text-popover-foreground border border-border shadow-lg"
                  )}
                >
                  <span className="font-semibold" style={{ color: config.color }}>{config.name}</span>
                  <span className="block text-muted-foreground">{config.effectName}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 分隔线 */}
        <div className="h-10 w-px bg-border" />

        {/* 当前技能信息 */}
        <div className="hidden md:block">
          <p className="text-xs text-muted-foreground">当前技能</p>
          <p className="font-semibold" style={{ color: skillsConfig[selectedSkill].color }}>
            {skillsConfig[selectedSkill].name}
          </p>
        </div>

        {/* 分隔线 */}
        <div className="hidden h-10 w-px bg-border md:block" />

        {/* 击杀计数和重置 */}
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">已消灭</p>
            <p className="text-lg font-bold text-primary">{destroyedCount}</p>
          </div>
          {destroyedCount > 0 && (
            <button
              onClick={onReset}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              title="重置所有目标"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
