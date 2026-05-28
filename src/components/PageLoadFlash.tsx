import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageLoadFlash() {
  const flashRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    // Hold briefly, then cleanly wipe out — no scale bounce
    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      delay: 0.3,
    }).to(
      flashRef.current,
      {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.65,
        ease: 'power3.inOut',
      },
      '-=0.1'
    );

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={flashRef}
      className="page-flash"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      <div ref={textRef} className="page-flash-text">
        ROWDY
      </div>
    </div>
  );
}
