"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, RefreshCw, X, Star } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("5");
  const [image, setImage] = useState("");

  const supabase = createClient();

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("تأكيد الحذف؟")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) {
      toast.success("تم الحذف بنجاح");
      fetchTestimonials();
    } else {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ratingNum = parseInt(rating);
    const { error } = await supabase.from("testimonials").insert([{ name, role, content, rating: ratingNum, image }]);
    
    if (error) toast.error("خطأ في الإضافة!");
    else {
      toast.success("تمت الإضافة بنجاح");
      setIsAdding(false);
      // Reset fields
      setName("");
      setRole("");
      setContent("");
      setImage("");
      setRating("5");
      fetchTestimonials();
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-arabicDisplay font-bold text-textPrimary">إدارة آراء العملاء</h1>
        <Button variant="primary" onClick={() => setIsAdding(true)} className="flex items-center gap-2"><Plus size={18} /> إضافة رأي جديد</Button>
      </div>

      {isAdding && (
         <Card tilt={false} className="p-6 mb-8 bg-white border border-border/50 shadow-sm relative z-10">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-arabicDisplay text-accent">إضافة رأي عميل</h2>
              <button onClick={() => setIsAdding(false)} className="text-textSecondary hover:text-red-500"><X size={20}/></button>
           </div>
           
           <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm mb-2 text-textSecondary">اسم العميل</label>
                 <input type="text" required value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 rounded-lg bg-surface/50 focus:outline-accent" />
              </div>
              <div>
                 <label className="block text-sm mb-2 text-textSecondary">المنصب / الصفة</label>
                 <input type="text" required value={role} onChange={e=>setRole(e.target.value)} className="w-full border p-2 rounded-lg bg-surface/50 focus:outline-accent" placeholder="مثال: المدير التنفيذي لشركة X" />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm mb-2 text-textSecondary">نص التقييم والمراجعة</label>
                 <textarea required value={content} onChange={e=>setContent(e.target.value)} className="w-full border p-2 rounded-lg bg-surface/50 focus:outline-accent" rows={3} />
              </div>
              <div>
                 <label className="block text-sm mb-2 text-textSecondary">رابط صورة العميل</label>
                 <input type="text" required value={image} onChange={e=>setImage(e.target.value)} className="w-full border p-2 rounded-lg bg-surface/50 focus:outline-accent" dir="ltr" placeholder="https://..." />
              </div>
              <div>
                 <label className="block text-sm mb-2 text-textSecondary">التقييم المنتقى المعطى (1 - 5)</label>
                 <select value={rating} onChange={e=>setRating(e.target.value)} className="w-full border p-2 rounded-lg bg-surface/50 focus:outline-accent">
                    {[1,2,3,4,5].map(num => (
                       <option key={num} value={num}>{num} نجوم</option>
                    ))}
                 </select>
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                 <Button variant="outline" type="button" onClick={() => setIsAdding(false)}>إلغاء الاختيار</Button>
                 <Button variant="primary" type="submit">إتمام الحفظ</Button>
              </div>
           </form>
         </Card>
      )}

      {loading ? <div className="flex justify-center p-12"><RefreshCw className="animate-spin text-accent" size={32} /></div> : (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-0">
            {testimonials.map(t => (
               <Card key={t.id} tilt={false} className="p-6 bg-white shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-4">
                        <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border border-border/50" />
                        <div>
                           <h3 className="font-bold text-textPrimary">{t.name}</h3>
                           <p className="text-xs text-textSecondary mt-1">{t.role}</p>
                        </div>
                     </div>
                     <button onClick={() => handleDelete(t.id)} className="text-textSecondary hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors" title="حذف"><Trash2 size={18}/></button>
                  </div>
                  <div className="flex gap-1 text-accent">
                     {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="fill-accent" />)}
                  </div>
                  <p className="text-textSecondary text-sm line-clamp-3 whitespace-pre-wrap">&quot;{t.content}&quot;</p>
               </Card>
            ))}
            {testimonials.length === 0 && <p className="col-span-full text-center text-textSecondary p-8">لا توجد آراء للعملاء حالياً.</p>}
         </div>
      )}
    </div>
  );
}
