import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Code2, Briefcase, MessageSquare, Star } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = createClient();
  
  const [
    { count: skillsCount }, 
    { count: projectsCount }, 
    { count: messagesCount },
    { count: testimonialsCount }
  ] = await Promise.all([
    supabase.from("skills").select("*", { count: 'exact', head: true }),
    supabase.from("projects").select("*", { count: 'exact', head: true }),
    supabase.from("messages").select("*", { count: 'exact', head: true }),
    supabase.from("testimonials").select("*", { count: 'exact', head: true }),
  ]);

  const stats = [
    { title: "المهارات", count: skillsCount || 0, icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "المشاريع", count: projectsCount || 0, icon: Briefcase, color: "text-accent", bg: "bg-accent/10" },
    { title: "الرسائل", count: messagesCount || 0, icon: MessageSquare, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "العملاء", count: testimonialsCount || 0, icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-arabicDisplay font-bold text-textPrimary mb-8">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} tilt={false} className="p-6 bg-white border border-border/50 shadow-sm flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                 <Icon size={28} />
              </div>
              <div>
                <p className="text-textSecondary text-sm mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-textPrimary">{stat.count}</h3>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
