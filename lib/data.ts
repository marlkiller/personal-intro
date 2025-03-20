export type Language = "en" | "zh"

export interface Song {
  title: string
  artist: string
  url: string
  cover?: string
}

export const content = {
  en: {
    personalInfo: {
      name: "John Doe",
      title: "Software Engineer",
      bio: "Passionate about open source development and sharing knowledge through technical writing. Specialized in frontend technologies with 5+ years of experience building web applications.",
      location: "San Francisco, CA",
      email: "john.doe@example.com",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    sections: {
      projects: "Open Source Projects",
      articles: "Technical Articles",
      viewOnGithub: "View on GitHub",
      readArticle: "Read Article",
    },
  },
  zh: {
    personalInfo: {
      name: "张三",
      title: "软件工程师",
      bio: "热衷于开源开发和通过技术文章分享知识。专注于前端技术，拥有5年以上构建Web应用程序的经验。",
      location: "北京，中国",
      email: "zhangsan@example.com",
      github: "https://github.com/zhangsan",
      twitter: "https://twitter.com/zhangsan",
      linkedin: "https://linkedin.com/in/zhangsan",
    },
    sections: {
      projects: "开源项目",
      articles: "技术文章",
      viewOnGithub: "在GitHub上查看",
      readArticle: "阅读文章",
    },
  },
}

export const projects = {
  en: [
    {
      title: "React Component Library",
      description: "A collection of reusable React components with TypeScript support",
      technologies: ["React", "TypeScript", "Storybook"],
      url: "https://github.com/johndoe/react-components",
    },
    {
      title: "Data Visualization Tool",
      description: "Interactive data visualization library for complex datasets",
      technologies: ["D3.js", "React", "JavaScript"],
      url: "https://github.com/johndoe/data-viz",
    },
    {
      title: "CLI Task Manager",
      description: "Command-line productivity tool for managing tasks and projects",
      technologies: ["Node.js", "TypeScript", "Commander.js"],
      url: "https://github.com/johndoe/task-cli",
    },
  ],
  zh: [
    {
      title: "React组件库",
      description: "一个支持TypeScript的可重用React组件集合",
      technologies: ["React", "TypeScript", "Storybook"],
      url: "https://github.com/zhangsan/react-components",
    },
    {
      title: "数据可视化工具",
      description: "用于复杂数据集的交互式数据可视化库",
      technologies: ["D3.js", "React", "JavaScript"],
      url: "https://github.com/zhangsan/data-viz",
    },
    {
      title: "命令行任务管理器",
      description: "用于管理任务和项目的命令行生产力工具",
      technologies: ["Node.js", "TypeScript", "Commander.js"],
      url: "https://github.com/zhangsan/task-cli",
    },
  ],
}

export const articles = {
  en: [
    {
      title: "Building Accessible Web Applications",
      date: "March 15, 2023",
      excerpt:
        "A comprehensive guide to creating web applications that are accessible to everyone, including best practices and common pitfalls to avoid.",
      url: "https://dev.to/johndoe/building-accessible-web-applications",
    },
    {
      title: "State Management in React: A Practical Guide",
      date: "February 2, 2023",
      excerpt:
        "Comparing different state management approaches in React applications, from Context API to Redux and Zustand.",
      url: "https://dev.to/johndoe/state-management-in-react",
    },
    {
      title: "Optimizing API Performance with GraphQL",
      date: "December 10, 2022",
      excerpt:
        "How to leverage GraphQL to improve API performance and reduce over-fetching in modern web applications.",
      url: "https://dev.to/johndoe/optimizing-api-performance-with-graphql",
    },
    {
      title: "Implementing Authentication in Next.js Applications",
      date: "October 5, 2022",
      excerpt:
        "A step-by-step tutorial on implementing secure authentication in Next.js applications using NextAuth.js.",
      url: "https://dev.to/johndoe/implementing-authentication-in-nextjs",
    },
  ],
  zh: [
    {
      title: "构建无障碍Web应用程序",
      date: "2023年3月15日",
      excerpt: "创建适合所有人使用的Web应用程序的综合指南，包括最佳实践和常见陷阱的避免。",
      url: "https://dev.to/zhangsan/building-accessible-web-applications",
    },
    {
      title: "React中的状态管理：实用指南",
      date: "2023年2月2日",
      excerpt: "比较React应用程序中不同的状态管理方法，从Context API到Redux和Zustand。",
      url: "https://dev.to/zhangsan/state-management-in-react",
    },
    {
      title: "使用GraphQL优化API性能",
      date: "2022年12月10日",
      excerpt: "如何利用GraphQL提高API性能并减少现代Web应用程序中的过度获取。",
      url: "https://dev.to/zhangsan/optimizing-api-performance-with-graphql",
    },
    {
      title: "在Next.js应用程序中实现身份验证",
      date: "2022年10月5日",
      excerpt: "使用NextAuth.js在Next.js应用程序中实现安全身份验证的分步教程。",
      url: "https://dev.to/zhangsan/implementing-authentication-in-nextjs",
    },
  ],
}

