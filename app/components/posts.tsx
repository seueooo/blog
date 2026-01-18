import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 11h16" />
      <path d="M7 14h.013" />
      <path d="M10.01 14h.005" />
      <path d="M13.01 14h.005" />
      <path d="M16.015 14h.005" />
      <path d="M13.015 17h.005" />
      <path d="M7.01 17h.005" />
      <path d="M10.01 17h.005" />
    </svg>
  )
}

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <ul className="list-none p-0 m-0">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <li key={post.slug} className="post-item">
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-1 no-underline md:flex-row md:items-center md:justify-between"
            >
              <span className="post-title">
                {post.metadata.title}
              </span>
              <span className="post-date flex items-center gap-1.5 shrink-0">
                <CalendarIcon />
                {formatDate(post.metadata.publishedAt, false)}
              </span>
            </Link>
          </li>
        ))}
    </ul>
  )
}
