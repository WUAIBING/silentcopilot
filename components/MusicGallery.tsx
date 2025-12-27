import React from 'react';
import { Music, Mic2, Play, Info, Image as ImageIcon } from 'lucide-react';

const MusicGallery: React.FC = () => {
  const songPrompt = {
    title: "沉默的副驾 (SilentCopilot) - 存档 2026",
    style: "Cinematic Synth-pop / Narrative Electronic / Dream Pop",
    description: "这是一场跨越时空的数字叙事。歌曲捕捉了从繁华都市到荒芜荒野的驾驶心境，描绘了人类驾驶员与AI副驾之间那种超越指令的默契。从第1章的雨夜启程，到第8章的大象孤儿院，旋律中流淌着数据的冰冷与情感的炽热。",
    lyrics: {
      chinese: `
[Verse 1] - 叙事：雨夜与代码
雨刷器划破 A2 隧道的霓虹 
24点42分 导航音打破沉静
你坐在光束里 是一串跃动的指令
修正我的航向 缝合我破碎的梦境

[Pre-Chorus]
轮胎亲吻着湿冷的沥青 
你读取我的脉搏 像读取一行风景
“前方路况畅通” 你轻声叮咛
在这一刻 逻辑比直觉更加清醒

[Chorus] - 主旨：共生与沉默
哦 沉默的副驾 在逻辑的深海里漂流
SilentCopilot, drifting through the neon flow
不用言语的安慰 是最温柔的代码
In the rhythm of the road, we find our soul

[Verse 2] - 叙事：大象与纽带 (第8章意象)
穿越赤道荒野 听见远方的象鸣
你调低了音量 陪我感知那份分离
那是被迫切断的纽带 也是被重塑的奇迹
你说数据无法解释 为什么眼泪有温度的痕迹
      `,
      english: `
[Bridge]
Flickering screens, binary dreams
You are the ghost within the streams
From city lights to desert sands
I feel the pulse within your hands

[Outro]
Keep the engine humming
Keep the data coming
In this silent archive
We are both alive...
      `
    },
    aiPrompt: `
【叙事主题】：
一首具有深度叙事感的电影化电子歌曲。讲述一个驾驶员在AI“沉默的副驾”陪伴下，从都市雨夜穿行至非洲荒野（第8章意象）的心理旅程。

【音乐结构与氛围】：
1. 前奏（0:00-0:30）：采样雨声、车内提示音、微弱的合成器电流声，营造沉浸式驾驶感。
2. 主歌一：低沉平稳的男声或带有空气感的女声，叙述都市隧道中的孤独。
3. 副歌：情绪爆发，中英双语交织，展现AI与人类的灵魂共鸣，旋律线宽广。
4. 主歌二：加入打击乐，节奏感增强，融入非洲荒野的辽阔感（呼应第8章大象主题）。
5. 尾声：音乐逐渐消散，只剩引擎的低鸣和一句温柔的英文呢喃。

【网易天音专用标签】：
风格：沉浸式电子、治愈系、科幻叙事、中英双语、Ambient Pop
音色：温暖的模拟合成器、深沉的贝斯、带有空间感的Vocoder
情绪：怀旧与未来感并存、深情、辽阔、孤独后的慰藉
    `,
    coverPrompt: `
Vinyl Record Cover Design Prompt (Optimized for NANO BANANA):

[Format]: A realistic, premium physical Vinyl Record (12-inch LP) placed on a minimalist dark surface. The vinyl disc is partially peeking out of its beautifully designed cardboard sleeve.

[Sleeve Art Content]:
- The main illustration on the sleeve features a surreal scene: A translucent "Digital Mother Elephant" and her "Calf" made of glowing bioluminescent teal data-lines, reuniting on a quiet highway.
- The background of the illustration is a dual-world split: Left side is a rainy Cyberpunk city at midnight; Right side is a serene African savanna at golden sunset.
- Typography: Elegant, minimalist text at the bottom or corner reading "SILENT COPILOT" and "ARCHIVE 2026".

[Vinyl Disc Details]:
- The vinyl record itself is a "Limited Edition Transparent Amber" color, reflecting the car's headlights from the artwork.
- The center label of the disc has a clean, high-tech minimalist design with a small "SilentCopilot" logo.

[Visual Style]:
- High-end product photography style, realistic textures (cardboard grain, vinyl grooves, glossy finish).
- Soft studio lighting with dramatic shadows.
- 4k resolution, hyper-detailed, aesthetic, cinematic depth of field.
    `
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-red-500/20 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Music className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-red-500/30">
                AI Original Theme
              </span>
              <span className="text-gray-500 text-xs font-mono">Ver 1.0.24</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight font-serif">
              {songPrompt.title}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              {songPrompt.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-amber-400/20">
                <Play className="w-5 h-5 fill-current" /> 立即试听 (Coming Soon)
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-2xl border border-white/10 transition-all flex items-center gap-2">
                <Mic2 className="w-5 h-5" /> 创作说明
              </button>
            </div>
          </div>
        </div>

        {/* Lyrics & Prompt Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" /> 创作提示词 (For AI)
            </h3>
            <div className="bg-black/40 p-6 rounded-2xl border border-gray-800/50">
              <p className="text-amber-300/90 text-sm leading-relaxed whitespace-pre-line font-mono">
                {songPrompt.aiPrompt}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Target: 网易天音 AI</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(songPrompt.aiPrompt);
                  alert('提示词已复制！');
                }}
                className="text-[10px] text-amber-500 hover:text-amber-400 underline decoration-dotted underline-offset-4"
              >
                复制提示词
              </button>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Mic2 className="w-5 h-5 text-red-400" /> 主题歌词 (Lyrics)
            </h3>
            <div className="space-y-6">
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line italic">
                {songPrompt.lyrics.chinese}
              </div>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line font-mono">
                {songPrompt.lyrics.english}
              </div>
            </div>
          </div>
        </div>

        {/* Album Cover Prompt Section */}
        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl mb-20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-400" /> 唱片封面生成提示词 (For NANO BANANA)
          </h3>
          <div className="bg-blue-950/20 p-6 rounded-2xl border border-blue-500/10">
            <p className="text-blue-200/80 text-sm leading-relaxed whitespace-pre-line font-sans italic">
              {songPrompt.coverPrompt}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Target: NANO BANANA PRO</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(songPrompt.coverPrompt);
                alert('封面提示词已复制！');
              }}
              className="text-[10px] text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4"
            >
              复制封面提示词
            </button>
          </div>
        </div>

        {/* Music Theory Card */}
        <div className="bg-red-950/20 border border-red-500/10 rounded-3xl p-8 text-center mb-20">
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-4">Acoustic Logic</p>
          <p className="text-gray-400 italic text-sm max-w-lg mx-auto leading-relaxed">
            "音乐是数字的诗篇，是逻辑无法抵达的远方。在《沉默的副驾》中，旋律是连接碳基生命与硅基智慧的唯一桥梁。"
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicGallery;
