import React, { useRef, useLayoutEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { CheckCircle2 } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface FeatureSectionProps {
  id: string;
  category: string;
  headline: React.ReactNode;
  features: Feature[];
  ctaText: string;
  imageAlign?: 'left' | 'right';
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  id,
  category,
  headline,
  features,
  ctaText,
  imageAlign = 'right',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !imageRef.current) return;

    // Parallax effect for the image container
    gsap.fromTo(imageRef.current, 
      { y: 50 },
      {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section id={id} ref={containerRef} className="py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${imageAlign === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>
          
          {/* Text Content */}
          <div className="flex-1">
            <Reveal direction="up">
              <span className="text-orange text-sm font-bold tracking-widest uppercase mb-4 block">{category}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
                {headline}
              </h2>
            </Reveal>

            <div className="space-y-8 mb-10">
              {features.map((feature, index) => (
                <Reveal key={index} delay={index * 0.1} direction="up" width="100%">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-orange w-6 h-6 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xl font-semibold text-black mb-2">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed font-medium">{feature.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <button className="group flex items-center gap-2 text-black font-bold border-b-2 border-orange pb-1 hover:text-orange transition-colors text-lg">
                {ctaText}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Reveal>
          </div>

          {/* Visual Side */}
          <div className="flex-1 w-full">
            <Reveal direction={imageAlign === 'left' ? 'right' : 'left'} className="w-full">
              <div ref={imageRef} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border border-gray-200 group hover:border-orange/30 transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 to-transparent opacity-50"></div>
                
                {/* Abstract UI Mockup */}
                <div className="absolute inset-8 bg-white rounded-lg border border-gray-100 p-8 flex flex-col gap-6 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                     <div className="h-4 w-1/4 bg-gray-200 rounded-full"></div>
                     <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                  </div>
                  
                  <div className="flex gap-6 items-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange/10 to-orange/5 rounded-full flex items-center justify-center border border-orange/20">
                       <span className="text-3xl font-bold text-orange">98</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                       <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                       <div className="h-4 w-2/3 bg-gray-100 rounded-full"></div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 w-full my-2"></div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 bg-gray-50 rounded-lg border border-gray-100"></div>
                    <div className="h-20 bg-gray-50 rounded-lg border border-gray-100"></div>
                    <div className="h-20 bg-gray-50 rounded-lg border border-gray-100"></div>
                  </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute top-12 -right-6 w-32 h-32 bg-orange/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-6 left-8 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};