"use client";

import { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import type { SkillType } from "@/lib/data";
import { skillsConfig } from "@/lib/data";
import { PretextText } from "./pretext-text-dragon";
import { ExternalLink, FileText, GitFork, Github, Star } from "lucide-react";

interface TargetCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: "article" | "project";
  url?: string;
  stars?: number;
  forks?: number;
  date?: string;
  selectedSkill: SkillType;
  onAttack: (skill: SkillType, targetId: string) => void;
  isUnderAttack: boolean;
  activeAttackSkill: SkillType | null;
  isDestroyed: boolean;
  destroyedBySkill: SkillType | null;
}

export function TargetCard({
  id,
  title,
  description,
  tags,
  type,
  url,
  stars,
  forks,
  date,
  selectedSkill,
  onAttack,
  isUnderAttack,
  activeAttackSkill,
  isDestroyed,
  destroyedBySkill,
}: TargetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = skillsConfig[selectedSkill];

  const tagDelays = useMemo(() => tags.map((_, i) => 800 + i * 100), [tags]);

  const handleClick = () => {
    if (isDestroyed || isUnderAttack) return;
    onAttack(selectedSkill, id);
  };

  if (isDestroyed) {
    const skillToShow = destroyedBySkill || activeAttackSkill;
    const attackConfig = skillToShow ? skillsConfig[skillToShow] : null;
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border/20 bg-card/30 p-6 transition-all duration-500",
          "opacity-40"
        )}
      >
        <div className="flex h-full min-h-[180px] flex-col items-center justify-center py-8 text-center">
          <span className="mb-2 text-3xl opacity-50">
            {type === "article" ? "📄" : "📦"}
          </span>
          <p className="text-sm text-muted-foreground">
            已被 {attackConfig?.name || "技能"} 攻击
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            {attackConfig?.effectName || ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={cn(
        "group relative cursor-crosshair overflow-hidden rounded-xl border border-border/50 bg-card/80 p-6 transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        isUnderAttack && "ring-2 ring-offset-2 ring-offset-background pointer-events-none"
      )}
      style={{
        borderColor: isUnderAttack && activeAttackSkill ? skillsConfig[activeAttackSkill].color : undefined,
        // @ts-expect-error CSS variable
        "--tw-ring-color": isUnderAttack && activeAttackSkill ? skillsConfig[activeAttackSkill].color : undefined,
      }}
    >
      {/* 攻击时的背景特效 */}
      {isUnderAttack && activeAttackSkill && (
        <div 
          className="absolute inset-0 animate-pulse opacity-10"
          style={{ backgroundColor: skillsConfig[activeAttackSkill].color }}
        />
      )}

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          {type === "article" ? (
            <FileText className="h-4 w-4 text-primary" />
          ) : (
            <Github className="h-4 w-4 text-primary" />
          )}
          <PretextText
            text={type === "article" ? "技术文章" : "开源项目"}
            isDestroying={isUnderAttack}
            skill={activeAttackSkill}
            className="text-xs uppercase tracking-wider text-muted-foreground"
            delay={0}
          />
        </span>
        <div className="flex items-center gap-3">
          {stars !== undefined && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3" />
              <PretextText
                text={String(stars)}
                isDestroying={isUnderAttack}
                skill={activeAttackSkill}
                delay={100}
              />
            </span>
          )}
          {forks !== undefined && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <GitFork className="h-3 w-3" />
              <PretextText
                text={String(forks)}
                isDestroying={isUnderAttack}
                skill={activeAttackSkill}
                delay={150}
              />
            </span>
          )}
          {date && (
            <span className="text-xs text-muted-foreground">
              <PretextText
                text={date}
                isDestroying={isUnderAttack}
                skill={activeAttackSkill}
                delay={100}
              />
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
        <PretextText
          text={title}
          isDestroying={isUnderAttack}
          skill={activeAttackSkill}
          delay={200}
        />
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        <PretextText
          text={description}
          isDestroying={isUnderAttack}
          skill={activeAttackSkill}
          delay={400}
        />
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 4).map((tag, index) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
          >
            <PretextText
              text={tag}
              isDestroying={isUnderAttack}
              skill={activeAttackSkill}
              delay={tagDelays[index]}
            />
          </span>
        ))}
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          <PretextText
            text={type === "article" ? "阅读文章" : "查看项目"}
            isDestroying={isUnderAttack}
            skill={activeAttackSkill}
            delay={1200}
          />
          <ExternalLink className="h-3 w-3" />
        </a>
      )}

      {/* Attack hint on hover */}
      {!isUnderAttack && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity",
            "group-hover:opacity-100"
          )}
          style={{ pointerEvents: "none" }}
        >
          <div className="text-center">
            <span className="text-4xl">{config.icon}</span>
            <p className="mt-2 text-sm font-medium" style={{ color: config.color }}>
              {config.effectName}
            </p>
            <p className="text-xs text-muted-foreground">点击释放技能</p>
          </div>
        </div>
      )}
    </div>
  );
}
