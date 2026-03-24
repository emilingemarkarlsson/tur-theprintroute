export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

// Vite imports all .md files as raw strings at build time
const modules = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string | string[]> = {};
  match[1].split("\n").forEach((line) => {
    const colon = line.indexOf(":");
    if (colon < 0) return;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^["'\[]|["'\]]$/g, "");
    data[key] = val.replace(/["\']/g, "");
  });
  return { data, content: match[2].trim() };
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3 class=\"text-lg font-semibold mt-6 mb-2\">$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class=\"text-xl font-bold mt-8 mb-3\">$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class=\"text-2xl font-bold mt-8 mb-3\">$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"bg-gray-100 px-1 rounded text-sm font-mono\">$1</code>")
    .replace(/^- (.+)$/gm, "<li class=\"ml-5 list-disc mb-1\">$1</li>")
    .replace(/\n\n/g, "</p>\n<p class=\"mb-4 leading-relaxed\">")
    .replace(/^(?!<[hH1-6li])(.+)$/gm, "<p class=\"mb-4 leading-relaxed\">$1</p>")
    .replace(/<p class="mb-4 leading-relaxed"><\/p>/g, "");
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([filepath, raw]) => {
      const slug = filepath.replace(/.*\//, "").replace(/\.md$/, "");
      const { data, content } = parseFrontmatter(raw);
      return {
        slug,
        title: String(data.title || slug),
        description: String(data.description || ""),
        publishDate: String(data.publishDate || data.date || ""),
        tags: String(data.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
        excerpt: content.slice(0, 160),
      };
    })
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const entry = Object.entries(modules).find(([f]) => f.endsWith(`${slug}.md`));
  if (!entry) return null;
  const [, raw] = entry;
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: String(data.title || slug),
    description: String(data.description || ""),
    publishDate: String(data.publishDate || data.date || ""),
    tags: String(data.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
    excerpt: content.slice(0, 160),
    content: markdownToHtml(content),
  };
}
