CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY DEFAULT 1,
  instagram_url TEXT DEFAULT '',
  telegram_url TEXT DEFAULT '',
  whatsapp_url TEXT DEFAULT ''
);

-- السماح للقراءة من جميع الزوار
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on settings" ON settings;
CREATE POLICY "Allow public read on settings" ON settings FOR SELECT USING (true);

-- السماح للمدير بتحديث الإعدادات (في حال تفعيل RLS لاحقاً)
DROP POLICY IF EXISTS "Allow admin update on settings" ON settings;
CREATE POLICY "Allow admin update on settings" ON settings FOR UPDATE USING (true);

-- إدراج صف افتراضي للإعدادات إذا لم يكن موجوداً
INSERT INTO settings (id, instagram_url, telegram_url, whatsapp_url) 
VALUES (1, 'https://instagram.com/yourusername', 'https://t.me/yourusername', 'https://wa.me/1234567890')
ON CONFLICT (id) DO NOTHING;
