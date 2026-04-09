-- إضافة عمود أيقونة لجدول المهارات
ALTER TABLE skills ADD COLUMN IF NOT EXISTS icon_name TEXT DEFAULT 'SiCodeigniter';
