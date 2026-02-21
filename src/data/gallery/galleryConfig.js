/**
 * ============================================================
 * Gallery Configuration
 * ============================================================
 * 
 * File ini adalah SATU-SATUNYA tempat untuk mengelola data gallery.
 * 
 * Cara menambah semester baru:
 *   1. Tambahkan object baru di array `galleryConfig`
 *   2. Isi metadata (id, semester, year, theme, description)
 *   3. Tambahkan categories dengan jumlah foto dan folder path
 *   4. Selesai! Tidak perlu buat file baru.
 * 
 * Cara menambah kategori foto di semester yang sudah ada:
 *   1. Cari semester yang diinginkan
 *   2. Tambahkan object baru di array `categories`
 *   3. Selesai!
 * 
 * Cara menambah link Google Drive:
 *   1. Tambahkan property `driveLink` di semester yang diinginkan
 *   2. Banner akan otomatis muncul saat filter semester tsb aktif
 * 
 * ============================================================
 */

export const galleryConfig = [
    {
        id: 1,
        semester: "Semester 1",
        year: "2024",
        theme: "The Beginning",
        description: "Masa-masa orientasi penuh semangat (dan kebingungan).",
        driveLink: "https://bit.ly/40m0vch",
        videoLink: "https://bit.ly/3ZNXh18",
        categories: [
            {
                prefix: "afterUAS",
                count: 138,
                folder: "smt1/afterUAS-webp",
                alt: "Moment Semester 1",
                category: "After UAS",
            },
            {
                prefix: "sekelas",
                count: 134,
                folder: "smt1/sekelas-webp",
                alt: "Kebersamaan Sekelas Smt 1",
                category: "Classroom",
            },
        ],
    },
    {
        id: 2,
        semester: "Semester 2",
        year: "2024/2025",
        theme: "Solidarity Forming",
        description: "Mulai kenal karakter masing-masing, mulai kompak, dan mulai banyak tugas.",
        driveLink: "https://bit.ly/4s0bhk6",
        categories: [
            {
                prefix: "afterUAS",
                count: 77,
                folder: "smt2/afterUAS-webp",
                alt: "After UAS Semester 2",
                category: "Events",
            },
            {
                prefix: "sekelas",
                count: 70,
                folder: "smt2/sekelas-webp",
                alt: "Kebersamaan Sekelas",
                category: "Classroom",
            },
        ],
    },
    {
        id: 3,
        semester: "Semester 3",
        year: "2025",
        theme: "Level Up",
        description: "Menghadapi tantangan mata kuliah inti dan projek besar.",
        driveLink: "https://bit.ly/4aqXCgg",
        videoLink: "https://bit.ly/3OCW7D4",
        categories: [
            {
                prefix: "afterUAS",
                count: 113,
                folder: "smt3/afterUAS-webp",
                alt: "After UAS Semester 3",
                category: "Events",
            },
            // {
            //     prefix: "sekelas",
            //     count: 70,
            //     folder: "smt3/sekelas-webp",
            //     alt: "Kebersamaan Sekelas",
            //     category: "Classroom",
            // },
        ],
    },
    {
        id: 4,
        semester: "Semester 4",
        year: "2026",
        theme: "The Peak",
        description: "Masa-masa paling sibuk, menghadapi tantangan mata kuliah inti dan projek besar.",
        // driveLink: "https://bit.ly/4aqXCgg",
        categories: [
            // {
            //     prefix: "afterUAS",
            //     count: 113,
            //     folder: "smt4/afterUAS-webp",
            //     alt: "After UAS Semester 4",
            //     category: "Events",
            // },
            // {
            //     prefix: "sekelas",
            //     count: 70,
            //     folder: "smt3/sekelas-webp",
            //     alt: "Kebersamaan Sekelas",
            //     category: "Classroom",
            // },
        ],
    },
];
