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
}

export interface ResearchContent {
  title: string;
  intro: string;
  areas: ResearchArea[];
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
      currentArea = { title: line.replace('### ', ''), image: '', description: '' };
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

export interface LabContent {
  faculty: LabMember[];
  members: LabMember[];
  alumni: LabMember[];
}

export function parseLabContent(content: string): LabContent {
  const lines = content.split('\n');
  const faculty: LabMember[] = [];
  const members: LabMember[] = [];
  const alumni: LabMember[] = [];
  
  let currentSection: 'faculty' | 'members' | 'alumni' | null = null;
  let currentMember: Partial<LabMember> | null = null;
  
  for (const line of lines) {
    if (line.startsWith('## Faculty')) {
      currentSection = 'faculty';
    } else if (line.startsWith('## Members')) {
      currentSection = 'members';
    } else if (line.startsWith('## Alumni')) {
      currentSection = 'alumni';
    } else if (line.startsWith('### ')) {
      if (currentMember?.name && currentSection) {
        const targetArray = currentSection === 'faculty' ? faculty : currentSection === 'members' ? members : alumni;
        targetArray.push(currentMember as LabMember);
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
  
  if (currentMember?.name && currentSection) {
    const targetArray = currentSection === 'faculty' ? faculty : currentSection === 'members' ? members : alumni;
    targetArray.push(currentMember as LabMember);
  }
  
  return { faculty, members, alumni };
}

export interface Publication {
  title: string;
  image: string;
  authors: string;
  venue: string;
  links: { text: string; url: string }[];
  year: string;
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
