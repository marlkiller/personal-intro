// 个人信息配置
export const personalInfo = {
  name: "marlkiller",
  title: "全栈开发工程师",
  location: "北京, 中国",
  email: "marlkiller@voidm.com",
  github: "https://github.com/marlkiller",
  bio: "热爱开源，专注于逆向工程和安全研究",
  interests: [
    { icon: "🔧", text: "兴趣使然的开发者" },
    { icon: "🕵️", text: "逆向工程爱好者" },
    { icon: "🌐", text: "开源软件贡献者" },
  ],
};

// 技能配置 - 同时作为"攻击技能"使用
export type SkillType = "java" | "python" | "react" | "go" | "rust" | "cpp" | "hook" | "reverse" | "assembly" | "disassembly";

export interface SkillConfig {
  color: string;
  icon: string;
  name: string;
  description: string;
  effectName: string;
  level: number; // 1-100
  category: "backend" | "frontend" | "systems" | "security";
}

export const skillsConfig: Record<SkillType, SkillConfig> = {
  java: {
    color: "#f89820",
    icon: "☕",
    name: "Java",
    description: "稳重的企业级力量",
    effectName: "字节码分解",
    level: 90,
    category: "backend",
  },
  python: {
    color: "#3776ab",
    icon: "🐍",
    name: "Python",
    description: "简洁而强大的蟒蛇",
    effectName: "缩进蒸发",
    level: 85,
    category: "backend",
  },
  react: {
    color: "#61dafb",
    icon: "⚛️",
    name: "React",
    description: "组件化的原子能",
    effectName: "组件解构",
    level: 75,
    category: "frontend",
  },
  go: {
    color: "#00add8",
    icon: "🐹",
    name: "Go",
    description: "并发的地鼠大军",
    effectName: "协程吞噬",
    level: 70,
    category: "backend",
  },
  rust: {
    color: "#dea584",
    icon: "🦀",
    name: "Rust",
    description: "所有权的铁腕",
    effectName: "内存回收",
    level: 60,
    category: "systems",
  },
  cpp: {
    color: "#00599C",
    icon: "⚡",
    name: "C/C++",
    description: "底层的性能之王",
    effectName: "指针解引用",
    level: 80,
    category: "systems",
  },
  hook: {
    color: "#e91e63",
    icon: "🪝",
    name: "Hook",
    description: "劫持函数调用流",
    effectName: "函数劫持",
    level: 88,
    category: "security",
  },
  reverse: {
    color: "#9c27b0",
    icon: "🔍",
    name: "Reverse",
    description: "逆向分析的洞察之眼",
    effectName: "逆向解析",
    level: 92,
    category: "security",
  },
  assembly: {
    color: "#4caf50",
    icon: "📦",
    name: "Assembly",
    description: "汇编指令的精密编织",
    effectName: "指令编码",
    level: 75,
    category: "security",
  },
  disassembly: {
    color: "#ff5722",
    icon: "🔓",
    name: "Disassembly",
    description: "二进制的逆向拆解",
    effectName: "指令解码",
    level: 78,
    category: "security",
  },
};

// 所有可用的攻击技能
export const attackSkills: SkillType[] = ["java", "python", "react", "go", "rust", "cpp", "hook", "reverse", "assembly", "disassembly"];

// 技术文章配置
export interface Article {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  url: string;
}

export const articles: Article[] = [
  {
    id: "article-1",
    title: "Hopper Disassembler for macOS 5.18.1 CracKed",
    description: "致敬原作者精妙的混淆技术与暗桩设计，令人拍案叫绝。包括但不限于...",
    tags: ["逆向", "macOS", "Hopper"],
    date: "2025-04-26",
    url: "https://www.52pojie.cn/thread-2027339-1-1.html",
  },
  {
    id: "article-2",
    title: "lldb 调试 tableplus + license 逆向",
    description: "之前做过该软件的分析, 今天试一下新的方案, 逆向 license 文件的加解密, 并且完成 keygen",
    tags: ["Python", "lldb", "逆向"],
    date: "2025-03-14",
    url: "https://www.52pojie.cn/thread-2014469-1-1.html",
  },
  {
    id: "article-3",
    title: "electron asar 加密包解压 偏移修复",
    description: "electron 封装的可执行文件, 依赖 app.asar , 通常要逆向的话, 需要执行 asar 相关命令来解压归档文件",
    tags: ["Electron", "asar", "JavaScript"],
    date: "2025-02-12",
    url: "https://www.52pojie.cn/thread-2005677-1-1.html",
  },
  {
    id: "article-4",
    title: "Surge for MAC license 签名逆向/伪造",
    description: "license 是存在本地的 macOS 文件系统的扩展属性中的, 以此为切入点, 我们开始逆向分析",
    tags: ["macOS", "签名", "逆向"],
    date: "2024-05-09",
    url: "https://www.52pojie.cn/thread-1922056-1-1.html",
  },
  {
    id: "article-5",
    title: "JetBrains 全家桶系列 2024 破解思路",
    description: "JetBrains 是一家全球性软件公司，专门为软件开发者和团队打造可以提升工作效率的智能工具",
    tags: ["Java", "JetBrains", "逆向"],
    date: "2024-04-29",
    url: "https://www.52pojie.cn/thread-1919098-1-1.html",
  },
];

// 本地项目配置（作为备用）
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  stars?: number;
  forks?: number;
}

export const localProjects: Project[] = [
  {
    id: "project-1",
    title: "dylib_dobby_hook",
    description: "A macOS dylib project, aimed at enhancing and extending the functionality of target software.",
    tags: ["macOS", "Hook", "Inject", "dylib"],
    url: "https://github.com/marlkiller/dylib_dobby_hook",
    stars: 277,
    forks: 79,
  },
];

// GitHub 用户名（从 github URL 提取）
export const githubUsername = personalInfo.github.split("/").pop() || "marlkiller";

// 是否使用本地项目数据（false 则从 GitHub API 获取）
export const useLocalProjects = false;
