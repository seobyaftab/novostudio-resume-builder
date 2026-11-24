import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { generateSmartSummary, rewriteBulletToXyz } from '../../engine/aiAssistant';
import { X, Sparkles, Wand2, Check } from 'lucide-react';

export const AiAssistantModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { document: doc, updateSummary, updateDocument } = useResumeStore();
  const [activeTab, setActiveTab] = useState<'summary' | 'bullet'>('summary');
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [rawBullet, setRawBullet] = useState('');
  const [enhancedBullet, setEnhancedBullet] = useState<{ original: string; enhanced: string; explanation: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateSummary = () => {
    const sum = generateSmartSummary(doc);
    setGeneratedSummary(sum);
  };

  const handleApplySummary = () => {
    if (generatedSummary) {
      updateSummary(generatedSummary);
      onClose();
    }
  };

  const handleEnhanceBullet = () => {
    if (!rawBullet.trim()) return;
    const res = rewriteBulletToXyz(rawBullet);
    setEnhancedBullet(res);
  };

  const handleAddBulletToTopJob = () => {
    if (!enhancedBullet) return;
    updateDocument((draft) => {
      if (draft.data.work.length > 0) {
        draft.data.work[0].bullets.push(enhancedBullet.enhanced);
      }
    });
    setCopied(true);
    setTimeout(() => onClose(), 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">AI Career Assistant</h2>
              <p className="text-xs text-slate-500">Heuristic & model-assisted resume writing tools</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200">
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 p-1 gap-1">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'summary' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Summary Generator
          </button>
          <button
            onClick={() => setActiveTab('bullet')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'bullet' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Google XYZ Bullet Rewriter
          </button>
        </div>

        <div className="p-6 space-y-4">
          {activeTab === 'summary' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically drafts a punchy, executive summary synthesizing your current job title ({doc.data.title}), total years of work experience, and top core competencies.
              </p>

              {!generatedSummary ? (
                <div className="flex justify-center py-6">
                  <button
                    onClick={handleGenerateSummary}
                    className="px-5 py-2.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Wand2 size={14} /> Generate Professional Summary
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Generated Draft</h4>
                    <p className="text-xs text-slate-700 leading-relaxed">{generatedSummary}</p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleGenerateSummary}
                      className="px-3 py-1.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-300"
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={handleApplySummary}
                      className="px-5 py-2 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 shadow-sm"
                    >
                      Apply to Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Transforms passive or vague bullet points into the Google-recommended formula: <br />
                <span className="font-semibold text-slate-800">"Accomplished [X] as measured by [Y], by doing [Z]"</span>
              </p>

              <div>
                <input
                  type="text"
                  value={rawBullet}
                  onChange={(e) => setRawBullet(e.target.value)}
                  placeholder="e.g. Worked on optimizing database queries..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={!rawBullet.trim()}
                  onClick={handleEnhanceBullet}
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                >
                  <Wand2 size={13} /> Rewrite with Action Verbs
                </button>
              </div>

              {enhancedBullet && (
                <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-2 mt-4">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    Enhanced Impact Version
                  </div>
                  <div className="text-xs font-medium text-slate-800 leading-relaxed">
                    {enhancedBullet.enhanced}
                  </div>
                  <div className="text-[10.5px] text-emerald-700 opacity-90 border-t border-emerald-200/60 pt-1.5">
                    {enhancedBullet.explanation}
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleAddBulletToTopJob}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs"
                    >
                      {copied ? <Check size={14} /> : 'Add to Current Role'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
