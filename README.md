# Tekinfo 24 - Universitas Insan Pembangunan Indonesia

![Tekinfo 24 Banner](/public/assets/favicon/logo_ti.png)

**Teknologi Informasi Angkatan 2024**  
Platform digital resmi untuk dokumentasi, informasi, dan arsip kenangan kelas Teknologi Informasi 24, Universitas Insan Pembangunan Indonesia. Website ini dikembangkan untuk mencatat perjalanan kami dari awal semester hingga lulus bersama.

> _"Santai, Solid, Siap Lulus Bareng."_

## ✨ Fitur Utama

Website ini dibangun dengan fokus pada pengalaman pengguna (UX) yang interaktif, visual yang estetis, dan performa yang cepat.

### 🏠 Home Page (Beranda)

- **Hero Section Dinamis**: Animasi intro yang halus menggunakan Framer Motion.
- **Tech Stack Pills**: Tampilan visual skill yang dipelajari (DevOps, Network, IoT, dll) dengan animasi mengambang.
- **Infinite Marquee Gallery**: Galeri berjalan otomatis yang menampilkan cuplikan dokumentasi semester 1 & 2.
- **Interactive CTA**: Bagian ajakan bertindak yang responsif dan menarik.

### 👥 About Us (Tentang Kami)

- **Class Structure**: Visualisasi struktur organisasi kelas (Ketua, Wakil, Bendahara, dll) dengan kartu profil yang elegan.
- **Curriculum Highlights**: Penjelasan interaktif mengenai apa saja yang dipelajari (Jaringan, CyberSec, Hardware).
- **Culture Section**: Menampilkan nilai-nilai budaya kelas seperti solidaritas dan sharing knowledge.

### 📸 Gallery (Dokumentasi)

- **Advanced Masonry Grid**: Tata letak galeri yang responsif menyesuaikan ukuran layar (2 hingga 6 kolom).
- **Smart Filtering**: Filter foto berdasarkan Semester (Semua, Semester 1, Semester 2, dst).
- **Interactive Image Modal**:
  - **Zoom & Pan**: Kemampuan memperbesar dan menggeser foto seperti aplikasi native.
  - **Download Feature**: Unduh foto langsung dengan nama file yang terorganisir.
  - **Metadata**: Menampilkan info semester pada setiap foto.
- **Lazy Loading & Blurhash**: Optimasi performa memuat gambar dengan efek blur saat loading.

### ⚡ Technical Highlights

- **Smooth Animations**: Transisi halaman dan elemen menggunakan `framer-motion`.
- **Responsive Design**: Tampilan optimal di Mobile, Tablet, hingga Desktop monitor besar.
- **Optimized Performance**: Penggunaan `react-router-dom` untuk SPA (Single Page Application) yang cepat.

## 🛠️ Teknologi yang Digunakan

Project ini dibangun menggunakan _modern web stack_ terkini:

- **Core Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/) - Super fast build & HMR.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework.
- **Animation**: [Framer Motion 12](https://www.framer.com/motion/) - Library animasi production-ready.
- **Icons**: [Lucide React](https://lucide.dev/) - Koleksi icon yang konsisten dan ringan.
- **Routing**: [React Router 7](https://reactrouter.com/) - Routing standar industri.

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer lokal Anda:

### Prasyarat

Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/) (versi 18 ke atas direkomendasikan).

### Instalasi & Setup

1. **Clone Repository**

   ```bash
   git clone https://github.com/denoyey/tekfo24.git
   cd tekfo24
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Buka browser dan akses `http://localhost:5173`.

### Build untuk Produksi

Untuk membuat versi produksi yang siap deploy:

```bash
npm run build
```

File hasil build akan berada di folder `dist/`.

## 📂 Struktur Project

```
tekfo24/
├── index.html
├── package.json
├── public/              # Aset statis (logo, gambar struktur, dll)
│   └── assets/
└── src/
    ├── App.jsx          # Root component & Routing configuration
    ├── main.jsx         # Entry point
    ├── index.css        # Global styles & Tailwind types
    ├── data/            # Data statis (galleryData, dll)
    └── pages/           # Halaman Utama
        ├── Home.jsx     # Halaman Beranda
        ├── AboutUs.jsx  # Halaman Tentang Kami
        └── Gallery.jsx  # Halaman Galeri
```

## 👨‍💻 Pengembang

Dikembangkan dengan ❤️ oleh **Tim IT Tekinfo 24**.

- **Lead Developer**: Deni Setiawan Pratama
- **Contributors**: Seluruh anggota kelas TI 24 yang telah berkontribusi dalam dokumentasi dan ide.

---

© 2024 - 2026 Teknologi Informasi 24. All Rights Reserved.
