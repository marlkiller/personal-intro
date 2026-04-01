"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SkillType, SkillConfig } from "@/lib/data";
import { skillsConfig, attackSkills } from "@/lib/data";

interface SkillTreeProps {
  selectedSkill: SkillType;
  onSkillSelect: (skill: SkillType) => void;
}

const categories = {
  backend: { name: "后端开发", icon: "🔧" },
  frontend: { name: "前端开发", icon: "🎨" },
  systems: { name: "系统编程", icon: "⚙️" },
  security: { name: "安全研究", icon: "🛡️" },
};

// 将文本分割成字符数组（支持 emoji 和中文）
function splitText(text: string): string[] {
  const segmenter = new Intl.Segmenter("zh", { granularity: "grapheme" });
  return [...segmenter.segment(text)].map((s) => s.segment);
}

// Pretext 风格的文字消散效果 - 用于标题
interface PretextTitleProps {
  text: string;
  isExpanding: boolean;
  color?: string;
  delay?: number;
  alwaysVisible?: boolean;
}

function PretextTitle({ text, isExpanding, color = "inherit", delay = 0, alwaysVisible = false }: PretextTitleProps) {
  const characters = splitText(text);

  return (
    <span className="inline-flex">
      {characters.map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300"
          style={{
            transitionDelay: isExpanding ? `${delay + index * 30}ms` : `${(characters.length - 1 - index) * 20}ms`,
            opacity: alwaysVisible ? 1 : isExpanding ? 1 : 0,
            transform: alwaysVisible
              ? "translateY(0) scale(1)"
              : isExpanding
              ? "translateY(0) scale(1)"
              : "translateY(15px) scale(0.9)",
            filter: alwaysVisible ? "none" : isExpanding ? "blur(0)" : "blur(3px)",
            color: color !== "inherit" && (alwaysVisible || isExpanding) ? color : "inherit",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// Pretext 风格的技能项
interface PretextSkillProps {
  skill: SkillType;
  config: SkillConfig;
  index: number;
  isSelected: boolean;
  isVisible: boolean;
  onSelect: () => void;
}

function PretextSkill({ skill, config, index, isSelected, isVisible, onSelect }: PretextSkillProps) {
  const titleChars = splitText(config.name);
  const effectChars = splitText(config.effectName);
  const baseDelay = index * 50;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-lg p-3 transition-all",
        "hover:bg-secondary/50",
        isSelected && "bg-secondary ring-1"
      )}
      style={{
        // @ts-expect-error CSS variable
        "--tw-ring-color": isSelected ? config.color : undefined,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-15px)",
        transitionDelay: `${baseDelay}ms`,
        transitionProperty: "opacity, transform, background-color, box-shadow",
        transitionDuration: "400ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all duration-300",
          isSelected && "scale-110"
        )}
        style={{
          backgroundColor: `${config.color}20`,
          boxShadow: isSelected ? `0 0 15px ${config.color}40` : "none",
          transitionDelay: `${baseDelay + 100}ms`,
        }}
      >
        {config.icon}
      </div>

      {/* Info */}
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {titleChars.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-200"
                style={{
                  color: isSelected ? config.color : "inherit",
                  transitionDelay: `${baseDelay + i * 15}ms`,
                  textShadow: isSelected ? `0 0 8px ${config.color}` : "none",
                }}
              >
                {char}
              </span>
            ))}
          </span>
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              isSelected ? "animate-pulse" : "opacity-50 group-hover:opacity-100"
            )}
            style={{
              backgroundColor: config.color,
              transitionDelay: `${baseDelay + titleChars.length * 15}ms`,
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {effectChars.map((char, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-200"
              style={{
                transitionDelay: `${baseDelay + titleChars.length * 15 + i * 10}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(5px)",
              }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* Level bar */}
      <div className="w-16">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full transition-all duration-400"
            style={{
              width: isVisible ? `${config.level}%` : "0%",
              backgroundColor: config.color,
              transitionDelay: `${baseDelay + 200}ms`,
            }}
          />
        </div>
        <p
          className="mt-1 text-right text-xs text-muted-foreground transition-all duration-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${baseDelay + 250}ms`,
          }}
        >
          Lv.{config.level}
        </p>
      </div>
    </button>
  );
}

export function SkillTree({ selectedSkill, onSkillSelect }: SkillTreeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const skillsByCategory = attackSkills.reduce((acc, skill) => {
    const config = skillsConfig[skill];
    if (!acc[config.category]) {
      acc[config.category] = [];
    }
    acc[config.category].push({ skill, config });
    return acc;
  }, {} as Record<string, Array<{ skill: SkillType; config: SkillConfig }>>);

  const categoryList = Object.entries(categories) as [keyof typeof categories, typeof categories[keyof typeof categories]][];

  const handleToggle = () => {
    if (isExpanded) {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsCollapsing(false);
      }, 500);
    } else {
      setIsExpanded(true);
    }
  };

  const isVisible = isExpanded && !isCollapsing;

  return (
    <div className="space-y-4">
      {/* 折叠/展开按钮 */}
      <button
        onClick={handleToggle}
        className={cn(
          "group flex w-full items-center justify-between rounded-xl border border-border/50 bg-card/50 px-6 py-4 transition-all duration-500",
          "hover:bg-card hover:border-primary/30",
          isExpanded && "bg-card border-primary/30 shadow-lg shadow-primary/10"
        )}
      >
        <div className="flex items-center gap-3">
          <span className={cn("text-2xl transition-transform duration-500", isExpanded && "rotate-180")}>
            ⚡
          </span>
          <div className="text-left">
            <h2 className="font-semibold text-foreground">
              <PretextTitle
                text="技能树"
                isExpanding={isExpanded && !isCollapsing}
                delay={0}
                alwaysVisible
              />
            </h2>
            <p className="text-xs text-muted-foreground transition-all duration-300" style={{
              opacity: 1,
              transform: isExpanded && !isCollapsing ? "translateY(0)" : "translateY(-5px)",
              transitionDelay: "150ms",
            }}>
              {isExpanded ? "点击收起" : "点击查看技能"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* 技能数量统计 */}
          <div className="text-right transition-all duration-300">
            <p className="text-sm font-medium text-primary">
              <PretextTitle
                text={`${attackSkills.length} 个技能`}
                isExpanding={isExpanded && !isCollapsing}
                delay={100}
                alwaysVisible
              />
            </p>
            <p className="text-xs text-muted-foreground">
              <PretextTitle
                text={`已选择 ${skillsConfig[selectedSkill].name}`}
                isExpanding={isExpanded && !isCollapsing}
                delay={150}
                alwaysVisible
              />
            </p>
          </div>
          <span className={cn(
            "text-sm text-muted-foreground transition-all duration-300",
            isVisible ? "rotate-180" : "rotate-0"
          )}>
            ▼
          </span>
        </div>
      </button>

      {/* 技能列表容器 */}
      <div
        className={cn(
          "grid gap-4 md:grid-cols-2 lg:grid-cols-4 transition-all duration-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          maxHeight: isVisible ? "2000px" : "0",
          overflow: "hidden",
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {categoryList.map(([categoryKey, category]) => {
          const skills = skillsByCategory[categoryKey] || [];
          if (skills.length === 0) return null;

          return (
            <div
              key={categoryKey}
              className={cn(
                "rounded-xl border border-border/50 bg-card/30 p-4 transition-all duration-500",
                isVisible && "hover:border-primary/20 hover:bg-card/50"
              )}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "200ms",
              }}
            >
              {/* 分类标题 */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <h3 className="text-sm font-semibold text-foreground">
                  <PretextTitle
                    text={category.name}
                    isExpanding={isVisible}
                    delay={250}
                  />
                </h3>
              </div>

              {/* 技能列表 */}
              <div className="space-y-2">
                {skills.map(({ skill, config }, index) => (
                  <PretextSkill
                    key={skill}
                    skill={skill}
                    config={config}
                    index={index}
                    isSelected={selectedSkill === skill}
                    isVisible={isVisible}
                    onSelect={() => onSkillSelect(skill)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
