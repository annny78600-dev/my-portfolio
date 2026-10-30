import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ParallaxHero = ({ bgImage, alt = '', children, className = '' }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    if (!imageRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.to(imageRef.current, {
      yPercent: 30,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={`relative h-screen overflow-hidden ${className}`}>
      {bgImage && (
        <div className="absolute inset-0 z-0 h-[120%] w-full">
          <img ref={imageRef} src={bgImage} alt={alt} className="h-full w-full object-cover" />
        </div>
      )}
      {children}
    </section>
  );
};

export default ParallaxHero;