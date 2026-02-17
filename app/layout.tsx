import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Open Recruitment DPH HMIF ITB 2026",
  description:
    "Bergabunglah dengan Dewan Perwakilan Himpunan - HMIF ITB. Open Recruitment untuk 8 departemen: Litbang, PKM, Kominfo, Harleb, Adin, Sosmas, Mibat, dan Keagamaan.",
  keywords:
    "HMIF ITB, Open Recruitment, Oprec, DPH, Informatika ITB, Himpunan Mahasiswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} antialiased`}
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {children}
      </body>
    </html>
  );
}
