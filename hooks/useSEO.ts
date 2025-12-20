import { useEffect } from 'react';

/**
 * SEO Configuration for a page
 */
interface SEOConfig {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogType?: 'website' | 'article';
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
}

/**
 * Default SEO values for GrowQR
 */
const DEFAULT_SEO = {
    siteName: 'GrowQR',
    defaultImage: 'https://growqr.ai/logo.jpg',
    baseUrl: 'https://growqr.ai',
    twitterHandle: '@Growqr',
};

/**
 * Custom hook to update page meta tags dynamically
 * Uses native DOM manipulation for React 19 compatibility
 * 
 * @param config - SEO configuration for the page
 */
export const useSEO = (config: SEOConfig): void => {
    useEffect(() => {
        const {
            title,
            description,
            keywords,
            canonicalUrl,
            ogType = 'website',
            ogImage = DEFAULT_SEO.defaultImage,
            twitterCard = 'summary_large_image',
        } = config;

        // Full title - don't append site name if already in title (for homepage)
        const fullTitle = title.includes('GrowQR') ? title : `${title} | ${DEFAULT_SEO.siteName}`;

        // Update document title
        document.title = fullTitle;

        // Helper function to update or create meta tag
        const updateMetaTag = (selector: string, content: string, attribute: 'name' | 'property' = 'name') => {
            let element = document.querySelector(selector) as HTMLMetaElement;
            if (element) {
                element.content = content;
            } else {
                element = document.createElement('meta');
                const attrName = selector.includes('property=') ? 'property' : 'name';
                const attrValue = selector.match(/=["']([^"']+)["']/)?.[1] || '';
                element.setAttribute(attrName, attrValue);
                element.content = content;
                document.head.appendChild(element);
            }
        };

        // Update standard meta tags
        updateMetaTag('meta[name="description"]', description);
        if (keywords) {
            updateMetaTag('meta[name="keywords"]', keywords);
        }

        // Update Open Graph tags
        updateMetaTag('meta[property="og:title"]', fullTitle, 'property');
        updateMetaTag('meta[property="og:description"]', description, 'property');
        updateMetaTag('meta[property="og:type"]', ogType, 'property');
        updateMetaTag('meta[property="og:image"]', ogImage, 'property');
        if (canonicalUrl) {
            updateMetaTag('meta[property="og:url"]', `${DEFAULT_SEO.baseUrl}${canonicalUrl}`, 'property');
        }

        // Update Twitter tags
        updateMetaTag('meta[name="twitter:title"]', fullTitle);
        updateMetaTag('meta[name="twitter:description"]', description);
        updateMetaTag('meta[name="twitter:card"]', twitterCard);
        updateMetaTag('meta[name="twitter:image"]', ogImage);

        // Update canonical link
        if (canonicalUrl) {
            let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (canonical) {
                canonical.href = `${DEFAULT_SEO.baseUrl}${canonicalUrl}`;
            }
        }

        // Cleanup: Reset to default on unmount (optional - keeps previous page meta)
        return () => {
            // Meta tags persist between navigations for smoother UX
            // Reset only the title to default if needed
        };
    }, [config.title, config.description, config.keywords, config.canonicalUrl, config.ogImage, config.ogType, config.twitterCard]);
};

/**
 * Pre-defined SEO configurations for each page
 */
export const SEO_CONFIGS = {
    home: {
        title: 'GrowQR | AI Proof-of-Skill Platform | Q-Score™ Talent Verification',
        description: 'An AI-driven proof-of-skill platform for individuals, enterprises, institutions, and smart cities — all powered by a unique QR.',
        keywords: 'GrowQR, GrowQR.ai, growqr ai, growqr platform, Q-Score, qscore, proof of skill, skill verification, talent verification, workforce intelligence, AI talent platform',
        canonicalUrl: '/',
    },
    about: {
        title: 'About GrowQR | Our Mission & Story',
        description: 'Learn about GrowQR\'s mission to make talent visible, verified, and valuable. Discover how Q-Score™ is transforming workforce intelligence with AI-powered skill verification.',
        keywords: 'GrowQR about, GrowQR mission, skill verification company, Q-Score platform, talent verification startup',
        canonicalUrl: '/about',
    },
    vision: {
        title: 'Our Vision | Future of Workforce Intelligence',
        description: 'Explore GrowQR\'s vision for the future of work. See how Q-Score™ and AI-powered skill verification are shaping global workforce intelligence and talent ecosystems.',
        keywords: 'GrowQR vision, future of work, workforce intelligence, skill verification future, Q-Score roadmap',
        canonicalUrl: '/vision',
    },
    contact: {
        title: 'Contact Us | Enterprise & Individual Support',
        description: 'Contact GrowQR for inquiries about Q-Score™, enterprise solutions, or general support. Offices in Princeton, NJ (USA) and Noida, India. We respond within 24 hours.',
        keywords: 'contact GrowQR, GrowQR support, enterprise solutions, Q-Score help, skill verification contact',
        canonicalUrl: '/contact',
    },
};

export default useSEO;
