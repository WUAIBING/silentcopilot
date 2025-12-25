import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: string; animationDuration: string; opacity: number; size: string }[]>([]);

  useEffect(() => {
    const count = 50;
    const flakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      opacity: Math.random() * 0.6 + 0.2,
      size: `${Math.random() * 4 + 2}px`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" style={{ overflow: 'hidden' }}>
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10vh) translateX(0);
            }
            25% {
              transform: translateY(15vh) translateX(15px);
            }
            50% {
              transform: translateY(40vh) translateX(-15px);
            }
            75% {
              transform: translateY(65vh) translateX(15px);
            }
            100% {
              transform: translateY(110vh) translateX(0);
            }
          }
        `}
      </style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration} linear infinite`,
            top: '-10px',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
