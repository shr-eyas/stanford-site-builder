import { getContent, parsePublicationsContent } from '@/lib/content';

export function PublicationsSection() {
  const content = getContent('publications');
  const { title, publications } = parsePublicationsContent(content);

  // Group publications by year
  const pubsByYear = publications.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<string, typeof publications>);

  const years = Object.keys(pubsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section className="min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-normal leading-tight mb-12">
            {title}
          </h1>

          {years.map((year) => (
            <div key={year} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8 text-muted-foreground">
                {year}
              </h2>
              
              <div className="space-y-8">
                {pubsByYear[year].map((pub, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={pub.image}
                        alt={pub.title}
                        className="w-36 h-28 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-medium text-foreground mb-1 leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-accent mb-1">
                        {pub.authors}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {pub.venue}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {pub.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
