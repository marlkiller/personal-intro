import { Project } from "./data";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

export interface GithubError {
  status: number;
  message: string;
}

export async function fetchGithubRepos(
  username: string
): Promise<{ data: Project[] | null; error: GithubError | null }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 秒超时

    // 不使用 Accept 头，避免触发某些网络环境的拦截
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=100&page=1`,
      {
        signal: controller.signal,
        // 添加缓存以避免频繁请求
        cache: "force-cache",
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      // 401 或 403 时返回友好错误
      if (response.status === 401 || response.status === 403) {
        return {
          data: null,
          error: {
            status: response.status,
            message: "GitHub API 访问受限，显示本地数据",
          },
        };
      }
      return {
        data: null,
        error: {
          status: response.status,
          message: response.status === 404
            ? "用户不存在"
            : `请求失败 (${response.status}): ${response.statusText}`,
        },
      };
    }

    const repos: GithubRepo[] = await response.json();

    // 按 stars 排序，取前 6 个有描述的仓库
    const sortedRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .filter((repo) => repo.description) // 只保留有描述的仓库
      .slice(0, 6);

    const projects: Project[] = sortedRepos.map((repo) => ({
      id: `project-${repo.id}`,
      title: repo.name,
      description: repo.description || "No description",
      tags: repo.topics.length > 0
        ? repo.topics.slice(0, 4)
        : [repo.language || "Code"].filter(Boolean),
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }));

    return { data: projects, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        status: 0,
        message: error instanceof Error && error.name === "AbortError"
          ? "请求超时，显示本地数据"
          : "网络错误，显示本地数据",
      },
    };
  }
}
