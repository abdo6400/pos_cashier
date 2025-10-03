# 🚀 البدء السريع | Quick Start Guide

## 📋 نظرة سريعة

نظام POS جاهز للاستخدام الفوري! يحتوي على نسختين:

1. **نسخة العرض** - بيانات ثابتة للعرض (الافتراضية)
2. **نسخة قاعدة البيانات** - متصلة بـ Supabase (للاستخدام الفعلي)

---

## ⚡ الاستخدام الفوري

النظام يعمل مباشرة بدون أي إعداد! جميع الصفحات جاهزة:

### ✅ الصفحات المتاحة الآن

- ✅ لوحة التحكم - Dashboard
- ✅ المنتجات والمخزون - Products
- ✅ الفواتير - Invoices  
- ✅ العملاء والموردين - Customers
- ✅ المدفوعات والمقبوضات - Payments
- ✅ المسوقين والعمولات - Marketers
- ✅ الشحن والتوصيل - Shipping
- ✅ التقارير والتحليلات - Reports
- ✅ المستخدمين والصلاحيات - Users
- ✅ الإعدادات - Settings

---

## 🗄️ استخدام قاعدة البيانات

### الطريقة الأولى: استبدل الصفحة

لاستخدام أي صفحة مع قاعدة البيانات:

1. افتح `/App.tsx`
2. استبدل اسم الـ Component:

```typescript
// من:
import { ProductsView } from "./components/products-view";

// إلى:
import { ProductsView } from "./components/products-view-example";
```

### الطريقة الثانية: نسخ الكود

يمكنك نسخ الكود من `products-view-example.tsx` إلى أي صفحة أخرى واستبدال:

- `products` بالبيانات المطلوبة
- `useProducts()` بالـ Hook المناسب
- أسماء الحقول حسب احتياجك

---

## 🎯 مثال سريع

### إضافة قاعدة بيانات لصفحة الفواتير

```typescript
// في invoices-view.tsx

// 1. استورد الـ Hook
import { useInvoices } from '../hooks/use-database';

// 2. استخدمه في الـ Component
function InvoicesView() {
  const { invoices, loading, addInvoice } = useInvoices();
  
  // 3. استبدل البيانات الثابتة
  // const mockInvoices = [...] ❌
  // استخدم invoices من الـ Hook ✅
  
  // 4. أضف وظيفة الحفظ
  const handleSave = async (invoiceData) => {
    await addInvoice(invoiceData);
    toast.success("تم حفظ الفاتورة");
  };
  
  return (
    // باقي الكود...
  );
}
```

---

## 📊 البيانات النموذجية

عند التشغيل الأول، سيتم تحميل بيانات تجريبية تلقائياً:

- ✅ 5 منتجات نموذجية
- ✅ 3 عملاء
- ✅ 2 موردين

**لإعادة تحميل البيانات النموذجية:**
```typescript
import { kvService } from './lib/db-service';
await kvService.initializeSampleData();
```

---

## 🔧 الـ Hooks المتاحة

```typescript
// المنتجات
const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();

// العملاء
const { customers, loading, addCustomer } = useCustomers();

// الموردين
const { suppliers, loading, addSupplier } = useSuppliers();

// الفواتير
const { invoices, loading, addInvoice } = useInvoices();

// المدفوعات
const { payments, loading, addPayment } = usePayments();

// الإعدادات
const { settings, loading, updateSettings } = useSettings();
```

---

## 💡 نصائح سريعة

### 1. معالجة حالة التحميل

```typescript
if (loading) {
  return <div>جاري التحميل...</div>;
}
```

### 2. معالجة الأخطاء

```typescript
try {
  await addProduct(data);
  toast.success("تم بنجاح");
} catch (error) {
  toast.error("حدث خطأ");
  console.error(error);
}
```

### 3. تحديث البيانات

```typescript
const { reload } = useProducts();

// بعد إضافة أو تعديل
await reload();
```

---

## 🎨 التخصيص

### تغيير اللون الرئيسي

افتح `/styles/globals.css` وعدّل:

```css
--primary: 220 90% 56%; /* الأزرق الحالي */
--primary: 142 70% 50%; /* أخضر */
--primary: 25 95% 53%;  /* برتقالي */
```

### تغيير الخط

```css
body {
  font-family: 'Cairo', 'Tajawal', sans-serif;
}
```

---

## 📱 للهواتف الذكية

النظام responsive بالكامل! يعمل على:

- 💻 Desktop
- 📱 Mobile
- 🖥️ Tablet
- ⌚ حتى الساعات الذكية!

---

## 🚨 تنبيهات مهمة

### ✅ افعل
- استخدم النظام للتطوير والتجربة
- اختبر جميع المميزات
- جرب قاعدة البيانات
- شارك تجربتك

### ❌ لا تفعل
- لا تستخدم بيانات حقيقية حساسة
- لا تستخدم للإنتاج قبل الاختبار الكامل
- لا تشارك معلومات تسجيل الدخول

---

## 📚 للمزيد

- 📖 [دليل قاعدة البيانات الكامل](DATABASE_GUIDE.md)
- 📘 [دليل الاستخدام الشامل](README.md)
- 💻 [مثال عملي](components/products-view-example.tsx)

---

## 🎉 جاهز للبدء!

النظام جاهز بالكامل. ابدأ الاستكشاف الآن! 🚀

**استمتع! 🎊**
