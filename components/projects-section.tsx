import type { GitHubRepo } from '@/lib/github'
import { LANGUAGE_COLORS } from '@/lib/github'
import { Star, GitFork, ExternalLink } from 'lucide-react'

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? '#8b949e')
    : null

  return (
    <article className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-ring">
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-base font-semibold hover:underline"
        >
          {repo.name}
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100"
            aria-label={`${repo.name} canlı demo`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {repo.description ?? 'Açıklama eklenmemiş.'}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: langColor ?? undefined }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
          {repo.forks_count}
        </span>
      </div>
    </article>
  )
}

export function ProjectsSection({ repos }: { repos: GitHubRepo[] }) {
  return (
    <section id="projeler" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20">
      <div className="mb-8 flex items-center gap-3">
        <h2 className="font-mono text-sm text-muted-foreground">
          {'// projeler'}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  )
}
