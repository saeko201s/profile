"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, Code2, Briefcase, MessageSquare, LogOut, Users, Star, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "نظرة عامة", href: "/admin", icon: LayoutDashboard },
    { name: "المهارات", href: "/admin/skills", icon: Code2 },
    { name: "المشاريع", href: "/admin/projects", icon: Briefcase },
    { name: "آراء العملاء", href: "/admin/testimonials", icon: Star },
    { name: "الرسائل", href: "/admin/messages", icon: MessageSquare },
    { name: "الإعدادات", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-surface fixed inset-0 z-[100] w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 border-l border-border/50 flex flex-col shadow-sm">
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="text-2xl font-bold font-arabicDisplay text-accent block text-center">
            لوحة الإدارة
          </Link>
          <p className="text-center text-xs text-textSecondary mt-2">العودة للموقع</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-accent text-white shadow-md font-medium" 
                    : "text-textSecondary hover:bg-surface hover:text-textPrimary"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-surface/50 p-8">
        {children}
      </main>
    </div>
  );
}
