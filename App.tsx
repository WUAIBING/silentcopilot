
import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Archive, Cpu, Github, Palette, LayoutGrid, BookOpen } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Reader from './components/Reader';
import DesignGallery from './components/DesignGallery';
import { STORY_DATA } from './constants';
import { publicAssetUrl } from './assetUrl';

const App: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<'chapters' | 'designs'>('chapters');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredChapters = sortedChapters.filter(chapter => 
    (chapter.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (chapter.prologue?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen h-[100dvh] w-full overflow-hidden bg-gray-950">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 z-50">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
        <button 
          onClick={() => {
            setSelectedIdx(null);
            setCurrentView('chapters');
            setSearchQuery('');
            setIsSidebarOpen(false);
          }}
          className="font-bold text-blue-400 text-sm tracking-tighter flex items-center gap-2 active:scale-95 transition-transform"
        >
          沉默的副驾 SilentCopilot
        </button>
        <div className="w-10"></div>
      </header>

      {/* Sidebar for Desktop */}
      <Sidebar 
        chapters={sortedChapters} 
        selectedIndex={selectedIdx ?? -1} 
        onSelect={(idx) => {
          setSelectedIdx(idx);
          setCurrentView('chapters');
          setIsSidebarOpen(false);
        }}
        onHomeClick={() => {
          setSelectedIdx(null);
          setCurrentView('chapters');
          setSearchQuery('');
          setIsSidebarOpen(false);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        className="w-80 h-full hidden md:flex"
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setSelectedIdx(null);
          setSearchQuery('');
          if (view === 'chapters') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div 
            className="flex-1 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="w-72 bg-gray-900 h-full shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col pt-16">
             <Sidebar 
              chapters={sortedChapters} 
              selectedIndex={selectedIdx ?? -1} 
              onSelect={(idx) => {
                setSelectedIdx(idx);
                setCurrentView('chapters');
                setIsSidebarOpen(false);
              }}
              onHomeClick={() => {
                setSelectedIdx(null);
                setCurrentView('chapters');
                setIsSidebarOpen(false);
              }}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              className="w-full flex-1"
              currentView={currentView}
              onViewChange={(view) => {
                setCurrentView(view);
                setSelectedIdx(null);
                setSearchQuery('');
                setIsSidebarOpen(false); // Close sidebar on mobile when switching view
                if (view === 'chapters') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main ref={mainRef} className="flex-1 pt-16 md:pt-0 relative overflow-y-auto h-full scroll-smooth">
        {selectedIdx !== null ? (
          <div className="relative min-h-full flex flex-col">
            <button 
              onClick={() => setSelectedIdx(null)}
              className="fixed top-[18px] right-4 z-[60] p-1.5 bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg border border-gray-700 backdrop-blur transition-all shadow-lg md:top-8 md:right-8 md:p-2 md:bg-gray-900/80 md:rounded-full md:border-gray-800"
              title="Back to summaries"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <Reader 
              chapter={sortedChapters[selectedIdx]} 
              index={STORY_DATA.indexOf(sortedChapters[selectedIdx]) + 1}
            />
          </div>
        ) : (
          <div className="p-6 md:p-12 lg:p-20">
            <div className="max-w-7xl mx-auto">
              <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {searchQuery ? (
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Search Results: {searchQuery}
                      </h1>
                      <p className="text-gray-400">
                        Found {filteredChapters.length} matches in the archive.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row items-center gap-4">
                        <button 
                          onClick={() => {
                            setCurrentView('chapters');
                            setSearchQuery('');
                            setSelectedIdx(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border transition-all w-fit ${
                            currentView === 'chapters'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                              : 'bg-gray-900/50 text-gray-500 border-gray-800 hover:border-gray-700 hover:text-gray-300'
                          }`}
                          title="Read Chapters"
                        >
                          <BookOpen className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentView('designs');
                            setSearchQuery('');
                            setSelectedIdx(null);
                          }}
                          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border transition-all w-fit ${
                            currentView === 'designs' 
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                              : 'bg-gray-900/50 text-gray-500 border-gray-800 hover:border-gray-700 hover:text-gray-300'
                          }`}
                          title="View Designs"
                        >
                          <Palette className="w-6 h-6" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/20 transition-all w-fit"
                  >
                    <Archive className="w-4 h-4" /> Back to All Chapters
                  </button>
                )}
              </header>
              
              {currentView === 'chapters' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {filteredChapters.map((chapter) => {
                    const currentIdx = sortedChapters.indexOf(chapter);
                    const originalIdx = STORY_DATA.indexOf(chapter);
                    return (
                      <div 
                        key={originalIdx}
                        onClick={() => setSelectedIdx(currentIdx)}
                        className="group bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 hover:bg-gray-900 transition-all cursor-pointer flex flex-col h-full shadow-lg hover:shadow-blue-500/5"
                      >
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 uppercase tracking-wider font-medium">
                          <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CH {originalIdx + 1}</span>
                          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                          <span>{chapter["written date"]}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
                          {chapter.prologue || "No summary available for this chapter."}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">
                          <span className="text-xs text-gray-600 font-mono">ID: ARCHIVE_{String(originalIdx + 1).padStart(3, '0')}</span>
                          <span className="text-blue-500 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read More <Rocket className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <DesignGallery />
              )}

              {/* Landing Page Footer */}
              <footer className="mt-20 py-16 border-t border-gray-800/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-900/30 rounded-3xl p-8 md:px-12 border border-gray-800/50">
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-xl shadow-blue-500/10">
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
                <span className="text-blue-400 font-bold">LATEST CHAPTER IS {sortedChapters.length}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
