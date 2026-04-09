"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RefreshCw, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SettingsAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [instagramUrl, setInstagramUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const supabase = createClient();

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
    if (data) {
       setInstagramUrl(data.instagram_url || "");
       setTelegramUrl(data.telegram_url || "");
       setWhatsappUrl(data.whatsapp_url || "");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // We update the row where id = 1
    const { error } = await supabase.from("settings").update({
      instagram_url: instagramUrl,
      telegram_url: telegramUrl,
      whatsapp_url: whatsappUrl,
    }).eq("id", 1);
    
    setSaving(false);
    
    if (error) {
      toast.error("حدث خطأ أثناء حفظ الإعدادات");
    } else {
      toast.success("تم تحديث الروابط بنجاح!");
      fetchSettings();
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-arabicDisplay font-bold text-textPrimary">إدارة الحسابات والروابط</h1>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-accent"><RefreshCw className="animate-spin" size={32}/></div>
      ) : (
        <Card tilt={false} className="p-8 bg-white border border-border/50 shadow-sm max-w-2xl">
           <form onSubmit={handleSave} className="space-y-6">
              <div>
                 <label className="block text-sm mb-2 text-textSecondary font-bold">رابط حساب الإنستجرام</label>
                 <input 
                   type="text" 
                   value={instagramUrl} 
                   onChange={e => setInstagramUrl(e.target.value)} 
                   className="w-full border p-3 rounded-lg bg-surface/50 focus:outline-accent" 
                   dir="ltr"
                   placeholder="https://instagram.com/..." 
                 />
              </div>

              <div>
                 <label className="block text-sm mb-2 text-textSecondary font-bold">رابط حساب التليجرام</label>
                 <input 
                   type="text" 
                   value={telegramUrl} 
                   onChange={e => setTelegramUrl(e.target.value)} 
                   className="w-full border p-3 rounded-lg bg-surface/50 focus:outline-accent" 
                   dir="ltr"
                   placeholder="https://t.me/..." 
                 />
              </div>

              <div>
                 <label className="block text-sm mb-2 text-textSecondary font-bold">رابط حساب الواتساب (أو رقم الجوال)</label>
                 <input 
                   type="text" 
                   value={whatsappUrl} 
                   onChange={e => setWhatsappUrl(e.target.value)} 
                   className="w-full border p-3 rounded-lg bg-surface/50 focus:outline-accent" 
                   dir="ltr"
                   placeholder="https://wa.me/..." 
                 />
              </div>
              
              <div className="pt-6 border-t border-border/50 flex justify-end">
                 <Button variant="primary" type="submit" disabled={saving} className="flex items-center gap-2">
                    {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    حفظ التغييرات
                 </Button>
              </div>
           </form>
        </Card>
      )}
    </div>
  );
}
