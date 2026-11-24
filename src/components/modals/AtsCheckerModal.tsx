import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { runAtsAnalysis, AtsReport } from '../../engine/atsEngine';
import { X, CheckCircle2, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

export const AtsCheckerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { document: doc } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');
  const [report, setReport] = useState<AtsReport | null>(null);

  const handleScan = () => {
    if (!jobDescription.trim()) return;
    const res = runAtsAnalysis(doc, jobDescription);
    setReport(res);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              ATS
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Applicant Tracking System (ATS) Checker</h2>
              <p className="text-xs text-slate-500">Free client-side scan against Taleo, Workday & Greenhouse parser benchmarks</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {!report ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Paste Target Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job requirements, qualifications, and role description here to check your resume's keyword match and ATS score..."
                  className="w-full h-48 p-3 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono resize-none leading-relaxed"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Minimum 50 characters</span>
                  <span>{jobDescription.length} characters</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  disabled={jobDescription.trim().length < 50}
                  onClick={handleScan}
                  className="px-5 py-2.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles size={14} /> Run Free ATS Scan
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score Header Card */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold border-4 ${
                      report.overallScore >= 80
                        ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                        : report.overallScore >= 65
                        ? 'border-teal-500 text-teal-700 bg-teal-50'
                        : report.overallScore >= 50
                        ? 'border-amber-500 text-amber-700 bg-amber-50'
                        : 'border-rose-500 text-rose-700 bg-rose-50'
                    }`}
                  >
                    <span className="text-xl leading-none">{report.overallScore}</span>
                    <span className="text-[9px] uppercase tracking-tighter opacity-70">/ 100</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{report.tierLabel}</h3>
                      {report.overallScore >= 70 ? (
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      ) : (
                        <AlertTriangle size={16} className="text-amber-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Evaluated across 5 core dimensions against job description
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setReport(null)}
                  className="px-3 py-1.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-200 border border-slate-300"
                >
                  New Scan
                </button>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Evaluation Dimensions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {report.categories.map((cat) => (
                    <div key={cat.key} className="p-3.5 rounded-lg border border-slate-200 bg-white">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-bold text-slate-800">{cat.name}</span>
                        <span className="text-xs font-bold text-slate-600">{cat.score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="h-full rounded-full bg-teal-600"
                          style={{ width: `${cat.score}%` }}
                        />
                      </div>
                      <p className="text-[10.5px] text-slate-500">{cat.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Matched Keywords ({report.matchedKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {report.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-800">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-200">
                  <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle size={13} /> Missing Keywords ({report.missingKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {report.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-100 text-rose-800">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Actionable Recommendations
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {report.actionableFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
