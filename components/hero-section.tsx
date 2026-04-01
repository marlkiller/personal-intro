"use client";

import { Github, Mail, MapPin } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-12 pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-64 w-64 rounded-full bg-[#f89820]/10 blur-3xl" />
        <div className="absolute left-1/2 top-60 h-48 w-48 rounded-full bg-[#3776ab]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
          {/* Avatar */}
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-[#f89820]/20 via-primary/20 to-[#3776ab]/20">
              <div className="flex h-full w-full items-center justify-center text-6xl">
                🧙‍♂️
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-lg bg-gradient-to-r from-[#f89820] to-[#61dafb] px-3 py-1 text-xs font-bold text-white shadow-lg">
              Lv.99
            </div>
            {/* Floating skill icons */}
            <div className="absolute -left-4 top-0 animate-bounce text-xl" style={{ animationDelay: "0s" }}>☕</div>
            <div className="absolute -right-4 top-4 animate-bounce text-xl" style={{ animationDelay: "0.2s" }}>🐍</div>
            <div className="absolute -left-2 bottom-4 animate-bounce text-xl" style={{ animationDelay: "0.4s" }}>⚛️</div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              在线中
            </div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">{personalInfo.name}</span>
            </h1>
            <p className="mb-4 text-xl text-muted-foreground">
              {personalInfo.title}
            </p>
            <p className="mb-6 max-w-xl leading-relaxed text-muted-foreground">
              {personalInfo.bio}。选择你的技能，点击目标，观看 Pretext 风格的文字消散特效！
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <span className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="mt-8 flex flex-wrap gap-3">
          {personalInfo.interests.map((interest, index) => (
            <span
              key={index}
              className="rounded-lg border border-border/50 bg-card/50 px-4 py-2 text-sm text-muted-foreground"
            >
              <span className="mr-2">{interest.icon}</span>
              {interest.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
