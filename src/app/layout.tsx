import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Cairo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResumeModal } from "@/components/ui/ResumeModal";

const noto = Noto_Naskh_Arabic({ subsets: ["arabic"], variable: "--font-arabic-display", weight: ["400", "700"] });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-arabic-body", weight: ["300", "400", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://psyz1.vercel.app/"),
  title: {
    default: "محمد | مطوّر برمجيات",
    template: "%s | محمد"
  },
  description: "مطوّر برمجيات متخصص في بناء واجهات مستخدم تفاعلية وأنظمة خلفية قوية وتجارب رقمية استثنائية.",
  keywords: ["مطور ويب", "مبرمج", "React", "Next.js", "تطبيقات موبايل", "تصميم مواقع", "Software Developer", "Front-end", "Back-end"],
  authors: [{ name: "محمد" }],
  creator: "محمد",
  openGraph: {
    type: "website",
    locale: "ar_AE",
    url: "https://psyz1.vercel.app/",
    title: "محمد | مطوّر برمجيات",
    description: "أقوم ببناء واجهات مستخدم تفاعلية وأنظمة خلفية قوية وتجارب رقمية استثنائية.",
    siteName: "محمد | Portfolio",
    images: [{
      url: "/IMG_5125.JPG", // You can replace this with a dedicated OG Image measuring 1200x630
      width: 800,
      height: 600,
      alt: "محمد - مطوّر برمجيات"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "محمد | مطوّر برمجيات",
    description: "مطوّر برمجيات متخصص في بناء تجارب رقمية استثنائية.",
    creator: "@yourTwitterHandle", // Replace with your twitter
    images: ["/IMG_5125.JPG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${noto.variable} ${cairo.variable} ${jetbrains.variable} font-arabicBody antialiased relative min-h-screen`}>
        <div className="bg-mesh fixed inset-0 -z-10 h-full w-full" />
        <div className="bg-noise fixed inset-0 -z-10 h-full w-full opacity-50" />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <ResumeModal />
      </body>
    </html>
  );
}
