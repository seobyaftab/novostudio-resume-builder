import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { calculateSpaceOptimization, OptimizationResult } from '../../engine/spaceOptimizer';
import { X, Sliders, CheckCircle } from 'lucide-react';

export const SpaceOptimizerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { document: doc, updateDocument } = useResumeStore();
  const [applied, setApplied] = useState(false);

  const optimization: OptimizationResult = calculateSpaceOptimization(doc, 1);

  const handleApply = () => {
    updateDocument((draft) => {
      if (optimization.configPatch.font) {
        draft.config.font = { ...draft.config.font, ...optimization.configPatch.font };
      }
      if (optimization.configPatch.format) {
        draft.config.format = { ...draft.config.format, ...optimization.configPatch.format };
      }
      if (optimization.configPatch.layout) {
        draft.config.layout = { ...draft.config.layout, ...optimization.configPatch.layout };
      }
    });
    setApplied(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <Sliders size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">SpaceOptimizer™ Auto-Fit</h2>
              <p className="text-xs text-slate-500">Intelligently compact content onto exactly 1 page</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            The SpaceOptimizer simulates typography scale matrices, grid line-heights, and margin permutations to ensure your resume fits seamlessly without awkward overflow or cut-off sentences.
          </p>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Proposed Optimizations
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {optimization.reductionsApplied.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={applied}
              className="px-5 py-2 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 flex items-center gap-1.5 shadow-sm transition-all"
            >
              {applied ? (
                <>
                  <CheckCircle size={14} /> Applied!
                </>
              ) : (
                'Apply 1-Page Auto-Fit'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
