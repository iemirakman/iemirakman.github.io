import Image from 'next/image'
import type { GitHubProfile } from '@/lib/github'
import { GithubIcon } from '@/components/brand-icons'

export function SiteHeader({ profile }: { profile: GitHubProfile }) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src={profile.avatar_url || '/placeholder.svg'}
            alt={`${profile.name} avatar`}
            width={28}
            height={28}
            className="rounded-full border border-border"
          />
          <span className="font-mono text-sm font-semibold">
            {profile.login}
          </span>
        </a>
        <nav className="flex items-center gap-1" aria-label="Ana menü">
          <a
            href="#istatistikler"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            İstatistikler
          </a>
          <a
            href="#projeler"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Projeler
          </a>
          <a
            href="#iletisim"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            İletişim
          </a>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="GitHub profili"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
