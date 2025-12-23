
import React from 'react';
import { ExternalLink, Clock, User, Quote, Terminal, MessageSquare } from 'lucide-react';
import { Chapter } from '../types';

interface ReaderProps {
  chapter: Chapter;
  index: number;
}

const Reader: React.FC<ReaderProps> = ({ chapter, index }) => {
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
            <div className="flex items-center gap-2 text-blue-500/60 mb-4 group-hover:text-blue-500 transition-colors">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest">{currentAiBlock.name} Response</span>
            </div>
            <div className="bg-blue-950/20 border border-blue-900/30 rounded-2xl p-6 md:p-8 shadow-inner">
              <div className="space-y-4">
                {currentAiBlock.lines.map((line, i) => (
                  <p key={i} className="text-blue-100/90 leading-relaxed">{line}</p>
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
    <div className="bg-gray-950 px-6 py-12 md:p-12 lg:p-20 min-h-full pb-40">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-500 mb-6 font-mono tracking-widest">
            <span className="px-2 py-1 bg-blue-500/10 rounded">CHAPTER {index}</span>
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
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
          <div className="h-1 w-20 bg-blue-600 rounded-full mb-12"></div>
        </header>

        <article className="story-content text-lg md:text-xl text-gray-200 antialiased leading-relaxed">
          {index >= 15 ? renderSimpleText(chapter.text) : formatText(chapter.text)}
        </article>

        <footer className="mt-24 pb-20 border-t border-gray-800">
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-xl shadow-blue-500/10">
                <img 
                  src="/qrcode.jpg" 
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
      </div>
    </div>
  );
};

export default Reader;
