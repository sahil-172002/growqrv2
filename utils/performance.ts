/**
 * Performance Detection & Optimization Utility
 * Detects device capability and provides optimization settings
 */

export type PerformanceTier = 'high' | 'medium' | 'low';

interface PerformanceSettings {
    tier: PerformanceTier;
    reduceMotion: boolean;
    enableBlur: boolean;
    enableShadows: boolean;
    enableParticles: boolean;
    animationDuration: number; // multiplier (1 = normal, 0.5 = faster)
    maxAnimatedElements: number;
    enable3DTransforms: boolean;
}

// Detect device performance tier
export const detectPerformanceTier = (): PerformanceTier => {
    if (typeof window === 'undefined') return 'high';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return 'low';

    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory;
    if (deviceMemory && deviceMemory <= 2) return 'low';
    if (deviceMemory && deviceMemory <= 4) return 'medium';

    // Check hardware concurrency (CPU cores)
    const cpuCores = navigator.hardwareConcurrency;
    if (cpuCores && cpuCores <= 2) return 'low';
    if (cpuCores && cpuCores <= 4) return 'medium';

    // Check connection speed (if available)
    const connection = (navigator as any).connection;
    if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'low';
        if (effectiveType === '3g') return 'medium';
    }

    // Check for mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isOldIOS = /iPhone OS [789]_/i.test(navigator.userAgent);
    const isOldAndroid = /Android [456]\./i.test(navigator.userAgent);

    if (isOldIOS || isOldAndroid) return 'low';
    if (isMobile) return 'medium';

    // Check screen size (small screens often = lower power devices)
    if (window.innerWidth < 768) return 'medium';

    return 'high';
};

// Get optimized settings based on tier
export const getPerformanceSettings = (tier?: PerformanceTier): PerformanceSettings => {
    const detectedTier = tier || detectPerformanceTier();

    const settings: Record<PerformanceTier, PerformanceSettings> = {
        high: {
            tier: 'high',
            reduceMotion: false,
            enableBlur: true,
            enableShadows: true,
            enableParticles: true,
            animationDuration: 1,
            maxAnimatedElements: 100,
            enable3DTransforms: true,
        },
        medium: {
            tier: 'medium',
            reduceMotion: false,
            enableBlur: true,
            enableShadows: true,
            enableParticles: false, // Disable particles
            animationDuration: 0.8, // Slightly faster
            maxAnimatedElements: 50,
            enable3DTransforms: true,
        },
        low: {
            tier: 'low',
            reduceMotion: true,
            enableBlur: false, // Blur is expensive
            enableShadows: false, // Shadows are expensive
            enableParticles: false,
            animationDuration: 0.5, // Much faster
            maxAnimatedElements: 20,
            enable3DTransforms: false, // Use 2D transforms only
        },
    };

    return settings[detectedTier];
};

// React hook for performance settings
import { useState, useEffect } from 'react';

export const usePerformanceSettings = (): PerformanceSettings => {
    const [settings, setSettings] = useState<PerformanceSettings>(getPerformanceSettings('high'));

    useEffect(() => {
        // Detect on client side
        const detected = getPerformanceSettings();
        setSettings(detected);

        // Log for debugging
        console.log(`[Performance] Detected tier: ${detected.tier}`);
    }, []);

    return settings;
};

// CSS class generator based on performance
export const getPerformanceClasses = (settings: PerformanceSettings): string => {
    const classes: string[] = [`perf-${settings.tier}`];

    if (!settings.enableBlur) classes.push('no-blur');
    if (!settings.enableShadows) classes.push('no-shadows');
    if (settings.reduceMotion) classes.push('reduce-motion');

    return classes.join(' ');
};

// GSAP optimization helper
export const getGSAPConfig = (settings: PerformanceSettings) => {
    return {
        duration: (base: number) => base * settings.animationDuration,
        ease: settings.tier === 'low' ? 'power1.out' : 'power2.out',
        force3D: settings.enable3DTransforms,
        willChange: settings.tier !== 'low' ? 'transform, opacity' : 'auto',
    };
};
