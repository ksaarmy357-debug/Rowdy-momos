import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MENU_IMAGES = [
  '/images/momo-1.jpg', '/images/momo-2.jpg', '/images/momo-3.jpg',
  '/images/momo-4.jpg', '/images/momo-5.jpg', '/images/momo-6.jpg',
  '/images/momo-7.jpg', '/images/momo-8.jpg', '/images/momo-9.jpg',
  '/images/momo-10.jpg', '/images/momo-11.jpg', '/images/momo-12.jpg',
  '/images/momo-1.jpg', '/images/momo-3.jpg', '/images/momo-5.jpg',
  '/images/momo-7.jpg', '/images/momo-9.jpg', '/images/momo-11.jpg',
  '/images/momo-2.jpg', '/images/momo-4.jpg', '/images/momo-6.jpg',
  '/images/momo-8.jpg', '/images/momo-10.jpg', '/images/momo-12.jpg',
];

const MENU_ITEMS = [
  'Chilli Oil Momos', 'Crispy Fried Momos', 'Chicken Thukpa',
  'Ramen Noodles', 'Jhol Momos', 'Taro Boba Tea',
  'Potstickers', 'Tandoori Momos', 'Cheese Corn Momos',
  'Chocolate Momos', 'Momo Platter', 'Schezwan Noodles',
  'Steamed Momos', 'Soup Momos', 'Spicy Momos',
  'Paneer Momos', 'Veg Momos', 'Chicken Momos',
  'Fried Momos', 'Noodle Bowl', 'Boba Tea',
  'Momo Combo', 'Dessert Momos', 'Noodles',
];

export default function MenuWall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridItems = Array.from(grid.children) as HTMLElement[];

    // Subtle staggered fade-in on scroll — no wild 3D rotations
    gridItems.forEach((el, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: (i % 4) * 0.07, // subtle stagger per column
        }
      );

      timelinesRef.current.push(tl);
    });

    // Section header entrance
    const menuHeader = sectionRef.current?.querySelector('.menu-header');
    if (menuHeader) {
      gsap.fromTo(
        menuHeader,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      timelinesRef.current.forEach((tl) => tl.kill());
      timelinesRef.current = [];
    };
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="menu-wall-section flex-col"
    >
      {/* Header */}
      <div className="menu-header w-full pt-20 pb-8 px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-[#0e0f12]/50 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              The Menu
            </p>
            <h2
              className="font-display text-[#0e0f12] font-600 leading-none"
              style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
              }}
            >
              THE WALL
            </h2>
          </div>
          <p className="text-[#0e0f12]/60 text-sm max-w-xs leading-relaxed">
            24 varieties of momos, noodles, and boba. Every dish is a
            rebellion against boring food.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="menu-wall-grid">
        {MENU_IMAGES.map((src, i) => (
          <div
            key={i}
            className="menu-wall-item"
            data-order={i}
          >
            <div className="item__inner relative">
              <img src={src} alt={MENU_ITEMS[i]} loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-medium tracking-wide">
                  {MENU_ITEMS[i]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
