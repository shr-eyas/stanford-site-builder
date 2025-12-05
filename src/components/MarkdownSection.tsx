import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getContent, type ContentKey } from '@/lib/content';

interface MarkdownSectionProps {
  contentKey: ContentKey;
}

export function MarkdownSection({ contentKey }: MarkdownSectionProps) {
  const content = getContent(contentKey);

  return (
    <section className="min-h-[calc(100vh-65px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="prose-academic animate-fade-in">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl md:text-5xl font-serif font-normal leading-tight mb-8">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-serif font-normal mb-4 mt-12 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-serif font-normal mb-2 mt-6">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-base md:text-lg leading-relaxed mb-4 text-muted-foreground">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-2">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-muted-foreground">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="text-accent font-medium">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="text-muted-foreground">
                  {children}
                </em>
              ),
              hr: () => <div className="section-divider" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
