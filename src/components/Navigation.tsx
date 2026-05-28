import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0e0f12]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        <div className="font-display text-xl font-600 tracking-tight text-white">
          ROWDY MŌMŌ
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Menu', id: 'menu' },
            { label: 'Vibe', id: 'manifesto' },
            { label: 'Locations', id: 'locations' },
            { label: 'Order Online', id: 'footer' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToSection('footer')}
          className="px-5 py-2 rounded-full text-sm font-semibold bg-[#fe4a0f] text-[#0e0f12] hover:bg-[#ffc400] transition-colors duration-300"
        >
          Order Now
        </button>
      </div>
    </nav>
  );
}
