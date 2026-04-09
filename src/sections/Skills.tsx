"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface Skill {
  id: string | number;
  name: string;
  category: string;
  icon_name?: string;
}

export function Skills({ initialSkills }: { initialSkills: Skill[] }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<string>("frontend");

  const tabs = [
    { id: "frontend", label: "تطوير الواجهات" },
    { id: "backend", label: "تطوير الخوادم" },
    { id: "devops", label: "البنية التحتية" },
    { id: "tools", label: "الأدوات" },
  ];

  const filteredSkills = initialSkills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-32 relative bg-surface/30" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-arabicDisplay font-bold text-textPrimary mb-4"
          >
            ترسانتي <span className="text-accent">التقنية</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-textSecondary text-lg"
          >
            الأدوات والتقنيات التي أستخدمها لتحويل الأفكار إلى واقع
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors outline-none",
                  activeTab === tab.id ? "text-white" : "text-textSecondary hover:text-textPrimary bg-white/50"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-accent rounded-full shadow-md z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card tilt={true} className="aspect-square flex flex-col items-center justify-center gap-4 p-4 text-center cursor-default bg-white/60 backdrop-blur-sm border border-border/50 hover:border-accent/40 transition-colors group shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-textPrimary group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-inner">
                    {skill.icon_name ? (
                      <DynamicIcon name={skill.icon_name} size={32} />
                    ) : (
                      <span className="font-mono font-bold text-xl">{skill.name.charAt(0)}</span>
                    )}
                  </div>
                  <span className="font-medium text-textPrimary text-sm sm:text-base">{skill.name}</span>
                </Card>
              </motion.div>
            ))}
            {filteredSkills.length === 0 && (
              <div className="col-span-full text-center py-12 text-textSecondary italic">
                لم يتم إضافة مهارات في هذا القسم بعد.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
