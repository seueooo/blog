import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>
        Hanseo Kim.
      </h1>
      <p className="mb-8 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div>
        <h2 className="mb-4 text-xl font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>
          Recent Posts
        </h2>
        <BlogPosts />
      </div>
    </section>
  )
}
