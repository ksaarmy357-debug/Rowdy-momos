import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPIRAL_TEXT = 'ROWDY \u2022 ';
const TOTAL_ITEMS = 40;
const HALF = TOTAL_ITEMS / 2;

export default function SpiralHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spiral1Ref = useRef<HTMLDivElement>(null);
  const spiral2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const firstHalf = Array.from({ length: HALF }, (_, i) => ({
    text: SPIRAL_TEXT,
    angle: i * 18,
    key: `s1-${i}`,
  }));

  const secondHalf = Array.from({ length: HALF }, (_, i) => ({
    text: SPIRAL_TEXT,
    angle: i * 18,
    key: `s2-${i}`,
  }));

  useEffect(() => {
    // Title fades out on scroll — keep this subtle effect
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        yPercent: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0e0f12]"
    >
      {/* Spiral Background — fixed speed, very subtle opacity */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={spiral1Ref}
          className="spiral-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            gap: '10px',
            fontFamily: "'Clash Display', sans-serif",
          }}
        >
          {firstHalf.map((item) => (
            <span
              key={item.key}
              className="spiral-item"
              style={{
                position: 'absolute',
                fontSize: '3rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.07)',
                transform: `rotate(${item.angle}deg) translateY(-80px)`,
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        <div
          ref={spiral2Ref}
          className="spiral-container-2"
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            gap: '10px',
            fontFamily: "'Clash Display', sans-serif",
          }}
        >
          {[...secondHalf].reverse().map((item) => (
            <span
              key={item.key}
              className="spiral-item"
              style={{
                position: 'absolute',
                fontSize: '3rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.07)',
                transform: `rotate(${item.angle}deg) translateY(-80px)`,
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Center Title */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <h1
          className="font-display font-500 text-white text-center leading-none tracking-tight"
          style={{
            fontSize: 'clamp(4rem, 18vw, 20rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.8,
          }}
        >
          GET ROWDY
        </h1>
        <p className="mt-6 text-white/50 text-sm tracking-[0.3em] uppercase font-medium">
          Himalayan Street Food • Thane, Mumbai
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
