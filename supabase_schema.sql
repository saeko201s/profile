-- Run this code in your Supabase SQL Editor

-- 1. Create Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  category TEXT NOT NULL,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating NUMERIC NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Some Mock Data (Optional, but recommended to test UI)
INSERT INTO skills (name, category) VALUES 
('React', 'frontend'), ('Next.js', 'frontend'), ('TypeScript', 'frontend'),
('Node.js', 'backend'), ('PostgreSQL', 'backend'), ('Docker', 'devops');

INSERT INTO services (title, description, icon) VALUES 
('تطوير الواجهات', 'بناء واجهات مستخدم تفاعلية وجذابة.', 'Monitor'),
('تطوير الخادم', 'تصميم وبناء أنظمة خلفية قوية وقابلة للتوسع.', 'Server'),
('تطبيقات المحمول', 'برمجة تطبيقات للهواتف الذكية.', 'Smartphone'),
('الاستشارات التقنية', 'تقديم حلول واستشارات لتحسين بنية الأنظمة.', 'Lightbulb');
