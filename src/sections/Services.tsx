"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Smartphone, Lightbulb, Code, Layout, Database, Cloud } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { Card } from "@/components/ui/Card";

const iconMap: Record<string, any> = {
  Monitor,
  Server,
  Smartphone,
  Lightbulb,
  Code,
  Layout,
  Database,
  Cloud
};

interface Service {
  id: string | number;
  title: string;
  description: string;
  icon: string;
}

export function Services({ initialServices }: { initialServices: Service[] }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="py-32 relative bg-surface/30" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-arabicDisplay font-bold text-textPrimary mb-4"
          >
            حلول <span className="text-accent">مصممة لك</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-textSecondary text-lg max-w-2xl mx-auto"
          >
            أقدم مجموعة متكاملة من الخدمات التقنية التي تساعدك على الانتقال بمشروعك إلى المستوى التالي.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialServices.map((service, index) => {
            const Icon = iconMap[service.icon] || Lightbulb;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card tilt={false} className="h-full group hover:bg-white transition-colors duration-500 relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                  
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-textPrimary group-hover:text-accent group-hover:-translate-y-2 transition-all duration-300 relative z-10">
                      <Icon size={32} strokeWidth={1.5} className="group-hover:animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-arabicDisplay text-textPrimary mb-3">{service.title}</h3>
                  <p className="text-textSecondary leading-relaxed">{service.description}</p>
                </Card>
              </motion.div>
            );
          })}
          
          {initialServices.length === 0 && (
             <div className="col-span-full text-center text-textSecondary italic py-8">
                سيتم إدراج الخدمات قريباً.
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
