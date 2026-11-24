import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import {
  X,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  FolderGit2,
  Award,
  FileText,
  Heart,
  Cpu,
  Layers,
  Check,
} from 'lucide-react';

interface SectionOption {
  key: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const AVAILABLE_SECTIONS: SectionOption[] = [
  {
    key: 'work',
    name: 'Work Experience',
    description: 'Chronological employment history, achievements, and responsibilities',
    icon: <Briefcase size={16} className="text-teal-600" />,
  },
  {
    key: 'education',
    name: 'Education',
    description: 'Degrees, colleges, universities, GPA, and graduation dates',
    icon: <GraduationCap size={16} className="text-blue-600" />,
  },
  {
    key: 'skills',
    name: 'Core Skills',
    description: 'Key domain capabilities, methodologies, and competencies',
    icon: <Wrench size={16} className="text-emerald-600" />,
  },
  {
    key: 'technicalSkills',
    name: 'Technical & Stack Skills',
    description: 'Programming languages, frameworks, cloud platforms, and tooling',
    icon: <Cpu size={16} className="text-cyan-600" />,
  },
  {
    key: 'softSkills',
    name: 'Soft Skills',
    description: 'Interpersonal strengths, leadership, communication, and collaboration',
    icon: <Layers size={16} className="text-amber-600" />,
  },
  {
    key: 'languages',
    name: 'Languages',
    description: 'Spoken languages with native, fluent, or dot-rated proficiency levels',
    icon: <Languages size={16} className="text-indigo-600" />,
  },
  {
    key: 'projects',
    name: 'Personal Projects',
    description: 'Portfolio work, open-source repositories, and technical initiatives',
    icon: <FolderGit2 size={16} className="text-purple-600" />,
  },
  {
    key: 'certificates',
    name: 'Certificates & Licenses',
    description: 'Professional credentials, AWS/Azure certs, and official accreditations',
    icon: <Award size={16} className="text-rose-600" />,
  },
  {
    key: 'awards',
    name: 'Honors & Awards',
    description: 'Academic honors, hackathon victories, and industry distinctions',
    icon: <Award size={16} className="text-yellow-600" />,
  },
  {
    key: 'interests',
    name: 'Interests & Activities',
    description: 'Personal hobbies, volunteer work, and extracurricular pursuits',
    icon: <Heart size={16} className="text-pink-600" />,
  },
  {
    key: 'summary',
    name: 'Professional Summary',
    description: 'Concise executive elevator pitch highlighting career trajectory',
    icon: <FileText size={16} className="text-slate-600" />,
  },
];

export const AddSectionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { document: doc, addSection, addSectionTarget } = useResumeStore();
  const [selectedCol, setSelectedCol] = useState<'left' | 'right'>(
    addSectionTarget?.column || 'left'
  );

  const existingInLeft = doc.config.layout.columns?.left || [];
  const existingInRight = doc.config.layout.columns?.right || [];
  const allActive = [...existingInLeft, ...existingInRight];

  const handleAdd = (sectionKey: string) => {
    addSection(sectionKey, selectedCol, addSectionTarget?.insertAfter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add Resume Section</h2>
            <p className="text-xs text-slate-500">
              {addSectionTarget?.insertAfter
                ? `Inserting below: ${addSectionTarget.insertAfter}`
                : 'Select a section and choose which column to place it in'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Column Target Selector */}
        <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">Target Column:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCol('left')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCol === 'left'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Left Column (Main)
            </button>
            <button
              onClick={() => setSelectedCol('right')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCol === 'right'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Right Column (Sidebar)
            </button>
          </div>
        </div>

        {/* Section Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AVAILABLE_SECTIONS.map((sec) => {
            const isAlreadyActive = allActive.includes(sec.key);
            return (
              <button
                key={sec.key}
                onClick={() => handleAdd(sec.key)}
                className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 relative group hover:border-teal-500 hover:shadow-xs ${
                  isAlreadyActive
                    ? 'border-slate-200 bg-slate-50/70 hover:bg-white'
                    : 'border-slate-200 bg-white hover:bg-teal-50/20'
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-teal-100/60 shrink-0">
                  {sec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700">
                      {sec.name}
                    </span>
                    {isAlreadyActive && (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                    {sec.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
