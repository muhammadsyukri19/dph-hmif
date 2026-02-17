# HMIF ITB - Open Recruitment Website

Website landing page untuk Open Recruitment Dewan Perwakilan Himpunan (DPH) HMIF ITB 2026.

## 🎨 Fitur Desain

- **Responsive Design** - Tampil sempurna di semua ukuran layar (mobile, tablet, desktop)
- **Interactive Elements** - Hover effects, smooth animations, dan transisi yang menarik
- **Modern Color Scheme**:
  - Background: Putih dominan dengan gradient halus
  - Accent Colors: Purple (#9333ea - #7e22ce) dan Red (#dc2626 - #b91c1c)
  - Highlight: Yellow (#facc15) untuk point penting
- **Typography**: Font unik menggunakan Outfit dan Space Grotesk dari Google Fonts
- **Custom Scrollbar**: Purple-red gradient scrollbar

## 📋 Konten Website

### 1. Hero Section

- Judul besar dengan animasi gradient
- Tagline Open Recruitment 2026
- Call-to-action buttons

### 2. Struktur Organisasi DPH

- Ketua dan Wakil Ketua DPH
- 8 Departemen dengan short names

### 3. 8 Departemen

Setiap departemen memiliki:

- **LITBANG** - Penelitian dan Pengembangan Mahasiswa
- **PKM** - Pengelola Kesejahteraan Mahasiswa
- **KOMINFO** - Komunikasi, Informasi & Perencanaan
- **HARLEB** - Hubungan Antar Lembaga
- **ADIN** - Administrasi dan Inventaris
- **SOSMAS** - Sosial Masyarakat
- **MIBAT** - Minat, Bakat dan Apresiasi
- **ROHIS** - Keagamaan

Fitur kartu departemen:

- Gambar flyer dari folder `/public/oprec/`
- Gradient overlay dengan warna unik per departemen
- Deskripsi lengkap (expandable on click)
- Hover effects

### 4. Benefits Section

6 benefit yang didapat anggota:

- 🎯 Pengembangan Skill
- 🤝 Networking
- 📚 Pengalaman Berorganisasi
- 🏆 Sertifikat & Penghargaan
- 💡 Pelatihan Eksklusif
- 🎉 Event Seru

### 5. Timeline Section

Timeline open recruitment dengan format visual:

- Pendaftaran (1-7 Maret 2026)
- Seleksi Berkas (10-12 Maret 2026)
- Wawancara (15-17 Maret 2026)
- Pengumuman (20 Maret 2026)

### 6. Call-to-Action Section

- Gradient background purple-red
- "Daftar Sekarang" button
- "Pelajari Lebih Lanjut" button

### 7. Footer

- Informasi HMIF ITB
- Kontak
- Quick Links

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js (v18 atau lebih tinggi)
- npm atau yarn

### Instalasi

1. Install dependencies:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka browser dan akses:

```
http://localhost:3000
```

### Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur File

```
hmif-newgen/
├── app/
│   ├── page.tsx          # Halaman utama (landing page)
│   ├── layout.tsx        # Layout dengan font configuration
│   └── globals.css       # Global styles & custom scrollbar
├── public/
│   └── oprec/
│       ├── oprec-1.jpg   # Flyer LITBANG
│       ├── oprec-2.jpg   # Flyer PKM
│       ├── oprec-3.jpg   # Flyer KOMINFO
│       ├── oprec-4.jpg   # Flyer HARLEB
│       ├── oprec-5.jpg   # Flyer ADIN
│       ├── oprec-6.jpg   # Flyer SOSMAS
│       ├── oprec-7.jpg   # Flyer MIBAT
│       └── oprec-8.jpg   # Flyer ROHIS
└── ...
```

## 🎯 Customization

### Mengubah Timeline

Edit array `timeline` di [app/page.tsx](app/page.tsx#L114-L119):

```typescript
const timeline = [
  {
    date: "1-7 Maret 2026",
    title: "Pendaftaran",
    desc: "Buka pendaftaran online",
  },
  // ... tambah/edit sesuai kebutuhan
];
```

### Mengubah Konten Departemen

Edit array `departments` di [app/page.tsx](app/page.tsx#L6-L82):

```typescript
const departments = [
  {
    id: 1,
    name: "PENELITIAN DAN PENGEMBANGAN MAHASISWA",
    shortName: "LITBANG",
    description: "Deskripsi departemen...",
    image: "/oprec/oprec-1.jpg",
    color: "from-purple-500 to-purple-700",
  },
  // ... edit sesuai kebutuhan
];
```

### Mengubah Benefits

Edit array `benefits` di [app/page.tsx](app/page.tsx#L108-L115):

```typescript
const benefits = [
  { icon: "🎯", title: "Judul Benefit", desc: "Deskripsi benefit" },
  // ... tambah/edit sesuai kebutuhan
];
```

## 🎨 Teknologi

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Fonts**: Google Fonts (Outfit, Space Grotesk)
- **Icons**: Emoji (bisa diganti dengan icon library)

## 📝 Notes

- Images untuk flyer harus diletakkan di folder `public/oprec/`
- Nama file harus sesuai: `oprec-1.jpg` sampai `oprec-8.jpg`
- Semua konten sudah responsive dan mobile-friendly
- Smooth scrolling sudah diaktifkan
- Dark mode dinonaktifkan (light mode only)

## 🔗 Links

- Link "Daftar Sekarang" di CTA section masih placeholder (#)
- Update link tersebut ke form pendaftaran yang sebenarnya

## 📧 Support

Untuk pertanyaan atau bantuan, hubungi DPH HMIF ITB:

- Email: hmif@itb.ac.id
- Instagram: @hmif_itb
- Website: hmif.itb.ac.id

---

**Made with ❤️ by DPH HMIF ITB**
