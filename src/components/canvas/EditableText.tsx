import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
  autoFocus?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  placeholder = 'Click to edit...',
  className = '',
  style,
  multiline = false,
  autoFocus = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value || '';
    }
  }, [value]);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
      // place cursor at end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [autoFocus]);

  const handleBlur = () => {
    if (ref.current) {
      const text = ref.current.textContent || '';
      if (text !== value) {
        onChange(text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder}
      className={`hover:bg-teal-50/50 focus:bg-white focus:outline-teal-500 focus:outline-1 rounded-xs transition-colors cursor-text inline-block min-w-[20px] empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:italic ${className}`}
      style={style}
    >
      {value}
    </span>
  );
};
