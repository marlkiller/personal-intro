"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { SkillBar } from "@/components/skill-bar";
import { SkillTree } from "@/components/skill-tree";
import { TargetCard } from "@/components/target-card";
import { useSkillAttack } from "@/components/skill-effects";
import { 
  SkillType, 
  skillsConfig, 
  articles, 
  localProjects, 
  githubUsername, 
  useLocalProjects,
  Project 
} from "@/lib/data";
import { fetchGithubRepos, GithubError } from "@/lib/github";
import { Loader2, RefreshCw } from "lucide-react";

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState<SkillType>("java");
  const { activeSkill, attackingTarget, destroyedTargets, attack, resetTargets } = useSkillAttack();
  
  // GitHub 项目状态
  const [projects, setProjects] = useState<Project[]>(localProjects);
  const [isLoading, setIsLoading] = useState(!useLocalProjects);
  const [error, setError] = useState<GithubError | null>(null);

  // 获取 GitHub 项目
  useEffect(() => {
    if (useLocalProjects) {
      setProjects(localProjects);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchGithubRepos(githubUsername).then(({ data, error }) => {
      if (error) {
        setError(error);
        setProjects(localProjects); // 失败时使用本地数据
      } else if (data) {
        setProjects(data);
      }
      setIsLoading(false);
    });
  }, []);

  const retryFetch = () => {
    setError(null);
    setIsLoading(true);
    fetchGithubRepos(githubUsername).then(({ data, error }) => {
      if (error) {
        setError(error);
        setProjects(localProjects);
      } else if (data) {
        setProjects(data);
      }
      setIsLoading(false);
    });
  };

  const totalTargets = articles.length + projects.length;
  const destroyedCount = destroyedTargets.size;

  return (
    <main className="min-h-screen pb-32">
      <HeroSection />

      <div className="mx-auto max-w-6xl px-6">
        {/* Skills Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-foreground">技能树</h2>
            <span className="text-sm text-muted-foreground">
              点击技能可选择攻击方式
            </span>
          </div>
          <SkillTree 
            selectedSkill={selectedSkill} 
            onSkillSelect={setSelectedSkill} 
          />
        </section>

        {/* Game Instructions */}
        <section className="mb-16 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 to-transparent p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">战斗指南</h3>
              <p className="text-sm text-muted-foreground">
                选择一个编程技能，然后点击下方的文章或项目卡片进行攻击，观看 Pretext 风格的文字消散特效！
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{destroyedCount}/{totalTargets}</p>
                <p className="text-xs text-muted-foreground">已消灭</p>
              </div>
              <div 
                className="flex items-center gap-2 rounded-lg px-4 py-2"
                style={{ backgroundColor: `${skillsConfig[selectedSkill].color}20` }}
              >
                <span className="text-2xl">{skillsConfig[selectedSkill].icon}</span>
                <div>
                  <p className="font-semibold" style={{ color: skillsConfig[selectedSkill].color }}>
                    {skillsConfig[selectedSkill].name}
                  </p>
                  <p className="text-xs text-muted-foreground">{skillsConfig[selectedSkill].effectName}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-foreground">技术文章</h2>
            <span className="rounded-full bg-destructive/20 px-3 py-1 text-xs text-destructive">
              攻击目标
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <TargetCard
                key={article.id}
                id={article.id}
                title={article.title}
                description={article.description}
                tags={article.tags}
                type="article"
                url={article.url}
                date={article.date}
                selectedSkill={selectedSkill}
                onAttack={attack}
                isUnderAttack={attackingTarget === article.id}
                activeAttackSkill={activeSkill}
                isDestroyed={destroyedTargets.has(article.id)}
              />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-foreground">开源项目</h2>
              <span className="rounded-full bg-destructive/20 px-3 py-1 text-xs text-destructive">
                攻击目标
              </span>
              {!useLocalProjects && (
                <span className="text-xs text-muted-foreground">
                  来自 GitHub API
                </span>
              )}
            </div>
            {error && (
              <button
                onClick={retryFetch}
                className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                重试
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">从 GitHub 加载项目中...</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <TargetCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  type="project"
                  url={project.url}
                  stars={project.stars}
                  forks={project.forks}
                  selectedSkill={selectedSkill}
                  onAttack={attack}
                  isUnderAttack={attackingTarget === project.id}
                  activeAttackSkill={activeSkill}
                  isDestroyed={destroyedTargets.has(project.id)}
                />
              ))}
            </div>
          )}

          {error && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {error.message}（显示本地备用数据）
            </p>
          )}
        </section>

        {/* All Destroyed Message */}
        {destroyedCount === totalTargets && (
          <section className="mb-16 rounded-2xl border border-primary bg-gradient-to-r from-primary/10 to-transparent p-8 text-center">
            <span className="text-6xl">🎉</span>
            <h3 className="mt-4 text-2xl font-bold text-foreground">全部消灭！</h3>
            <p className="mt-2 text-muted-foreground">
              你已经用你的编程技能消灭了所有目标，真是太厉害了！
            </p>
            <button
              onClick={resetTargets}
              className="mt-6 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              重新开始
            </button>
          </section>
        )}
      </div>

      <SkillBar 
        selectedSkill={selectedSkill} 
        onSkillSelect={setSelectedSkill} 
        onReset={resetTargets}
        destroyedCount={destroyedCount}
      />
    </main>
  );
}
