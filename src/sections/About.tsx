"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";
import { Card } from "@/components/ui/Card";

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-arabicDisplay font-bold text-textPrimary">
              قصتي <span className="text-accent underline decoration-accent/30 underline-offset-4">المهنية</span>
            </h2>
            
            <p className="text-lg text-textSecondary leading-loose">
              بدأت رحلتي في عالم البرمجة بشغف لفهم كيفية عمل الأشياء على الإنترنت. ومع مرور السنوات، تطور هذا الشغف ليصبح مسيرة مهنية أكرس فيها وقتي لبناء تجارب رقمية تدمج بين الجمال المعماري للواجهات والقوة الهندسية للأنظمة الخلفية.
            </p>

            <div className="border-r-4 border-accent pr-6 py-2 my-8 italic text-xl font-arabicDisplay text-textPrimary bg-surface/50 rounded-l-lg rounded-r-sm p-4">
              &quot;البرمجة ليست مجرد كتابة أوامر للآلة، بل هي فن صياغة حلول مبتكرة تجعل حياة الناس أكثر سهولة وجمالاً.&quot;
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="سنوات الخبرة" value={5} suffix="+" isInView={isInView} />
              <StatCard label="مشاريع منجزة" value={50} suffix="+" isInView={isInView} />
              <StatCard label="عملاء سعداء" value={30} suffix="+" isInView={isInView} />
              <StatCard label="تقنيات متقنة" value={15} suffix="+" isInView={isInView} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative isolate">
              <div 
                className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10"
                style={{ clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" 
                  alt="مساحة العمل"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-surface rounded-full blur-3xl -z-10" />
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 -right-6 w-12 h-12 border-4 border-accent rounded-full opacity-50 animate-[ping_3s_ease-in-out_infinite]" />
              <div className="absolute bottom-1/4 -left-4 w-8 h-8 bg-textPrimary rounded-sm rotate-45 opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, suffix, isInView }: { label: string, value: number, suffix: string, isInView: boolean }) {
  const count = useCounter(value, 2000, isInView);

  return (
    <Card tilt={false} className="p-4 flex flex-col items-center sm:items-start justify-center gap-2 border-none bg-white/40 mb-2">
      <div className="text-3xl font-mono font-bold text-accent">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-xs lg:text-sm font-medium text-textSecondary text-center sm:text-right">{label}</div>
    </Card>
  );
}
