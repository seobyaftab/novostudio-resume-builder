import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  FolderGit2,
  Award,
  Heart,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Layers,
  ArrowRight,
  ArrowLeft,
  FileText,
} from 'lucide-react';

const SECTION_NAMES: Record<string, string> = {
  summary: 'Professional Summary',
  work: 'Work Experience',
  education: 'Education',
  skills: 'Core Skills',
  technicalSkills: 'Technical & Stack Skills',
  softSkills: 'Soft Skills',
  languages: 'Languages',
  projects: 'Projects',
  certificates: 'Certificates & Licenses',
  awards: 'Honors & Awards',
  interests: 'Interests & Activities',
};

export const EditorSidebar: React.FC = () => {
  const {
    document: doc,
    updateName,
    updateTitle,
    updateContact,
    updateSummary,
    addWork,
    updateWork,
    removeWork,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addProject,
    updateProject,
    removeProject,
    addCertificate,
    updateCertificate,
    removeCertificate,
    moveSection,
    deleteSection,
    moveSectionToColumn,
    openAddSectionModal,
  } = useResumeStore();

  const [expandedSection, setExpandedSection] = useState<string>('structure');

  const toggleSection = (sec: string) => {
    setExpandedSection(expandedSection === sec ? '' : sec);
  };

  const leftSections = doc.config.layout.columns?.left || ['summary', 'work', 'projects'];
  const rightSections = doc.config.layout.columns?.right || ['education', 'skills', 'languages', 'certificates'];

  return (
    <aside className="w-96 bg-white border-r border-slate-200 h-[calc(100vh-3.5rem)] overflow-y-auto p-4 space-y-4 no-print text-xs text-slate-800 shrink-0">
      {/* 0. Section & Column Layout Structure Manager */}
      <div className="border border-teal-200 bg-teal-50/20 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('structure')}
          className="w-full p-3.5 bg-teal-50/80 hover:bg-teal-100/70 flex justify-between items-center font-bold text-teal-950"
        >
          <span className="flex items-center gap-2">
            <Layers size={15} className="text-teal-700" /> Sections & Layout Structure
          </span>
          {expandedSection === 'structure' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'structure' && (
          <div className="p-3.5 space-y-4 bg-white">
            {/* Left Column Sections */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wide">
                  Left Column ({leftSections.length})
                </span>
                <button
                  onClick={() => openAddSectionModal({ column: 'left' })}
                  className="text-[10px] text-teal-700 font-bold hover:underline flex items-center gap-0.5"
                >
                  <Plus size={11} /> Add
                </button>
              </div>
              <div className="space-y-1">
                {leftSections.map((sec, idx) => (
                  <div key={sec} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs hover:border-slate-300">
                    <span className="font-semibold text-slate-700 truncate max-w-[170px]">{SECTION_NAMES[sec] || sec}</span>
                    <div className="flex items-center gap-0.5">
                      <button
                        disabled={idx === 0}
                        onClick={() => moveSection(sec, 'up')}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-20"
                        title="Move Up"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        disabled={idx === leftSections.length - 1}
                        onClick={() => moveSection(sec, 'down')}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-20"
                        title="Move Down"
                      >
                        <ChevronDown size={12} />
                      </button>
                      <button
                        onClick={() => moveSectionToColumn(sec, 'right')}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500"
                        title="Move to Right Column"
                      >
                        <ArrowRight size={12} />
                      </button>
                      <button
                        onClick={() => deleteSection(sec)}
                        className="p-1 hover:bg-rose-50 rounded text-rose-500"
                        title="Delete Section"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Sections */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wide">
                  Right Column ({rightSections.length})
                </span>
                <button
                  onClick={() => openAddSectionModal({ column: 'right' })}
                  className="text-[10px] text-teal-700 font-bold hover:underline flex items-center gap-0.5"
                >
                  <Plus size={11} /> Add
                </button>
              </div>
              <div className="space-y-1">
                {rightSections.map((sec, idx) => (
                  <div key={sec} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs hover:border-slate-300">
                    <span className="font-semibold text-slate-700 truncate max-w-[170px]">{SECTION_NAMES[sec] || sec}</span>
                    <div className="flex items-center gap-0.5">
                      <button
                        disabled={idx === 0}
                        onClick={() => moveSection(sec, 'up')}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-20"
                        title="Move Up"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        disabled={idx === rightSections.length - 1}
                        onClick={() => moveSection(sec, 'down')}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-20"
                        title="Move Down"
                      >
                        <ChevronDown size={12} />
                      </button>
                      <button
                        onClick={() => moveSectionToColumn(sec, 'left')}
                        className="p-1 hover:bg-slate-200 rounded text-slate-500"
                        title="Move to Left Column"
                      >
                        <ArrowLeft size={12} />
                      </button>
                      <button
                        onClick={() => deleteSection(sec)}
                        className="p-1 hover:bg-rose-50 rounded text-rose-500"
                        title="Delete Section"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => openAddSectionModal()}
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 text-xs shadow-xs transition-colors"
            >
              <Plus size={13} /> Add New Section
            </button>
          </div>
        )}
      </div>

      {/* 1. Personal Details */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <User size={15} className="text-teal-600" /> Personal Details
          </span>
          {expandedSection === 'personal' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'personal' && (
          <div className="p-3.5 space-y-3 bg-white">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">First Name</label>
                <input
                  type="text"
                  value={doc.data.name.givenName}
                  onChange={(e) => updateName({ givenName: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Last Name</label>
                <input
                  type="text"
                  value={doc.data.name.familyName}
                  onChange={(e) => updateName({ familyName: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Job Title</label>
              <input
                type="text"
                value={doc.data.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  value={doc.data.contact.email}
                  onChange={(e) => updateContact({ email: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Phone</label>
                <input
                  type="text"
                  value={doc.data.contact.phone}
                  onChange={(e) => updateContact({ phone: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">City</label>
                <input
                  type="text"
                  value={doc.data.contact.city || ''}
                  onChange={(e) => updateContact({ city: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Country</label>
                <input
                  type="text"
                  value={doc.data.contact.country || ''}
                  onChange={(e) => updateContact({ country: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={doc.data.contact.linkedin || ''}
                onChange={(e) => updateContact({ linkedin: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">GitHub Profile</label>
              <input
                type="text"
                value={doc.data.contact.github || ''}
                onChange={(e) => updateContact({ github: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Professional Summary */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('summary')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <FileText size={15} className="text-teal-600" /> Summary
          </span>
          {expandedSection === 'summary' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'summary' && (
          <div className="p-3.5 space-y-2 bg-white">
            <textarea
              rows={4}
              value={doc.data.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs resize-none focus:ring-1 focus:ring-teal-500"
              placeholder="Elevator pitch summarizing your experience..."
            />
          </div>
        )}
      </div>

      {/* 3. Work Experience */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('work')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <Briefcase size={15} className="text-teal-600" /> Work Experience ({doc.data.work.length})
          </span>
          {expandedSection === 'work' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'work' && (
          <div className="p-3.5 space-y-3 bg-white">
            {doc.data.work.map((w) => (
              <div key={w.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 relative">
                <button
                  onClick={() => removeWork(w.id)}
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 size={13} />
                </button>
                <input
                  type="text"
                  value={w.position}
                  onChange={(e) => updateWork(w.id, { position: e.target.value })}
                  placeholder="Position"
                  className="w-full p-1.5 font-bold border border-slate-300 rounded bg-white text-xs"
                />
                <input
                  type="text"
                  value={w.company}
                  onChange={(e) => updateWork(w.id, { company: e.target.value })}
                  placeholder="Company"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={w.startDate}
                    onChange={(e) => updateWork(w.id, { startDate: e.target.value })}
                    placeholder="Start Date"
                    className="p-1.5 border border-slate-300 rounded bg-white text-[11px]"
                  />
                  <input
                    type="text"
                    value={w.endDate}
                    onChange={(e) => updateWork(w.id, { endDate: e.target.value })}
                    placeholder="End Date"
                    className="p-1.5 border border-slate-300 rounded bg-white text-[11px]"
                  />
                </div>
                <textarea
                  rows={3}
                  value={w.bullets.join('\n')}
                  onChange={(e) => updateWork(w.id, { bullets: e.target.value.split('\n') })}
                  placeholder="Achievements (one bullet per line)"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white text-[11px] resize-none"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addWork({
                  position: 'Software Engineer',
                  company: 'Company Name',
                  city: 'City',
                  startDate: '2023',
                  endDate: 'Present',
                  current: true,
                  bullets: ['Delivered core feature impacting 10k users.'],
                })
              }
              className="w-full py-2 border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-lg text-teal-700 font-bold flex items-center justify-center gap-1.5 hover:bg-teal-50"
            >
              <Plus size={14} /> Add Work Position
            </button>
          </div>
        )}
      </div>

      {/* 4. Education */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('education')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <GraduationCap size={15} className="text-teal-600" /> Education ({doc.data.education.length})
          </span>
          {expandedSection === 'education' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'education' && (
          <div className="p-3.5 space-y-3 bg-white">
            {doc.data.education.map((e) => (
              <div key={e.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 relative">
                <button
                  onClick={() => removeEducation(e.id)}
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 size={13} />
                </button>
                <input
                  type="text"
                  value={e.degree}
                  onChange={(ev) => updateEducation(e.id, { degree: ev.target.value })}
                  placeholder="Degree"
                  className="w-full p-1.5 font-bold border border-slate-300 rounded bg-white text-xs"
                />
                <input
                  type="text"
                  value={e.school}
                  onChange={(ev) => updateEducation(e.id, { school: ev.target.value })}
                  placeholder="School / University"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white text-xs"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addEducation({
                  degree: 'Bachelor of Science',
                  school: 'University',
                  city: 'City',
                  startDate: '2018',
                  endDate: '2022',
                  current: false,
                  bullets: [],
                })
              }
              className="w-full py-2 border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-lg text-teal-700 font-bold flex items-center justify-center gap-1.5 hover:bg-teal-50"
            >
              <Plus size={14} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* 5. Skills */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <Wrench size={15} className="text-teal-600" /> Skills ({doc.data.skills.length})
          </span>
          {expandedSection === 'skills' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'skills' && (
          <div className="p-3.5 space-y-2 bg-white">
            <div className="flex flex-wrap gap-1.5">
              {doc.data.skills.map((s) => (
                <div key={s.id} className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs">
                  <span>{s.name}</span>
                  <button onClick={() => removeSkill(s.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => addSkill({ name: 'New Skill', level: 85 })}
              className="w-full py-1.5 border border-slate-300 hover:border-teal-500 rounded text-slate-700 font-semibold flex items-center justify-center gap-1 hover:bg-slate-50 text-[11px]"
            >
              <Plus size={13} /> Add Skill
            </button>
          </div>
        )}
      </div>

      {/* 6. Languages */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('languages')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <Languages size={15} className="text-teal-600" /> Languages ({doc.data.languages.length})
          </span>
          {expandedSection === 'languages' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'languages' && (
          <div className="p-3.5 space-y-2 bg-white">
            {doc.data.languages.map((l) => (
              <div key={l.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={l.name}
                  onChange={(e) => updateLanguage(l.id, { name: e.target.value })}
                  className="flex-1 p-1.5 border border-slate-300 rounded text-xs"
                />
                <select
                  value={l.level}
                  onChange={(e) => updateLanguage(l.id, { level: parseInt(e.target.value) })}
                  className="p-1 border border-slate-300 rounded text-[11px]"
                >
                  <option value={5}>5 / 5 (Native)</option>
                  <option value={4}>4 / 5 (Fluent)</option>
                  <option value={3}>3 / 5 (Intermediate)</option>
                  <option value={2}>2 / 5 (Basic)</option>
                  <option value={1}>1 / 5 (Elementary)</option>
                </select>
                <button onClick={() => removeLanguage(l.id)} className="text-slate-400 hover:text-rose-600">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addLanguage({ name: 'Language', level: 4, proficiencyLabel: 'Working' })}
              className="w-full py-1.5 border border-slate-300 hover:border-teal-500 rounded text-slate-700 font-semibold flex items-center justify-center gap-1 hover:bg-slate-50 text-[11px]"
            >
              <Plus size={13} /> Add Language
            </button>
          </div>
        )}
      </div>

      {/* 7. Projects */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('proj')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <FolderGit2 size={15} className="text-teal-600" /> Projects ({doc.data.projects.length})
          </span>
          {expandedSection === 'proj' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'proj' && (
          <div className="p-3.5 space-y-3 bg-white">
            {doc.data.projects.map((p) => (
              <div key={p.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 relative">
                <button onClick={() => removeProject(p.id)} className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600">
                  <Trash2 size={13} />
                </button>
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => updateProject(p.id, { title: e.target.value })}
                  placeholder="Project Title"
                  className="w-full p-1.5 font-bold border border-slate-300 rounded bg-white text-xs"
                />
                <input
                  type="text"
                  value={p.link || ''}
                  onChange={(e) => updateProject(p.id, { link: e.target.value })}
                  placeholder="Link (e.g. github.com/user/project)"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white text-[11px]"
                />
                <textarea
                  rows={2}
                  value={p.bullets.join('\n')}
                  onChange={(e) => updateProject(p.id, { bullets: e.target.value.split('\n') })}
                  placeholder="Project details..."
                  className="w-full p-1.5 border border-slate-300 rounded bg-white text-[10.5px] resize-none"
                />
              </div>
            ))}
            <button
              onClick={() => addProject({ title: 'New Project', bullets: ['Key architecture achievement.'] })}
              className="w-full py-2 border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-lg text-teal-700 font-bold flex items-center justify-center gap-1.5 hover:bg-teal-50"
            >
              <Plus size={14} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* 8. Certificates */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => toggleSection('certs')}
          className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex justify-between items-center font-bold text-slate-800"
        >
          <span className="flex items-center gap-2">
            <Award size={15} className="text-teal-600" /> Certificates ({doc.data.certificates.length})
          </span>
          {expandedSection === 'certs' ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expandedSection === 'certs' && (
          <div className="p-3.5 space-y-3 bg-white">
            {doc.data.certificates.map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 relative">
                <button onClick={() => removeCertificate(c.id)} className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600">
                  <Trash2 size={13} />
                </button>
                <input
                  type="text"
                  value={c.title}
                  onChange={(e) => updateCertificate(c.id, { title: e.target.value })}
                  placeholder="Certificate Title"
                  className="w-full p-1.5 font-bold border border-slate-300 rounded bg-white text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={c.issuer}
                    onChange={(e) => updateCertificate(c.id, { issuer: e.target.value })}
                    placeholder="Issuer (e.g. AWS)"
                    className="p-1.5 border border-slate-300 rounded bg-white text-[11px]"
                  />
                  <input
                    type="text"
                    value={c.date}
                    onChange={(e) => updateCertificate(c.id, { date: e.target.value })}
                    placeholder="Date"
                    className="p-1.5 border border-slate-300 rounded bg-white text-[11px]"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => addCertificate({ title: 'New Certificate', issuer: 'Issuer Org', date: '2024' })}
              className="w-full py-2 border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-lg text-teal-700 font-bold flex items-center justify-center gap-1.5 hover:bg-teal-50"
            >
              <Plus size={14} /> Add Certificate
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
