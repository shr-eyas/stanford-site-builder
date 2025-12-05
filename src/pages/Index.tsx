import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomeSection } from '@/components/HomeSection';
import { MarkdownSection } from '@/components/MarkdownSection';
import { ResearchSection } from '@/components/ResearchSection';
import { LabSection } from '@/components/LabSection';
import { PublicationsSection } from '@/components/PublicationsSection';
import type { ContentKey } from '@/lib/content';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection />;
      case 'lab':
        return <LabSection />;
      case 'research':
        return <ResearchSection />;
      case 'publications':
        return <PublicationsSection />;
      case 'positions':
      case 'contact':
        return <MarkdownSection contentKey={activeTab as ContentKey} />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
