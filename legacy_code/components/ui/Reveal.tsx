import React, { useRef, useLayoutEffect } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  width = 'fit-content',
  delay = 0,
  duration = 0.8,
  className = "",
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !(window as any).gsap) return;

    const gsap = (window as any).gsap;

    let yOffset = 0;
    let xOffset = 0;

    switch (direction) {
      case 'up': yOffset = 50; break;
      case 'down': yOffset = -50; break;
      case 'left': xOffset = 50; break;
      case 'right': xOffset = -50; break;
    }

    const anim = gsap.fromTo(el,
      {
        y: yOffset,
        x: xOffset,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 0,
        x: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: "power3.out"
      }
    );

    return () => {
      anim.kill();
    };
  }, [direction, delay, duration]);

  return (
    <div style={{ width }} className={className}>
      <div ref={ref} className="will-change-transform">
        {children}
      </div>
    </div>
  );
};