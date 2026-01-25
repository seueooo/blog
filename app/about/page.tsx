import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Hanseo Kim - Software Engineer',
}

interface ExperienceItem {
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  location?: string
  description?: string
  logo?: string
}

const experiences: ExperienceItem[] = [
  {
    type: 'work',
    title: 'UX Engineer Assistant',
    organization: 'Toss (Viva Republica)',
    period: '2025.09 — now',
    location: 'Seoul',
    description: 'Design Platform (mobile)',
    logo: '/toss_logo.png',
  },
  {
    type: 'education',
    title: 'Double Major in Software Engineering and Economics.',
    organization: 'Dongguk University',
    period: '2020 — 2025',
    location: 'Seoul',
    logo: '/dgu_symbol.png',
  },
  {
    type: 'education',
    title: 'Exchange semester at Lille University in Lille, France.',
    organization: 'Université de Lille',
    period: '2023.08 — 2024.02',
    location: 'Lille, France',
    logo: '/lille_logo.png',
  },
]

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <article
      className="group relative"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex flex-col gap-1 py-5 border-b border-dashed" style={{ borderColor: 'var(--border)' }}>
        {/* Period - tabular nums for alignment */}
        <span
          className="text-xs tracking-wide"
          style={{
            color: 'var(--muted-foreground)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {item.period}
        </span>

        {/* Main content */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <div className="flex items-start gap-3">
            {/* Logo */}
            {item.logo && (
              <figure
                className="flex-shrink-0 w-9 h-9 rounded-md overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: 'var(--card)' }}
              >
                <Image
                  src={item.logo}
                  alt={`${item.organization} logo`}
                  width={36}
                  height={36}
                  className="w-full h-full object-contain p-1"
                />
              </figure>
            )}

            <div className="flex flex-col">
              <h3
                className="text-base font-medium tracking-tight transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                {item.organization}
              </h3>
              <span
                className="text-sm"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item.title}
              </span>
            </div>
          </div>

          {item.location && (
            <span
              className="text-xs italic mt-1 sm:mt-0"
              style={{ color: 'var(--muted)' }}
            >
              {item.location}
            </span>
          )}
        </div>

        {/* Description if exists */}
        {item.description && (
          <p
            className="text-xs mt-2 leading-relaxed"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {item.description}
          </p>
        )}

        {/* Type indicator */}
        <div className="absolute -left-4 top-6 hidden sm:block">
          <span
            className="block w-1.5 h-1.5 rounded-full transition-colors group-hover:scale-125"
            style={{
              backgroundColor: item.type === 'work' ? 'var(--accent)' : 'var(--muted)',
            }}
          />
        </div>
      </div>
    </article>
  )
}

export default function AboutPage() {
  return (
    <section>
      <h1
        className="text-3xl font-semibold tracking-tight mb-6"
        style={{ color: 'var(--foreground)' }}
      >
        About.
      </h1>

      <p
        className="leading-relaxed mb-10"
        style={{ color: 'var(--muted-foreground)' }}
      >
        Enjoying making high-impact visuals work through clean math and logic.

Focusing on delivering experiences that feel natural and intuitive.
      </p>

      {/* Experience Section */}
      <div className="mb-12">
        <h2
          className="text-sm font-medium tracking-widest uppercase mb-6"
          style={{ color: 'var(--muted)' }}
        >
          Experience
        </h2>

        <div className="relative sm:pl-4">
          {/* Vertical line for timeline effect - desktop only */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden sm:block"
            style={{ backgroundColor: 'var(--border)' }}
          />

          {experiences.map((item, index) => (
            <ExperienceCard key={`${item.organization}-${item.period}`} item={item} index={index} />
          ))}
        </div>
      </div>

    
    </section>
  )
}
