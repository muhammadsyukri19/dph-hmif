"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import RegistrationModal from "@/components/RegistrationModal";

const dphMembers = [
  {
    name: "Wakil Bendahara Umum",
    role: "Aska Shahira",
    image: "/person/aska.jpg",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Bendahara Umum",
    role: "Fira Ramadhani",
    image: "/person/fira.jpeg",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "Wakil Ketua I",
    role: "Muhammad Milan Ramadhan Mulizar",
    image: "/person/milan.png",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    name: "Ketua Himpunan",
    role: "Muhammad Syukri",
    image: "/person/syukri.jpg",
    gradient: "from-purple-600 to-red-600",
  },
  {
    name: "Wakil Ketua II",
    role: "Ariq Rabbani",
    image: "/person/ariq.jpg",
    gradient: "from-red-500 to-purple-600",
  },
  {
    name: "Sekretaris Umum",
    role: "Shafa Disya Aulia",
    image: "/person/shafa.jpeg",
    gradient: "from-violet-500 to-purple-700",
  },
  {
    name: "Wakil Sekretaris Umum",
    role: "Niswatul Azimah",
    image: "/person/niswa.jpeg",
    gradient: "from-rose-500 to-red-700",
  },
];

// Arc positions: desktop [rotate°, translateY px, zIndex] — center is Ketua (index 3)
const arcPositions = [
  { rotate: -18, y: 70, z: 1 },
  { rotate: -12, y: 35, z: 2 },
  { rotate: -6, y: 12, z: 5 },
  { rotate: 0, y: 0, z: 7 },
  { rotate: 6, y: 12, z: 5 },
  { rotate: 12, y: 35, z: 2 },
  { rotate: 18, y: 70, z: 1 },
];

const departments = [
  {
    id: 1,
    name: "PENELITIAN DAN PENGEMBANGAN MAHASISWA",
    shortName: "PPM",
    description:
      "Departemen Penelitian dan Pengembangan Mahasiswa adalah departemen yang berfungsi untuk pengembangan kemampuan dan penalaran mahasiswa Jurusan Informatika.",
    image: "/oprec/oprec-8.jpg",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: 2,
    name: "PENGELOLA KESEJAHTERAAN MAHASISWA",
    shortName: "PKM",
    description:
      "Departemen Pengelolaan Kesejahteraan Mahasiswa adalah departemen yang berfungsi untuk meningkatkan potensi, kreativitas, dan memperjuangkan hak-hak maupun aspirasi mahasiswa-mahasiswi Informatika, mampu mensinergikan antara mahasiswa dan birokrasi untuk mencapai tujuan tertentu.",
    image: "/oprec/oprec-4.jpg",
    color: "from-red-500 to-pink-600",
  },
  {
    id: 3,
    name: "KOMUNIKASI, INFORMASI & PERENCANAAN",
    shortName: "KOMINKRAF",
    description:
      "Departemen Komunikasi, Informasi dan Perencanaan Kreativitas adalah departemen yang berperan untuk memberikan informasi terhadap internal dan eksternal himpunan maupun kalangan mahasiswa Jurusan Informatika dan masyarakat luas pada umumnya melalui media online maupun offline.",
    image: "/oprec/oprec-9.jpg",
    color: "from-purple-600 to-red-500",
  },
  {
    id: 4,
    name: "HUBUNGAN ANTAR LEMBAGA",
    shortName: "HUAL",
    description:
      "Departemen Hubungan Antar Lembaga (HUAL) merupakan departemen yang bertugas untuk menjaga dan memperluas jaringan dengan berbagai lembaga-lembaga baik dalam lingkup eksternal maupun internal di Jurusan Informatika USK.",
    image: "/oprec/oprec-2.jpg",
    color: "from-red-600 to-purple-600",
  },
  {
    id: 5,
    name: "ADMINISTRASI DAN INVENTARIS",
    shortName: "ADM",
    description:
      "Departemen ADM dan Inventaris merupakan departemen yang berperan dalam segala hal tentang administrasi khususnya menangani pelaksanaan dan pengawasan tata tertib administrasi Himpunan Mahasiswa Informatika.",
    image: "/oprec/oprec-3.jpg",
    color: "from-purple-500 to-red-600",
  },
  {
    id: 6,
    name: "SOSIAL MASYARAKAT",
    shortName: "SOSMAS",
    description:
      "Menggerakkan kegiatan sosial dan pengabdian masyarakat, membangun kepedulian sosial mahasiswa melalui program-program yang berdampak positif.",
    image: "/oprec/oprec-5.jpg",
    color: "from-red-500 to-purple-500",
  },
  {
    id: 7,
    name: "MINAT, BAKAT DAN APRESIASI",
    shortName: "MBA",
    description:
      "Departemen Minat Bakat dan Apresiasi (MBA) adalah departemen yang berperan sebagai wadah mahasiswa untuk menyalurkan dan mengembangkan bakat pengurus Himpunan Mahasiswa Informatika terutama dalam bidang olahraga, seni tari, dan seni musik.",
    image: "/oprec/oprec-6.jpg",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 8,
    name: "KEAGAMAAN",
    shortName: "AGAMA",
    description:
      "Departemen Keagamaan merupakan departemen yang membidangi aspek keagamaan.",
    image: "/oprec/oprec-7.jpg",
    color: "from-red-600 to-purple-700",
  },
];

const eventDocs = [
  {
    id: 1,
    title: "Ngobrol Bareng Bidang Minat (NGOBAR)",
    category: "Seminar",
    image: "/images/ngobar.jpg",
    date: "Mei 2025",
    desc: "Ngobrol bareng seputar bidang minat di Informatika untuk membantu mahasiswa menemukan passion nya.",
  },
  {
    id: 2,
    title: "Seminar Nasional NVIDIA by INFEST",
    category: "Seminar",
    image: "/images/seminar-infest.jpg",
    date: "Oktober 2025",
    desc: "Seminar nasional tentang tren teknologi AI dan masa depan informatika.",
  },
  {
    id: 3,
    title: "Takjil On The Road",
    category: "Sosial",
    image: "/images/takjilontheroad.jpg",
    date: "Maret 2025",
    desc: "Kegiatan sosial membagikan takjil gratis di bulan Ramadan untuk masyarakat di beberapa titik.",
  },
  {
    id: 4,
    title: "INFEST XI Informatika",
    category: "Kompetisi",
    image: "/images/infest.jpg",
    date: "Oktober 2025",
    desc: "Event terbesar HMIF mengadakan berbagai kompetisi dan seminar untuk mahasiswa.",
  },
  {
    id: 5,
    title: "Buka Puasa bersama Keluarga Besar HMIF",
    category: "Religi",
    image: "/images/bukber.jpg",
    date: "Maret 2025",
    desc: "Kegiatan rutinan setiap Ramadan untuk mempererat silaturahmi antar anggota HMIF dengan berbuka puasa bersama di kampus.",
  },
  {
    id: 6,
    title: "Kunjungan Panti HMIF",
    category: "Sosial",
    image: "/images/kunjunganpanti.jpg",
    date: "Desember 2025",
    desc: "Kegiatan sosial rutin HMIF mengunjungi panti asuhan untuk berbagi kebahagiaan dan bantuan kepada anak-anak.",
  },
  {
    id: 7,
    title: "Podcast Informatika",
    category: "Media",
    image: "/images/podcast.png",
    date: "Oktober 2025",
    desc: "Bootcamp desain produk digital dari konsep hingga prototipe.",
  },
  {
    id: 8,
    title: "Hackathon x IndigoSpace by INFEST XI",
    category: "Kompetisi",
    image: "/images/hackathon.jpg",
    date: "November 2025",
    desc: "Kompetisi coding 12 jam tingkat nasional dengan tema inovasi teknologi dan ekonomi digital.",
  },
  {
    id: 9,
    title: "INTEGER x UPGRADING",
    category: "Sosial",
    image: "/images/integer.jpg",
    date: "Januari 2026",
    desc: "Acara kebersamaan seluruh anggota HMIF sekaligus penyambutan mahasiwa baru dengan berbagai games seru dan makan bersama.",
  },
];

const eventCategories = ["Semua", "Religi", "Seminar", "Kompetisi", "Sosial"];

const benefits = [
  {
    icon: "material-symbols:psychology-rounded",
    title: "Pengembangan Skill",
    desc: "Asah kemampuan organisasi, kepemimpinan, dan pengambilan keputusan",
  },
  {
    icon: "material-symbols:handshake-rounded",
    title: "Networking",
    desc: "Bangun relasi dengan sesama mahasiswa maupun profesional di bidang IT",
  },
  {
    icon: "material-symbols:school-rounded",
    title: "Pengalaman Berorganisasi",
    desc: "Pengalaman berharga untuk portofolio dan karir",
  },
  {
    icon: "material-symbols:workspace-premium-rounded",
    title: "Sertifikat & Penghargaan",
    desc: "Dapatkan rekognisi atas kontribusimu",
  },
  {
    icon: "material-symbols:lightbulb-rounded",
    title: "Pelatihan dan Seminar",
    desc: "Workshop dan training dari praktisi",
  },
  {
    icon: "material-symbols:celebration-rounded",
    title: "Event Seru",
    desc: "Ikut berbagai event menarik HMIF",
  },
];

const timeline = [
  {
    date: "16-18 Februari 2026",
    title: "Pendaftaran Wakadep",
    desc: "Buka pendaftaran online",
  },
  {
    date: "19 Februari 2026",
    title: "Interview Wakadep",
    desc: "Verifikasi dan seleksi administrasi",
  },
  {
    date: "16-22 Februari 2026",
    title: "Pendaftaran Anggota",
    desc: "Interview dengan DPH",
  },
  {
    date: "23 Februari 2026",
    title: "Interview Anggota",
    desc: "Pengumuman hasil seleksi",
  },
];

export default function Home() {
  const [selectedDept, setSelectedDept] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [marqueeHovered, setMarqueeHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll-triggered reveal
  function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.unobserve(el);
          }
        },
        { threshold },
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, [threshold]);
    return { ref, isVisible };
  }

  // Counter animation
  function useCounter(end: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.unobserve(el);
          }
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, []);
    useEffect(() => {
      if (!started) return;
      let start = 0;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }, [started, end, duration]);
    return { count, ref };
  }

  // Navbar scroll effect + scroll-to-top
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent hash-based auto-scroll on initial load
  useEffect(() => {
    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", cleanUrl);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  // Mouse parallax for hero
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  }, []);

  // Section reveal hooks
  const heroContent = useInView(0.1);
  const strukturSection = useInView();
  const deptSection = useInView(0.05);
  const benefitSection = useInView(0.1);
  const timelineSection = useInView(0.1);
  const docSection = useInView(0.05);
  const ctaSection = useInView(0.2);

  // Filtered events for documentation gallery
  const filteredEvents =
    activeFilter === "Semua"
      ? eventDocs
      : eventDocs.filter((e) => e.category === activeFilter);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Counters
  const counter1 = useCounter(8);
  const counter2 = useCounter(80, 2500);
  const counter3 = useCounter(10, 1000);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-linear-to-br from-purple-600 to-red-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-lg py-0"
            : "bg-transparent border-b border-transparent shadow-none py-2"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              {/* <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <span className="text-white font-bold text-lg">H</span>
              </div> */}
              <div>
                <div className="font-bold text-gray-800 text-base sm:text-lg leading-tight">
                  HMIF USK 2026
                </div>
                <div className="text-xs text-gray-500">Open Recruitment</div>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300"
              >
                Beranda
              </a>
              <a
                href="#departments"
                className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300"
              >
                Departemen
              </a>
              <a
                href="#timeline"
                className="relative text-gray-700 hover:text-purple-600 font-medium transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all after:duration-300"
              >
                Timeline
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 bg-linear-to-r from-purple-600 to-red-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Daftar Sekarang
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-4 pt-4 border-t border-purple-100">
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-2"
              >
                Beranda
              </a>
              <a
                href="#departments"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-2"
              >
                Departemen
              </a>
              <a
                href="#benefits"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-2"
              >
                Benefits
              </a>
              <a
                href="#timeline"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors py-2"
              >
                Timeline
              </a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="px-6 py-2 bg-linear-to-r from-purple-600 to-red-600 text-white rounded-full font-semibold hover:shadow-lg text-center transition-all"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-purple-50 via-white to-red-50"
        onMouseMove={handleMouseMove}
      >
        {/* HMIF Background Pattern - 2 Blurred Logos */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Left Side */}
          <Image
            src="/icon/hmif.png"
            alt="HMIF Background"
            width={600}
            height={600}
            className="absolute top-1/4 -left-20 -translate-y-1/2 w-[250px] md:w-[300px] h-auto object-contain opacity-50 blur-[9px] rotate-[-30deg]"
            priority
          />
          {/* Right Side */}
          <Image
            src="/icon/hmif.png"
            alt="HMIF Background"
            width={600}
            height={600}
            className="absolute top-2/3 -right-50 -translate-y-1/2 w-[600px] md:w-[700px] h-auto object-contain opacity-50 blur-[4px] rotate-[15deg]"
          />
        </div>

        {/* Animated floating blobs with parallax */}
        <div className="absolute inset-0 opacity-15 z-[1]">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-blob"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-blob animation-delay-2000"
            style={{
              transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-blob animation-delay-4000"
            style={{
              transform: `translate(${mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)`,
            }}
          ></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                left: `${6 + i * 6.5}%`,
                top: `${10 + ((i * 17) % 80)}%`,
                backgroundColor:
                  i % 3 === 0 ? "#9333ea" : i % 3 === 1 ? "#dc2626" : "#facc15",
                opacity: 0.3 + (i % 5) * 0.1,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + (i % 4) * 2}s`,
                width: `${4 + (i % 3) * 4}px`,
                height: `${4 + (i % 3) * 4}px`,
              }}
            />
          ))}
        </div>

        <div
          ref={heroContent.ref}
          className={`container mx-auto px-6 py-20 relative z-10 transition-all duration-1000 ${
            heroContent.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-block">
              <span className="px-6 py-2 bg-linear-to-r from-purple-600 to-red-600 text-white rounded-full text-sm font-semibold tracking-wide">
                OPEN RECRUITMENT 2026
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-purple-600 via-red-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              HMIF USK 2026
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Dewan Pengurus Harian
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Bergabunglah dengan kami dalam membangun Himpunan Mahasiswa
              Informatika USK. Tersedia 8 departemen yang dapat mengembangkan
              potensimu!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="#departments"
                className="group relative px-10 py-4 bg-linear-to-r from-purple-600 to-red-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Lihat Departemen</span>
                <div className="absolute inset-0 bg-linear-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
              <a
                href="https://drive.google.com/file/d/1WULvZ4qUsjAr6TlZpsF9ptSxmWxYpKPM/view?usp=drivesdk"
                className="group relative px-6 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Deskripsi Departemen</span>
              </a>
            </div>
            {/* Animated Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div ref={counter1.ref} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                  {counter1.count}
                </div>
                <div className="text-sm text-gray-500 mt-1">Departments</div>
              </div>
              <div ref={counter2.ref} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  {counter2.count}+
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Available Member
                </div>
              </div>
              <div ref={counter3.ref} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                  {counter3.count}+
                </div>
                <div className="text-sm text-gray-500 mt-1">Program Plan</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-20 bg-white">
        <div
          ref={strukturSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            strukturSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Struktur{" "}
            <span className="bg-linear-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              DPH HMIF
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Organisasi yang terstruktur untuk melayani mahasiswa Informatika USK
          </p>

          {/* Mobile: Simple horizontal scroll cards */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 pt-8 px-2 snap-x snap-mandatory scrollbar-hide">
              {dphMembers.map((member, idx) => {
                const isCenter = idx === 3;
                return (
                  <div
                    key={idx}
                    className="snap-center shrink-0 flex flex-col items-center group relative"
                  >
                    {isCenter && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <Image
                          src="/icon/hmif.png"
                          width={40}
                          height={40}
                          alt="Logo"
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div
                      className={`relative w-20 h-20 rounded-full overflow-hidden shadow-lg border-3 ${
                        isCenter
                          ? "border-yellow-400 ring-2 ring-yellow-300 ring-offset-2"
                          : "border-white"
                      } transition-all duration-300 group-active:scale-110`}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-cover group-active:scale-110 transition-transform duration-300"
                      />
                      <div
                        className={`absolute inset-0 bg-linear-to-t ${member.gradient} opacity-20 group-active:opacity-0 transition-opacity duration-300`}
                      />
                    </div>
                    <p className="mt-2 text-xs font-bold text-gray-800 text-center w-20 leading-tight">
                      {member.name}
                    </p>
                    <p className="text-[10px] text-gray-500 text-center w-20 leading-tight">
                      {member.role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Arc Card Layout */}
          <div className="hidden md:flex relative justify-center items-start pt-12 pb-30">
            <div className="flex items-start arc-container">
              {dphMembers.map((member, idx) => {
                const pos = arcPositions[idx];
                const isCenter = idx === 3;
                return (
                  <div
                    key={idx}
                    className="arc-card group relative cursor-pointer"
                    style={{
                      transform: `rotate(${pos.rotate}deg) translateY(${pos.y}px)`,
                      zIndex: pos.z,
                      marginLeft: idx === 0 ? 0 : "-28px",
                      transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <div
                      className={`relative w-40 h-56 lg:w-48 lg:h-64 rounded-2xl overflow-hidden shadow-xl border-2 ${
                        isCenter ? "border-yellow-400" : "border-white/50"
                      } arc-card-inner`}
                    >
                      {/* Photo */}
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 1024px) 160px, 192px"
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-linear-to-t ${member.gradient} opacity-30 group-hover:opacity-10 transition-opacity duration-500`}
                      />

                      {/* Blur vignette */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Name label */}
                      <div className="absolute bottom-0 inset-x-0 p-3 text-center transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <h3
                          className={`font-bold text-white text-sm lg:text-base drop-shadow-lg ${
                            isCenter ? "text-base lg:text-lg" : ""
                          }`}
                        >
                          {member.name}
                        </h3>
                        <p className="text-white/0 group-hover:text-white/90 text-xs transition-all duration-500 mt-1">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Logo HMIF — outside overflow-hidden card */}
                    {isCenter && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 animate-bounce drop-shadow-lg pointer-events-none">
                        <Image
                          src="/icon/hmif.png"
                          width={100}
                          height={100}
                          alt="Logo Himpunan"
                          className="rounded-full w-20 h-20 lg:w-25 lg:h-25"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Garis */}
          <div className="w-1 h-12 bg-linear-to-b from-purple-600 to-red-600 mx-auto"></div>

          {/* 8 Departemen */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto mt-8">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-linear-to-br from-purple-100 to-red-100 p-4 rounded-xl shadow-lg text-center hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border-2 border-purple-200"
              >
                <h4 className="font-bold text-sm text-gray-800">
                  {dept.shortName}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section
        id="departments"
        className="py-20 bg-linear-to-b from-white to-purple-50"
      >
        <div
          ref={deptSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            deptSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            8 Departemen{" "}
            <span className="bg-linear-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              DPH HMIF
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Temukan departemen yang sesuai dengan minat dan bakatmu!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, idx) => (
              <div
                key={dept.id}
                onClick={() =>
                  setSelectedDept(selectedDept === dept.id ? null : dept.id)
                }
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${
                  selectedDept === dept.id
                    ? "border-purple-500 scale-105"
                    : "border-transparent hover:scale-105"
                } ${deptSection.isVisible ? "animate-fadeInUp" : "opacity-0"}`}
                style={{
                  animationDelay: `${idx * 120}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${dept.color} opacity-60 group-hover:opacity-70 transition-opacity`}
                  ></div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {dept.shortName}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-sm text-gray-800 mb-3 min-h-10">
                    {dept.name}
                  </h4>
                  <p
                    className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${selectedDept === dept.id ? "max-h-96" : "max-h-20 overflow-hidden"}`}
                  >
                    {dept.description}
                  </p>
                  <div className="mt-4 flex items-center text-purple-600 text-sm font-semibold">
                    <span>
                      {selectedDept === dept.id ? "Tutup" : "Lihat Detail"}
                    </span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform ${selectedDept === dept.id ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div
          ref={benefitSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            benefitSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Benefit yang{" "}
            <span className="bg-linear-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              Kamu Dapat
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Bergabung dengan DPH HMIF memberikan banyak keuntungan untuk
            pengembangan dirimu
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`group bg-linear-to-br from-purple-50 to-red-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-2 border border-purple-100 ${
                  benefitSection.isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${idx * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="mb-4 group-hover:scale-125 group-hover:animate-wiggle transition-transform inline-block">
                  <Icon
                    icon={benefit.icon}
                    className="text-5xl text-purple-600"
                  />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                <div className="mt-4 w-12 h-1 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="py-24 my-12 mx-4 md:mx-8 bg-linear-to-br from-zinc-900 via-slate-700 to-amber-600 rounded-4xl shadow-2xl shadow-black/50"
      >
        <div
          ref={timelineSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            timelineSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-200">
            Timeline{" "}
            <span className="bg-linear-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              Open Recruitment
            </span>
          </h2>
          <p className="text-center text-gray-100 mb-16 text-lg">
            Catat tanggal pentingnya dan jangan sampai ketinggalan!
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-purple-500 via-red-500 to-purple-500"></div>

              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex items-center mb-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} ${
                    timelineSection.isVisible ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${idx * 250}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div
                    className={`w-full md:w-5/12 ${idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-purple-200">
                      <span className="inline-block px-4 py-1 bg-linear-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-full text-sm font-bold mb-3">
                        {item.date}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-linear-to-br from-purple-500 to-red-500 rounded-full border-4 border-white shadow-lg z-10 items-center justify-center animate-pulse-glow">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={eventDocs.find((e) => e.id === lightbox)?.image || ""}
                alt={eventDocs.find((e) => e.id === lightbox)?.title || ""}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-8">
                <span className="inline-block px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold mb-2">
                  {eventDocs.find((e) => e.id === lightbox)?.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {eventDocs.find((e) => e.id === lightbox)?.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {eventDocs.find((e) => e.id === lightbox)?.date} &mdash;{" "}
                  {eventDocs.find((e) => e.id === lightbox)?.desc}
                </p>
              </div>
            </div>
            {/* Lightbox navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  const currentIdx = eventDocs.findIndex(
                    (e) => e.id === lightbox,
                  );
                  const prev =
                    currentIdx > 0
                      ? eventDocs[currentIdx - 1].id
                      : eventDocs[eventDocs.length - 1].id;
                  setLightbox(prev);
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Sebelumnya
              </button>
              <button
                onClick={() => {
                  const currentIdx = eventDocs.findIndex(
                    (e) => e.id === lightbox,
                  );
                  const next =
                    currentIdx < eventDocs.length - 1
                      ? eventDocs[currentIdx + 1].id
                      : eventDocs[0].id;
                  setLightbox(next);
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all flex items-center gap-2"
              >
                Selanjutnya
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dokumentasi Event Section */}
      <section
        id="dokumentasi"
        className="py-20 bg-linear-to-b from-white to-purple-50 overflow-hidden"
      >
        {/* Auto-scrolling Marquee */}
        <div
          className="mb-16 overflow-hidden"
          onMouseEnter={() => setMarqueeHovered(true)}
          onMouseLeave={() => setMarqueeHovered(false)}
        >
          <div
            className={`flex gap-4 animate-marquee ${marqueeHovered ? "marquee-paused" : ""}`}
          >
            {[...eventDocs, ...eventDocs].map((event, idx) => (
              <div
                key={`marquee-${idx}`}
                onClick={() => setLightbox(event.id)}
                className="relative shrink-0 w-72 h-48 rounded-xl overflow-hidden cursor-pointer group"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="288px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm truncate">
                    {event.title}
                  </p>
                  <p className="text-white/70 text-xs">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={docSection.ref}
          className={`container mx-auto px-6 transition-all duration-1000 ${
            docSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Dokumentasi{" "}
            <span className="bg-linear-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
              Event Kami
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Lihat keseruan event-event HMIF sepanjang tahun lalu!
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-linear-to-r from-purple-600 to-red-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid with animated layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredEvents.map((event, idx) => (
              <div
                key={event.id}
                onClick={() => setLightbox(event.id)}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 border-transparent hover:border-purple-300 transition-all duration-500 hover:shadow-2xl ${
                  docSection.isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Image with hover zoom */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Hover play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold shadow-md">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {event.date}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {event.desc}
                  </p>
                  {/* Animated bottom bar */}
                  <div className="mt-4 h-1 w-0 bg-linear-to-r from-purple-500 to-red-500 rounded-full group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-xl">Belum ada event di kategori ini</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="daftar"
        className="py-20 bg-linear-to-br from-purple-600 via-red-600 to-purple-700 relative overflow-hidden"
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div
          ref={ctaSection.ref}
          className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${
            ctaSection.isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Siap Bergabung dengan Kami?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Jangan lewatkan kesempatan emas ini! Daftarkan dirimu sekarang dan
            jadilah bagian dari keluarga besar HMIF ITB.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-110 transition-all shadow-xl overflow-hidden"
            >
              <span className="relative z-10">Daftar Sekarang</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
            </button>
            <a
              href="#departments"
              className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 hover:scale-110 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                HMIF USK 2026
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Himpunan Mahasiswa Informatika Universitas Syiah Kuala
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  hmif@usk.ac.id
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @hmif.fmipausk
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
                  </svg>
                  hmifusk.org
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#departments"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Departemen
                  </a>
                </li>
                <li>
                  <a
                    href="#timeline"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Timeline
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 HMIF USK. All rights reserved. Made by DPH HMIF 2026,
              Cabinet... *CS*!
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes blob {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 50% 70% 50%;
          }
          75% {
            border-radius: 60% 40% 60% 30% / 70% 40% 50% 60%;
          }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-40px) rotate(270deg);
            opacity: 0.5;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg) scale(1.25);
          }
          25% {
            transform: rotate(-12deg) scale(1.25);
          }
          75% {
            transform: rotate(12deg) scale(1.25);
          }
        }
        .group:hover .group-hover\\:animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(147, 51, 234, 0);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Arc card styles */
        .arc-container {
          perspective: 1000px;
        }
        .arc-card {
          transform-origin: bottom center;
        }
        .arc-card:hover {
          transform: rotate(0deg) translateY(-20px) scale(1.15) !important;
          z-index: 20 !important;
        }
        .arc-card:hover .arc-card-inner {
          box-shadow:
            0 25px 60px -12px rgba(147, 51, 234, 0.5),
            0 0 40px rgba(220, 38, 38, 0.2);
          border-color: rgba(147, 51, 234, 0.6);
        }

        /* Hide scrollbar for mobile carousel */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .marquee-paused {
          animation-play-state: paused;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
