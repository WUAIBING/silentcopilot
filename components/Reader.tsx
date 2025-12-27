
import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, User, Quote, Terminal, MessageSquare, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { Chapter } from '../types';
import { publicAssetUrl } from '../assetUrl';

interface ReaderProps {
  chapter: Chapter;
  index: number;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const Reader: React.FC<ReaderProps> = ({ chapter, index, onNavigate, hasPrev = true, hasNext = true }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 500;
      setShowScrollTop(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!chapter) return null;

  // Simple formatting for chapters >= 15
  const renderSimpleText = (text: string | null) => {
    if (!text) return null;
    return text.split('\n').map((para, i) => {
      const trimmed = para.trim();
      if (!trimmed) return <div key={i} className="h-4" />;
      return <p key={i} className="mb-6 last:mb-0 text-gray-300 leading-relaxed">{trimmed}</p>;
    });
  };

  // Formatting function to highlight AI responses and Human prompts for chapters 1-14
  const formatText = (text: string | null) => {
    if (!text) return null;

    const aiNames = ['ChatGPT', 'Kimi', 'Claude', 'DeepSeek', '通义千问', '文心一言'];
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    let currentAiBlock: { name: string, lines: string[] } | null = null;
    let currentHumanLines: string[] = [];

    const flushHuman = (keyPrefix: string) => {
      if (currentHumanLines.length > 0) {
        elements.push(
          <div key={`human-${keyPrefix}`} className="mb-12 group">
            <div className="flex items-center gap-2 text-gray-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest">Human Input</span>
            </div>
            <div className="space-y-4 border-l-2 border-gray-800 pl-6 py-1">
              {currentHumanLines.map((line, i) => (
                <p key={i} className="text-gray-300 leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
        );
        currentHumanLines = [];
      }
    };

    const flushAi = (keyPrefix: string) => {
      if (currentAiBlock) {
        elements.push(
          <div key={`ai-${keyPrefix}`} className="mb-12 group">
            <div className="flex items-center gap-2 text-amber-400/70 mb-4 group-hover:text-amber-400 transition-colors">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest">{currentAiBlock.name} Response</span>
            </div>
            <div className="bg-red-950/20 border border-amber-500/20 rounded-2xl p-6 md:p-8 shadow-inner">
              <div className="space-y-4">
                {currentAiBlock.lines.map((line, i) => (
                  <p key={i} className="text-amber-50/90 leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
          </div>
        );
        currentAiBlock = null;
      }
    };

    lines.forEach((line, i) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      const matchedAiName = aiNames.find(name => trimmedLine === name || trimmedLine.startsWith(name + ':') || trimmedLine.startsWith(name + ' '));

      if (matchedAiName) {
        flushHuman(i.toString());
        flushAi(i.toString());
        currentAiBlock = { name: matchedAiName, lines: [] };
        // If the line has more than just the name (e.g., "ChatGPT: Hello"), add the rest to lines
        const rest = trimmedLine.slice(matchedAiName.length).replace(/^[:\s]+/, '');
        if (rest) currentAiBlock.lines.push(rest);
      } else {
        if (currentAiBlock) {
          // If the next line is an AI name, this current line is likely the human prompt
          const nextLine = lines[i + 1]?.trim();
          const nextIsAi = nextLine && aiNames.some(name => nextLine === name || nextLine.startsWith(name + ':') || nextLine.startsWith(name + ' '));

          if (nextIsAi) {
            flushAi(i.toString());
            currentHumanLines.push(line);
          } else {
            currentAiBlock.lines.push(line);
          }
        } else {
          currentHumanLines.push(line);
        }
      }
    });

    flushHuman('final');
    flushAi('final');

    return elements;
  };

  return (
    <div className="bg-[#070203] px-6 py-12 md:p-12 lg:p-20 min-h-full pb-40">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-amber-300 mb-6 font-mono tracking-widest">
            <span className="px-2 py-1 bg-red-500/10 rounded">CHAPTER {index}</span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
            <span className="text-gray-500">{chapter["written date"]}</span>
            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <User className="w-3.5 h-3.5" />
              {chapter.author || "吴师傅"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
            {chapter.title}
          </h1>
          <div className="h-1 w-20 bg-amber-400 rounded-full mb-12"></div>
        </header>

        <article className="story-content text-lg md:text-xl text-gray-200 antialiased leading-relaxed">
          {index >= 15 ? renderSimpleText(chapter.text) : formatText(chapter.text)}
        </article>

        {/* Navigation buttons */}
        {onNavigate && (hasPrev || hasNext) && (
          <div className="mt-16 flex items-center justify-between gap-4">
            <button
              onClick={() => hasPrev && onNavigate('prev')}
              disabled={!hasPrev}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${hasPrev
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50'
                : 'bg-gray-800/30 border-gray-800 text-gray-600 cursor-not-allowed'
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Previous Chapter</span>
            </button>
            <button
              onClick={() => hasNext && onNavigate('next')}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${hasNext
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50'
                : 'bg-gray-800/30 border-gray-800 text-gray-600 cursor-not-allowed'
                }`}
            >
              <span className="font-medium">Next Chapter</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <footer className="mt-24 pb-20 border-t border-gray-800">
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-xl shadow-amber-500/10">
                <img
                  src={publicAssetUrl('qrcode.jpg')}
                  alt="沉默的副驾 公众号"
                  className="w-24 h-24 md:w-28 md:h-28 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 items-center">
                <p className="whitespace-nowrap text-white font-medium text-xs md:text-sm tracking-[0.1em] text-center opacity-90">
                  沉默的副驾 吴师傅
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right opacity-40">
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-[0.2em]">
                END OF ARCHIVE
              </p>
              <p className="text-gray-600 text-[9px] font-mono">
                REF_ID: ARCHIVE_{String(index).padStart(3, '0')}
              </p>
            </div>
          </div>
        </footer>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full shadow-2xl shadow-amber-500/20 hover:bg-amber-500/30 hover:border-amber-500/60 transition-all duration-300 z-50 group backdrop-blur-sm"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Reader;
