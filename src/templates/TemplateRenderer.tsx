import React from 'react';
import { ResumeDocument, TemplateId } from '../types/resume';
import { getTheme, getColumnGridTemplate } from '../engine/themeEngine';
import { HeaderBlock } from '../components/sections/HeaderBlock';
import { WorkBlock } from '../components/sections/WorkBlock';
import { EducationBlock } from '../components/sections/EducationBlock';
import { SkillsBlock } from '../components/sections/SkillsBlock';
import { LanguagesBlock } from '../components/sections/LanguagesBlock';
import { ProjectsBlock, CertificatesBlock, AwardsBlock, InterestsBlock } from '../components/sections/ExtraBlocks';
import { SectionHeader } from '../components/sections/SectionHeader';
import { EditableText } from '../components/canvas/EditableText';
import { useResumeStore } from '../store/useResumeStore';
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  ArrowLeftRight,
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';

interface TemplateRendererProps {
  document: ResumeDocument;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ document: doc }) => {
  const {
    moveSection,
    moveSectionToColumn,
    deleteSection,
    openAddSectionModal,
    updateName,
    updateTitle,
    updateContact,
    updateSummary,
  } = useResumeStore();

  const { template, layout, theme: themeConfig, blocks } = doc.config;
  const theme = getTheme(themeConfig.colors, themeConfig.customPrimaryHex);
  const {
    name,
    title,
    contact,
    photo,
    summary,
    work,
    education,
    skills,
    softSkills,
    technicalSkills,
    languages,
    projects,
    certificates,
    awards,
    interests,
  } = doc.data;

  // Active columns
  const leftSections = layout.columns?.left || ['summary', 'work', 'projects'];
  const rightSections = layout.columns?.right || ['education', 'skills', 'languages', 'certificates'];

  // Balancer grid calculation with correct sidebar placement
  const isLeftSidebar = template === 'functional';
  const isAsymmetric = ['basic', 'executive', 'traditional', 'functional', 'tech', 'it', 'general', 'creative', 'simple'].includes(template);
  const gridTemplateColumns = getColumnGridTemplate(
    isAsymmetric ? layout.sideBalancer : layout.balancer,
    isAsymmetric,
    isLeftSidebar ? 'left' : 'right'
  );

  // Section Hover Controls Toolbar
  const renderSectionToolbar = (secKey: string, col: 'left' | 'right', idx: number, total: number) => (
    <div className="absolute -top-3 right-0 opacity-0 group-hover/sec:opacity-100 transition-opacity bg-white border border-slate-300 rounded-md shadow-md flex items-center gap-0.5 px-1 py-0.5 z-20 no-print text-[10px]">
      <button
        disabled={idx === 0}
        onClick={() => moveSection(secKey, 'up')}
        title="Move Section Up"
        className="p-1 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronUp size={12} />
      </button>
      <button
        disabled={idx === total - 1}
        onClick={() => moveSection(secKey, 'down')}
        title="Move Section Down"
        className="p-1 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronDown size={12} />
      </button>
      <button
        onClick={() => moveSectionToColumn(secKey, col === 'left' ? 'right' : 'left')}
        title={`Move to ${col === 'left' ? 'Right' : 'Left'} Column`}
        className="p-1 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded"
      >
        <ArrowLeftRight size={12} />
      </button>
      <button
        onClick={() => openAddSectionModal({ column: col, insertAfter: secKey })}
        title="Add Section Below"
        className="p-1 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded"
      >
        <Plus size={12} />
      </button>
      <button
        onClick={() => deleteSection(secKey)}
        title="Delete / Hide Section"
        className="p-1 text-rose-500 hover:bg-rose-50 rounded"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );

  // Dynamic Section Dispatcher
  const renderSection = (
    secKey: string,
    col: 'left' | 'right',
    idx: number,
    total: number,
    headerVariant: 'underline' | 'pill' | 'banner' | 'clean' | 'left-bar' = 'underline',
    options?: { skillsDecoration?: 'bubble' | 'highlight' | 'infographic' | 'none'; circularIcons?: boolean }
  ) => {
    let content: React.ReactNode = null;

    switch (secKey) {
      case 'summary':
        if (!summary) return null;
        content = (
          <div>
            <SectionHeader title="Professional Summary" theme={theme} variant={headerVariant} />
            <EditableText
              value={summary}
              onChange={(val) => updateSummary(val)}
              className="text-[10.5px] leading-relaxed text-slate-700 w-full block"
              multiline
            />
          </div>
        );
        break;
      case 'work':
        content = <WorkBlock work={work} theme={theme} headerVariant={headerVariant} />;
        break;
      case 'education':
        content = <EducationBlock education={education} theme={theme} headerVariant={headerVariant} />;
        break;
      case 'skills':
        content = (
          <SkillsBlock
            skills={skills}
            theme={theme}
            decoration={options?.skillsDecoration || (template === 'modern' ? 'infographic' : template === 'creative' ? 'highlight' : blocks.skills.decoration)}
            infographicType={blocks.skills.infographicType}
            headerVariant={headerVariant}
          />
        );
        break;
      case 'softSkills':
        content = (
          <SkillsBlock
            title="Soft Skills & Competencies"
            skills={softSkills}
            theme={theme}
            decoration="bubble"
            headerVariant={headerVariant}
          />
        );
        break;
      case 'technicalSkills':
        content = (
          <SkillsBlock
            title="Technical & Stack Expertise"
            skills={technicalSkills.length > 0 ? technicalSkills : skills}
            theme={theme}
            decoration="highlight"
            headerVariant={headerVariant}
          />
        );
        break;
      case 'languages':
        content = (
          <LanguagesBlock
            languages={languages}
            theme={theme}
            infographicType={template === 'modern' || template === 'basic' ? 'dots-2' : blocks.languages.infographicType}
            headerVariant={headerVariant}
          />
        );
        break;
      case 'projects':
        content = <ProjectsBlock projects={projects} theme={theme} headerVariant={headerVariant} />;
        break;
      case 'certificates':
        content = <CertificatesBlock certificates={certificates} theme={theme} headerVariant={headerVariant} />;
        break;
      case 'awards':
        content = <AwardsBlock awards={awards} theme={theme} headerVariant={headerVariant} />;
        break;
      case 'interests':
        content = <InterestsBlock interests={interests} theme={theme} headerVariant={headerVariant} />;
        break;
      default:
        return null;
    }

    return (
      <div key={`${secKey}_${idx}`} className="relative group/sec transition-all">
        {renderSectionToolbar(secKey, col, idx, total)}
        {content}
      </div>
    );
  };

  // Add Section Button at Column Bottom
  const renderAddSectionButton = (column: 'left' | 'right') => (
    <button
      onClick={() => openAddSectionModal({ column })}
      className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-400 hover:text-teal-700 hover:border-teal-400 hover:bg-teal-50/50 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 no-print mt-2"
    >
      <Plus size={13} /> Add Section
    </button>
  );

  // 1. Creative Template
  if (template === 'creative') {
    return (
      <div className="pb-8">
        <div className="p-7 text-white" style={{ backgroundColor: theme.primary }}>
          <div className="flex items-center gap-6">
            {photo?.src && (
              <div className="w-22 h-22 rounded-2xl overflow-hidden border-2 border-white/80 shadow-lg shrink-0">
                <img src={photo.src} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 bg-black/20 px-2 py-0.5 rounded">
                Creative Portfolio Format
              </span>
              <h1 className="text-3xl font-black tracking-tight text-white mt-1 flex items-center gap-2">
                <EditableText
                  value={name.givenName}
                  onChange={(val) => updateName({ givenName: val })}
                  placeholder="First Name"
                />
                <EditableText
                  value={name.familyName}
                  onChange={(val) => updateName({ familyName: val })}
                  placeholder="Last Name"
                  className="text-white/80 font-light"
                />
              </h1>
              <p className="text-xs uppercase tracking-wider text-white/90 font-semibold mt-0.5">
                <EditableText
                  value={title}
                  onChange={(val) => updateTitle(val)}
                  placeholder="Job Title"
                />
              </p>
              {summary && (
                <EditableText
                  value={summary}
                  onChange={(val) => updateSummary(val)}
                  className="text-[10.5px] text-white/85 mt-2 leading-relaxed max-w-2xl block"
                  multiline
                />
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white px-7 py-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-medium border-b border-slate-800 mb-6">
          <span className="flex items-center gap-1.5">
            <Mail size={11} className="text-teal-400" />
            <EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" />
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={11} className="text-teal-400" />
            <EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" />
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={11} className="text-teal-400" />
            <EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="Location" />
          </span>
          {contact.linkedin && (
            <span className="flex items-center gap-1.5">
              <Globe size={11} className="text-teal-400" />
              <EditableText value={contact.linkedin} onChange={(val) => updateContact({ linkedin: val })} placeholder="LinkedIn" />
            </span>
          )}
        </div>

        <div className="px-8 grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'banner', { skillsDecoration: 'highlight' }))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'banner', { skillsDecoration: 'highlight' }))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 2. Basic Template
  if (template === 'basic') {
    return (
      <div className="p-8">
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                <EditableText
                  value={name.givenName}
                  onChange={(val) => updateName({ givenName: val })}
                  placeholder="First Name"
                />
                <EditableText
                  value={name.familyName}
                  onChange={(val) => updateName({ familyName: val })}
                  placeholder="Last Name"
                  style={{ color: theme.primary }}
                />
              </h1>
              <p className="text-xs uppercase font-bold text-slate-500 tracking-wider mt-0.5">
                <EditableText
                  value={title}
                  onChange={(val) => updateTitle(val)}
                  placeholder="Job Title"
                />
              </p>
              {summary && (
                <EditableText
                  value={summary}
                  onChange={(val) => updateSummary(val)}
                  className="text-[10px] text-slate-600 mt-2 leading-relaxed max-w-xl block"
                  multiline
                />
              )}
            </div>
            {photo?.src && (
              <img src={photo.src} alt="Profile" className="w-16 h-16 rounded object-cover border border-slate-200" />
            )}
          </div>
          <div className="border-y border-slate-300 py-1.5 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-600 font-medium">
            <EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" />
            <EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" />
            <EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" />
            {contact.linkedin && <EditableText value={contact.linkedin} onChange={(val) => updateContact({ linkedin: val })} placeholder="LinkedIn" />}
          </div>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: '55% 45%' }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'clean'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'clean'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 3. Modern Template
  if (template === 'modern') {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            {photo?.src && (
              <img src={photo.src} alt="Profile" className="w-18 h-18 rounded-full object-cover border-2 border-slate-300 shadow-sm" />
            )}
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <EditableText
                  value={name.givenName}
                  onChange={(val) => updateName({ givenName: val })}
                  placeholder="First Name"
                />
                <EditableText
                  value={name.familyName}
                  onChange={(val) => updateName({ familyName: val })}
                  placeholder="Last Name"
                  style={{ color: theme.primary }}
                />
              </h1>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                <EditableText
                  value={title}
                  onChange={(val) => updateTitle(val)}
                  placeholder="Job Title"
                />
              </p>
              {summary && (
                <EditableText
                  value={summary}
                  onChange={(val) => updateSummary(val)}
                  className="text-[10px] text-slate-600 mt-1.5 leading-relaxed max-w-md block"
                  multiline
                />
              )}
            </div>
          </div>
          <div className="text-right text-[10px] text-slate-600 space-y-0.5 border-l border-slate-200 pl-4">
            <div><EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" /></div>
            <div><EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" /></div>
            <div><EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" /></div>
            {contact.linkedin && <div className="text-teal-700"><EditableText value={contact.linkedin} onChange={(val) => updateContact({ linkedin: val })} placeholder="LinkedIn" /></div>}
          </div>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'underline'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'underline'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 4. Simple Template
  if (template === 'simple') {
    return (
      <div className="p-8">
        <div className="mb-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <EditableText
              value={name.givenName}
              onChange={(val) => updateName({ givenName: val })}
              placeholder="First Name"
            />
            <EditableText
              value={name.familyName}
              onChange={(val) => updateName({ familyName: val })}
              placeholder="Last Name"
              style={{ color: theme.primary }}
            />
          </h1>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            <EditableText
              value={title}
              onChange={(val) => updateTitle(val)}
              placeholder="Job Title"
            />
          </p>
          {summary && (
            <EditableText
              value={summary}
              onChange={(val) => updateSummary(val)}
              className="text-[10px] text-slate-600 mt-1 leading-relaxed block"
              multiline
            />
          )}
        </div>

        <div className="px-3.5 py-1.5 rounded-sm text-white flex flex-wrap gap-x-4 text-[10px] font-semibold mb-5 shadow-2xs" style={{ backgroundColor: theme.primary }}>
          <EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" />
          <EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" />
          <EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" />
          {contact.linkedin && <EditableText value={contact.linkedin} onChange={(val) => updateContact({ linkedin: val })} placeholder="LinkedIn" />}
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'underline'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'underline'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 5. Traditional Template
  if (template === 'traditional') {
    return (
      <div className="p-8 font-serif">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-2xl font-bold tracking-normal text-slate-900 flex items-center gap-2">
              <EditableText
                value={name.givenName}
                onChange={(val) => updateName({ givenName: val })}
                placeholder="First Name"
              />
              <EditableText
                value={name.familyName}
                onChange={(val) => updateName({ familyName: val })}
                placeholder="Last Name"
              />
            </h1>
            <p className="text-xs tracking-wider opacity-80 uppercase font-sans font-semibold mt-0.5">
              <EditableText
                value={title}
                onChange={(val) => updateTitle(val)}
                placeholder="Job Title"
              />
            </p>
            {summary && (
              <EditableText
                value={summary}
                onChange={(val) => updateSummary(val)}
                className="text-[10px] text-slate-600 mt-1.5 leading-relaxed font-sans max-w-lg block"
                multiline
              />
            )}
          </div>
          {photo?.src && (
            <img src={photo.src} alt="Profile" className="w-16 h-16 rounded border-2 border-slate-700 object-cover" />
          )}
        </div>

        <div className="bg-slate-900 text-white px-4 py-2 rounded-xs flex flex-wrap gap-x-5 text-[10px] font-sans font-medium mb-5">
          <span className="flex items-center gap-1">
            <Mail size={10} />
            <EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" />
          </span>
          <span className="flex items-center gap-1">
            <Phone size={10} />
            <EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" />
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            <EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" />
          </span>
        </div>

        <div className="grid gap-6 font-sans" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'clean'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'clean'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 6. Minimalist Template
  if (template === 'minimalist') {
    return (
      <div className="p-8">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex justify-center items-center gap-2">
            <EditableText
              value={name.givenName}
              onChange={(val) => updateName({ givenName: val })}
              placeholder="First Name"
            />
            <EditableText
              value={name.familyName}
              onChange={(val) => updateName({ familyName: val })}
              placeholder="Last Name"
              style={{ color: theme.primary }}
            />
          </h1>
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
            <EditableText
              value={title}
              onChange={(val) => updateTitle(val)}
              placeholder="Job Title"
            />
          </p>
          <div className="flex justify-center gap-4 text-[10px] text-slate-500 mt-2">
            <EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" />
            <EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" />
            <EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" />
          </div>
        </div>

        {/* Top Areas of Expertise row */}
        {skills.length > 0 && (
          <div className="mb-5 pb-4 border-b border-slate-200">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 text-center">
              Areas of Expertise
            </h4>
            <div className="flex flex-wrap justify-center gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-slate-700 bg-slate-100 border border-slate-200"
                >
                  <EditableText
                    value={s.name}
                    onChange={(val) => useResumeStore.getState().updateSkill(s.id, { name: val })}
                  />
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.filter(s => s !== 'skills').map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'underline'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.filter(s => s !== 'skills').map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'underline'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 7. General Template
  if (template === 'general') {
    return (
      <div className="pb-8">
        <div
          className="p-7 text-white rounded-b-[2rem] shadow-sm mb-6 -mx-0"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="flex items-center gap-5">
            {photo?.src && (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/60 shadow-md shrink-0">
                <img src={photo.src} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <EditableText
                  value={name.givenName}
                  onChange={(val) => updateName({ givenName: val })}
                  placeholder="First Name"
                />
                <EditableText
                  value={name.familyName}
                  onChange={(val) => updateName({ familyName: val })}
                  placeholder="Last Name"
                />
              </h1>
              <p className="text-xs uppercase tracking-wider text-white/90 font-medium mt-0.5">
                <EditableText
                  value={title}
                  onChange={(val) => updateTitle(val)}
                  placeholder="Job Title"
                />
              </p>
              {summary && (
                <EditableText
                  value={summary}
                  onChange={(val) => updateSummary(val)}
                  className="text-[10px] text-white/80 mt-1.5 leading-relaxed block"
                  multiline
                />
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10.5px] text-white/80">
                <EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" />
                <EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" />
                <EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 grid gap-6" style={{ gridTemplateColumns: '62% 38%' }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'pill'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'pill'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 8. Functional Template
  if (template === 'functional') {
    return (
      <div className="grid h-full" style={{ gridTemplateColumns: '32% 68%' }}>
        <div className="p-6 text-white space-y-5" style={{ backgroundColor: theme.primary }}>
          {photo?.src && (
            <div className="flex justify-center">
              <img
                src={photo.src}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-white/50 shadow-md"
              />
            </div>
          )}
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight flex justify-center items-center gap-1.5">
              <EditableText
                value={name.givenName}
                onChange={(val) => updateName({ givenName: val })}
                placeholder="First"
              />
              <EditableText
                value={name.familyName}
                onChange={(val) => updateName({ familyName: val })}
                placeholder="Last"
              />
            </h1>
            <p className="text-[11px] opacity-90 font-medium tracking-wide mt-0.5">
              <EditableText
                value={title}
                onChange={(val) => updateTitle(val)}
                placeholder="Job Title"
              />
            </p>
          </div>
          
          <div className="border-t border-white/20 pt-4 space-y-2 text-[10px] opacity-90">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-white">Contact</h4>
            <div><EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" /></div>
            <div><EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" /></div>
            <div><EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" /></div>
          </div>

          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'clean'))}
            {renderAddSectionButton('left')}
          </div>
        </div>

        <div className="p-7 space-y-4">
          {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'underline'))}
          {renderAddSectionButton('right')}
        </div>
      </div>
    );
  }

  // 9. College Template
  if (template === 'college') {
    return (
      <div className="p-8">
        <div className="border-b-2 pb-4 mb-6" style={{ borderColor: theme.primary }}>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-2 py-0.5 rounded-sm">
                Student & Graduate Format
              </span>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1 flex items-center gap-2">
                <EditableText
                  value={name.givenName}
                  onChange={(val) => updateName({ givenName: val })}
                  placeholder="First Name"
                />
                <EditableText
                  value={name.familyName}
                  onChange={(val) => updateName({ familyName: val })}
                  placeholder="Last Name"
                  style={{ color: theme.primary }}
                />
              </h1>
              <p className="text-xs uppercase font-semibold text-slate-500">
                <EditableText
                  value={title}
                  onChange={(val) => updateTitle(val)}
                  placeholder="Job Title"
                />
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-600">
                <EditableText value={contact.email} onChange={(val) => updateContact({ email: val })} placeholder="Email" />
                <EditableText value={contact.phone} onChange={(val) => updateContact({ phone: val })} placeholder="Phone" />
                <EditableText value={contact.city || ''} onChange={(val) => updateContact({ city: val })} placeholder="City" />
              </div>
            </div>
            {photo?.src && (
              <img src={photo.src} alt="Profile" className="w-20 h-20 rounded-xl object-cover border border-slate-200" />
            )}
          </div>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'underline'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'underline'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 10. Hybrid Template
  if (template === 'hybrid') {
    return (
      <div className="p-8">
        <HeaderBlock document={doc} theme={theme} variant="hero-banner" />
        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'pill'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'pill'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 11. IT Specialist & Tech Engineer
  if (template === 'it' || template === 'tech') {
    return (
      <div className="p-8">
        <HeaderBlock document={doc} theme={theme} variant="inline" />
        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'left-bar'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'left-bar'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 12. Executive Template
  if (template === 'executive') {
    return (
      <div className="p-8">
        <HeaderBlock document={doc} theme={theme} variant="inline" />
        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'left-bar'))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'left-bar'))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 13. Skill-Based & Combined
  if (template === 'skill-based' || template === 'combined') {
    return (
      <div className="p-8">
        <HeaderBlock document={doc} theme={theme} variant="inline" />
        <div className="grid gap-6" style={{ gridTemplateColumns }}>
          <div className="space-y-4">
            {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'banner', { skillsDecoration: 'highlight' }))}
            {renderAddSectionButton('left')}
          </div>
          <div className="space-y-4">
            {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'banner', { skillsDecoration: 'highlight' }))}
            {renderAddSectionButton('right')}
          </div>
        </div>
      </div>
    );
  }

  // 14. Professional & Default
  return (
    <div className="p-8">
      <HeaderBlock document={doc} theme={theme} variant="inline" />
      <div className="grid gap-6" style={{ gridTemplateColumns }}>
        <div className="space-y-4">
          {leftSections.map((sec, i) => renderSection(sec, 'left', i, leftSections.length, 'underline'))}
          {renderAddSectionButton('left')}
        </div>
        <div className="space-y-4">
          {rightSections.map((sec, i) => renderSection(sec, 'right', i, rightSections.length, 'underline'))}
          {renderAddSectionButton('right')}
        </div>
      </div>
    </div>
  );
};
