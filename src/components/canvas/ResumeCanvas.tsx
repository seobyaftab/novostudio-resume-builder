import React, { useRef } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { TemplateRenderer } from '../../templates/TemplateRenderer';
import { getFontClass, getFontSizeConfig } from '../../engine/themeEngine';

export const ResumeCanvas: React.FC = () => {
  const { document: doc, scaleFactor } = useResumeStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const fontClass = getFontClass(doc.config.font.family);
  const fontSizes = getFontSizeConfig(doc.config.font.size);

  return (
    <div className="flex-1 overflow-auto p-8 flex justify-center items-start bg-slate-200/70 min-h-screen">
      <div
        className="transition-transform duration-150 origin-top flex flex-col items-center"
        style={{ transform: `scale(${scaleFactor})` }}
      >
        {/* A4 Sheet Container: Standard 210mm x 297mm (794px x 1123px) */}
        <div
          ref={canvasRef}
          id="resume-a4-sheet"
          className={`print-page bg-white shadow-2xl rounded-sm w-[794px] min-h-[1123px] relative ${fontClass} ${fontSizes.body} text-slate-800`}
        >
          {/* Main template rendering */}
          <TemplateRenderer document={doc} />

          {/* Page Footer indicator */}
          {doc.config.format.footer.showPageNumber && (
            <div className="absolute bottom-4 right-8 text-[9.5px] text-slate-400 no-print">
              Page 1 of 1
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
