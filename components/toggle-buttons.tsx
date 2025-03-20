"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { Moon, Sun, Music, Github, Coffee, CoffeeIcon, Heart } from "lucide-react"
import { config, content } from "@/lib/data"

export function ToggleButtons() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [showMusic, setShowMusic] = useState(false)
  const [showDonate, setShowDonate] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh")
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const { buttons } = content[language]

  return (
    <>
      <div className="flex gap-3 fixed top-6 right-6 z-50">
        <button 
          onClick={() => setShowDonate(!showDonate)}
          className="button-style group" 
          title={buttons.donate}
        >
          <Coffee className="w-5 h-5 stroke-[1.5] text-amber-500 transition-transform group-hover:rotate-12" />
        </button>

        <button 
          onClick={() => window.open(config.github.url, '_blank')}
          className="button-style group" 
          title={buttons.sourceCode}
        >
          <Github className="w-5 h-5 stroke-[1.5] text-gray-600 dark:text-gray-300 transition-transform group-hover:rotate-12" />
        </button>

        <button 
          onClick={() => setShowMusic(!showMusic)}
          className="button-style group" 
          title={buttons.music}
        >
          <Music className="w-5 h-5 stroke-[1.5] text-rose-500 transition-transform group-hover:scale-110" />
        </button>

        <button 
          onClick={toggleLanguage} 
          className="button-style group"
          title={buttons.language}
        >
          {language === 'zh' ? (
            <span className="w-5 h-5 flex items-center justify-center font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">EN</span>
          ) : (
            <span className="w-5 h-5 flex items-center justify-center font-semibold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">中</span>
          )}
        </button>

        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
          className="button-style group"
          title={theme === 'dark' ? buttons.lightMode : buttons.darkMode}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 stroke-[1.5] text-amber-500 transition-transform group-hover:rotate-90" />
          ) : (
            <Moon className="w-5 h-5 stroke-[1.5] text-blue-500 transition-transform group-hover:-rotate-12" />
          )}
        </button>
      </div>

      {/* Music player */}
      <div className={`fixed top-20 right-6 glass-card p-4 rounded-xl transition-all duration-300 ${
        showMusic ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px] pointer-events-none'
      }`}>
        <iframe 
          src={config.music.url}
          width={config.music.width}
          height={config.music.height}
          frameBorder="0"
          className="rounded-lg"
        />
      </div>

      {/* Donate QR codes */}
      <div 
        className={`fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-300 z-[100] ${
          showDonate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowDonate(false)}
      >
        <div 
          className={`glass-card p-8 rounded-xl shadow-2xl transition-all duration-300 transform bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg ${
            showDonate ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h3 className="text-xl font-medium bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
                {buttons.donateText}
              </h3>
              <div className="flex items-center justify-center gap-2 text-amber-500">
                <CoffeeIcon className="w-5 h-5" />
                <Heart className="w-4 h-4 animate-pulse" />
                <Coffee className="w-5 h-5" />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <p className="text-base font-medium mb-4 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {buttons.wechat}
                </p>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <img 
                    src={config.donate.wechat} 
                    alt="WeChat Pay" 
                    width={config.donate.qrSize} 
                    height={config.donate.qrSize}
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <p className="text-base font-medium mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {buttons.alipay}
                </p>
                <div className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <img 
                    src={config.donate.alipay} 
                    alt="Alipay" 
                    width={config.donate.qrSize} 
                    height={config.donate.qrSize}
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

