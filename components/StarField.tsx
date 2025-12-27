import React, { useEffect, useState, useRef } from 'react';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    baseOpacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
}

const StarField: React.FC = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>();

    // Initialize stars
    useEffect(() => {
        const count = 80;
        const newStars: Star[] = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            baseOpacity: Math.random() * 0.5 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2,
        }));
        setStars(newStars);
    }, []);

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animate twinkling and mouse interaction
    useEffect(() => {
        let frame = 0;

        const animate = () => {
            frame++;

            setStars(prevStars =>
                prevStars.map(star => {
                    // Calculate distance from mouse
                    const dx = star.x - mousePos.x;
                    const dy = star.y - mousePos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Brightness boost based on proximity to cursor (within 20% of screen)
                    const proximityBoost = distance < 20 ? (20 - distance) / 20 * 0.5 : 0;

                    // Twinkling effect
                    const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.3;

                    // Combined opacity
                    const newOpacity = Math.min(1, star.baseOpacity + twinkle + proximityBoost);

                    return {
                        ...star,
                        opacity: newOpacity,
                    };
                })
            );

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [mousePos]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ overflow: 'hidden' }}
        >
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        transition: 'opacity 0.3s ease-out',
                        boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
                        filter: 'blur(0.5px)',
                    }}
                />
            ))}
        </div>
    );
};

export default StarField;
