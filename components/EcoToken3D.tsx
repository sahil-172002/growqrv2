import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { Hexagon, QrCode, Wifi, Fingerprint, Activity } from 'lucide-react';

// --- SHARED 360° PHYSICS HOOK ---
const use360Rotation = (idleSpeed = 0.05, enableSpin = false, forceFlip = false, enableBreathing = true) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Accumulative rotation values
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Smooth physics
    const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20, mass: 1 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20, mass: 1 });

    // Idle Animation loop
    useAnimationFrame((t, delta) => {
        if (!isDragging) {
            // 1. Check for Forced Flip or Hover -> Snap to 180 (Back Side)
            if (forceFlip || isHovered) {
                rotateY.set(180);
                rotateX.set(0);
            }
            // 2. Continuous Spin (Conditional)
            else if (enableSpin) {
                rotateY.set(rotateY.get() + (delta * idleSpeed));
            }
            // 3. Idle Breathing (Default)
            else if (enableBreathing) {
                rotateY.set(0);
                rotateX.set(Math.sin(t / 1500) * 5);
            }
            else {
                rotateY.set(0);
                rotateX.set(0);
            }
        }
    });

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation(); // Prevent bubbling
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

    return { isDragging, handleMouseDown, smoothRotateX, smoothRotateY, setIsHovered };
};

// ============================================================================
// 1. COMPACT ID CARD (The Central Hub)
// ============================================================================
// --- MINI DATA STREAM (For Card Back) ---
const MiniDataStream = () => {
    const [score, setScore] = useState(850);
    const [bars, setBars] = useState<number[]>(Array(12).fill(50));

    useEffect(() => {
        const interval = setInterval(() => {
            setScore(Math.floor(Math.random() * (99 - 65) + 65));
            setBars(Array(12).fill(0).map(() => Math.random() * 100));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full mt-4">
            {/* Label */}
            <div className="flex items-center gap-1 mb-1 opacity-80">
                <span className="text-[8px] font-mono text-white tracking-[0.2em] uppercase font-bold">Q-SCORE™</span>
            </div>

            {/* Score Display */}
            <div className="flex items-baseline gap-1 relative mb-2">
                <span className="font-mono text-3xl font-black text-white tracking-tighter drop-shadow-md">
                    {score}
                </span>
                <span className="text-[8px] font-mono text-white/60 font-bold">/ 100</span>
            </div>

            {/* Frequency Visualizer */}
            <div className="flex items-end justify-center gap-[2px] h-3 w-16 opacity-80">
                {bars.map((h, i) => (
                    <div key={i}
                        className="w-[2px] bg-white rounded-full transition-all duration-75 ease-linear"
                        style={{
                            height: `${h}%`,
                            opacity: Math.max(0.4, h / 100)
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export const CompactIDCard3D: React.FC = () => {
    // DISABLED CONTINUOUS SPIN for Hub (User Request)
    const { isDragging, handleMouseDown, smoothRotateX, smoothRotateY } = use360Rotation(0.04, false, false, false);

    // Responsive Dimensions
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const width = isMobile ? "100px" : "150px";
    const height = isMobile ? "150px" : "225px";
    const depth = isMobile ? 8 : 12;
    const radius = isMobile ? "16px" : "24px";
    const layerSpacing = 1;
    const qrSize = isMobile ? 60 : 100;
    const scoreSize = isMobile ? "text-2xl" : "text-3xl";

    const shadowScale = useTransform(smoothRotateX, (v) => 1 - Math.abs(Math.sin(v * Math.PI / 180)) * 0.2);

    // Score Animation Logic (Front Face)
    const [score, setScore] = useState(1);
    const [bars, setBars] = useState<number[]>(Array(12).fill(50));

    useEffect(() => {
        const interval = setInterval(() => {
            setScore(prev => (prev >= 100 ? 1 : prev + 1));
            setBars(Array(12).fill(0).map(() => Math.random() * 100));
        }, 150); // Speed of count
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`relative perspective-800 select-none group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ width, height }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
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
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[20%] bg-black/30 blur-xl rounded-[100%]"
                    style={{
                        transform: `translateZ(-60px) translateY(${isMobile ? 80 : 120}px)`,
                        scale: shadowScale,
                    }}
                />

                {/* --- THICKNESS LAYERS --- */}
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-gray-300 border border-gray-400"
                        style={{
                            borderRadius: radius,
                            transform: `translateZ(${-i * layerSpacing}px)`,
                            zIndex: -i,
                            filter: `brightness(${0.8 - (i * 0.02)})`
                        }}
                    />
                ))}

                {/* --- BACK FACE (LIGHT GRAY THEME - SAME CONTENT) --- */}
                <div
                    className="absolute inset-0 border border-gray-300 overflow-hidden"
                    style={{
                        borderRadius: radius,
                        transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
                        backfaceVisibility: 'visible',
                        background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    {/* Removed scale-x-[-1] as it was causing double-mirroring (inversion) */}
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-gray-800">
                        <div className="relative mb-2">
                            <div className="absolute inset-0 bg-orange/5 blur-xl rounded-full"></div>
                            {/* QR Code in Dark Gray/Black */}
                            <QrCode size={qrSize} className="relative text-gray-800 drop-shadow-sm" />
                        </div>

                        {/* Mini Data Stream (Dark Theme Version) */}
                        <div className="flex flex-col items-center justify-center w-full mt-2">
                            {/* Label */}
                            <div className="flex items-center gap-1 mb-1 opacity-60">
                                <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} font-mono text-gray-600 tracking-[0.2em] uppercase font-bold`}>Q-SCORE™</span>
                            </div>

                            {/* Score Display */}
                            <div className="flex items-baseline gap-1 relative mb-2">
                                <span className={`font-mono ${scoreSize} font-black text-gray-900 tracking-tighter drop-shadow-sm`}>
                                    {score}
                                </span>
                                <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} font-mono text-gray-500 font-bold`}>/ 100</span>
                            </div>

                            {/* Frequency Visualizer (Dark Bars) */}
                            <div className={`flex items-end justify-center gap-[2px] ${isMobile ? 'h-2 w-12' : 'h-3 w-16'} opacity-60`}>
                                {bars.map((h, i) => (
                                    <div key={i}
                                        className="w-[2px] bg-gray-800 rounded-full transition-all duration-75 ease-linear"
                                        style={{
                                            height: `${h}%`,
                                            opacity: Math.max(0.4, h / 100)
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FRONT FACE (ORANGE - QR CODE) --- */}
                <div
                    className="absolute inset-0 border border-orange-600 bg-orange"
                    style={{
                        borderRadius: radius,
                        transform: "translateZ(1px)",
                        background: 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)'
                    }}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-white">
                        <div className="relative mb-2">
                            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                            {/* Increased QR Code Size */}
                            <QrCode size={qrSize} className="relative text-white/90 drop-shadow-md" />
                        </div>

                        {/* New Mini Data Stream */}
                        <div className="flex flex-col items-center justify-center w-full mt-2">
                            {/* Label */}
                            <div className="flex items-center gap-1 mb-1 opacity-80">
                                <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} font-mono text-white tracking-[0.2em] uppercase font-bold`}>Q-SCORE™</span>
                            </div>

                            {/* Score Display */}
                            <div className="flex items-baseline gap-1 relative mb-2">
                                <span className={`font-mono ${scoreSize} font-black text-white tracking-tighter drop-shadow-md`}>
                                    {score}
                                </span>
                                <span className={`${isMobile ? 'text-[6px]' : 'text-[8px]'} font-mono text-white/60 font-bold`}>/ 100</span>
                            </div>

                            {/* Frequency Visualizer */}
                            <div className={`flex items-end justify-center gap-[2px] ${isMobile ? 'h-2 w-12' : 'h-3 w-16'} opacity-80`}>
                                {bars.map((h, i) => (
                                    <div key={i}
                                        className="w-[2px] bg-white rounded-full transition-all duration-75 ease-linear"
                                        style={{
                                            height: `${h}%`,
                                            opacity: Math.max(0.4, h / 100)
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};


// ============================================================================
// 2. ECO TOKEN 3D (The Surrounding Features)
// ============================================================================
interface EcoToken3DProps {
    label: string;
    icon: any;
    size?: number; // Fallback if width/height not provided
    width?: number;
    height?: number;
    forceFlip?: boolean;
    isActive?: boolean; // New prop for color transition
    layout?: 'vertical' | 'icon-text' | 'text-icon';
}

export const EcoToken3D: React.FC<EcoToken3DProps> = ({
    label,
    icon: Icon,
    size = 120,
    width,
    height,
    forceFlip = false,
    isActive = false,
    layout = 'vertical'
}) => {
    // Determine actual dimensions
    const w = width || size;
    const h = height || size;

    // RESPONSIVE SIZING based on width
    const isCompact = w < 120;
    const isTiny = w < 110;

    // Scale internal elements based on token size
    const iconContainerSize = isTiny ? 'w-6 h-6' : isCompact ? 'w-8 h-8' : 'w-10 h-10';
    const iconSize = isTiny ? 12 : isCompact ? 14 : 18;
    const textSize = isTiny ? 'text-[8px]' : isCompact ? 'text-[9px]' : 'text-[11px]';
    const padding = isTiny ? 'p-2' : isCompact ? 'p-3' : 'p-4';
    const gap = isTiny ? 'gap-1' : isCompact ? 'gap-2' : 'gap-3';
    const borderRadius = isTiny ? '16px' : isCompact ? '20px' : '24px';
    const depth = isTiny ? 5 : isCompact ? 6 : 8;

    // DISABLED CONTINUOUS SPIN for Tokens
    const { isDragging, handleMouseDown, smoothRotateX, smoothRotateY, setIsHovered } = use360Rotation(0, false, forceFlip);

    const layerSpacing = 1;

    return (
        <div
            className={`eco-token-wrapper relative perspective-800 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ width: w, height: h }}
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
                    transformStyle: "preserve-3d", // CRITICAL FOR THICKNESS
                }}
            >
                {/* SHADOW */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[20%] bg-black/40 blur-xl rounded-[100%]"
                    style={{
                        transform: `translateZ(-50px) translateY(${size * 0.55}px)`,
                        opacity: 0.2
                    }}
                />

                {/* --- EXTRUSION --- */}
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-gray-300 border border-gray-400"
                        style={{
                            borderRadius: borderRadius,
                            transform: `translateZ(${-i * layerSpacing}px)`,
                            zIndex: -i,
                            width: '100%',
                            height: '100%',
                            filter: `brightness(${0.9 - (i * 0.02)})`
                        }}
                    />
                ))}

                {/* --- BACK FACE (Orange Theme) --- */}
                <div
                    className="absolute inset-0 border border-orange-600 overflow-hidden"
                    style={{
                        borderRadius: borderRadius,
                        transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
                        backfaceVisibility: 'visible',
                        background: 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-50 pointer-events-none z-30"></div>

                    <div className="w-full h-full flex items-center justify-center">
                        <div className={`relative z-10 w-full h-full ${padding} flex items-center ${gap} ${layout === 'vertical' ? 'flex-col justify-center' : 'justify-start'} ${layout === 'text-icon' ? 'flex-row' : ''} ${layout === 'icon-text' ? 'flex-row-reverse' : ''}`}>
                            <div className={`${iconContainerSize} rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner relative overflow-hidden group flex-shrink-0 backdrop-blur-sm`}>
                                <Icon size={iconSize} className="relative z-10 text-white" />
                            </div>
                            <span className={`${textSize} font-bold uppercase tracking-wide text-white leading-tight subpixel-antialiased drop-shadow-md ${layout === 'vertical' ? 'text-center' : ''}`}>
                                {label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- FRONT FACE (Static Gray) --- */}
                <div
                    className="absolute inset-0 border border-white/60 overflow-hidden"
                    style={{
                        borderRadius: borderRadius,
                        transform: "translateZ(1px)",
                        background: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-70 pointer-events-none z-30 mix-blend-overlay"></div>

                    <div className={`relative z-10 w-full h-full ${padding} flex items-center ${gap} ${layout === 'vertical' ? 'flex-col justify-center' : 'justify-start'} ${layout === 'text-icon' ? 'flex-row' : ''} ${layout === 'icon-text' ? 'flex-row-reverse' : ''}`}>
                        <div className={`${iconContainerSize} rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shadow-inner relative overflow-hidden group flex-shrink-0`}>
                            <div className={`absolute inset-0 bg-orange/10`}></div>
                            <Icon size={iconSize} className="relative z-10 text-orange" />
                        </div>
                        <span className={`${textSize} font-bold uppercase tracking-wide text-gray-600 leading-tight subpixel-antialiased ${layout === 'vertical' ? 'text-center' : ''}`}>
                            {label}
                        </span>
                    </div>
                </div>

                {/* --- ACTIVE OVERLAY (Orange Theme - Beam Controlled) --- */}
                <div
                    className="beam-active-overlay absolute inset-0 border border-orange-600 overflow-hidden pointer-events-none"
                    style={{
                        borderRadius: borderRadius,
                        transform: "translateZ(2px)", // Slightly above front face
                        background: 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-50 z-30"></div>

                    <div className="w-full h-full flex items-center justify-center">
                        <div className={`relative z-10 w-full h-full ${padding} flex items-center ${gap} ${layout === 'vertical' ? 'flex-col justify-center' : 'justify-start'} ${layout === 'text-icon' ? 'flex-row' : ''} ${layout === 'icon-text' ? 'flex-row-reverse' : ''}`}>
                            <div className={`${iconContainerSize} rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner relative overflow-hidden group flex-shrink-0 backdrop-blur-sm`}>
                                <Icon size={iconSize} className="relative z-10 text-white" />
                            </div>
                            <span className={`${textSize} font-bold uppercase tracking-wide text-white leading-tight subpixel-antialiased drop-shadow-md ${layout === 'vertical' ? 'text-center' : ''}`}>
                                {label}
                            </span>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};