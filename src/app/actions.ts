"use server";

import { supabase } from "@/lib/supabase";

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "الرجاء تعبئة جميع الحقول المطلوبة." };
  }

  const { error } = await supabase.from("messages").insert([
    { name, email, subject, message },
  ]);

  if (error) {
    console.error("Supabase Insert Error:", error);
    return { success: false, error: "تأكد من إنشاء الجداول السليمة في Supabase أو حاول مجدداً." };
  }

  return { success: true };
}
