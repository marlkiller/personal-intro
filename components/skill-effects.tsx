"use client";

import { useState, useCallback } from "react";
import { SkillType, skillsConfig } from "@/lib/data";

// 重新导出类型，方便其他组件使用
export type { SkillType };
export { skillsConfig as skillConfig };

export function useSkillAttack() {
  const [activeSkill, setActiveSkill] = useState<SkillType | null>(null);
  const [attackingTarget, setAttackingTarget] = useState<string | null>(null);
  const [destroyedTargets, setDestroyedTargets] = useState<Set<string>>(new Set());

  const attack = useCallback((skill: SkillType, targetId: string) => {
    if (destroyedTargets.has(targetId)) return;
    
    setActiveSkill(skill);
    setAttackingTarget(targetId);

    // 动画持续时间后标记为已销毁
    setTimeout(() => {
      setDestroyedTargets((prev) => new Set([...prev, targetId]));
      setActiveSkill(null);
      setAttackingTarget(null);
    }, 2500);
  }, [destroyedTargets]);

  const resetTargets = useCallback(() => {
    setDestroyedTargets(new Set());
    setActiveSkill(null);
    setAttackingTarget(null);
  }, []);

  return { activeSkill, attackingTarget, destroyedTargets, attack, resetTargets };
}
