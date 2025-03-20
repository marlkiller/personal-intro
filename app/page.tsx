"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { content, projects, articles } from "@/lib/data"
import { ToggleButtons } from "@/components/toggle-buttons"
import { Footer } from "@/components/footer"

export default function Home() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration completes before rendering content that depends on theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const { personalInfo, sections } = content[language]
  const currentProjects = projects
  const currentArticles = articles

  if (!mounted) {
    return null // Avoid rendering until client-side to prevent hydration mismatch
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl -z-10" /> */}
      <ToggleButtons />
      <header className="mb-12 fade-in">
        <div className="glass-card p-6 rounded-2xl hover-lift backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              {personalInfo.title}
            </p>
          </div>
          
          {/* 原有的个人信息内容 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-32 mx-auto md:mx-0 flex flex-col items-center gap-2">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                <img 
                  src={`${personalInfo.github}.png`}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-medium text-center">{personalInfo.name}</h3>
            </div>
            
            <div className="flex-1">
              {/* 兴趣列表 */}
              <div className="mb-4 space-y-2">
                {personalInfo.interests.map((item) => (
                  <p key={item.text} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </p>
                ))}
              </div>
              
              {/* 技能标签 */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.map((skill) => (
                    <span key={skill} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-3 sm:mb-0 hover:scale-105 transition-transform flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">📍</span>
                  {personalInfo.location}
                </p>
                <div className="flex items-center gap-6">
                  <Link href={`mailto:${personalInfo.email}`} className="social-link">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">✉️</span>
                    <span>Email</span>
                  </Link>
                  <Link href={personalInfo.github} target="_blank" className="social-link group">
                    GitHub 
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  {personalInfo.twitter && (
                    <Link href={personalInfo.twitter} target="_blank" className="hover:text-primary transition-colors">
                      Twitter
                    </Link>
                  )}
                  {personalInfo.linkedin && (
                    <Link href={personalInfo.linkedin} target="_blank" className="hover:text-primary transition-colors">
                      LinkedIn
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-12 fade-in">
        <Link href="/projects" className="inline-block w-full">
          <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform">
            {sections.projects}
          </h2>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentProjects.map((project) => (
            <div key={project.title} className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all duration-500 group">
              <Link href={project.url} target="_blank" className="block group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tech-tag"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={project.url}
                target="_blank"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                {sections.viewOnGithub} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="fade-in">
        <Link href="/articles" className="inline-block w-full">
          <h2 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform">
            {sections.articles}
          </h2>
        </Link>
        <div className="space-y-6">
          {currentArticles.map((article) => (
            <div key={article.title} className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all duration-500 group">
              <div className="flex items-start justify-between">
                <Link href={article.url} target="_blank" className="block flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                  {article.date}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {article.excerpt}
              </p>
              <Link
                href={article.url}
                target="_blank"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                {sections.readArticle} 
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

