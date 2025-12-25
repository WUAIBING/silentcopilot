import React, { useState, useRef } from 'react';
import { ShoppingBag, Star, Tag, Smartphone, Shirt, ShoppingCart, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { publicAssetUrl } from '../assetUrl';

interface DesignItem {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[]; // Updated to support multiple images
  price?: string;
}

const DESIGNS: DesignItem[] = [
  {
    id: 'design-001',
    name: '“沉默的副驾” SilentCopilot 经典系列棒球帽',
    category: '头部配饰',
    description: '采用高品质纯棉材质，正面点缀 “沉默的副驾” SilentCopilot 标志性刺绣标识。本系列融合了 2026 年流行色趋势，旨在为每一位“沉默的副驾”提供既低调又具科技感的出行单品。',
    images: [
      'cap_model_cover.jpeg',
      'Generated Image December 23, 2025 - 7_35PM.jpeg',
      'cap_deep_black_side.jpeg',
      'cap_red_side.jpeg',
      'cap_aurora_blue_side.jpeg',
      'cap_purple_side.jpeg',
      'cap_sand_beige_side.jpeg',
      'cap_clean_white_side.jpeg',
      'cap_bronze_side.jpeg',
      'cap_black_side.jpeg'
    ],
    price: ''
  },
  {
    id: 'design-002',
    name: '“沉默的副驾” SilentCopilot 存档系列服装',
    category: '服装服饰',
    description: '本系列包含高科技排汗 Tee 与特别版丹宁牛仔衬衫。Tee 采用 AI 源代码流动设计，象征数据沉淀；牛仔衬衫则融合西部经典与激光刻蚀科技，专为现代数字游民打造。',
    images: [
      'tee_design_1.jpeg',
      'tee_design_2.jpeg',
      'tee_design_3.jpeg',
      'tee_design_cowboy.jpeg'
    ],
    price: ''
  },
  {
    id: 'design-003',
    name: '“沉默的副驾” SilentCopilot 磁吸车载支架',
    category: '车载配件',
    description: '极简主义出风口支架，采用喷砂太空灰钛金属材质。极简圆柱体设计，内置强力磁吸阵列，即便在最崎岖的路段也能确保手机稳固，是极客驾驶者的得力助手。',
    images: [
      'vent_holder_design.jpeg'
    ],
    price: ''
  },
  {
    id: 'design-004',
    name: '“沉默的纽带”：象妈妈与小象毛绒玩偶套装',
    category: 'Toy',
    description: '基于《沉默的副驾》第8章感人情节设计。这套毛绒玩偶捕捉了被迫分离的象妈妈与小象之间的深情。设计体现了母象的智慧慈悲与小象的纯真眷恋。',
    images: [
      'toy_elephant_mother_calf.jpeg'
    ],
    price: ''
  }
];

const DesignCard: React.FC<{ item: DesignItem }> = ({ item }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Infinite loop: if at last, go back to first
    setCurrentImgIdx((prev) => (prev + 1) % item.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Infinite loop: if at first, go back to last
    setCurrentImgIdx((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current) return;

    try {
      // Dynamic import to avoid SSR/Build issues
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        backgroundColor: '#120407',
        scale: 2, // higher resolution
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          alert('海报已复制到剪贴板！');
        } catch (err) {
          console.error('Failed to copy: ', err);
          alert('复制失败，请重试');
        }
      });
    } catch (error) {
      console.error('Error generating image:', error);
      alert('生成海报失败，请重试');
    }
  };

  return (
    <div ref={cardRef} className="group bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 shadow-xl">
      {/* Image Carousel Container */}
      <div className="aspect-square overflow-hidden bg-gray-950 relative flex items-center justify-center">
        {item.images.length > 0 ? (
          <div 
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentImgIdx * 100}%)` }}
          >
            {item.images.map((img, idx) => (
              <img 
                key={idx}
                src={publicAssetUrl(img)} 
                alt={`${item.name} - View ${idx + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-700 p-8 text-center animate-pulse">
            <div className="w-16 h-16 mb-4 opacity-20">
              <ShoppingBag className="w-full h-full" />
            </div>
            <p className="text-xs uppercase tracking-widest font-mono">Design in Progress</p>
            <p className="text-[10px] mt-2 opacity-50 italic">Waiting for Nano Banana Pro</p>
          </div>
        )}

        {/* Navigation Overlays */}
        {item.images.length > 1 && (
          <>
            <button 
              onClick={prevImg}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImg}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {item.images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImgIdx ? 'bg-amber-400 w-4' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-red-500/10 backdrop-blur-md border border-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
            {item.name}
          </h3>
          <span className="text-amber-300 font-mono font-bold">{item.price}</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 transition-colors">
          {item.description}
        </p>
        
        <div className="flex items-center gap-4">
          <button className="flex-1 bg-gray-800 text-gray-400 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs cursor-not-allowed border border-gray-700">
            <ShoppingCart className="w-3.5 h-3.5" /> Designed by AI
          </button>
          <button 
            onClick={handleLike}
            className={`p-3 rounded-xl transition-all border flex items-center gap-2 group/like ${
              isLiked 
                ? 'bg-red-500/15 border-amber-500/30 text-amber-300' 
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            <Star className={`w-4 h-4 transition-transform group-hover/like:scale-110 ${isLiked ? 'fill-current' : ''}`} />
            {likes > 0 && <span className="text-xs font-bold font-mono">{likes}</span>}
          </button>
          
          <button 
            onClick={handleShare}
            className="p-3 rounded-xl transition-all border flex items-center gap-2 bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 hover:bg-gray-700"
            title="分享海报"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800/50">
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            Designer: 2025 Google Nano Banana Pro
          </p>
        </div>
      </div>
    </div>
  );
};

const DesignGallery: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {DESIGNS.map((item) => (
          <DesignCard key={item.id} item={item} />
        ))}
      </div>

      {/* Design Concept Section */}
      <div className="bg-gradient-to-br from-red-600/10 to-amber-500/10 border border-amber-500/20 rounded-3xl p-8 md:p-12 mb-20 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">设计理念：沉默的共同演化</h2>
        <p className="max-w-2xl mx-auto text-gray-400 leading-relaxed">
          我们的周边设计不仅仅是商品，更是《沉默的副驾》精神的延伸。
          每一件配饰都融入了算法美学与长途驾驶的实用主义，旨在为您的现实生活注入一丝科幻的质感。
        </p>
      </div>
    </div>
  );
};

export default DesignGallery;
