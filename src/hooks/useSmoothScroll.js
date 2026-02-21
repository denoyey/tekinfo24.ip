import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Global Lenis instance — accessible from anywhere via getLenis()
 */
let lenisInstance = null;

export const getLenis = () => lenisInstance;

/**
 * useSmoothScroll — Antigravity-style lerp smooth scroll.
 * 
 * Menggunakan Lenis untuk menghasilkan efek scroll yang halus
 * dengan momentum — persis seperti antigravity.google
 */
const useSmoothScroll = (options = {}) => {
    const rafId = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: options.lerp ?? 0.08,
            duration: options.duration ?? 1.2,
            smoothWheel: options.smoothWheel ?? true,
            wheelMultiplier: options.wheelMultiplier ?? 0.8,
            touchMultiplier: options.touchMultiplier ?? 1.5,
            infinite: false,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
        });

        lenisInstance = lenis;

        function raf(time) {
            lenis.raf(time);
            rafId.current = requestAnimationFrame(raf);
        }

        rafId.current = requestAnimationFrame(raf);

        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            lenis.destroy();
            lenisInstance = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useSmoothScroll;
