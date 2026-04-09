-- ============================================
-- هذا الكود يحل مشكلة RLS (Row Level Security)
-- قم بلصقه في SQL Editor في حساب Supabase الخاص بك وشغّله
-- ============================================

-- 1. السماح بقراءة البيانات للجميع (skills, projects, services, testimonials)
CREATE POLICY "Allow public read on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (true);

-- 2. السماح بإرسال رسائل جديدة (Insert) من الموقع
CREATE POLICY "Allow public insert on messages" ON messages FOR INSERT WITH CHECK (true);

-- ============================================
-- 3. إضافة بيانات تجريبية في الجداول
-- ============================================

-- مهارات
INSERT INTO skills (name, category) VALUES 
('React', 'frontend'), ('Next.js', 'frontend'), ('TypeScript', 'frontend'),
('Tailwind CSS', 'frontend'), ('Framer Motion', 'frontend'), ('Redux', 'frontend'),
('Node.js', 'backend'), ('Express', 'backend'), ('NestJS', 'backend'),
('PostgreSQL', 'backend'), ('MongoDB', 'backend'), ('GraphQL', 'backend'),
('Docker', 'devops'), ('AWS', 'devops'), ('CI/CD', 'devops'),
('Linux', 'devops'), ('Nginx', 'devops'),
('Git', 'tools'), ('Figma', 'tools'), ('Postman', 'tools'),
('Jest', 'tools'), ('Webpack', 'tools');

-- مشاريع
INSERT INTO projects (title, description, image, tags, category, link_url) VALUES 
(
  'منصة تجارة إلكترونية متطورة',
  'بناء متجر إلكتروني متكامل يوفر تجربة تسوق سريعة وموثوقة مع لوحة تحكم متقدمة.',
  'https://images.unsplash.com/photo-1557821552-171051530d19?q=80&w=2000&auto=format&fit=crop',
  ARRAY['Next.js', 'Tailwind CSS', 'Stripe', 'Supabase'],
  'تطبيقات ويب',
  '#'
),
(
  'تطبيق إدارة المهام للفرق',
  'تطبيق للهواتف المحمولة يسهل التواصل وتوزيع المهام بين أعضاء الفريق.',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop',
  ARRAY['React Native', 'Firebase', 'Redux'],
  'تطبيقات موبايل',
  '#'
),
(
  'نظام إدارة الموارد (ERP)',
  'نظام داخلي لشركة لوجستية لتتبع الشحنات وإدارة المخزون.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker'],
  'تطبيقات ويب',
  '#'
),
(
  'بوابة دفع إلكتروني (API)',
  'تطوير واجهة برمجية آمنة للتعامل مع المدفوعات لمجموعة من المتاجر.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
  ARRAY['Node.js', 'Express', 'TypeScript', 'Redis'],
  'API',
  '#'
);

-- خدمات
INSERT INTO services (title, description, icon) VALUES 
('تطوير الواجهات', 'بناء واجهات مستخدم تفاعلية وجذابة تركز على تجربة المستخدم (UX/UI) والأداء السريع.', 'Monitor'),
('تطوير الخادم', 'تصميم وبناء أنظمة خلفية قوية وقابلة للتوسع للتعامل مع البيانات المعقدة.', 'Server'),
('تطبيقات المحمول', 'برمجة تطبيقات للهواتف الذكية تعمل على أنظمة iOS و Android بكفاءة عالية.', 'Smartphone'),
('الاستشارات التقنية', 'تقديم حلول واستشارات لتحسين بنية الأنظمة واختيار التقنيات الأنسب لمشروعك.', 'Lightbulb');

-- آراء العملاء
INSERT INTO testimonials (name, role, content, rating, image) VALUES 
('أحمد عبدالله', 'المدير التنفيذي، شركة الابتكار', 'عمل محمد معنا على تطوير منصتنا الأساسية وكان أداؤه استثنائياً. التزامه بالجودة والوقت جعل منه شريكاً تقنياً لا يعوض.', 5, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'),
('سارة محمد', 'مديرة منتج', 'الاهتمام بالتفاصيل الدقيقة والحرص على تجربة المستخدم هو ما يميز عمل محمد. الواجهات التي بناها فاقت توقعاتنا.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop'),
('خالد سعيد', 'مؤسس شركة ناشئة', 'اعتمدنا على استشاراته التقنية لبناء بنية النظام الخاصة بنا وكانت نصائحه حاسمة في نجاح إطلاق المشروع.', 4, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'),
('نورة النعيمي', 'صاحبة متجر إلكتروني', 'سرعة في الإنجاز ونتائج مبهرة. أنصح وبشدة بالتعامل معه لأي مشروع يتطلب دقة واحترافية عالية.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop');
