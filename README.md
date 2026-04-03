# 🐉 Dragon Portfolio

一个游戏化的个人技术作品集网站，飞龙穿透文字重排效果，让你的技能展示更加生动有趣！

## ✨ 特性

- 🎮 **RPG 风格技能系统** - 10 种编程技能，每种都有独特的攻击特效
- 🐉 **飞龙穿透效果** - 龙可以穿透文章和项目卡片，文字自动避让重排
- 🎨 **明暗主题切换** - 支持浅色/深色主题，使用 OKLCH 色彩空间
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🔗 **GitHub 集成** - 自动拉取你的开源项目展示
- ⚡ **高性能优化** - 全局文字避让管理器，批量 DOM 操作

## 🚀 技术栈

- **框架:** Next.js 16 (App Router)
- **语言:** TypeScript
- **样式:** Tailwind CSS 4
- **组件:** shadcn/ui
- **动画:** Canvas API + CSS Animations
- **部署:** Vercel

## 📦 安装与运行

```bash
# 克隆项目
git clone https://github.com/marlkiller/personal-intro.git
cd personal-intro

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 🎯 自定义配置

编辑 `lib/data.ts` 文件来个性化你的作品集：

```typescript
// 个人信息
export const personalInfo = {
  name: "你的名字",
  title: "你的职位",
  bio: "个人简介",
  // ...
};

// 技能配置
export const skillsConfig = {
  java: { name: "Java", level: 90, /* ... */ },
  // 添加更多技能...
};

// 技术文章
export const articles = [
  // 你的文章列表...
];
```

## 🎨 技能特效

| 技能 | 特效名称 | 描述 |
|------|---------|------|
| ☕ Java | 字节码分解 | 字符变成 0 和 1 然后消失 |
| 🐍 Python | 缩进蒸发 | 字符像蒸汽一样向上飘散 |
| ⚛️ React | 组件解构 | 字符像组件一样拆解 |
| 🐹 Go | 协程吞噬 | 字符被多个小方块吃掉 |
| 🦀 Rust | 内存回收 | 字符像被锈蚀一样逐渐消失 |
| ⚡ C/C++ | 指针解引用 | 字符闪烁然后崩溃消失 |
| 🪝 Hook | 函数劫持 | 字符被钩子勾走 |
| 🔍 Reverse | 逆向解析 | 字符反转并解码 |
| 📦 Assembly | 指令编码 | 字符变成汇编指令格式 |
| 🔓 Disassembly | 指令解码 | 字符像被拆解成机器码 |

## 📁 项目结构

```
personal-intro/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页
│   └── globals.css        # 全局样式
├── components/
│   ├── ui/                # shadcn/ui 组件
│   ├── dragon-canvas.tsx  # 飞龙 Canvas 动画
│   ├── pretext-text-dragon.tsx  # 文字重排组件
│   └── ...
├── hooks/
│   └── use-dragon-position.ts  # 龙位置管理
└── lib/
    ├── data.ts            # 数据配置
    └── github.ts          # GitHub API 集成
```

## 🌐 在线演示

访问 [https://personal-intro.vercel.app](https://personal-intro.vercel.app) 查看在线演示。

## 📝 License

MIT License

## 👤 作者

**marlkiller**

- GitHub: [@marlkiller](https://github.com/marlkiller)
- 邮箱: marlkiller@voidm.com
- 位置: 北京，中国

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
