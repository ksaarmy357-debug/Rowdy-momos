import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Massive CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer links stagger
      gsap.fromTo(
        '.footer-link-col',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.footer-links',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative bg-[#0e0f12] pt-20 lg:pt-32 pb-8"
    >
      {/* Big CTA */}
      <div ref={ctaRef} className="px-6 lg:px-12 mb-20 lg:mb-32">
        <button
          onClick={scrollToTop}
          className="group w-full text-left"
        >
          <h2
            className="font-display text-white font-500 leading-none transition-colors duration-300 group-hover:text-[#fe4a0f]"
            style={{
              fontSize: 'clamp(3rem, 14vw, 16rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
            }}
          >
            ORDER
            <br />
            <span className="text-[#fe4a0f] group-hover:text-[#ffc400] transition-colors duration-300">
              NOW
            </span>
          </h2>
        </button>
        <p className="text-white/40 text-sm mt-6 max-w-md">
          Available on Zomato, Swiggy, and for direct pickup. Free
          delivery within 3km of Thane West.
        </p>
      </div>

      {/* Footer Links */}
      <div className="footer-links border-t border-white/10 px-6 lg:px-12 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="footer-link-col">
            <h4 className="font-display text-white text-sm font-500 mb-4">
              ROWDY MŌMŌ
            </h4>
            <p className="text-white/40 text-xs leading-relaxed">
              Rebelliously steamed. Authentically Himalayan.
              Unapologetically Rowdy.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com/rowdymomocafethane"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#fe4a0f] transition-colors duration-300"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#fe4a0f] transition-colors duration-300"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="footer-link-col">
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Menu
            </h4>
            <ul className="space-y-2">
              {[
                'Steamed Momos',
                'Fried Momos',
                'Tandoori Momos',
                'Jhol Momos',
                'Noodles',
                'Boba Tea',
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/40 text-xs hover:text-white transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="footer-link-col">
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Locations
            </h4>
            <ul className="space-y-2">
              {[
                'Naupada, Thane West',
                'Mumbra, Thane',
                'Panchpakhadi',
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/40 text-xs hover:text-white transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Order */}
          <div className="footer-link-col">
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
              Order Online
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Zomato', url: 'https://www.zomato.com' },
                { label: 'Swiggy', url: 'https://www.swiggy.com' },
                { label: 'Call: 081088 18345', url: 'tel:08108818345' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 text-xs hover:text-[#fe4a0f] transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 mt-12 pt-6 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-xs">
          &copy; 2024 Rowdy Momo Cafe. All rights reserved.
        </p>
        <p className="text-white/20 text-xs">
          Thane, Maharashtra, India
        </p>
      </div>
    </footer>
  );
}
