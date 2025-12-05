import { getContent, parseLabContent } from '@/lib/content';

export function LabSection() {
  const content = getContent('lab');
  const { faculty, members, alumni } = parseLabContent(content);

  return (
    <section className="min-h-[calc(100vh-65px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="animate-fade-in">
          {/* Faculty Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8">
              Faculty
            </h2>
            <div className="flex flex-wrap gap-8">
              {faculty.map((member, index) => (
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
                    className="w-28 h-28 object-cover rounded mb-3"
                  />
                  <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {member.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.role.split(',')[0]}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Members Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8">
              Members
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {members.map((member, index) => (
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
                    {member.role}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Alumni Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-normal mb-8">
              Alumni
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {alumni.map((member, index) => (
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
                    {member.role}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
