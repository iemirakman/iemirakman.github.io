'use client'

import dynamic from 'next/dynamic'
import type { GitHubProfile } from '@/lib/github'
import { MapPin, Building2, ArrowDown } from 'lucide-react'

const HeroScene = dynamic(() => import('@/components/hero-scene'), {
  ssr: false,
})

export function Hero({ profile }: { profile: GitHubProfile }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <HeroScene />

      {/* Gradient overlay to keep text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {profile.hireable ? 'İş tekliflerine açık' : 'Aktif geliştirici'}
          </span>
        </div>

        <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-tight md:text-7xl">
          {profile.name}
        </h1>

        <p className="font-mono text-lg text-muted-foreground md:text-xl">
          {'<'}
          <span className="text-foreground">{profile.bio ?? 'Developer'}</span>
          {' />'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          {profile.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </span>
          )}
          {profile.company && (
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              {profile.company}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projeler"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Projelerimi Gör
          </a>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-card/80 px-6 py-2.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
          >
            GitHub Profilim
          </a>
        </div>
      </div>

      <a
        href="#istatistikler"
        className="absolute bottom-8 z-10 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Aşağı kaydır"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}
