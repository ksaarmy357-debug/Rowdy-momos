import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PageLoadFlash from '../components/PageLoadFlash';
import Navigation from '../components/Navigation';
import CustomCursor from '../components/CustomCursor';
import SpiralHero from '../sections/SpiralHero';
import Manifesto from '../sections/Manifesto';
import MenuWall from '../sections/MenuWall';
import Locations from '../sections/Locations';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoadFlash />
      <CustomCursor />
      <Navigation />

      <main className="relative">
        <SpiralHero />

        {/* Dark to Electric transition */}
        <div className="relative h-32 bg-gradient-to-b from-[#0e0f12] to-[#fe4a0f]" />

        <Manifesto />

        {/* Electric to Ash transition */}
        <div className="relative h-32 bg-gradient-to-b from-[#fe4a0f] to-[#d1c9c0]" />

        <MenuWall />

        {/* Ash to Signal transition */}
        <div className="relative h-32 bg-gradient-to-b from-[#d1c9c0] to-[#ffc400]" />

        <Locations />

        {/* Signal to Space transition */}
        <div className="relative h-32 bg-gradient-to-b from-[#ffc400] to-[#0e0f12]" />

        <Footer />
      </main>
    </>
  );
}
