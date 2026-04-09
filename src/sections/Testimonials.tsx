"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Card } from "@/components/ui/Card";
import { Star } from "lucide-react";

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export function Testimonials({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  if (!initialTestimonials || initialTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-arabicDisplay font-bold text-textPrimary mb-4"
        >
          آراء <span className="text-accent">العملاء</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-textSecondary text-lg max-w-2xl mx-auto"
        >
          أفتخر بالعمل مع نخبة من المؤسسات والأفراد الذين وثقوا بخدماتي.
        </motion.p>
      </div>

      <div className="relative w-full flex items-center -skew-y-3 bg-accent/5 py-12">
        <div className="absolute inset-0 bg-mesh opacity-20 -z-10" />
        
        {/* Carousel inner */}
        <div className="flex w-full overflow-hidden relative group">
           <motion.div 
             className="flex gap-6 whitespace-nowrap min-w-full px-4 lg:px-12 items-center"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 40, ease: "linear", repeat: Infinity }}
           >
              {[...initialTestimonials, ...initialTestimonials, ...initialTestimonials].map((item, index) => (
                <div key={`${item.id}-${index}`} className="w-[300px] md:w-[400px] flex-shrink-0 whitespace-normal transform skew-y-3 pt-6 pb-6 hover:[animation-play-state:paused]">
                   <Card tilt={false} className="h-full bg-white/80 hover:bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300">
                     <div className="flex items-center gap-4 mb-4 border-b border-border/50 pb-4">
                        <img src={item.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-accent/20" />
                        <div>
                           <h4 className="font-bold text-textPrimary font-arabicDisplay text-lg">{item.name}</h4>
                           <p className="text-xs text-textSecondary mt-1">{item.role}</p>
                        </div>
                     </div>
                     <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < item.rating ? "fill-accent text-accent" : "fill-surface text-border"} 
                          />
                        ))}
                     </div>
                     <p className="text-textSecondary/90 leading-relaxed text-sm md:text-base italic">&quot;{item.content}&quot;</p>
                   </Card>
                </div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
}
