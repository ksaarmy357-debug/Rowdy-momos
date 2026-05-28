import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskHoleRef = useRef<HTMLDivElement>(null);
  const maskVideoRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLHeadingElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video circle: fade in gently, no scale drama
      gsap.fromTo(
        maskVideoRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Mask hole: just ensure it's visible at full scale
      gsap.set(maskHoleRef.current, { scale: 1 });

      // Text lines reveal — keep this, it's clean
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="manifesto-section"
    >
      <div className="manifesto-text-wrapper">
        <h2 ref={addToRefs}>WE ARE</h2>
        <h2 ref={addToRefs}>
          REBELLIOUSLY
          <div
            ref={maskHoleRef}
            className="text-mask-hole"
            style={{ transform: 'translateY(2vw)' }}
          />
        </h2>
        <h2 ref={addToRefs}>STEAMED.</h2>
      </div>

      <div ref={maskVideoRef} className="mask-video" style={{ opacity: 0 }}>
        <video
          src="/videos/chili-oil-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Sub-text */}
      <div className="mt-16 text-center px-6">
        <p className="text-[#0e0f12]/70 text-base max-w-xl mx-auto leading-relaxed">
          AUTHENTICALLY HIMALAYAN. UNAPOLOGETICALLY ROWDY. WE BRING THE
          STREETS OF KATHMANDU TO THE HEART OF THANE.
        </p>
      </div>
    </section>
  );
}
