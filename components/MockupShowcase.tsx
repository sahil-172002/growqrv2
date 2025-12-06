import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import {
    Activity,
    Zap,
    Target,
    PieChart,
    ShieldCheck,
    Clock,
    Database,
    QrCode,
    Hexagon
} from 'lucide-react';

// --- TYPES & CONFIG ---
type MaterialType = 'glass' | 'matte' | 'dark' | 'orange';

interface MetricCardProps {
    width: string;
    height: string;
    depth?: number;
    radius?: string;
    color?: string; // Accent color hex
    material?: MaterialType;
    label: string;
    subLabel?: string;
    icon?: React.ComponentType<any>;
    children?: React.ReactNode;
    delay?: number; // For idle animation stagger
}

// --- REUSABLE 360° CARD ENGINE (IDENTITY-GRADE) ---
const MetricCard3D: React.FC<MetricCardProps> = ({
    width,
    height,
    depth = 12,
    radius = "24px",
    color = "#FF6A2F",
    material = 'glass',
    label,
    subLabel,
    icon: Icon,
    children,
    delay = 0
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Motion values for rotation (Accumulative)
    const rotateX = useMotionValue(0); // Tilt (Up/Down)
    const rotateY = useMotionValue(0); // Spin (Left/Right)

    // Smooth physics - Tuned for heavy feel
    const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20, mass: 1 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20, mass: 1 });

    // Idle Animation
    useAnimationFrame((t) => {
        if (!isDragging) {
            // Slow constant spin
            const time = t + (delay * 1000);
            rotateY.set(rotateY.get() + 0.05);
            // Gentle float
            rotateX.set(Math.sin(time / 1500) * 8);
        }
    });

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation(); // Prevent triggering parent drag if any
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        lastMousePos.current = { x: clientX, y: clientY };
    };

    // Global drag listeners
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


    // --- MATERIAL STYLES ---
    const getMaterialStyles = (isFront: boolean) => {
        const base = {
            glass: {
                bg: isFront ? 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)' : '#D1D5DB',
                border: 'border-white/50',
                text: 'text-black',
                subText: 'text-gray-400',
                layer: 'bg-gray-300 border-gray-400',
            },
            matte: {
                bg: isFront ? 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)' : '#E5E7EB',
                border: 'border-gray-200',
                text: 'text-gray-900',
                subText: 'text-gray-500',
                layer: 'bg-gray-200 border-gray-300',
            },
            dark: {
                bg: isFront ? 'linear-gradient(135deg, #18181B 0%, #09090B 100%)' : '#18181B',
                border: 'border-gray-700',
                text: 'text-white',
                subText: 'text-gray-400',
                layer: 'bg-gray-800 border-gray-900',
            },
            orange: {
                bg: isFront ? 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)' : '#C2410C',
                border: 'border-orange-400',
                text: 'text-white',
                subText: 'text-orange-200',
                layer: 'bg-orange-800 border-orange-900',
            }
        };
        return base[material];
    };

    const style = getMaterialStyles(true);
    const layerStyle = getMaterialStyles(false).layer;

    // Spacing between layers (1px creates the tightest, most realistic solid look)
    const layerSpacing = 1;

    return (
        <div
            className={`relative ${width} ${height} perspective-1000 cursor-grab active:cursor-grabbing select-none`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* SHADOW */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[20%] bg-black/30 blur-xl rounded-[100%] transition-all duration-300"
                style={{
                    y: 60, // Push shadow down
                    scale: useTransform(smoothRotateX, [-20, 20], [1.2, 0.8]),
                    opacity: useTransform(smoothRotateX, [-20, 20], [0.2, 0.4])
                }}
            />

            {/* 3D WRAPPER */}
            <motion.div
                className="relative w-full h-full"
                style={{
                    rotateX: smoothRotateX,
                    rotateY: smoothRotateY,
                    transformStyle: "preserve-3d"
                }}
            >
                {/* EXTRUSION LAYERS (Sides) */}
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 border ${layerStyle}`}
                        style={{
                            borderRadius: radius,
                            transform: `translateZ(${-i * layerSpacing}px)`,
                            zIndex: -i,
                            filter: `brightness(${0.95 - (i * 0.015)})`
                        }}
                    />
                ))}

                {/* BACK FACE */}
                <div
                    className={`absolute inset-0 ${style.bg} ${style.border} border`}
                    style={{
                        borderRadius: radius,
                        transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
                        backfaceVisibility: 'visible',
                        background: material === 'glass' ? 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' : undefined
                    }}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center p-6">
                        {/* Back Content - Simplified Branding */}
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mb-2">
                            <Hexagon size={20} className={material === 'dark' || material === 'orange' ? 'text-white/50' : 'text-black/20'} />
                        </div>
                        <div className={`text-[10px] font-bold tracking-widest uppercase ${style.subText}`}>
                            {label}
                        </div>
                        <div className={`text-[8px] font-mono mt-1 ${style.subText} opacity-50`}>
                            Q-SERIES GEN 2
                        </div>
                    </div>
                </div>

                {/* FRONT FACE */}
                <div
                    className={`absolute inset-0 ${style.border} border overflow-hidden`}
                    style={{
                        borderRadius: radius,
                        transform: "translateZ(1px)",
                        background: style.bg,
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)" // Inner highlight
                    }}
                >
                    {/* Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    {/* Lighting Sheen (Identity Style) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-60 pointer-events-none z-30 mix-blend-overlay"></div>

                    {/* Content */}
                    <div className="relative z-10 w-full h-full p-5 flex flex-col justify-between">

                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center border border-white/40 shadow-sm ${material === 'dark' ? 'bg-white/10' : 'bg-white/60'}`}
                                >
                                    {Icon && <Icon size={16} {...(material === 'orange' || material === 'dark' ? { className: 'text-white' } : { color })} />}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[9px] font-bold uppercase tracking-wider ${style.subText}`}>{subLabel || 'MODULE'}</span>
                                    <span className={`text-sm font-bold leading-tight ${style.text}`}>{label}</span>
                                </div>
                            </div>
                            {/* Live Dot */}
                            <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse ${material === 'orange' ? 'bg-white' : 'bg-green-500'}`}></div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 flex flex-col justify-center py-2">
                            {children}
                        </div>

                        {/* Footer */}
                        <div className={`pt-3 border-t ${material === 'dark' ? 'border-white/10' : 'border-black/5'} flex justify-between items-center text-[9px] font-mono ${style.subText}`}>
                            <span>ID: {Math.floor(Math.random() * 9000) + 1000}</span>
                            <QrCode size={12} className="opacity-50" />
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};


// --- THE SHOWCASE COMPONENT ---
export const MockupShowcase: React.FC = () => {
    return (
        <section className="py-32 bg-gray-50 overflow-hidden relative border-t border-gray-200">

            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-6 font-montreal">Q-SCORE™ Modules</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        The building blocks of your verified identity. Drag, spin, and flip any module to explore.
                    </p>
                </div>

                {/* --- THE 3D GRID --- */}
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-24 perspective-origin-center">

                    {/* 1. VELOCITY (The Core) - Orange Matte */}
                    <MetricCard3D
                        width="w-[200px]"
                        height="h-[200px]"
                        depth={18} // Reduced from 32
                        material="orange"
                        label="Velocity"
                        subLabel="CORE"
                        icon={Activity}
                        color="#FFFFFF"
                        delay={0}
                    >
                        <div className="flex flex-col items-center text-white">
                            <div className="text-5xl font-black tracking-tighter mb-2">98.2</div>
                            <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[98%]"></div>
                            </div>
                            <div className="flex justify-between w-full mt-2 text-[10px] font-bold text-white/60">
                                <span>GROWTH</span>
                                <span>+4.2%</span>
                            </div>
                        </div>
                    </MetricCard3D>

                    {/* 2. HISTORY (The Blade) - Glass Blue */}
                    <MetricCard3D
                        width="w-[150px]"
                        height="h-[260px]"
                        depth={12} // Reduced from 20
                        material="glass"
                        label="History"
                        subLabel="TIMELINE"
                        icon={Clock}
                        color="#3B82F6"
                        delay={0.5}
                    >
                        <div className="flex flex-col gap-3 h-full justify-center opacity-80">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <div className="w-1 h-8 bg-blue-100 rounded-full flex flex-col justify-end overflow-hidden">
                                        <div className="w-full bg-blue-500 rounded-full" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="w-12 h-1.5 bg-gray-200 rounded-sm"></div>
                                        <div className="w-8 h-1 bg-gray-100 rounded-sm"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </MetricCard3D>

                    {/* 3. CONSISTENCY (The Strip) - Dark Green */}
                    <MetricCard3D
                        width="w-[260px]"
                        height="h-[130px]"
                        depth={14} // Reduced from 24
                        material="dark"
                        label="Streak"
                        subLabel="ACTIVE"
                        icon={Target}
                        color="#10B981"
                        delay={0.2}
                    >
                        <div className="flex flex-col justify-center h-full">
                            <div className="flex gap-1 mb-3">
                                {[...Array(14)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-6 flex-1 rounded-[2px] ${i > 10 ? 'bg-gray-700' : 'bg-green-500'}`}
                                        style={{ opacity: i > 10 ? 1 : 0.6 + (i * 0.04) }}
                                    ></div>
                                ))}
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-2xl font-bold text-white">42 Days</div>
                                    <div className="text-[10px] text-gray-500 uppercase">Consistent Output</div>
                                </div>
                                <Zap size={20} className="text-green-500 fill-current" />
                            </div>
                        </div>
                    </MetricCard3D>

                    {/* 4. VERIFIED (The Chip) - Glass Purple */}
                    <MetricCard3D
                        width="w-[130px]"
                        height="h-[130px]"
                        depth={10} // Reduced from 28 (Thinnest)
                        radius="32px"
                        material="glass"
                        label="Token"
                        subLabel="AUTH"
                        icon={ShieldCheck}
                        color="#8B5CF6"
                        delay={0.7}
                    >
                        <div className="flex items-center justify-center h-full">
                            <div className="w-14 h-14 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center shadow-inner relative overflow-hidden">
                                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.3)_360deg)] animate-[spin_3s_linear_infinite]"></div>
                                <ShieldCheck size={28} className="text-purple-600 relative z-10" />
                            </div>
                        </div>
                    </MetricCard3D>

                    {/* 5. NETWORK (The Slab) - Matte White/Pink */}
                    <MetricCard3D
                        width="w-[280px]"
                        height="h-[180px]"
                        depth={12} // Reduced from 16
                        material="matte"
                        label="Network"
                        subLabel="GRAPH"
                        icon={PieChart}
                        color="#EC4899"
                        delay={0.3}
                    >
                        <div className="relative h-full w-full flex items-center justify-center">
                            <div className="absolute inset-0 border border-dashed border-gray-200 rounded-lg opacity-50"></div>
                            <div className="relative z-10 flex gap-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-white border border-pink-200 shadow-sm flex items-center justify-center">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                        </div>
                                        <div className="w-1 h-8 bg-pink-100/50 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                            {/* Connections */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
                                <path d="M70 90 Q 140 50 210 90" stroke="#EC4899" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                    </MetricCard3D>

                    {/* 6. RESOURCES (The Stack) - Dark Indigo */}
                    <MetricCard3D
                        width="w-[180px]"
                        height="h-[180px]"
                        depth={24} // Reduced from 40 (Thickest)
                        radius="24px"
                        material="dark"
                        label="Assets"
                        subLabel="DATA"
                        icon={Database}
                        color="#6366F1"
                        delay={0.6}
                    >
                        <div className="flex flex-col justify-end h-full gap-2">
                            <div className="w-full p-2 bg-indigo-900/30 rounded border border-indigo-500/30 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                <div className="w-12 h-1 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="w-full p-2 bg-indigo-900/50 border border-indigo-500/50 rounded shadow-lg flex items-center gap-2 scale-105">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_5px_#818CF8]"></div>
                                <div className="w-16 h-1 bg-white/20 rounded-full"></div>
                            </div>
                            <div className="w-full p-2 bg-indigo-900/30 rounded border border-indigo-500/30 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                <div className="w-8 h-1 bg-white/10 rounded-full"></div>
                            </div>
                        </div>
                    </MetricCard3D>

                </div>
            </div>
        </section>
    );
};
