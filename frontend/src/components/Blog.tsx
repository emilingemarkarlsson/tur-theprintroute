import { getAllPosts, getPostBySlug } from "../lib/blog";

interface BlogProps {
  slug?: string;
  onBack: () => void;
  onNavigate: (slug: string) => void;
}

function BlogList({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const posts = getAllPosts();
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-3">The Print Route Blog</h1>
      <p className="text-gray-500 mb-12">Insights on print production, manufacturing workflows, and supply chain innovation.</p>
      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet — check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => onNavigate(post.slug)}
            >
              <div className="flex gap-2 mb-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{tag}</span>
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-3">{post.description}</p>
              <div className="flex justify-between items-center">
                <time className="text-xs text-gray-400">{post.publishDate}</time>
                <button className="text-sm font-medium hover:underline">Read more →</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogPost({ slug, onBack }: { slug: string; onBack: () => void }) {
  const post = getPostBySlug(slug);
  if (!post) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-gray-500">Post not found.</p>
      <button onClick={onBack} className="mt-4 text-sm underline">← Back to blog</button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <button onClick={onBack} className="text-sm text-gray-500 hover:underline mb-8 inline-block">
        ← Back to blog
      </button>
      <div className="flex gap-2 mb-4">
        {post.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{tag}</span>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-500 mb-2">{post.description}</p>
      <time className="text-xs text-gray-400 block mb-10">{post.publishDate}</time>
      <div
        className="prose max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export default function Blog({ slug, onBack, onNavigate }: BlogProps) {
  if (slug) return <BlogPost slug={slug} onBack={onBack} />;
  return <BlogList onNavigate={onNavigate} />;
}
