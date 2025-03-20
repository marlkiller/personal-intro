"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { Moon, Sun, Globe } from "lucide-react"
import type { Language } from "@/lib/data"

export function ToggleButtons() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Ensure theme toggle only works client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const languageOptions: { value: Language; label: string; flag: string }[] = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "zh", label: "中文", flag: "🇨🇳" },
  ]

  // Handle language selection
  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setDropdownOpen(false)
  }

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex gap-2 absolute top-4 right-4">
      {/* Language Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 rounded-md border flex items-center gap-1"
          aria-label="Select language"
        >
          <Globe className="h-4 w-4" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-1 w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleLanguageSelect(option.value)}
                className={`flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  language === option.value ? "font-medium" : ""
                }`}
              >
                <span className="mr-2">{option.flag}</span>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="p-2 rounded-md border" aria-label="Toggle theme">
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  )
}

