import React, { useEffect, useState } from 'react';
import { Play, Film } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  cornerTitle?: string;
  description: string;
  prompt?: string;
  sourceChapterNumber?: number | string;
  sourceChapterTitle?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  previewAtSeconds?: number;
  status: 'coming_soon' | 'available';
}

const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: '第12章「克隆的代价」',
    cornerTitle: '克隆的代价',
    description: '《沉默的副驾》',
    prompt: '"Cinematic sci-fi scene, 4k. A sleek autonomous car swerves to avoid a tortoise on a highway..."',
    sourceChapterNumber: 12,
    sourceChapterTitle: '克隆的代价',
    videoUrl: '/videos/veo-the-cloned-companions.mp4',
    previewAtSeconds: 3,
    status: 'available'
  },
  {
    id: 'v2',
    title: '幸福厨房',
    cornerTitle: '幸福厨房',
    description: 'Google VEO Generation',
    prompt: '"Cinematic high-tension thriller sequence... A massive, ancient Galapagos Tortoise crawls onto the middle of the road..."',
    sourceChapterNumber: 11,
    sourceChapterTitle: '幸福厨房',
    videoUrl: '/videos/veo-highway-tension.mp4',
    previewAtSeconds: 2,
    status: 'available'
  }
];

const VideoGallery: React.FC = () => {
  const [generatedPosters, setGeneratedPosters] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    const generatePoster = async (video: VideoItem) => {
      if (!video.videoUrl) return;
      if (video.thumbnailUrl) return;
      if (generatedPosters[video.id]) return;

      const seekTime = video.previewAtSeconds ?? 3;
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.muted = true;
      tempVideo.playsInline = true;
      tempVideo.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        const onLoadedMetadata = () => {
          const safeTime = Math.max(0, Math.min(seekTime, Math.max(0, tempVideo.duration - 0.1)));
          tempVideo.currentTime = safeTime;
        };
        const onSeeked = () => resolve();
        const onError = () => reject(new Error('Failed to load video for thumbnail generation'));

        tempVideo.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
        tempVideo.addEventListener('seeked', onSeeked, { once: true });
        tempVideo.addEventListener('error', onError, { once: true });
        tempVideo.src = video.videoUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = tempVideo.videoWidth || 1280;
      canvas.height = tempVideo.videoHeight || 720;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.86);
      if (cancelled) return;
      setGeneratedPosters((prev) => ({ ...prev, [video.id]: dataUrl }));
    };

    void Promise.all(VIDEOS.map(generatePoster));

    return () => {
      cancelled = true;
    };
  }, [generatedPosters]);

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
          {VIDEOS.map((video) => (
            <div key={video.id} className="group bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-xl">
              <div className="aspect-video bg-gray-950 relative flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                {!!video.cornerTitle && (
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm font-semibold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
                      {video.cornerTitle}
                    </div>
                  </div>
                )}
                {video.videoUrl ? (
                  <video 
                    src={video.videoUrl} 
                    controls 
                    className="w-full h-full object-cover"
                    poster={video.thumbnailUrl ?? generatedPosters[video.id]}
                    preload="none"
                  />
                ) : (
                  <>
                    <Play className="w-16 h-16 text-gray-700 group-hover:text-purple-400 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      {video.status === 'coming_soon' && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-widest rounded mb-2 inline-block">
                          Coming Soon
                        </span>
                      )}
                      <h3 className="text-white font-bold text-lg">{video.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">{video.description}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg">{video.title}</h3>
                <p className="text-gray-400 text-xs mt-1 mb-3">{video.description}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  本影片由 Google Veo 根据《沉默的副驾》第{video.sourceChapterNumber ?? 'X'}章「{video.sourceChapterTitle ?? 'XXX'}」内容改编生成
                </p>
                {!!video.prompt && (
                  <p className="text-gray-500 text-xs leading-relaxed mt-3">
                    {video.prompt}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
