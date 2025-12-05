import { getContent, parseHomeContent } from '@/lib/content';
import robotArm from '@/public/assets/hiro_lab.jpg';
import ReactMarkdown from 'react-markdown';

export function HomeSection() {
  const content = getContent('home');
  const { titleLines, description, links } = parseHomeContent(content);

  return (
    <section className="min-h-[calc(100vh-65px)] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-8">
              {titleLines.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>
            
            <div className="prose-academic mb-8">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
            
            <div className="flex flex-wrap gap-6">
              {links.map((link) => (
                <a
                  key={link.text}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <img
              src={robotArm}
              alt="Robot arm holding a shield with tree logo"
              className="max-w-md w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
