import { BlogPosts } from "app/components/posts";
import { TypewriterText } from "app/components/typewriter-text";

export default function Page() {
  return (
    <section>
      <h1
        className="mb-6 text-2xl font-semibold tracking-tight"
        style={{ color: "var(--foreground)" }}
      >
        Hanseo Kim
      </h1>
      <TypewriterText
        text="dev log"
        className="mb-8 leading-relaxed"
        style={{ color: "var(--muted-foreground)" }}
      />
      <div>
        <h2
          className="mb-4 text-xl font-semibold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          Recent Posts
        </h2>
        <BlogPosts />
      </div>
    </section>
  );
}
