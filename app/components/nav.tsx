import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

const navItems = {
  '/': {
    name: 'Home',
  },
  '/blog': {
    name: 'Posts',
  },
  '/about': {
    name: 'About',
  },
}

export function Navbar() {
  return (
    <header className="mb-12 border-b pb-6" style={{ borderColor: 'var(--border)' }}>
      <nav
        className="flex flex-row items-center justify-between"
        id="nav"
      >
        <ul className="flex flex-row gap-1 list-none p-0 m-0">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <li key={path}>
                <Link
                  href={path}
                  className="px-3 py-1.5 text-sm font-medium no-underline rounded-md transition-colors hover:bg-[var(--card-muted)]"
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
