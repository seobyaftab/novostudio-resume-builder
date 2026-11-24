import React from 'react';
import { useResumeStore } from './store/useResumeStore';
import { TopNavbar } from './components/editor/TopNavbar';
import { EditorSidebar } from './components/editor/EditorSidebar';
import { ResumeCanvas } from './components/canvas/ResumeCanvas';
import { TemplatePickerModal } from './components/modals/TemplatePickerModal';
import { AtsCheckerModal } from './components/modals/AtsCheckerModal';
import { SpaceOptimizerModal } from './components/modals/SpaceOptimizerModal';
import { AiAssistantModal } from './components/modals/AiAssistantModal';
import { AddSectionModal } from './components/modals/AddSectionModal';

export function App() {
  const { activeSidePanel, setActiveSidePanel } = useResumeStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans antialiased text-slate-900 select-text">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-row overflow-hidden h-[calc(100vh-3.5rem)]">
        {/* Left Form Editor Sidebar */}
        <EditorSidebar />

        {/* Center Live A4 Resume Canvas */}
        <ResumeCanvas />
      </main>

      {/* Active Modals */}
      {activeSidePanel === 'templates' && (
        <TemplatePickerModal onClose={() => setActiveSidePanel('none')} />
      )}
      {activeSidePanel === 'atsChecker' && (
        <AtsCheckerModal onClose={() => setActiveSidePanel('none')} />
      )}
      {activeSidePanel === 'spaceOptimizer' && (
        <SpaceOptimizerModal onClose={() => setActiveSidePanel('none')} />
      )}
      {activeSidePanel === 'aiAssistant' && (
        <AiAssistantModal onClose={() => setActiveSidePanel('none')} />
      )}
      {activeSidePanel === 'addSection' && (
        <AddSectionModal onClose={() => setActiveSidePanel('none')} />
      )}
    </div>
  );
}

export default App;
