// Content loader for markdown files
import homeContent from '@/content/home.md?raw';
import labContent from '@/content/lab.md?raw';
import researchContent from '@/content/research.md?raw';
import publicationsContent from '@/content/publications.md?raw';
import positionsContent from '@/content/positions.md?raw';
import contactContent from '@/content/contact.md?raw';

export type ContentKey = 'home' | 'lab' | 'research' | 'publications' | 'positions' | 'contact';

const contentMap: Record<ContentKey, string> = {
  home: homeContent,
  lab: labContent,
  research: researchContent,
  publications: publicationsContent,
  positions: positionsContent,
  contact: contactContent,
};

export function getContent(key: ContentKey): string {
  return contentMap[key] || '';
}

export function parseHomeContent(content: string) {
  const lines = content.split('\n');
  const titleLines: string[] = [];
  let description = '';
  const links: { text: string; url: string }[] = [];
  
  let inLinks = false;
  
  for (const line of lines) {
    if (line.startsWith('# ') && !inLinks) {
      titleLines.push(line.replace('# ', ''));
    } else if (line.startsWith('## Links')) {
      inLinks = true;
    } else if (inLinks && line.startsWith('- [')) {
      const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        links.push({ text: match[1], url: match[2] });
      }
    } else if (line.trim() && !line.startsWith('#') && !line.startsWith('-')) {
      if (!inLinks) {
        description = line;
      }
    }
  }
  
  return { titleLines, description, links };
}

export interface ResearchArea {
  title: string;
  image: string;
  description: string;
  slug: string;
}

export interface ResearchContent {
  title: string;
  intro: string;
  areas: ResearchArea[];
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function parseResearchContent(content: string): ResearchContent {
  const lines = content.split('\n');
  let title = '';
  let intro = '';
  const areas: ResearchArea[] = [];
  
  let currentArea: Partial<ResearchArea> | null = null;
  let inAreas = false;
  let collectingIntro = false;
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '');
      collectingIntro = true;
    } else if (line.startsWith('## Areas')) {
      inAreas = true;
      collectingIntro = false;
    } else if (collectingIntro && line.trim() && !line.startsWith('#')) {
      intro = line;
      collectingIntro = false;
    } else if (inAreas && line.startsWith('### ')) {
      if (currentArea?.title) {
        areas.push(currentArea as ResearchArea);
      }
      const areaTitle = line.replace('### ', '');
      currentArea = { title: areaTitle, image: '', description: '', slug: slugify(areaTitle) };
    } else if (currentArea && line.startsWith('image: ')) {
      currentArea.image = line.replace('image: ', '');
    } else if (currentArea && line.trim() && !line.startsWith('image:')) {
      currentArea.description = line;
    }
  }
  
  if (currentArea?.title) {
    areas.push(currentArea as ResearchArea);
  }
  
  return { title, intro, areas };
}

export interface LabMember {
  name: string;
  image: string;
  role: string;
  link: string;
}

export interface LabSection {
  title: string;
  members: LabMember[];
}

export interface LabContent {
  sections: LabSection[];
}

export function parseLabContent(content: string): LabContent {
  const lines = content.split('\n');
  const sections: LabSection[] = [];
  
  let currentSection: LabSection | null = null;
  let currentMember: Partial<LabMember> | null = null;
  
  for (const line of lines) {
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      // Save previous member if exists
      if (currentMember?.name && currentSection) {
        currentSection.members.push(currentMember as LabMember);
      }
      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection);
      }
      // Start new section
      currentSection = { title: line.replace('## ', ''), members: [] };
      currentMember = null;
    } else if (line.startsWith('### ')) {
      // Save previous member if exists
      if (currentMember?.name && currentSection) {
        currentSection.members.push(currentMember as LabMember);
      }
      currentMember = { name: line.replace('### ', ''), image: '', role: '', link: '' };
    } else if (currentMember && line.startsWith('image: ')) {
      currentMember.image = line.replace('image: ', '');
    } else if (currentMember && line.startsWith('role: ')) {
      currentMember.role = line.replace('role: ', '');
    } else if (currentMember && line.startsWith('link: ')) {
      currentMember.link = line.replace('link: ', '');
    }
  }
  
  // Save last member and section
  if (currentMember?.name && currentSection) {
    currentSection.members.push(currentMember as LabMember);
  }
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return { sections };
}

export interface Publication {
  title: string;
  image: string;
  authors: string;
  venue: string;
  links: { text: string; url: string }[];
  year: string;
  researchArea?: string;
}

export function parsePublicationsContent(content: string): { title: string; publications: Publication[] } {
  const lines = content.split('\n');
  let title = '';
  const publications: Publication[] = [];
  
  let currentYear = '';
  let currentPub: Partial<Publication> | null = null;
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '');
    } else if (line.startsWith('## ')) {
      currentYear = line.replace('## ', '');
    } else if (line.startsWith('### ')) {
      if (currentPub?.title) {
        publications.push(currentPub as Publication);
      }
      currentPub = { title: line.replace('### ', ''), year: currentYear, image: '', authors: '', venue: '', links: [] };
    } else if (currentPub && line.startsWith('image: ')) {
      currentPub.image = line.replace('image: ', '');
    } else if (currentPub && line.startsWith('authors: ')) {
      currentPub.authors = line.replace('authors: ', '');
    } else if (currentPub && line.startsWith('venue: ')) {
      currentPub.venue = line.replace('venue: ', '');
    } else if (currentPub && line.startsWith('area: ')) {
      currentPub.researchArea = line.replace('area: ', '');
    } else if (currentPub && line.startsWith('links: ')) {
      const linksStr = line.replace('links: ', '');
      const linkMatches = linksStr.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
      currentPub.links = Array.from(linkMatches).map(m => ({ text: m[1], url: m[2] }));
    }
  }
  
  if (currentPub?.title) {
    publications.push(currentPub as Publication);
  }
  
  return { title, publications };
}

export function getPublicationsByArea(areaSlug: string): Publication[] {
  const { publications } = parsePublicationsContent(getContent('publications'));
  return publications.filter(pub => {
    if (pub.researchArea) {
      return slugify(pub.researchArea) === areaSlug;
    }
    return false;
  });
}

export function getResearchAreaBySlug(slug: string): ResearchArea | undefined {
  const { areas } = parseResearchContent(getContent('research'));
  return areas.find(area => area.slug === slug);
}
