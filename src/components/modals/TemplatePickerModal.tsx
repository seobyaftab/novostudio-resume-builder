import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { TemplateId } from '../../types/resume';
import { X, Check, Star, Search } from 'lucide-react';

interface TemplateOption {
  id: TemplateId;
  name: string;
  category: 'Clean' | 'Modern' | 'Executive' | 'Tech' | 'Creative';
  description: string;
  isProOnNovoresume: boolean;
  image: string;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'basic',
    name: 'Basic',
    category: 'Clean',
    description: 'Classic minimal structure with clean line dividers',
    isProOnNovoresume: false,
    image: '/templates/basic.png',
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Creative',
    description: 'Modern asymmetric layout with vibrant accents',
    isProOnNovoresume: false,
    image: '/templates/creative.png',
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Modern',
    description: 'Dual-column balanced grid with dot ratings',
    isProOnNovoresume: false,
    image: '/templates/modern.png',
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'Executive',
    description: 'Authoritative styling tailored for leadership',
    isProOnNovoresume: false,
    image: '/templates/executive.png',
  },
  {
    id: 'simple',
    name: 'Simple',
    category: 'Clean',
    description: 'Understated elegance and maximum ATS clarity',
    isProOnNovoresume: false,
    image: '/templates/simple.png',
  },
  {
    id: 'functional',
    name: 'Functional',
    category: 'Modern',
    description: 'Distinct colored sidebar rail highlighting skills',
    isProOnNovoresume: false,
    image: '/templates/functional.png',
  },
  {
    id: 'professional',
    name: 'Professional',
    category: 'Executive',
    description: 'Corporate standard two-column architecture',
    isProOnNovoresume: false,
    image: '/templates/professional.png',
  },
  {
    id: 'college',
    name: 'College',
    category: 'Clean',
    description: 'Education-forward layout for students & graduates',
    isProOnNovoresume: false,
    image: '/templates/college.png',
  },
  // Unlocked Pro templates
  {
    id: 'hybrid',
    name: 'Hybrid',
    category: 'Executive',
    description: 'Full-width rich hero header banner with 60/40 split',
    isProOnNovoresume: true,
    image: '/templates/hybrid.png',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Clean',
    description: 'Centered typography with soft pill tags',
    isProOnNovoresume: true,
    image: '/templates/minimalist.png',
  },
  {
    id: 'traditional',
    name: 'Traditional',
    category: 'Executive',
    description: 'Editorial serif typography with dark contrast bar',
    isProOnNovoresume: true,
    image: '/templates/traditional.png',
  },
  {
    id: 'general',
    name: 'General',
    category: 'Modern',
    description: 'Top curved accent banner with right sidebar rail',
    isProOnNovoresume: true,
    image: '/templates/general.png',
  },
  {
    id: 'it',
    name: 'IT Specialist',
    category: 'Tech',
    description: 'Categorized technical matrices and code accents',
    isProOnNovoresume: true,
    image: '/templates/it.png',
  },
  {
    id: 'tech',
    name: 'Tech Engineer',
    category: 'Tech',
    description: 'High-density developer skills and GitHub highlights',
    isProOnNovoresume: true,
    image: '/templates/tech.png',
  },
  {
    id: 'skill-based',
    name: 'Skill-Based',
    category: 'Modern',
    description: 'Front-and-center technical skills showcase',
    isProOnNovoresume: true,
    image: '/templates/skill-based.png',
  },
  {
    id: 'combined',
    name: 'Combined',
    category: 'Clean',
    description: 'Blended chronological history and core proficiencies',
    isProOnNovoresume: true,
    image: '/templates/combined.png',
  },
];

export const TemplatePickerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { document: doc, setTemplate } = useResumeStore();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/90">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Choose Resume Template</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                All 16 Unlocked & Free
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any layout below to immediately apply its custom visual architecture, typography, and section order
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Template Grid with 100% Authentic Preview Images */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-slate-100/60">
          {TEMPLATES.map((tpl) => {
            const isSelected = doc.config.template === tpl.id;
            return (
              <div key={tpl.id} className="relative flex flex-col">
                {/* Pro Star Badge above card */}
                {tpl.isProOnNovoresume && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md border-2 border-white">
                      <Star size={12} fill="white" />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setTemplate(tpl.id);
                    onClose();
                  }}
                  className={`text-left rounded-2xl transition-all flex flex-col relative group cursor-pointer overflow-hidden bg-white ${
                    isSelected
                      ? 'ring-3 ring-teal-600 shadow-xl border-transparent scale-[1.01]'
                      : 'border border-slate-200/90 hover:border-teal-500 hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {/* A4 Preview Container */}
                  <div className="relative aspect-[1/1.414] w-full bg-slate-50 overflow-hidden border-b border-slate-100 p-2">
                    <img
                      src={tpl.image}
                      alt={`${tpl.name} Template Preview`}
                      className="w-full h-full object-contain rounded-sm transition-transform duration-300 group-hover:scale-102"
                      loading="lazy"
                    />

                    {/* Active Checkmark Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-teal-700/20 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in duration-150">
                          <Check size={14} /> Active
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Label Footer */}
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                        {tpl.name}
                      </span>
                      {tpl.isProOnNovoresume ? (
                        <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                          Pro Unlocked
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold text-slate-400 uppercase">
                          Free
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Resume Template
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
