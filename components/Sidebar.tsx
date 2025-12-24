
import React from 'react';
import { Book, Calendar, User, Search, ChevronRight, BookOpen, Palette } from 'lucide-react';
import { Chapter } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onHomeClick?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
  currentView?: 'chapters' | 'designs';
  onViewChange?: (view: 'chapters' | 'designs') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  chapters, 
  selectedIndex, 
  onSelect, 
  onHomeClick,
  searchQuery, 
  setSearchQuery,
  className = "",
  currentView = 'chapters',
  onViewChange
}) => {
  const filteredChapters = chapters.filter(c => 
    (c.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (c.prologue?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`flex flex-col bg-gray-900 border-r border-gray-800 overflow-hidden ${className}`}>
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-gray-800">
        <button 
          onClick={onHomeClick}
          className="w-full text-left group"
          title="Back to home"
        >
          <h1 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2 group-hover:text-blue-300 transition-colors">
            <Book className="w-6 h-6" />
            沉默的副驾 SilentCopilot
          </h1>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={() => onViewChange?.('chapters')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all ${
              currentView === 'chapters'
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'bg-gray-800/50 text-gray-500 border-gray-800 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="font-bold tracking-wide text-sm">Read</span>
          </button>
          <button 
            onClick={() => onViewChange?.('designs')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all ${
              currentView === 'designs'
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'bg-gray-800/50 text-gray-500 border-gray-800 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span className="font-bold tracking-wide text-sm">Design</span>
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all text-gray-200"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="py-4 pb-64">
        {filteredChapters.map((chapter, idx) => {
          const originalIndex = chapters.indexOf(chapter);
          return (
            <button
              key={idx}
              onClick={() => onSelect(originalIndex)}
              className={`w-full text-left px-6 py-4 transition-all border-l-4 ${
                selectedIndex === originalIndex 
                  ? 'bg-gray-800 border-blue-500 text-white' 
                  : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1 flex justify-between">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {chapter["written date"]?.split('日')[0] + '日' || 'Unknown Date'}</span>
              </div>
              <div className="font-medium line-clamp-1">{chapter.title || "Untitled Fragment"}</div>
              <div className="text-xs mt-2 flex items-center gap-1 opacity-70">
                <User className="w-3 h-3" /> {chapter.author || "Anonymous"}
              </div>
            </button>
          );
        })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
