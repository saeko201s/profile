"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src="/Gemini_Generated_Image_w9bsvw9bsvw9bsvw-removebg-preview.png"
            alt="Logo"
            className="h-20 md:h-24 w-auto transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-textPrimary hover:text-accent font-medium transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:right-0"></span>
            </a>
          ))}
          <Button variant="primary" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openResumeModal")); }}>تحميل السيرة الذاتية</Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-textPrimary focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass shadow-md border-t border-border/50 py-4 px-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-textPrimary hover:text-accent font-medium py-2 border-b border-border/30"
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="mt-4 w-full" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("openResumeModal")); }}>تحميل السيرة الذاتية</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
