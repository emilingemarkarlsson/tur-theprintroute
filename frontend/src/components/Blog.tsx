import { getAllPosts, getPostBySlug } from "../lib/blog";
import { SEO } from "./SEO";

const baseUrl = "https://theprintroute.com";

interface BlogProps {
  slug?: string;
  onBack: () => void;
  onNavigate: (slug: string) => void;
}

function BlogList({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SEO
        title="Blog – The Print Route"
        description="Insights on print production, manufacturing workflows, and supply chain innovation."
        url={`${baseUrl}/blog`}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-3 text-slate-50">The Print Route Blog</h1>
        <p className="text-slate-400 mb-12">Insights on print production, manufacturing workflows, and supply chain innovation.</p>
        {posts.length === 0 ? (
          <p className="text-slate-400">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-slate-700 rounded-xl p-6 hover:border-slate-500 transition-colors cursor-pointer bg-slate-900/50"
                onClick={() => onNavigate(post.slug)}
              >
                <div className="flex gap-2 mb-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">{tag}</span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2 text-slate-100">{post.title}</h2>
                <p className="text-slate-400 text-sm mb-3">{post.description}</p>
                <div className="flex justify-between items-center">
                  <time className="text-xs text-slate-500">{post.publishDate}</time>
                  <button className="text-sm font-medium text-sky-400 hover:underline">Read more →</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogPost({ slug, onBack }: { slug: string; onBack: () => void }) {
  const post = getPostBySlug(slug);
  if (!post) return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-slate-400">Post not found.</p>
        <button onClick={onBack} className="mt-4 text-sm text-sky-400 underline">← Back to blog</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <SEO
        title={`${post.title} – The Print Route`}
        description={post.description}
        url={`${baseUrl}/blog/${post.slug}`}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-slate-200 hover:underline mb-8 inline-block">
          ← Back to blog
        </button>
        <div className="flex gap-2 mb-4">
          {post.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-50">{post.title}</h1>
        <p className="text-slate-400 mb-2">{post.description}</p>
        <time className="text-xs text-slate-500 block mb-10">{post.publishDate}</time>
        <div
          className="prose-dark leading-relaxed text-slate-200 space-y-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-slate-100 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-slate-100 [&_strong]:text-slate-50 [&_li]:ml-5 [&_li]:list-disc [&_li]:mb-1 [&_code]:bg-slate-800 [&_code]:px-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-sky-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}

export default function Blog({ slug, onBack, onNavigate }: BlogProps) {
  if (slug) return <BlogPost slug={slug} onBack={onBack} />;
  return <BlogList onNavigate={onNavigate} />;
}
