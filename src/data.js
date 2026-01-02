export const galleryData = [
    {
        id: 1,
        semester: "Semester 1",
        year: "2024",
        theme: "The Beginning",
        description: "Masa-masa orientasi penuh semangat (dan kebingungan).",
        images: [
            ...Array.from({ length: 138 }, (_, i) => ({
                id: `smt1-afterUAS-${i + 1}`,
                src: `/assets/gallery/smt1/afterUAS-webp/foto (${i + 1}).webp`,
                alt: `Moment Semester 1 - ${i + 1}`,
                category: "After UAS"
            })),

            ...Array.from({ length: 134 }, (_, i) => ({
                id: `smt1-sekelas-${i + 1}`,
                src: `/assets/gallery/smt1/sekelas-webp/foto (${i + 1}).webp`,
                alt: `Kebersamaan Sekelas Smt 1 - ${i + 1}`,
                category: "Classroom"
            }))
        ]
    },
    {
        id: 2,
        semester: "Semester 2",
        year: "2024/2025",
        theme: "Solidarity Forming",
        description: "Mulai kenal karakter masing-masing, mulai kompak, dan mulai banyak tugas.",
        images: [
            ...Array.from({ length: 78 }, (_, i) => ({
                id: `smt2-afterUAS-${i + 1}`,
                src: `/assets/gallery/smt2/afterUAS-webp/foto (${i + 1}).webp`,
                alt: `After UAS Semester 2 - ${i + 1}`,
                category: "Events"
            })),
            ...Array.from({ length: 70 }, (_, i) => ({
                id: `smt2-sekelas-${i + 1}`,
                src: `/assets/gallery/smt2/sekelas-webp/foto (${i + 1}).webp`,
                alt: `Kebersamaan Sekelas - ${i + 1}`,
                category: "Classroom"
            })),
        ]
    },
    {
        id: 3,
        semester: "Semester 3",
        year: "2025",
        theme: "Level Up",
        description: "Menghadapi tantangan mata kuliah inti dan projek besar.",
        images: []
    }
];

export const getAllGalleryImages = () => {
    return galleryData.flatMap(semester => semester.images);
};

export const getRandomImages = (count = 5) => {
    const all = getAllGalleryImages();
    const shuffled = [...all].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
