import { galleryConfig } from './galleryConfig';

/**
 * Build gallery data dari config.
 * Function ini otomatis generate array images berdasarkan
 * count dan folder yang didefinisikan di galleryConfig.
 */
const buildGalleryData = (config) => {
    return config.map((semester) => ({
        id: semester.id,
        semester: semester.semester,
        year: semester.year,
        theme: semester.theme,
        description: semester.description,
        driveLink: semester.driveLink || null,
        videoLink: semester.videoLink || null,
        images: semester.categories.flatMap((cat) =>
            Array.from({ length: cat.count }, (_, i) => ({
                id: `smt${semester.id}-${cat.prefix}-${i + 1}`,
                src: `/assets/gallery/${cat.folder}/foto (${i + 1}).webp`,
                alt: `${cat.alt} - ${i + 1}`,
                category: cat.category,
            }))
        ),
    }));
};

export const galleryData = buildGalleryData(galleryConfig);
