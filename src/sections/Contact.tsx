"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiInstagram, SiTelegram, SiWhatsapp } from "react-icons/si";
import toast, { Toaster } from "react-hot-toast";
import { submitContact } from "@/app/actions";

export function Contact({ settings }: { settings?: any }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);

    setLoading(false);

    if (result.success) {
      toast.success("تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.", {
        position: "bottom-center",
        duration: 4000,
        style: {
          background: "var(--color-bg)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          fontFamily: "var(--font-arabic-body)",
        }
      });
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "عذراً حدث خطأ بالاتصال، يرجى المحاولة لاحقاً.", {
        position: "bottom-center",
        duration: 4000,
      });
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-surface/30" ref={ref}>
      <Toaster />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-arabicDisplay font-bold text-textPrimary mb-4"
          >
            دعنا <span className="text-accent underline decoration-accent/30 underline-offset-4">نتحدث</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-textSecondary text-lg max-w-2xl mx-auto"
          >
            هل لديك مشروع في ذهنك؟ أو تريد استشارة تقنية؟ لا تتردد في التواصل معي.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
           {/* Contact Info */}
           <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.6 }}
             className="lg:col-span-5 space-y-6"
           >
              <Card tilt={false} className="p-8 h-full bg-white/40 border-[0.5px] border-white flex flex-col justify-center space-y-8 shadow-sm">
                 <div>
                   <h3 className="text-2xl font-bold font-arabicDisplay mb-8 text-textPrimary">معلومات التواصل</h3>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm border border-border/50 group-hover:border-accent">
                          <Mail size={20} />
                        </div>
                        <div>
                           <p className="text-xs text-textSecondary mb-1">البريد الإلكتروني</p>
                           <p className="font-mono font-medium text-sm text-textPrimary" dir="ltr">hello@mohammed.dev</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm border border-border/50 group-hover:border-accent">
                          <Phone size={20} />
                        </div>
                        <div>
                           <p className="text-xs text-textSecondary mb-1">الهاتف</p>
                           <p className="font-mono font-medium text-sm text-textPrimary" dir="ltr">+971 50 123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm border border-border/50 group-hover:border-accent">
                          <MapPin size={20} />
                        </div>
                        <div>
                           <p className="text-xs text-textSecondary mb-1">الموقع</p>
                           <p className="font-medium text-sm text-textPrimary">دبي، الإمارات العربية المتحدة</p>
                        </div>
                      </div>
                   </div>
                 </div>

                 <div className="pt-8 border-t border-border/60">
                    <h4 className="text-sm font-semibold mb-4 text-textSecondary">تابعني عبر المنصات</h4>
                    <div className="flex gap-4">
                       {/* رابط الانستجرام */}
                       {settings?.instagram_url && (
                         <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-textSecondary hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white border border-border/50 transition-all shadow-sm hover:scale-110">
                           <SiInstagram size={18} />
                         </a>
                       )}
                       {/* رابط التليجرام */}
                       {settings?.telegram_url && (
                         <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-textSecondary hover:bg-[#0088cc] hover:text-white border border-border/50 transition-all shadow-sm hover:scale-110">
                           <SiTelegram size={18} />
                         </a>
                       )}
                       {/* رابط الواتساب */}
                       {settings?.whatsapp_url && (
                         <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-textSecondary hover:bg-[#25D366] hover:text-white border border-border/50 transition-all shadow-sm hover:scale-110">
                           <SiWhatsapp size={18} />
                         </a>
                       )}
                    </div>
                 </div>
              </Card>
           </motion.div>

           {/* Contact Form */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="lg:col-span-7"
           >
              <Card tilt={false} className="p-8 sm:p-10 bg-white/70 shadow-lg border-[0.5px] border-white">
                 <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <div className="relative group">
                          <input name="name" type="text" id="name" required className="w-full bg-transparent border-b-2 border-border/80 px-0 pt-4 pb-2 text-textPrimary focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" placeholder="الاسم" />
                          <label htmlFor="name" className="absolute right-0 top-4 text-textSecondary text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-2 peer-valid:text-xs pointer-events-none">الاسم بالكامل</label>
                       </div>
                       <div className="relative group">
                          <input name="email" type="email" id="email" required className="w-full bg-transparent border-b-2 border-border/80 px-0 pt-4 pb-2 text-textPrimary focus:outline-none focus:border-accent transition-colors peer placeholder-transparent text-left" placeholder="البريد" dir="ltr" />
                          <label htmlFor="email" className="absolute right-0 top-4 text-textSecondary text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-2 peer-valid:text-xs pointer-events-none">البريد الإلكتروني</label>
                       </div>
                    </div>
                    
                    <div className="relative group">
                       <input name="subject" type="text" id="subject" required className="w-full bg-transparent border-b-2 border-border/80 px-0 pt-4 pb-2 text-textPrimary focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" placeholder="الموضوع" />
                       <label htmlFor="subject" className="absolute right-0 top-4 text-textSecondary text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-2 peer-valid:text-xs pointer-events-none">الموضوع</label>
                    </div>

                    <div className="relative group">
                       <textarea name="message" id="message" required rows={4} className="w-full bg-transparent border-b-2 border-border/80 px-0 pt-4 pb-2 text-textPrimary focus:outline-none focus:border-accent transition-colors peer placeholder-transparent resize-none" placeholder="الرسالة"></textarea>
                       <label htmlFor="message" className="absolute right-0 top-4 text-textSecondary text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-2 peer-valid:text-xs pointer-events-none">تفاصيل الرسالة</label>
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full group overflow-hidden" disabled={loading}>
                       <span className="relative z-10 flex items-center justify-center gap-2">
                         {loading ? (
                           <>
                             <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             جاري الإرسال...
                           </>
                         ) : "إرسال الرسالة"}
                       </span>
                    </Button>
                 </form>
              </Card>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
