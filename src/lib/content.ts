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
