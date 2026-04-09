"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, RefreshCw, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Mapping a dynamic icon if you add `DynamicIcon` component later
import { DynamicIcon } from "@/components/ui/DynamicIcon";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Skill State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("frontend");
  const [iconName, setIconName] = useState("SiReact");

  const supabase = createClient();

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("skills").select("*").order("created_at", { ascending: false });
    if (data) setSkills(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه المهارة؟")) return;
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) toast.error("حدث خطأ أثناء الحذف");
    else {
      toast.success("تم الحذف بنجاح");
      fetchSkills();
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("skills").insert([
      { name, category, icon_name: iconName }
    ]);
    if (error) {
       toast.error("حدث خطأ أثناء الإضافة: " + error.message);
    } else {
       toast.success("تمت الإضافة بنجاح");
       setIsAdding(false);
       setName("");
       setIconName("SiReact");
       fetchSkills();
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-arabicDisplay font-bold text-textPrimary">إدارة المهارات</h1>
        <Button variant="primary" onClick={() => setIsAdding(true)} className="flex items-center gap-2">
           <Plus size={18} /> إضافة مهارة
        </Button>
      </div>

      {isAdding && (
        <Card tilt={false} className="p-6 mb-8 bg-white border border-border shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-arabicDisplay text-accent">إضافة مهارة جديدة</h2>
              <button onClick={() => setIsAdding(false)} className="text-textSecondary hover:text-red-500"><X size={20}/></button>
           </div>
           
           <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-2 text-textSecondary">اسم المهارة</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-lg p-2" placeholder="مثال: React" />
              </div>
              <div>
                <label className="block text-sm mb-2 text-textSecondary">القسم</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded-lg p-2">
                  <option value="frontend">تطوير الواجهات</option>
                  <option value="backend">تطوير الخوادم</option>
                  <option value="devops">البنية التحتية</option>
                  <option value="tools">الأدوات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2 text-textSecondary">رمز الأيقونة (Simple Icons React)</label>
                <input type="text" required value={iconName} onChange={e => setIconName(e.target.value)} className="w-full border rounded-lg p-2" dir="ltr" placeholder="SiReact, SiNextdotjs..." />
                <p className="text-xs text-textSecondary mt-1">يجب أن يبدأ بـ Si (مثال: SiTailwindcss)</p>
              </div>
              <div className="md:col-span-3 flex justify-end">
                 <Button type="submit" variant="primary">حفظ المهارة</Button>
              </div>
           </form>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center p-12 text-accent"><RefreshCw className="animate-spin" size={32}/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map(skill => (
            <div key={skill.id} className="bg-white p-4 rounded-xl shadow-sm border border-border/50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="text-accent bg-accent/10 p-2 rounded-lg">
                    <DynamicIcon name={skill.icon_name} size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-textPrimary">{skill.name}</h3>
                    <p className="text-xs text-textSecondary">{skill.category}</p>
                  </div>
               </div>
               <button onClick={() => handleDelete(skill.id)} className="text-textSecondary hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                 <Trash2 size={18} />
               </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
