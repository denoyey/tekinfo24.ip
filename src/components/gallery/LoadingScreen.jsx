import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-999 flex items-center justify-center bg-[#1a1a1a] text-white"
            initial={{ y: 0 }}
            exit={{
                y: "-100%",
                transition: {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1]
                }
            }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
            >
                <span className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold tracking-tighter block text-center">
                    Gallery.
                </span>
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
