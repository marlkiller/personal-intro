export interface GithubError {
  message: string
  status: number
}

export interface GithubProject {
  title: string
  description: string
  technologies: string[]
  url: string
  stars: number
  forks: number
}

import { projects } from './data'

export async function fetchGithubRepos(username: string): Promise<{ data: GithubProject[] | null; error: GithubError | null }> {
  // 如果配置使用本地数据，直接返回示例项目
    if (projects.useLocalProjects) {
    return {
      data: projects.projects,
      error: null
    }
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒超时

    const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=100&page=1`,
      { signal: controller.signal }
    )
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      return {
        data: null,
        error: {
          message: 'API Error',
          status: response.status
        }
      }
    }

    const repos = await response.json()
    const sortedRepos = repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
    
    return {
      data: sortedRepos.map((repo: any) => ({
        title: repo.name,
        description: repo.description || 'No description',
        technologies: [repo.language].filter(Boolean),
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count
      })),
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof DOMException && error.name === 'AbortError' 
          ? 'Timeout' 
          : 'Network Error',
        status: 0
      }
    }
  }
}

export interface GithubUserInfo {
  name: string
  bio: string
  followers: number
  following: number
  public_repos: number
  avatar_url: string
  blog: string
  location: string
  created_at: string
}

export async function fetchGithubUserInfo(username: string): Promise<GithubUserInfo> {
  const response = await fetch(`https://api.github.com/users/${username}`)
  return await response.json()
}

export interface GithubContributions {
  totalContributions: number
  lastYearContributions: number
  currentStreak: number
  longestStreak: number
}

