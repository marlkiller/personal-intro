export type Language = "en" | "zh"


export const config = {
  sourceCode: "https://github.com/marlkiller/personal-intro",
  music: {
    url: "https://music.163.com/outchain/player?type=0&id=102600752&auto=0&height=430",
    width: 300,
    height: 450
  },
  donate: {
    wechat: "/wechat-qr.png",
    alipay: "/alipay-qr.png",
    qrSize: 220  // 增加二维码尺寸
  }
}

export const content = {
  en: {
    personalInfo: {
      name: "marlkiller",
      title: "Software Engineer",
      // bio 已删除
      location: "BJ, China",
      email: "marlkiller@voidm.com",
      github: "https://github.com/marlkiller",
      twitter: "",
      linkedin: "",
      skills: ["C/C++", "Assembly", "Reverse Engineering", "JAVA", "HOOK", "Python"],
      interests: [
        { icon: "", text: "The development engineer of interest" },
        { icon: "", text: "I want everyone to know me, but no one knows who I am." },
        { icon: "", text: "Open-source software developer" }
      ],
    },
    sections: {
      projects: "Open Source Projects",
      articles: "Technical Articles",
      viewOnGithub: "View on GitHub",
      readArticle: "Read Article",
    },
    buttons: {
      sourceCode: "Source Code",
      music: "My Music",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      language: "Switch to Chinese",
      donate: "Buy Me a Coffee",
      donateText: "Would you buy me a coffee?",
      wechat: "WeChat Pay",
      alipay: "Alipay"
    }
  },
  zh: {
    personalInfo: {
      name: "木阿马",
      title: "软件工程师",
      // bio 已删除
      location: "北京，中国",
      email: "marlkiller@voidm.com",
      github: "https://github.com/marlkiller",
      twitter: "",
      linkedin: "",
      skills: ["C/C++", "反汇编", "逆向分析", "JAVA", "HOOK", "Python"],
      interests: [
        { icon: "", text: "一个兴趣使然的开发" },
        { icon: "", text: "想让所有人认识我,但不知道我是谁" },
        { icon: "", text: "开源软件开发者" }
      ],
    },
    sections: {
      projects: "开源项目",
      articles: "技术文章",
      viewOnGithub: "在GitHub上查看",
      readArticle: "阅读文章",
    },
    buttons: {
      sourceCode: "查看源码",
      music: "我的音乐",
      darkMode: "暗色模式",
      lightMode: "亮色模式",
      language: "切换到英文",
      donate: "请我喝咖啡",
      donateText: "请我喝一杯咖啡吗？",
      wechat: "微信支付",
      alipay: "支付宝"
    }
  }
}


export const articles = [
  {
    title: "Hopper Disassembler for macOS 5.18.1 CracKed U2B [2025.4.26 更新]",
    date: "2025-04-26",
    excerpt: "🕵️ 致敬原作者精妙的混淆技术与暗桩设计，令人拍案叫绝。包括但不限于  ....",
    url: "https://www.52pojie.cn/thread-2027339-1-1.html",
  },
  {
    title: "lldb 调试 tableplus + license 逆向 + python3 keygen(win/mac 通杀)",
    date: "2025-03-14",
    excerpt: "之前做过该软件的分析, 不过似乎作者与我心有灵犀, 之前的 patch 已经过期了;今天试一下新的方案, 逆向 license 文件的加解密, 并且完成 keygen",
    url: "https://www.52pojie.cn/thread-2014469-1-1.html",
  },
  {
    title: "electron asar 加密包解压 偏移修复",
    date: "2025-02-12",
    excerpt: "众所周知, electron 封装的可执行文件, 依赖 app.asar , 通常要逆向的话, 需要执行 asar 相关命令来解压归档文件, 然后在进行修改操作;",
    url: "https://www.52pojie.cn/thread-2005677-1-1.html",
  },
  {
    title: "Surge for MAC license 签名逆向/伪造",
    date: "2024-05-09",
    excerpt: "众所周知, 某工具 的 license 是存在本地的 macOS 文件系统的扩展属性（extended attribute）中的,以此为切入点, 我们开始逆向分析;",
    url: "https://www.52pojie.cn/thread-1922056-1-1.html",
  },
  {
    title: "JetBrains 全家桶系列 2024 破解思路....",
    date: "2024-04-29",
    excerpt: "JetBrains 是一家全球性软件公司，专门为软件开发者和团队打造可以提升工作效率的智能工具。总部位于捷克共和国布拉格，在多个国家/地区设有研发实验室和销售办事处。",
    url: "https://www.52pojie.cn/thread-1919098-1-1.html",
  },
]


export const projects = {
  useLocalProjects: false,  // 是否使用本地项目数据
  projects: [
    {
      title: "dylib_dobby_hook",
      description: "A macOS dylib project , aimed at enhancing and extending the functionality of target software.",
      technologies: ["macos", "hook", "inject", "dylib"],
      url: "https://github.com/marlkiller/dylib_dobby_hook",
      stars: 277,
      forks: 79
    },
    {
      title: "Sample-Project",
      description: "A github sample project",
      technologies: ["JavaScript", "Python"],
      url: "https://github.com/yourusername/code-snippets",
      stars: 9999,
      forks: 9999
    }
  ]
}

