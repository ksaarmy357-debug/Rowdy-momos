import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Locations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        '.locations-title',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content cards stagger
      gsap.fromTo(
        '.location-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Interior image parallax
      gsap.fromTo(
        '.interior-image',
        { scale: 1.2, y: 40 },
        {
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.interior-image-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative bg-[#ffc400] py-20 lg:py-32 overflow-hidden"
    >
      {/* Main Title */}
      <div className="locations-title px-6 lg:px-12 mb-16">
        <p className="text-[#0e0f12]/50 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
          Find Us
        </p>
        <h2
          className="font-display text-[#0e0f12] font-600 leading-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
          }}
        >
          THANE WEST
          <br />
          <span className="text-[#0e0f12]/40">MUMBAI</span>
        </h2>
      </div>

      {/* Content Grid */}
      <div
        ref={contentRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-12"
      >
        {/* Info Cards */}
        <div className="flex flex-col gap-6">
          {/* Address Card */}
          <div className="location-card bg-[#0e0f12] rounded-2xl p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#fe4a0f] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-white text-lg font-500 mb-2">
                  Rowdy Momo Cafe
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Shop 8, Ratnamani Society, Dada Patil Wadi, Naupada
                  Zone, Near Platform 1, Naupada, Thane West,
                  Maharashtra 400602
                </p>
                <p className="text-white/40 text-xs mt-2">
                  Also: Shop no 19, Central Empire, Moulana Azad Rd,
                  Mumbra, Thane
                </p>
              </div>
            </div>
          </div>

          {/* Hours & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="location-card bg-[#0e0f12] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#ffc400] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#0e0f12]" />
                </div>
                <h4 className="font-display text-white text-sm font-500">
                  Hours
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Mon - Sun</span>
                  <span className="text-white">4 PM - 11 PM</span>
                </div>
                <p className="text-[#ffc400] text-xs mt-2">
                  Opens soon at 4 PM
                </p>
              </div>
            </div>

            <div className="location-card bg-[#0e0f12] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#fe4a0f] flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-display text-white text-sm font-500">
                  Contact
                </h4>
              </div>
              <p className="text-white text-sm mb-2">081088 18345</p>
              <div className="flex items-center gap-1 mt-3">
                <Star className="w-3 h-3 text-[#ffc400] fill-[#ffc400]" />
                <span className="text-white text-sm font-medium">
                  4.3
                </span>
                <span className="text-white/40 text-xs ml-1">
                  (195 reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="location-card flex flex-wrap gap-3">
            {[
              'All you can eat',
              'Outdoor seating',
              'Reservations required',
              'Delivery available',
            ].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-[#0e0f12] text-white/70 text-xs font-medium rounded-full border border-[#0e0f12]/20"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Interior Image */}
        <div className="interior-image-container relative rounded-2xl overflow-hidden h-full min-h-[400px]">
          <img
            src="/images/interior-1.jpg"
            alt="Rowdy Momo Cafe Interior"
            className="interior-image w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white/80 text-sm font-medium">
              Naupada, Thane West
            </p>
            <p className="text-white/50 text-xs mt-1">
              Open now • Indoor & Outdoor seating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
