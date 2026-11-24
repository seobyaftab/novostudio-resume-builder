import React, { useRef, useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { COLOR_THEMES } from '../../engine/themeEngine';
import { FontFamily, FontSize } from '../../types/resume';
import { exportDirectPdf } from '../../engine/pdfExport';
import {
  Undo2,
  Redo2,
  Download,
  Loader2,
  Layout,
  Palette,
  Type,
  Sliders,
  CheckCircle2,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Upload,
  FileCode,
} from 'lucide-react';

const FONTS: FontFamily[] = [
  'Ubuntu',
  'Roboto',
  'Montserrat',
  'Merriweather',
  'Nunito',
  'Raleway',
  'Open Sans',
  'Overpass',
  'Quicksand',
  'Inter',
];

const FONT_SIZES: FontSize[] = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL'];

export const TopNavbar: React.FC = () => {
  const {
    document: doc,
    undo,
    redo,
    canUndo,
    canRedo,
    scaleFactor,
    setScaleFactor,
    setActiveSidePanel,
    setColorTheme,
    setFontFamily,
    setFontSize,
    setBalancer,
    exportToJson,
    loadFromJson,
  } = useResumeStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const fileName = `${doc.data.name.givenName || 'My'}_${doc.data.name.familyName || 'Resume'}_Resume`;
      await exportDirectPdf(fileName);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleExportJson = () => {
    const json = exportToJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${doc.data.name.givenName || 'Resume'}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        loadFromJson(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-xs no-print select-none">
      {/* Brand & Document Name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 tracking-tight text-sm">
          <div className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs font-black">
            N
          </div>
          <span>NovoStudio</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 ml-1">
            100% Free
          </span>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center border-l border-slate-200 pl-3 gap-1">
          <button
            disabled={!canUndo()}
            onClick={undo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Undo2 size={15} />
          </button>
          <button
            disabled={!canRedo()}
            onClick={redo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Redo2 size={15} />
          </button>
        </div>
      </div>

      {/* Center Toolbelt */}
      <div className="flex items-center gap-2">
        {/* Template Button */}
        <button
          onClick={() => setActiveSidePanel('templates')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-teal-500 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
        >
          <Layout size={13} className="text-teal-600" />
          <span className="capitalize">{doc.config.template}</span>
        </button>

        {/* Color Palette dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-teal-500 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            <Palette size={13} className="text-teal-600" />
            <div
              className="w-3.5 h-3.5 rounded-full border border-black/10"
              style={{ backgroundColor: COLOR_THEMES[doc.config.theme.colors]?.primary || '#0d9488' }}
            />
          </button>
          <div className="hidden group-hover:grid grid-cols-4 gap-1.5 p-3 absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl w-48 z-50">
            {Object.values(COLOR_THEMES).map((th) => (
              <button
                key={th.id}
                onClick={() => setColorTheme(th.id)}
                title={th.name}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                  doc.config.theme.colors === th.id ? 'border-slate-800 ring-2 ring-teal-400' : 'border-transparent'
                }`}
                style={{ backgroundColor: th.primary }}
              />
            ))}
          </div>
        </div>

        {/* Font Family Selector */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50/70">
          <Type size={13} className="text-slate-500" />
          <select
            value={doc.config.font.family}
            onChange={(e) => setFontFamily(e.target.value as FontFamily)}
            className="text-xs font-medium text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size Selector */}
        <select
          value={doc.config.font.size}
          onChange={(e) => setFontSize(e.target.value as FontSize)}
          className="text-xs font-medium text-slate-700 bg-slate-50/70 px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden cursor-pointer"
          title="Font Scaling"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              Font: {s}
            </option>
          ))}
        </select>

        {/* Column Balancer Slider */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50/70 text-xs" title="Adjust Column Width Ratio">
          <Sliders size={12} className="text-slate-500" />
          <span className="text-[10px] font-bold text-slate-400">Balance:</span>
          <input
            type="range"
            min="-5"
            max="5"
            step="1"
            value={doc.config.layout.sideBalancer}
            onChange={(e) => setBalancer(parseInt(e.target.value))}
            className="w-16 h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>

        {/* SpaceOptimizer Button */}
        <button
          onClick={() => setActiveSidePanel('spaceOptimizer')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 text-xs font-bold transition-all shadow-2xs"
          title="Auto-compact resume onto 1 page"
        >
          <Sliders size={12} /> Auto-Fit (1 Page)
        </button>

        {/* ATS Checker Button */}
        <button
          onClick={() => setActiveSidePanel('atsChecker')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-all shadow-2xs"
        >
          <CheckCircle2 size={12} /> ATS Scan
        </button>

        {/* AI Assistant Button */}
        <button
          onClick={() => setActiveSidePanel('aiAssistant')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-xs font-bold transition-all shadow-2xs"
        >
          <Sparkles size={12} /> AI Tools
        </button>
      </div>

      {/* Right Controls: Zoom & Export */}
      <div className="flex items-center gap-2">
        {/* Zoom Controls */}
        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-slate-600">
          <button
            onClick={() => setScaleFactor(Math.max(0.5, scaleFactor - 0.1))}
            className="p-1 hover:bg-white rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>
          <span className="text-[10px] font-mono font-bold px-1.5 w-11 text-center">
            {Math.round(scaleFactor * 100)}%
          </span>
          <button
            onClick={() => setScaleFactor(Math.min(1.5, scaleFactor + 0.1))}
            className="p-1 hover:bg-white rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={13} />
          </button>
        </div>

        {/* JSON Import / Export */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileImport}
          accept=".json,application/json"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Import Resume JSON"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
        >
          <Upload size={14} />
        </button>
        <button
          onClick={handleExportJson}
          title="Export Resume JSON"
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
        >
          <FileCode size={14} />
        </button>

        {/* Direct PDF File Download Button (No Print Dialog) */}
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-bold shadow-sm transition-all ${
            isDownloading
              ? 'bg-teal-400 cursor-wait'
              : 'bg-teal-600 hover:bg-teal-700 cursor-pointer hover:shadow'
          }`}
          title="Directly download PDF file without opening print dialog"
        >
          {isDownloading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Generating PDF...
            </>
          ) : (
            <>
              <Download size={14} /> Download PDF
            </>
          )}
        </button>
      </div>
    </header>
  );
};
