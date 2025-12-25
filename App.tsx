
import React, { useState, useEffect } from 'react';
import { X, Rocket, Cpu, Github, Palette, BookOpen, Film } from 'lucide-react';
import Reader from './components/Reader';
import DesignGallery from './components/DesignGallery';
import VideoGallery from './components/VideoGallery';
import { STORY_DATA } from './constants';
import { publicAssetUrl } from './assetUrl';

const App: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<'chapters' | 'designs' | 'videos'>('chapters');
  const mainRef = React.useRef<HTMLDivElement>(null);

  // Sort chapters by latest first (reverse of STORY_DATA)
  const sortedChapters = [...STORY_DATA].reverse();

  // Reset scroll when chapter changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [selectedIdx]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx !== null) {
        if (e.key === 'ArrowUp') {
          setSelectedIdx(prev => Math.max(0, (prev || 0) - 1));
        } else if (e.key === 'ArrowDown') {
          setSelectedIdx(prev => Math.min(sortedChapters.length - 1, (prev || 0) + 1));
        } else if (e.key === 'Escape') {
          setSelectedIdx(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, sortedChapters.length]);

  return (
    <div className="flex h-screen h-[100dvh] w-full overflow-hidden bg-[#070203]">
      <header className="fixed top-0 left-0 right-0 h-16 bg-red-950/70 border-b border-red-900/40 flex items-center justify-between px-4 md:px-8 z-50 backdrop-blur">
        <button
          onClick={() => {
            setSelectedIdx(null);
            setCurrentView('chapters');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-bold text-amber-300 text-sm md:text-base tracking-tighter flex items-center gap-2 active:scale-95 transition-transform"
          title="返回首页"
        >
          沉默的副驾 SilentCopilot
        </button>

        {selectedIdx !== null ? (
          <button
            onClick={() => setSelectedIdx(null)}
            className="p-2 text-gray-300 hover:text-white rounded-lg border border-red-900/40 bg-red-950/40 hover:bg-red-900/40 transition-all"
            title="返回列表"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentView('chapters');
                setSelectedIdx(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center justify-center px-3 py-2 md:px-5 md:py-2.5 rounded-2xl border transition-all ${
                currentView === 'chapters'
                  ? 'bg-red-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.10)]'
                  : 'bg-red-950/30 text-gray-400 border-red-900/30 hover:border-amber-500/20 hover:text-gray-200'
              }`}
              title="章节"
            >
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => {
                setCurrentView('designs');
                setSelectedIdx(null);
              }}
              className={`flex items-center justify-center px-3 py-2 md:px-5 md:py-2.5 rounded-2xl border transition-all ${
                currentView === 'designs'
                  ? 'bg-red-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.10)]'
                  : 'bg-red-950/30 text-gray-400 border-red-900/30 hover:border-amber-500/20 hover:text-gray-200'
              }`}
              title="设计"
            >
              <Palette className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => {
                setCurrentView('videos');
                setSelectedIdx(null);
              }}
              className={`flex items-center justify-center px-3 py-2 md:px-5 md:py-2.5 rounded-2xl border transition-all ${
                currentView === 'videos'
                  ? 'bg-red-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.10)]'
                  : 'bg-red-950/30 text-gray-400 border-red-900/30 hover:border-amber-500/20 hover:text-gray-200'
              }`}
              title="电影"
            >
              <Film className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 pt-16 relative overflow-y-auto h-full scroll-smooth">
        {selectedIdx !== null ? (
          <div className="relative min-h-full flex flex-col">
            <Reader 
              chapter={sortedChapters[selectedIdx]} 
              index={STORY_DATA.indexOf(sortedChapters[selectedIdx]) + 1}
            />
          </div>
        ) : (
          <div className="p-6 md:p-12 lg:p-20">
            <div className="max-w-7xl mx-auto">
              {currentView === 'chapters' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {sortedChapters.map((chapter, currentIdx) => {
                    const originalIdx = STORY_DATA.indexOf(chapter);
                    return (
                      <div 
                        key={originalIdx}
                        onClick={() => setSelectedIdx(currentIdx)}
                        className="group bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-amber-500/40 hover:bg-gray-900 transition-all cursor-pointer flex flex-col h-full shadow-lg hover:shadow-amber-500/5"
                      >
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 uppercase tracking-wider font-medium">
                          <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CH {originalIdx + 1}</span>
                          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                          <span>{chapter["written date"]}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors line-clamp-2">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
                          {chapter.prologue || "No summary available for this chapter."}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                          <span className="text-xs text-gray-600 font-mono">ID: ARCHIVE_{String(originalIdx + 1).padStart(3, '0')}</span>
                          <span className="text-amber-400 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read More <Rocket className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : currentView === 'designs' ? (
                <DesignGallery />
              ) : (
                <VideoGallery />
              )}

              {/* Landing Page Footer */}
              <footer className="mt-20 py-16 border-t border-gray-800/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-900/30 rounded-3xl p-8 md:px-12 border border-gray-800/50">
                  <div className="flex flex-col items-center gap-3">
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
                  
                  <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      <div className="text-center md:text-right">
                        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">
                          © 2025 沉默的副驾 SilentCopilot
                        </p>
                        <p className="text-gray-700 text-[9px] font-mono uppercase mt-0.5">
                          AI Collaborative Archive
                        </p>
                      </div>
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-2.5 bg-gray-800/50 hover:bg-gray-700 rounded-xl text-gray-500 hover:text-white transition-all border border-gray-700/50 shadow-sm"
                        title="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}

        {/* Global Tech Stats Overlay (Aesthetic) */}
        {selectedIdx === null && (
          <div className="fixed bottom-8 right-8 hidden lg:block pointer-events-none z-10">
            <div className="bg-gray-900/80 backdrop-blur border border-gray-800 p-4 rounded-lg flex items-center gap-4 text-xs code-font shadow-2xl">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 uppercase tracking-widest">Archive Status</span>
                <span className="text-amber-300 font-bold">LATEST CHAPTER IS {sortedChapters.length}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
