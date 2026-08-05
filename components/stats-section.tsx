import type { GitHubProfile, GitHubRepo } from '@/lib/github'
import { Users, GitCommitHorizontal, FolderGit2, Star } from 'lucide-react'

export function StatsSection({
  profile,
  repos,
  totalContributions,
}: {
  profile: GitHubProfile
  repos: GitHubRepo[]
  totalContributions: number
}) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)

  const stats = [
    {
      label: 'Takipçi',
      value: profile.followers,
      icon: Users,
    },
    {
      label: 'Toplam Contribution',
      value: totalContributions,
      icon: GitCommitHorizontal,
    },
    {
      label: 'Açık Repo',
      value: profile.public_repos,
      icon: FolderGit2,
    },
    {
      label: 'Toplam Yıldız',
      value: totalStars,
      icon: Star,
    },
  ]

  return (
    <section id="istatistikler" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20">
      <div className="mb-8 flex items-center gap-3">
        <h2 className="font-mono text-sm text-muted-foreground">
          {'// github-istatistikleri'}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-ring"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <stat.icon className="h-4 w-4" aria-hidden="true" />
              <dt className="text-xs">{stat.label}</dt>
            </div>
            <dd className="mt-3 font-mono text-3xl font-bold tracking-tight">
              {stat.value.toLocaleString('tr-TR')}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
