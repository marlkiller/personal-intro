"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { content, projects, articles } from "@/lib/data"
import { ToggleButtons } from "@/components/toggle-buttons"

export default function Home() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration completes before rendering content that depends on theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const { personalInfo, sections } = content[language]
  const currentProjects = projects[language]
  const currentArticles = articles[language]

  if (!mounted) {
    return null // Avoid rendering until client-side to prevent hydration mismatch
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <ToggleButtons />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">{personalInfo.name}</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{personalInfo.title}</p>
        <div className="border-t border-b py-4 px-2 border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-3">{personalInfo.bio}</p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>📍 {personalInfo.location}</p>
            <p>
              <span className="mr-4">
                <Link href={`mailto:${personalInfo.email}`} className="hover:underline">
                  ✉️ Email
                </Link>
              </span>
              <span className="mr-4">
                <Link href={personalInfo.github} target="_blank" className="hover:underline">
                  GitHub
                </Link>
              </span>
              <span className="mr-4">
                <Link href={personalInfo.twitter} target="_blank" className="hover:underline">
                  Twitter
                </Link>
              </span>
              <span>
                <Link href={personalInfo.linkedin} target="_blank" className="hover:underline">
                  LinkedIn
                </Link>
              </span>
            </p>
          </div>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">{sections.projects}</h2>
        <div className="space-y-4">
          {currentProjects.map((project) => (
            <div
              key={project.title}
              className="border p-4 rounded border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={project.url}
                target="_blank"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {sections.viewOnGithub}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">{sections.articles}</h2>
        <div className="space-y-4">
          {currentArticles.map((article) => (
            <div
              key={article.title}
              className="border p-4 rounded border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <h3 className="font-medium">{article.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{article.date}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{article.excerpt}</p>
              <Link
                href={article.url}
                target="_blank"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {sections.readArticle}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

