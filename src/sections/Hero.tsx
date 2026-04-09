"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/data";

export function Hero() {
  const characters = "MOCLEW".split("");

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden" id="#">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-8 z-10 w-full">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-[96px] font-arabicDisplay font-bold leading-tight flex flex-col items-start"
            >
              <span className="flex">
                 {characters.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                 ))}
                 <motion.span
                   animate={{ opacity: [1, 0] }}
                   transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                   className="inline-block w-2 bg-textPrimary ml-2"
                 />
              </span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: characters.length * 0.1 + 0.5 }}
                className="text-accent mt-4 block"
              >
                {siteConfig.name}
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-xl md:text-2xl text-textSecondary font-light max-w-2xl leading-[2.0]"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" variant="primary" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openResumeModal")); }}>تحميل السيرة الذاتية</Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>استكشف أعمالي</Button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative z-10">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
               className="relative aspect-square max-w-[400px] mx-auto"
             >
                <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
                
                <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-surface shadow-2xl relative bg-border flex items-center justify-center">
                  <img 
                    src="/IMG_5125.JPG" 
                    alt="صورة شخصية"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Badges */}
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -right-4 top-1/4 scale-90 md:scale-100 z-20">
                  <Badge className="shadow-lg py-2 px-4 text-sm font-mono backdrop-blur-md bg-surface/80 border-accent/20">React ⚛️</Badge>
                </motion.div>

                <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute -left-8 top-1/2 scale-90 md:scale-100 z-20">
                  <Badge className="shadow-lg py-2 px-4 text-sm font-mono backdrop-blur-md bg-surface/80 border-accent/20">Next.js 🚀</Badge>
                </motion.div>

                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 2 }} className="absolute right-8 bottom-8 scale-90 md:scale-100 z-20">
                  <Badge className="shadow-lg py-2 px-4 text-sm font-mono backdrop-blur-md bg-surface/80 border-accent/20">Node.js 🟢</Badge>
                </motion.div>
             </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scrolling Ticker */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden bg-textPrimary text-accentLight py-3 whitespace-nowrap z-20 shadow-md">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block"
        >
          {Array.from({ length: 4 }).fill("Next.js • TypeScript • Tailwind CSS • Framer Motion • React • Node.js • GraphQL • Docker • ").map((text, i) => (
             <span key={i} className="text-sm md:text-base font-mono mx-2">
               {text as string}
             </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
