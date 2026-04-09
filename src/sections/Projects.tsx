"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  link_url?: string;
}

export function Projects({ initialProjects }: { initialProjects: Project[] }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [filter, setFilter] = useState("الكل");

  const categories = ["الكل", ...Array.from(new Set(initialProjects.map(p => p.category)))];

  const filteredProjects = filter === "الكل" 
    ? initialProjects 
    : initialProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
             <motion.h2
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5 }}
               className="text-4xl md:text-5xl font-arabicDisplay font-bold text-textPrimary mb-4"
             >
               أعمال <span className="text-accent underline decoration-accent/30 underline-offset-4">أفتخر بها</span>
             </motion.h2>
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="text-textSecondary text-lg max-w-xl"
             >
               مجموعة منتقاة من المشاريع التي تعكس التزامي بالجودة والابتكار في كل سطر برمجي.
             </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
             {categories.length > 1 && categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    filter === cat ? "bg-textPrimary text-white shadow-md scale-105" : "bg-surface text-textSecondary hover:bg-border"
                  }`}
                >
                   {cat}
                </button>
             ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
               <motion.div
                 key={project.id}
                 layout
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4 }}
                 className="group perspective-1000 h-[480px]"
                 style={{ perspective: "1000px" }}
               >
                 <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                    
                    {/* Front Face */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass rounded-2xl overflow-hidden flex flex-col shadow-sm">
                      <div className="h-56 w-full overflow-hidden relative">
                         <img 
                            src={project.image || "https://images.unsplash.com/photo-1557821552-171051530d19?auto=format&fit=crop&q=80"} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between bg-white/40">
                         <div>
                            <span className="text-accent text-sm font-semibold mb-2 block">{project.category}</span>
                            <h3 className="text-xl font-bold text-textPrimary mb-3 font-arabicDisplay">{project.title}</h3>
                            <div className="flex flex-wrap gap-2">
                               {project.tags?.slice(0, 3).map(tag => (
                                  <Badge key={tag} className="bg-white/60">{tag}</Badge>
                               ))}
                               {project.tags?.length > 3 && <Badge className="bg-white/60">+{project.tags.length - 3}</Badge>}
                            </div>
                         </div>
                         <div className="text-accent text-sm font-medium flex items-center justify-between border-t border-border/50 pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           انقر للتفاصيل →
                         </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-md border-accent/30 border-2 bg-surface/95 z-10">
                       <h3 className="text-2xl font-bold text-textPrimary mb-4 font-arabicDisplay">{project.title}</h3>
                       <p className="text-textSecondary mb-8 leading-relaxed max-w-sm">{project.description}</p>
                       <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                          {project.link_url && (
                             <a href={project.link_url} target="_blank" rel="noopener noreferrer">
                               <Button variant="primary" size="sm" className="w-full sm:w-auto">عرض المشروع</Button>
                             </a>
                          )}
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">التفاصيل</Button>
                       </div>
                    </div>

                 </div>
               </motion.div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-12 text-textSecondary italic">
                سأقوم بإضافة المشاريع إلى هنا قريباً.
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
