import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Services } from "@/sections/Services";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // optionally revalidate every 60s

export default async function Home() {
  const [
    { data: skills }, 
    { data: projects }, 
    { data: services }, 
    { data: testimonials },
    { data: settings }
  ] = await Promise.all([
    supabase.from("skills").select("*").order("created_at", { ascending: true }),
    supabase.from("projects").select("*").order("created_at", { ascending: false }),
    supabase.from("services").select("*").order("created_at", { ascending: true }),
    supabase.from("testimonials").select("*").order("created_at", { ascending: true }),
    supabase.from("settings").select("*").eq("id", 1).single(),
  ]);

  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <ScrollProgress />
      <Hero />
      <About />
      <Skills initialSkills={skills || []} />
      <Projects initialProjects={projects || []} />
      <Services initialServices={services || []} />
      <Testimonials initialTestimonials={testimonials || []} />
      <Contact settings={settings} />
    </main>
  );
}
