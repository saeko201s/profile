"use client";

import { usePathname } from "next/navigation";
import { SiInstagram, SiTelegram, SiWhatsapp } from "react-icons/si";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
      if (data) setSettings(data);
    }
    fetchSettings();
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-surface/50 border-t border-border/50 py-12 relative z-10 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-right">
          {/* Brand & Desc */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-arabicDisplay font-bold text-accent mb-4">محمد</h3>
            <p className="text-textSecondary/80 text-sm leading-loose mb-6">
              مطوّر برمجيات متخصص في بناء واجهات مستخدم تفاعلية وأنظمة خلفية قوية، هدفي هو دمج التصميم الإبداعي مع التقنية الحديثة لخلق تجارب رقمية لا تُنسى.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-lg font-bold text-textPrimary mb-2">روابط سريعة</h4>
            <a href="#about" className="text-textSecondary hover:text-accent transition-colors text-sm">من أنا</a>
            <a href="#skills" className="text-textSecondary hover:text-accent transition-colors text-sm">مجالات الخبرة</a>
            <a href="#projects" className="text-textSecondary hover:text-accent transition-colors text-sm">معرض الأعمال</a>
            <a href="#services" className="text-textSecondary hover:text-accent transition-colors text-sm">الخدمات التقنية</a>
            <a href="#testimonials" className="text-textSecondary hover:text-accent transition-colors text-sm">شركاء النجاح</a>
          </div>

          {/* Connect */}
          <div className="flex flex-col justify-start md:items-start items-center">
             <h4 className="text-lg font-bold text-textPrimary mb-4">تواصل معي</h4>
             <div className="flex gap-4 mt-2">
               {settings?.instagram_url && (
                 <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-textSecondary hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white border border-border/50 transition-all shadow-sm">
                   <SiInstagram size={18} />
                 </a>
               )}
               {settings?.telegram_url && (
                 <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-textSecondary hover:bg-[#0088cc] hover:text-white border border-border/50 transition-all shadow-sm">
                   <SiTelegram size={18} />
                 </a>
               )}
               {settings?.whatsapp_url && (
                 <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-textSecondary hover:bg-[#25D366] hover:text-white border border-border/50 transition-all shadow-sm">
                   <SiWhatsapp size={18} />
                 </a>
               )}
             </div>
          </div>
        </div>

        <div className="border-t border-border/40 flex flex-col md:flex-row justify-between items-center pt-8">
           <p className="text-textSecondary font-medium text-sm">
             © {new Date().getFullYear()} محمد. جميع الحقوق محفوظة.
           </p>
           <p className="text-textSecondary/60 text-xs mt-2 md:mt-0 font-mono">
             Designed & Developed with ♥
           </p>
        </div>
      </div>
    </footer>
  );
}
