import { useState, useMemo, useEffect } from "react";
import { galleryData } from "../data";
import { AnimatePresence } from "framer-motion";

import ImageViewer from "../components/common/ImageViewer";
import LoadingScreen from "../components/gallery/LoadingScreen";
import GalleryHeader from "../components/gallery/GalleryHeader";
import GalleryFilter from "../components/gallery/GalleryFilter";
import GalleryLinks from "../components/gallery/GalleryLinks";
import GalleryGrid from "../components/gallery/GalleryGrid";

const Gallery = () => {
    const [isIntroLoading, setIsIntroLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [visibleCount, setVisibleCount] = useState(20);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [selectedImage, setSelectedImage] = useState(null);

    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (isIntroLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isIntroLoading]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const threshold = 100;

            if (documentHeight - scrollPosition < threshold) {
                setIsFilterVisible(false);
            } else {
                setIsFilterVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isIntroLoading) return;

        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage, isIntroLoading]);

    const semesters = ["Semua", ...galleryData.map(d => d.semester)];

    const activeDriveLink = useMemo(() => {
        if (activeFilter === "Semua") return null;
        const selectedData = galleryData.find(d => d.semester === activeFilter);
        return selectedData?.driveLink || null;
    }, [activeFilter]);

    const activeVideoLink = useMemo(() => {
        if (activeFilter === "Semua") return null;
        const selectedData = galleryData.find(d => d.semester === activeFilter);
        return selectedData?.videoLink || null;
    }, [activeFilter]);

    const filteredImages = useMemo(() => {
        if (activeFilter === "Semua") {
            const semesterImages = galleryData
                .filter(data => data.images.length > 0)
                .map(data =>
                    data.images.map(img => ({ ...img, semester: data.semester }))
                );

            const interleaved = [];
            const maxLength = Math.max(...semesterImages.map(arr => arr.length), 0);

            for (let i = 0; i < maxLength; i++) {
                for (const imgs of semesterImages) {
                    if (i < imgs.length) {
                        interleaved.push(imgs[i]);
                    }
                }
            }

            return interleaved;
        } else {
            const selectedData = galleryData.find(d => d.semester === activeFilter);
            return selectedData ? selectedData.images.map(img => ({ ...img, semester: selectedData.semester })) : [];
        }
    }, [activeFilter]);

    const visibleImages = filteredImages.slice(0, visibleCount);
    const hasMore = visibleCount < filteredImages.length;

    const isLoading = useMemo(() => {
        if (visibleImages.length === 0) return false;
        return !visibleImages.every(img => loadedImages.has(img.id));
    }, [visibleImages, loadedImages]);

    const openModal = (img) => {
        setSelectedImage(img);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 20);
    };

    const handleImageLoad = (id) => {
        setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    const handleDownload = async (e, img) => {
        e.stopPropagation();
        try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `tekfo24-gallery-${img.id}.webp`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const [columnsCount, setColumnsCount] = useState(2);

    useEffect(() => {
        const calculateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1280) return 6;
            if (width >= 1024) return 5;
            if (width >= 768) return 4;
            if (width >= 640) return 3;
            return 2;
        };

        const handleResize = () => setColumnsCount(calculateColumns());
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const masonryColumns = useMemo(() => {
        const cols = Array.from({ length: columnsCount }, () => []);
        visibleImages.forEach((img, i) => {
            cols[i % columnsCount].push(img);
        });
        return cols;
    }, [visibleImages, columnsCount]);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
            <AnimatePresence mode="wait">
                {isIntroLoading && (
                    <LoadingScreen onComplete={() => setIsIntroLoading(false)} />
                )}
            </AnimatePresence>

            <GalleryHeader />

            <GalleryFilter
                isFilterVisible={isFilterVisible}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                semesters={semesters}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                setVisibleCount={setVisibleCount}
            />

            <section className="px-4 pb-24 min-h-[50vh] relative">
                <div className="max-w-[1400px] mx-auto relative">
                    <GalleryLinks
                        activeDriveLink={activeDriveLink}
                        activeVideoLink={activeVideoLink}
                        activeFilter={activeFilter}
                    />

                    <GalleryGrid
                        visibleImages={visibleImages}
                        isLoading={isLoading}
                        masonryColumns={masonryColumns}
                        handleImageLoad={handleImageLoad}
                        openModal={openModal}
                        handleDownload={handleDownload}
                        hasMore={hasMore}
                        handleLoadMore={handleLoadMore}
                        visibleCount={visibleCount}
                    />
                </div>
            </section>

            <ImageViewer
                selectedImage={selectedImage}
                onClose={closeModal}
                onDownload={handleDownload}
            />
        </div>
    );
};

export default Gallery;