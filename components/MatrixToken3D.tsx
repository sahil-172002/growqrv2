import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Hexagon } from 'lucide-react';

// --- SHARED 360° PHYSICS HOOK ---
const use360Rotation = (idleSpeed = 0.05, enableSpin = false, forceFlip = false) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Stiffer spring for snappy flip response
    const smoothRotateX = useSpring(rotateX, { stiffness: 200, damping: 25, mass: 1 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 200, damping: 25, mass: 1 });

    useAnimationFrame((t, delta) => {
        if (!isDragging) {
            // 1. Check for Forced Flip or Hover -> Snap to 180 (Back Side)
            if (forceFlip || isHovered) {
                // Smoothly animate towards 180
                // We check current value to find shortest path if needed, but simple set works with Spring
                rotateY.set(180);
                rotateX.set(0); // Level out
            }
            // 2. Continuous Spin (Conditional)
            else if (enableSpin) {
                rotateY.set(rotateY.get() + (delta * idleSpeed));
                rotateX.set(Math.sin(t / 1500) * 5);
            }
            // 3. Idle Breathing (Default) -> Snap to 0 (Front Side)
            else {
                rotateY.set(0);
                rotateX.set(Math.sin(t / 1500) * 5);
            }
        }
    });

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        lastMousePos.current = { x: clientX, y: clientY };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
            const deltaX = clientX - lastMousePos.current.x;
            const deltaY = clientY - lastMousePos.current.y;
            rotateY.set(rotateY.get() + deltaX * 0.5);
            rotateX.set(rotateX.get() - deltaY * 0.5);
            lastMousePos.current = { x: clientX, y: clientY };
        };
        const handleMouseUp = () => setIsDragging(false);
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, rotateX, rotateY]);

    return {
        isDragging,
        handleMouseDown,
        smoothRotateX,
        smoothRotateY,
        setIsHovered
    };
};

interface MatrixTokenProps {
    label: string;
    icon: React.ElementType;
    size?: number;
    color?: string;
    enableIdleSpin?: boolean;
    forceFlip?: boolean; // New prop for global flip control
}

export const MatrixToken3D: React.FC<MatrixTokenProps> = ({
    label,
    icon: Icon,
    size = 80,
    color = "#FF6A2F",
    enableIdleSpin = false,
    forceFlip = false
}) => {
    const {
        isDragging,
        handleMouseDown,
        smoothRotateX,
        smoothRotateY,
        setIsHovered
    } = use360Rotation(0.02, enableIdleSpin, forceFlip);

    const depth = 8;
    const layerSpacing = 1;
    const radius = "50%";

    return (
        <div
            className={`relative perspective-800 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ width: size, height: size }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    rotateX: smoothRotateX,
                    rotateY: smoothRotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* SHADOW */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[20%] bg-black/30 blur-md rounded-full"
                    style={{
                        transform: `translateZ(-40px) translateY(${size * 0.6}px)`,
                        opacity: 0.3
                    }}
                />

                {/* --- EXTRUSION LAYERS --- */}
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-gray-300 border border-gray-400 rounded-full"
                        style={{
                            transform: `translateZ(${-i * layerSpacing}px)`,
                            zIndex: -i,
                            filter: `brightness(${0.9 - (i * 0.03)})`
                        }}
                    />
                ))}

                {/* --- BACK FACE (Orange) --- */}
                <div
                    className="absolute inset-0 bg-orange border border-orange-600 rounded-full"
                    style={{
                        transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
                        backfaceVisibility: 'visible',
                        background: 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)'
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center transform scale-x-[-1]">
                        <Hexagon size={size * 0.4} className="text-white/20" />
                    </div>
                </div>

                {/* --- FRONT FACE (White/Glass) --- */}
                <div
                    className="absolute inset-0 border border-white/60 overflow-hidden rounded-full"
                    style={{
                        transform: "translateZ(1px)",
                        background: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-70 pointer-events-none z-30 mix-blend-overlay"></div>

                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm mb-1 group-hover:scale-110 transition-transform">
                            <Icon size={16} className="text-orange" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600 text-center leading-tight subpixel-antialiased w-full px-1">
                            {label}
                        </span>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};