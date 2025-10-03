# 🗄️ إعداد قاعدة البيانات Supabase

## 📋 نظرة عامة

نظام الكاشير POS يستخدم Supabase كقاعدة بيانات. هذا الدليل يشرح كيفية إعداد الجدول المطلوب.

---

## ⚠️ ملاحظة هامة

النظام يعمل بدون قاعدة بيانات! إذا لم تقم بإعداد Supabase، سيعمل النظام ببيانات نموذجية ثابتة.

**استخدام قاعدة البيانات اختياري** وموصى به فقط إذا أردت:
- حفظ البيانات بشكل دائم
- مزامنة البيانات عبر أجهزة متعددة
- استخدام النظام في بيئة إنتاجية

---

## 🚀 خطوات الإعداد

### الخطوة 1: إنشاء الجدول

في لوحة تحكم Supabase، قم بتنفيذ SQL التالي:

```sql
-- إنشاء جدول kv_store_6ffc6762
CREATE TABLE IF NOT EXISTS public.kv_store_6ffc6762 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إضافة فهرس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_kv_store_key_pattern 
ON public.kv_store_6ffc6762 USING btree (key text_pattern_ops);

-- تمكين RLS (Row Level Security)
ALTER TABLE public.kv_store_6ffc6762 ENABLE ROW LEVEL SECURITY;

-- سياسة للسماح بجميع العمليات (للتطوير فقط)
CREATE POLICY "Allow all operations for development"
ON public.kv_store_6ffc6762
FOR ALL
USING (true)
WITH CHECK (true);

-- إضافة تعليق للجدول
COMMENT ON TABLE public.kv_store_6ffc6762 
IS 'Key-Value store for POS system data';
```

### الخطوة 2: التحقق من الإعداد

بعد تشغيل SQL، تحقق من:
1. ✅ الجدول `kv_store_6ffc6762` موجود
2. ✅ RLS مفعّل
3. ✅ السياسة موجودة

### الخطوة 3: إعادة تحميل التطبيق

بعد إنشاء الجدول، قم بإعادة تحميل صفحة التطبيق. سيقوم النظام تلقائياً بـ:
- ✅ التحقق من وجود الجدول
- ✅ تحميل بيانات نموذجية (5 منتجات، 3 عملاء، 2 موردين)
- ✅ عرض رسالة نجاح في Console

---

## 🔍 التحقق من نجاح الإعداد

افتح Console في المتصفح (F12) وابحث عن:

### ✅ إذا نجح الإعداد:
```
✓ Sample data initialized successfully
```

### ⚠️ إذا لم يتم إنشاء الجدول:
```
⚠️ Database table not found. The POS system will work with mock data only.
ℹ️ To use the database, please set up the kv_store_6ffc6762 table in Supabase.
```

---

## 📊 هيكل البيانات

الجدول يستخدم نمط **Key-Value** حيث:

| Key Pattern | الاستخدام |
|------------|----------|
| `product:*` | المنتجات |
| `customer:*` | العملاء |
| `supplier:*` | الموردين |
| `invoice:*` | الفواتير |
| `payment:*` | المدفوعات |
| `marketer:*` | المسوقين |
| `shipment:*` | الشحنات |
| `user:*` | المستخدمين |
| `settings` | الإعدادات |

### مثال على البيانات:

```json
{
  "key": "product:prod_1696234567890",
  "value": {
    "id": "prod_1696234567890",
    "name": "شاي أحمد 100 كيس",
    "category": "مشروبات",
    "price": 25.50,
    "cost": 18.00,
    "stock": 150,
    "unit": "علبة",
    "barcode": "123456789"
  }
}
```

---

## 🔒 الأمان (للإنتاج)

⚠️ **تحذير**: السياسة الحالية تسمح بجميع العمليات للجميع!

في بيئة الإنتاج، استبدل السياسة بـ:

```sql
-- حذف السياسة الحالية
DROP POLICY IF EXISTS "Allow all operations for development" 
ON public.kv_store_6ffc6762;

-- إضافة سياسات محددة
-- مثال: السماح فقط للمستخدمين المسجلين
CREATE POLICY "Authenticated users can read"
ON public.kv_store_6ffc6762
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert"
ON public.kv_store_6ffc6762
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update"
ON public.kv_store_6ffc6762
FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete"
ON public.kv_store_6ffc6762
FOR DELETE
USING (auth.role() = 'authenticated');
```

---

## 🛠️ استكشاف الأخطاء

### مشكلة: "Could not find the table"

**الحل:**
1. تأكد من تنفيذ SQL في الخطوة 1
2. تحقق من اسم الجدول: `kv_store_6ffc6762`
3. تأكد من Schema: `public`

### مشكلة: "Multiple GoTrueClient instances"

**الحل:**
- تم إصلاحها تلقائياً في الإصدار الحالي
- النظام يستخدم singleton pattern

### مشكلة: "Permission denied"

**الحل:**
1. تأكد من تمكين RLS
2. تأكد من إضافة السياسات
3. راجع قسم الأمان أعلاه

---

## 📱 الاستخدام بدون قاعدة البيانات

النظام يعمل بدون Supabase! سيستخدم بيانات نموذجية من الملفات:
- `/components/products-view.tsx`
- `/components/customers-view.tsx`
- `/components/invoices-view.tsx`
- إلخ...

**المميزات:**
- ✅ يعمل فوراً بدون إعداد
- ✅ مناسب للتجربة والعروض
- ✅ لا يحتاج اتصال بالإنترنت

**العيوب:**
- ❌ البيانات تُفقد عند إعادة التحميل
- ❌ لا يمكن المزامنة بين الأجهزة
- ❌ غير مناسب للإنتاج

---

## 🎯 متى تستخدم قاعدة البيانات؟

### استخدم قاعدة البيانات إذا:
- ✅ تريد حفظ البيانات بشكل دائم
- ✅ تحتاج للمزامنة بين أجهزة متعددة
- ✅ تريد نشر النظام للاستخدام الفعلي
- ✅ تحتاج لعمل نسخ احتياطية

### لا تستخدم قاعدة البيانات إذا:
- ❌ تريد فقط تجربة النظام
- ❌ تقوم بعرض تقديمي سريع
- ❌ تتعلم كيفية استخدام النظام
- ❌ تطور ميزات جديدة محلياً

---

## 📚 موارد إضافية

- [توثيق Supabase](https://supabase.com/docs)
- [دليل قاعدة البيانات](DATABASE_GUIDE.md)
- [البدء السريع](QUICK_START.md)

---

## 🆘 الدعم

إذا واجهت مشاكل:
1. تحقق من Console (F12)
2. راجع رسائل الخطأ
3. اتبع خطوات استكشاف الأخطاء أعلاه

---

**ملاحظة:** قاعدة البيانات **اختيارية**. النظام يعمل بشكل ممتاز بدونها! 🎉
