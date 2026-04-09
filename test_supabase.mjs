import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjyksimwrhacgieiobul.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqeWtzaW13cmhhY2dpZWlvYnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDgzMDYsImV4cCI6MjA5MTIyNDMwNn0.5_Vyhg9ULbSmrCu6ma70Jfy0Ie3nSS43OyYlGRkRSuU";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Testing Supabase connection...\n");

  const { data: skills, error: skillsErr } = await supabase.from("skills").select("*");
  console.log("Skills:", skills?.length ?? 0, "rows", skillsErr ? `ERROR: ${skillsErr.message}` : "OK");

  const { data: projects, error: projErr } = await supabase.from("projects").select("*");
  console.log("Projects:", projects?.length ?? 0, "rows", projErr ? `ERROR: ${projErr.message}` : "OK");

  const { data: services, error: svcErr } = await supabase.from("services").select("*");
  console.log("Services:", services?.length ?? 0, "rows", svcErr ? `ERROR: ${svcErr.message}` : "OK");

  const { data: testimonials, error: testErr } = await supabase.from("testimonials").select("*");
  console.log("Testimonials:", testimonials?.length ?? 0, "rows", testErr ? `ERROR: ${testErr.message}` : "OK");

  if (skills && skills.length > 0) {
    console.log("\nSample skill:", JSON.stringify(skills[0], null, 2));
  }
  if (services && services.length > 0) {
    console.log("\nSample service:", JSON.stringify(services[0], null, 2));
  }
}

test();
