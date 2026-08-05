import type { GitHubProfile } from '@/lib/github'
import { Globe, MapPin, Building2, ArrowUpRight } from 'lucide-react'
import { GithubIcon, XIcon } from '@/components/brand-icons'

export function ContactSection({ profile }: { profile: GitHubProfile }) {
  const blogUrl = profile.blog
    ? profile.blog.startsWith('http')
      ? profile.blog
      : `https://${profile.blog}`
    : null

  const links = [
    {
      label: 'github',
      value: `github.com/${profile.login}`,
      href: profile.html_url,
      icon: GithubIcon,
    },
    ...(blogUrl
      ? [
          {
            label: 'website',
            value: profile.blog as string,
            href: blogUrl,
            icon: Globe,
          },
        ]
      : []),
    ...(profile.twitter_username
      ? [
          {
            label: 'x',
            value: `x.com/${profile.twitter_username}`,
            href: `https://x.com/${profile.twitter_username}`,
            icon: XIcon,
          },
        ]
      : []),
  ]

  return (
    <section id="iletisim" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20">
      <div className="mb-8 flex items-center gap-3">
        <h2 className="font-mono text-sm text-muted-foreground">
          {'// iletisim'}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {/* Terminal-style contact card */}
        <div className="overflow-hidden rounded-lg border border-border bg-card md:col-span-3">
          <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#f85149]/70" />
            <span className="h-3 w-3 rounded-full bg-[#d29922]/70" />
            <span className="h-3 w-3 rounded-full bg-[#3fb950]/70" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              iletisim.sh
            </span>
          </div>
          <div className="flex flex-col gap-4 p-5 font-mono text-sm">
            <p className="text-muted-foreground">
              <span className="text-primary">$</span> whoami
            </p>
            <div className="flex flex-col gap-1.5 pl-4">
              <p className="font-semibold">{profile.name}</p>
              {profile.bio && (
                <p className="text-muted-foreground">{profile.bio}</p>
              )}
              <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                {profile.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {profile.location}
                  </span>
                )}
                {profile.company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {profile.company}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground">
              <span className="text-primary">$</span> cat baglantilar.txt
            </p>
            <ul className="flex flex-col gap-2 pl-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-md border border-border bg-secondary/50 px-3 py-2.5 transition-colors hover:border-ring hover:bg-accent"
                  >
                    <link.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {link.label}:
                    </span>
                    <span className="truncate text-xs">{link.value}</span>
                    <ArrowUpRight
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            {profile.hireable && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fb950]" />
                </span>
                Yeni projelere ve iş birliklerine açığım
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter({ profile }: { profile: GitHubProfile }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-8 md:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          {`© ${new Date().getFullYear()} ${profile.name}`}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Veriler GitHub API&apos;den canlı olarak çekilmektedir
        </p>
      </div>
    </footer>
  )
}
