import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, SkipForward, Music } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const PLAYLIST = [
    "/assets/music/Sheila On 7 - Sahabat Sejati.mp3",
    "/assets/music/NIDJI - Laskar Pelangi.mp3",
    "/assets/music/coldplay - Fix You.mp3"
];

const GalleryBGM = ({ isIntroLoading, isFilterVisible }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const audioRef = useRef(null);
    useEffect(() => {
        if (!isIntroLoading && audioRef.current) {
            audioRef.current.volume = 0.5;

            const events = ["scroll", "click", "touchstart", "keydown", "mousedown", "wheel"];

            const handleInteractionToPlay = () => {
                if (audioRef.current && audioRef.current.paused) {
                    audioRef.current.play()
                        .then(() => {
                            setIsPlaying(true);
                            cleanupListeners();
                        })
                        .catch(() => {
                        });
                }
            };

            const cleanupListeners = () => {
                events.forEach(event => {
                    window.removeEventListener(event, handleInteractionToPlay);
                });
            };

            events.forEach(event => {
                window.addEventListener(event, handleInteractionToPlay);
            });

            return cleanupListeners;
        }
    }, [isIntroLoading]);

    // Mengganti lagu & memastikan langsung diputar
    useEffect(() => {
        if (audioRef.current && !isIntroLoading) {
            // Ketika index berubah, load lagu baru
            audioRef.current.src = PLAYLIST[trackIndex];
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(() => { });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackIndex]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => { });
            }
        }
    };

    const nextTrack = () => {
        setTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true); // Jika di-"next", otomatis nyalakan lagunya
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={PLAYLIST[trackIndex]}
                onEnded={nextTrack}
                preload="auto"
            />

            <AnimatePresence>
                {!isIntroLoading && isFilterVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-8 left-4 md:bottom-8 md:left-8 z-40 flex items-center bg-white/80 backdrop-blur-md border border-zinc-200 shadow-xl rounded-full p-1"
                    >
                        <div className="hidden sm:flex items-center gap-1.5 pl-2.5 pr-2 border-r border-zinc-200">
                            <Music size={12} className={isPlaying ? "text-green-500 animate-pulse" : "text-zinc-400"} />
                            <span className="text-[11px] font-semibold text-zinc-600">Track {trackIndex + 1}/3</span>
                        </div>

                        <button
                            onClick={togglePlay}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-800 hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
                            title={isPlaying ? "Jeda Musik" : "Putar Musik"}
                        >
                            {isPlaying ? (
                                <div className="relative flex items-center justify-center">
                                    <Volume2 size={14} />
                                    <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                    </span>
                                </div>
                            ) : (
                                <VolumeX size={14} className="text-zinc-500" />
                            )}
                        </button>

                        <button
                            onClick={nextTrack}
                            className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-800 hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
                            title="Lagu Selanjutnya"
                        >
                            <SkipForward size={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GalleryBGM;
