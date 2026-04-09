"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("تم تسجيل الدخول بنجاح!");
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface/50 px-4 fixed inset-0 z-[99999] bg-surface">
      <Toaster />
      <div className="max-w-md w-full glass p-8 rounded-2xl shadow-xl border border-border/50">
        <h1 className="text-3xl font-arabicDisplay font-bold text-center text-textPrimary mb-8">تسجيل الدخول للإدارة</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-left" 
              dir="ltr"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-left" 
              dir="ltr"
              required 
            />
          </div>
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>
      </div>
    </div>
  );
}
