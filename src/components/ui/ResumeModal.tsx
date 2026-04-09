"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openResumeModal", handleOpen);
    return () => window.removeEventListener("openResumeModal", handleOpen);
  }, []);

  const onClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-xl p-6 md:p-8 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors focus:outline-none"
            >
              <X size={24} className="text-textPrimary" />
            </button>

            <div className="text-center mb-8 mt-4">
              <h2 className="text-3xl lg:text-4xl font-arabicDisplay font-bold text-textPrimary mb-2">السيرة الذاتية</h2>
              <p className="text-textSecondary">ملخص سريع عن مسيرتي التأسيسية والمهنية.</p>
            </div>

            <div className="space-y-6">
              {/* Experience */}
              <div className="glass bg-white/40 p-6 rounded-xl border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-accent/10 rounded-lg text-accent">
                     <Briefcase size={24} />
                   </div>
                   <h3 className="text-xl font-bold font-arabicDisplay text-textPrimary">الخبرة المهنية</h3>
                </div>
                <ul className="space-y-6">
                  <li className="relative pr-6 border-r-2 border-border/80 pb-2">
                    <span className="absolute -right-[9px] top-1.5 w-4 h-4 rounded-full bg-accent shadow-sm" />
                    <h4 className="font-bold text-textPrimary text-lg">مهندس برمجيات أول | شركة الابتكار</h4>
                    <p className="text-sm font-medium text-accent mb-2">٢٠٢١ - الحاضر</p>
                    <p className="text-sm md:text-base text-textSecondary leading-relaxed">بناء المنصات الرقمية وقيادة فريق التطوير، مع الاعتماد التام على حلول متقدمة تشمل Next.js و React لبناء بيئة رصينة.</p>
                  </li>
                  <li className="relative pr-6 border-r-2 border-border/80">
                    <span className="absolute -right-[9px] top-1.5 w-4 h-4 rounded-full bg-accent/40" />
                    <h4 className="font-bold text-textPrimary text-lg">مطور واجهات أمامية | الوكالة الرقمية</h4>
                    <p className="text-sm font-medium text-accent mb-2">٢٠١٨ - ٢٠٢١</p>
                    <p className="text-sm md:text-base text-textSecondary leading-relaxed">تحويل تصميمات الـ UI/UX إلى واجهات تفاعلية استثنائية، وتعزيز تجربة المستخدم لمئات الزوار يومياً.</p>
                  </li>
                </ul>
              </div>

              {/* Education */}
              <div className="glass bg-white/40 p-6 rounded-xl border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-accent/10 rounded-lg text-accent">
                     <GraduationCap size={24} />
                   </div>
                   <h3 className="text-xl font-bold font-arabicDisplay text-textPrimary">التعليم العلمي</h3>
                </div>
                <div className="relative pr-6 border-r-2 border-border/80">
                  <span className="absolute -right-[9px] top-1.5 w-4 h-4 rounded-full bg-accent shadow-sm" />
                  <h4 className="font-bold text-textPrimary text-lg">بكالوريوس علوم الحاسوب</h4>
                  <p className="text-sm text-textSecondary mt-1 leading-relaxed">جامعة التكنولوجيا | ٢٠١٤ - ٢٠١٨ <br/> التركيز على هندسة البرمجيات والذكاء الاصطناعي وهيكلة البيانات.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center pt-4 border-t border-border/30">
              <Button onClick={onClose} variant="primary" className="w-full sm:w-auto min-w-[200px]">
                إغلاق النافذة
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
