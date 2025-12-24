import React from 'react';
import { Play, Film } from 'lucide-react';

const VideoGallery: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-3xl p-8 md:p-12 mb-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <Film className="w-12 h-12 text-purple-400" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">AI 影像实验室</h2>
        <p className="max-w-2xl mx-auto text-gray-400 leading-relaxed mb-8">
          这里展示由 Google VEO 等前沿 AI 模型生成的动态影像。
          探索《沉默的副驾》文字之外的视觉可能性，感受光影交错的未来叙事。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Placeholder for future VEO video */}
          <div className="group bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-xl">
            <div className="aspect-video bg-gray-950 relative flex items-center justify-center group-hover:bg-gray-900 transition-colors">
              <Play className="w-16 h-16 text-gray-700 group-hover:text-purple-400 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-widest rounded mb-2 inline-block">
                  Coming Soon
                </span>
                <h3 className="text-white font-bold text-lg">The Cloned Companions</h3>
                <p className="text-gray-400 text-xs mt-1">Google VEO Generation</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                "Cinematic sci-fi scene, 4k. A sleek autonomous car swerves to avoid a tortoise on a highway..."
              </p>
            </div>
          </div>

          <div className="group bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-xl">
            <div className="aspect-video bg-gray-950 relative flex items-center justify-center group-hover:bg-gray-900 transition-colors">
              <Play className="w-16 h-16 text-gray-700 group-hover:text-purple-400 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
               <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-widest rounded mb-2 inline-block">
                  Coming Soon
                </span>
                <h3 className="text-white font-bold text-lg">Highway Tension</h3>
                <p className="text-gray-400 text-xs mt-1">Google VEO Generation</p>
              </div>
            </div>
             <div className="p-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                "Cinematic high-tension thriller sequence... A massive, ancient Galapagos Tortoise crawls onto the middle of the road..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
