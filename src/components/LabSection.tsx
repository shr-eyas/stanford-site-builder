import { getContent, parseLabContent } from '@/lib/content';

export function LabSection() {
  const content = getContent('lab');
  const { sections } = parseLabContent(content);

  return (
    <section className="min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="animate-fade-in">
          {sections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex < sections.length - 1 ? 'mb-16' : ''}>
              <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8">
                {section.title}
              </h2>
              <div className={`grid gap-8 ${
                section.title === 'Faculty' 
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' 
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center'
              }`}>
                {section.members.map((member, index) => (
                  <a
                    key={index}
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-center"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 object-cover rounded mb-3 mx-auto"
                    />
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {section.title === 'Faculty' ? member.role.split(',')[0] : member.role}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
