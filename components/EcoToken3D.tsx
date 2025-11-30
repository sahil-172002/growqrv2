import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { Hexagon, QrCode, Wifi, Fingerprint, Activity } from 'lucide-react';

// --- SHARED 360° PHYSICS HOOK ---
const use360Rotation = (idleSpeed = 0.05, enableSpin = false) => {
    const [isDragging, setIsDragging] = useState(false);
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
            // Continuous Spin (Conditional)
            if (enableSpin) {
                rotateY.set(rotateY.get() + (delta * idleSpeed));
            }

            // Gentle breathing tilt (Always active)
            rotateX.set(Math.sin(t / 1500) * 5);
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

    return { isDragging, handleMouseDown, smoothRotateX, smoothRotateY };
};

// ============================================================================
// 1. COMPACT ID CARD (The Central Hub)
// ============================================================================
export const CompactIDCard3D: React.FC = () => {
    // ENABLED CONTINUOUS SPIN for Hub
    const { isDragging, handleMouseDown, smoothRotateX, smoothRotateY } = use360Rotation(0.04, true);

    // Dimensions
    const width = "150px";
    const height = "225px";
    const depth = 12;
    const radius = "24px";
    const layerSpacing = 1;

    const shadowScale = useTransform(smoothRotateX, (v) => 1 - Math.abs(Math.sin(v * Math.PI / 180)) * 0.2);

    // Score Animation Logic
    const [score, setScore] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setScore(prev => (prev >= 100 ? 1 : prev + 1));
        }, 40); // Speed of count
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
                        transform: `translateZ(-60px) translateY(120px)`,
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

                {/* --- BACK FACE (ORANGE - RESTORED BRANDING) --- */}
                <div
                    className="absolute inset-0 border border-orange-600 bg-orange"
                    style={{
                        borderRadius: radius,
                        transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
                        backfaceVisibility: 'visible',
                        background: 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)'
                    }}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                            <QrCode size={70} className="relative text-white/90 drop-shadow-md" />
                        </div>
                        <div className="text-3xl font-bold font-mono tracking-tighter mb-2 subpixel-antialiased">GrowQR</div>
                        <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-[9px] font-mono tracking-widest backdrop-blur-sm subpixel-antialiased">SECURE_V4</div>
                    </div>
                </div>

                {/* --- FRONT FACE (GRAY - ANIMATED SCORE) --- */}
                <div
                    className="absolute inset-0 border border-gray-300 overflow-hidden"
                    style={{
                        borderRadius: radius,
                        transform: "translateZ(1px)",
                        background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-60 pointer-events-none z-30 mix-blend-overlay"></div>

                    <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center gap-6">

                        {/* Header Label */}
                        <div className="text-center">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">LIVE SCORE</span>
                        </div>

                        {/* Score Display */}
                        <div className="flex flex-col items-center">
                            <span className="text-7xl font-black font-mono tracking-tighter leading-none text-black drop-shadow-sm">{score}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full px-4">
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                                <div
                                    className="h-full bg-orange transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(255,106,47,0.5)]"
                                    style={{ width: `${score}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-2 px-1">
                                <span className="text-[8px] font-bold text-gray-400 font-mono">0</span>
                                <span className="text-[8px] font-bold text-gray-400 font-mono">100</span>
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
    icon: React.ElementType;
    size?: number;
}

export const EcoToken3D: React.FC<EcoToken3DProps> = ({
    label,
    icon: Icon,
    size = 120,
}) => {
    // DISABLED CONTINUOUS SPIN for Tokens
    const { isDragging, handleMouseDown, smoothRotateX, smoothRotateY } = use360Rotation(0, false);

    // REVERTED DEPTH: 8 (Thick)
    const depth = 8;
    const radius = "24px";
    const layerSpacing = 1;

    return (
        <div
            className={`relative perspective-800 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ width: size, height: size }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
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
                            borderRadius: radius,
                            transform: `translateZ(${-i * layerSpacing}px)`,
                            zIndex: -i,
                            width: '100%',
                            height: '100%',
                            filter: `brightness(${0.9 - (i * 0.02)})`
                        }}
                    />
                ))}

                {/* --- BACK FACE --- */}
                <div
                    className="absolute inset-0 bg-gray-200 border border-gray-300"
                    style={{
                        borderRadius: radius,
                        transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
                        backfaceVisibility: 'visible',
                        background: 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)'
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center transform scale-x-[-1]">
                        <Hexagon size={24} className="text-black/10" />
                    </div>
                </div>

                {/* --- FRONT FACE --- */}
                <div
                    className="absolute inset-0 border border-white/60 overflow-hidden"
                    style={{
                        borderRadius: radius,
                        transform: "translateZ(1px)",
                        background: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-70 pointer-events-none z-30 mix-blend-overlay"></div>

                    <div className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shadow-inner relative overflow-hidden group">
                            <div className={`absolute inset-0 bg-orange/10`}></div>
                            <Icon size={20} className="relative z-10 text-orange" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wide text-black text-center leading-tight subpixel-antialiased">
                            {label}
                        </span>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};