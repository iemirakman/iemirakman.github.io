export interface GitHubProfile {
  login: string
  name: string
  avatar_url: string
  html_url: string
  bio: string | null
  company: string | null
  blog: string | null
  location: string | null
  twitter_username: string | null
  public_repos: number
  followers: number
  following: number
  hireable: boolean | null
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  homepage: string | null
  fork: boolean
}

const USERNAME = 'iemirakman'

const FALLBACK_PROFILE: GitHubProfile = {
  login: 'iemirakman',
  name: 'İbrahim Emir Akman',
  avatar_url: 'https://avatars.githubusercontent.com/u/236213740?v=4',
  html_url: 'https://github.com/iemirakman',
  bio: 'Full-Stack Developer',
  company: 'International Bamboo Association',
  blog: 'iemirakman.github.io',
  location: 'Turkey',
  twitter_username: 'iemirakman',
  public_repos: 6,
  followers: 386,
  following: 411,
  hireable: true,
}

export async function getProfile(): Promise<GitHubProfile> {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return FALLBACK_PROFILE
    return (await res.json()) as GitHubProfile
  } catch {
    return FALLBACK_PROFILE
  }
}

export async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=30`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/vnd.github+json' },
      },
    )
    if (!res.ok) return []
    const repos = (await res.json()) as GitHubRepo[]
    return repos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch {
    return []
  }
}

export async function getTotalContributions(): Promise<number> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=all`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return 0
    const data = (await res.json()) as { total: Record<string, number> }
    return Object.values(data.total).reduce((sum, n) => sum + n, 0)
  } catch {
    return 0
  }
}

export const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  CSS: '#563d7c',
  PHP: '#4F5D95',
}
