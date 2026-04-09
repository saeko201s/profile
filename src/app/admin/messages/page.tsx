"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Trash2, RefreshCw, Mail } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) toast.error("حدث خطأ أثناء الحذف");
    else {
      toast.success("تم الحذف بنجاح");
      fetchMessages();
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-arabicDisplay font-bold text-textPrimary">صندوق الرسائل</h1>
      </div>

      {loading ? (
        <div className="flex justify-center p-12 text-accent"><RefreshCw className="animate-spin" size={32}/></div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <Card key={msg.id} tilt={false} className="p-6 bg-white border border-border/50 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                     <div className="bg-accent/10 p-3 rounded-full text-accent">
                        <Mail size={20} />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg">{msg.name}</h3>
                        <p className="text-sm font-mono text-textSecondary" dir="ltr">{msg.email}</p>
                     </div>
                  </div>
                  <button onClick={() => handleDelete(msg.id)} className="text-textSecondary hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                     <Trash2 size={18} />
                  </button>
               </div>
               <h4 className="font-semibold text-textPrimary mb-2 border-b border-border/50 pb-2">{msg.subject}</h4>
               <p className="text-textSecondary leading-relaxed whitespace-pre-wrap">{msg.message}</p>
               <p className="text-xs text-textSecondary/50 mt-4 text-left" dir="ltr">{new Date(msg.created_at).toLocaleString()}</p>
            </Card>
          ))}
          {messages.length === 0 && <p className="text-center text-textSecondary">لا توجد رسائل حالياً.</p>}
        </div>
      )}
    </div>
  );
}
