"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, RefreshCw, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("تطبيقات ويب");
  const [tags, setTags] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const supabase = createClient();

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("تأكيد الحذف؟")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) fetchProjects();
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean);
    const { error } = await supabase.from("projects").insert([{ title, description, image, category, tags: tagsArray, link_url: linkUrl }]);
    
    if (error) toast.error("خطأ!");
    else {
      toast.success("تم الإضافة");
      setIsAdding(false);
      fetchProjects();
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-arabicDisplay font-bold text-textPrimary">إدارة المشاريع</h1>
        <Button variant="primary" onClick={() => setIsAdding(true)}><Plus size={18} /> إضافة مشروع</Button>
      </div>

      {isAdding && (
         <Card tilt={false} className="p-6 mb-8 bg-white border border-border shadow-sm">
           <form onSubmit={handleAddSubmit} className="space-y-4">
              <input type="text" placeholder="العنوان" required value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 rounded" />
              <textarea placeholder="الوصف" required value={description} onChange={e=>setDescription(e.target.value)} className="w-full border p-2 rounded" />
              <input type="text" placeholder="رابط الصورة" required value={image} onChange={e=>setImage(e.target.value)} className="w-full border p-2 rounded" dir="ltr" />
              <input type="text" placeholder="الوسوم (مفصولة بفاصلة ,)" required value={tags} onChange={e=>setTags(e.target.value)} className="w-full border p-2 rounded" />
              <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border p-2 rounded">
                 <option value="تطبيقات ويب">تطبيقات ويب</option>
                 <option value="تطبيقات موبايل">تطبيقات موبايل</option>
                 <option value="API">API</option>
              </select>
              <input type="text" placeholder="رابط المشروع" value={linkUrl} onChange={e=>setLinkUrl(e.target.value)} className="w-full border p-2 rounded" dir="ltr"/>
              <div className="flex justify-end gap-2 mt-4">
                 <Button variant="outline" type="button" onClick={() => setIsAdding(false)}>إلغاء</Button>
                 <Button variant="primary" type="submit">حفظ المشروع</Button>
              </div>
           </form>
         </Card>
      )}

      {loading ? <RefreshCw className="animate-spin mx-auto mt-12" /> : (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(p => (
               <Card key={p.id} tilt={false} className="p-4 bg-white flex gap-4">
                  <img src={p.image} className="w-24 h-24 rounded object-cover" alt="img"/>
                  <div className="flex-1">
                     <h3 className="font-bold">{p.title}</h3>
                     <p className="text-xs text-textSecondary line-clamp-2">{p.description}</p>
                  </div>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 h-fit"><Trash2 size={18}/></button>
               </Card>
            ))}
         </div>
      )}
    </div>
  );
}
