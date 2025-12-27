import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Cpu } from 'lucide-react';
import { Chapter } from '../types';
import { calculateReadingTime, formatReadingTime } from '../utils/readingTime';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    chapters: Chapter[];
    allChapters: Chapter[]; // Original STORY_DATA for calculating correct chapter numbers
    onSelectChapter: (index: number) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, chapters, allChapters, onSelectChapter }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter chapters based on search query
    const filteredChapters = query.trim()
        ? chapters.filter((chapter, idx) => {
            const searchText = `${chapter.title || ''} ${chapter.prologue || ''} ${chapter.text || ''}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        })
        : chapters;

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.min(filteredChapters.length - 1, prev + 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.max(0, prev - 1));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredChapters[selectedIndex]) {
                        const originalIndex = chapters.indexOf(filteredChapters[selectedIndex]);
                        onSelectChapter(originalIndex);
                        onClose();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, filteredChapters, chapters, onSelectChapter, onClose]);

    // Reset selected index when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-gray-900/95 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 backdrop-blur-xl animate-slide-down overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-red-500/5 pointer-events-none" />

                {/* Search input */}
                <div className="relative border-b border-gray-800/50 p-4">
                    <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-amber-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search chapters, titles, or content..."
                            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                        />
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
                            title="Close (Esc)"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {filteredChapters.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-medium">No chapters found</p>
                            <p className="text-sm mt-2">Try a different search term</p>
                        </div>
                    ) : (
                        <div className="py-2">
                            {filteredChapters.map((chapter, idx) => {
                                const originalIndex = chapters.indexOf(chapter);
                                // Calculate actual chapter number from STORY_DATA (allChapters)
                                const chapterNumber = allChapters.indexOf(chapter) + 1;
                                const readingTime = calculateReadingTime(chapter.text);
                                const isSelected = idx === selectedIndex;

                                return (
                                    <button
                                        key={originalIndex}
                                        onClick={() => {
                                            onSelectChapter(originalIndex);
                                            onClose();
                                        }}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={`w-full text-left px-6 py-4 transition-all border-l-4 ${isSelected
                                            ? 'bg-amber-500/10 border-amber-500 text-white'
                                            : 'border-transparent text-gray-400 hover:bg-gray-800/30'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 text-xs mb-2">
                                            <span className={`flex items-center gap-1 font-mono ${isSelected ? 'text-amber-400' : 'text-gray-600'}`}>
                                                <Cpu className="w-3 h-3" /> CH {chapterNumber}
                                            </span>
                                            <span className="w-1 h-1 bg-gray-800 rounded-full" />
                                            <span className="text-gray-600">{chapter["written date"]}</span>
                                            <span className="w-1 h-1 bg-gray-800 rounded-full" />
                                            <span className={`flex items-center gap-1 ${isSelected ? 'text-gray-400' : 'text-gray-600'}`}>
                                                <Clock className="w-3 h-3" />
                                                {formatReadingTime(readingTime)}
                                            </span>
                                        </div>
                                        <div className={`font-semibold mb-1.5 line-clamp-1 ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                                            {chapter.title || 'Untitled'}
                                        </div>
                                        <div className="text-sm text-gray-500 line-clamp-2">
                                            {chapter.prologue || 'No summary available'}
                                        </div>
                                        {isSelected && (
                                            <div className="flex items-center gap-1 text-xs text-amber-400 mt-2">
                                                Press Enter to open <ArrowRight className="w-3 h-3" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer hint */}
                <div className="border-t border-gray-800/50 px-6 py-3 bg-gray-900/50">
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 font-mono">↑↓</kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 font-mono">Enter</kbd>
                            Select
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 font-mono">Esc</kbd>
                            Close
                        </span>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 200ms ease-out;
        }
        .animate-slide-down {
          animation: slide-down 250ms ease-out;
        }
      `}</style>
        </div>
    );
};

export default SearchModal;
