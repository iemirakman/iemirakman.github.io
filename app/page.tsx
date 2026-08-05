import { getProfile, getRepos, getTotalContributions } from '@/lib/github'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { StatsSection } from '@/components/stats-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection, SiteFooter } from '@/components/contact-section'

export default async function Page() {
  const [profile, repos, totalContributions] = await Promise.all([
    getProfile(),
    getRepos(),
    getTotalContributions(),
  ])

  return (
    <>
      <SiteHeader profile={profile} />
      <main>
        <Hero profile={profile} />
        <StatsSection
          profile={profile}
          repos={repos}
          totalContributions={totalContributions}
        />
        <ProjectsSection repos={repos} />
        <ContactSection profile={profile} />
      </main>
      <SiteFooter profile={profile} />
    </>
  )
}
