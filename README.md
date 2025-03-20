# Personal Introduction

基于 Next.js 14 构建的个人介绍网站，支持中英文切换和暗色模式。

## 功能

- 中英文切换
- 暗色模式
- 项目展示
- 技术文章
- 响应式设计

## 配置

编辑 `lib/data.ts` 文件来修改个人信息：

```typescript
export const content = {
  en: {
    personalInfo: {
      name: "Your Name",
      title: "Your Title",
      location: "Your Location",
      email: "your.email@example.com",
      github: "https://github.com/yourusername",
      skills: ["Skill1", "Skill2"],
      interests: [
        { icon: "🗒️", text: "Your Interest" }
      ]
    }
  }
}

export const projects = [
  {
    title: "Project Name",
    description: "Project Description",
    technologies: ["tech1", "tech2"],
    url: "https://github.com/your-project"
  }
]

export const articles = [
  {
    title: "Article Title",
    date: "2024-01-01",
    excerpt: "Article excerpt...",
    url: "https://your-article-url"
  }
]


```  
## 开发

```shell
# 安装依赖
npm install
# 启动开发服务器
npm run dev
```

## 构建

```shell
# 构建生产版本
npm run build
# 启动生产服务器
npm start
```
