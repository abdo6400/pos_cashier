# 🛒 نظام نقاط البيع POS - Professional Cashier System

نظام كاشير احترافي ومتكامل للمتاجر والسوبرماركت والمؤسسات الصغيرة والمتوسطة.

A professional and complete Point of Sale (POS) system for shops, supermarkets, and small-to-medium businesses.

> **💡 ملاحظة مهمة:** النظام يعمل فوراً بدون إعداد! قاعدة البيانات **اختيارية** - راجع [دليل إعداد Supabase](SUPABASE_SETUP.md) فقط إذا أردت حفظ البيانات بشكل دائم.
>
> **💡 Important Note:** The system works immediately without setup! Database is **optional** - see [Supabase Setup Guide](SUPABASE_SETUP.md) only if you want permanent data storage.

---

## ✨ المميزات الرئيسية | Main Features

### 📊 إدارة شاملة | Comprehensive Management

- ✅ **لوحة تحكم متطورة** - Dashboard with real-time analytics and charts
- ✅ **إدارة المنتجات والمخزون** - Full inventory management with stock alerts
- ✅ **فواتير المبيعات والمشتريات** - Sales & purchase invoices with returns
- ✅ **إدارة العملاء والموردين** - Customer & supplier management with balances
- ✅ **نظام المدفوعات والمقبوضات** - Payment & collection tracking
- ✅ **إدارة المسوقين والعمولات** - Marketer commission management
- ✅ **نظام الشحن والتوصيل** - Shipping and waybill management
- ✅ **تقارير وتحليلات شاملة** - Detailed reports and analytics
- ✅ **نظام الصلاحيات** - User roles and permissions system
- ✅ **إعدادات متقدمة** - Advanced settings with backup/restore

### 💾 قاعدة بيانات متقدمة | Advanced Database

- 🔒 **Supabase Integration** - Secure cloud database (Optional)
- 🔄 **Real-time Sync** - Data synchronized across all devices
- 💾 **Auto Backup** - Automatic data backup
- 📱 **Multi-device Support** - Access from anywhere
- ⚡ **Fast Performance** - Optimized queries and caching
- ⚠️ **Works without database** - The system works perfectly with mock data

### 🎨 تصميم عصري | Modern Design

- 🌙 **واجهة عربية كاملة** - Full RTL Arabic interface
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Clean UI** - Modern, professional design
- ⚡ **Fast Loading** - Optimized performance
- 🔔 **Toast Notifications** - User-friendly alerts

---

## 🚀 كيفية الاستخدام | How to Use

### 1️⃣ الصفحات الرئيسية | Main Pages

#### 📊 لوحة التحكم | Dashboard
- عرض الإحصائيات اليومية والشهرية
- رسوم بيانية للمبيعات والمشتريات
- أكثر المنتجات مبيعاً
- النشاطات الأخيرة

#### 📦 المنتجات والمخزون | Products & Inventory
- إضافة منتجات غير محدودة
- دعم وحدات قياس متعددة (كرتون، دستة، كيلو، قطعة...)
- تنبيهات للمخزون المنخفض
- إدارة الباركود
- فلترة وبحث متقدم

#### 🧾 الفواتير | Invoices
- فواتير المبيعات والمشتريات
- مرتجعات المبيعات والمشتريات
- إضافة خصومات على الفواتير
- طباعة على A4, A5, أو الطابعات الحرارية
- حفظ وتتبع جميع الفواتير

#### 👥 العملاء والموردين | Customers & Suppliers
- إضافة عملاء وموردين غير محدودين
- كشوف حسابات تفصيلية
- تتبع الأرصدة والمديونيات
- معلومات الاتصال الكاملة

#### 💰 المدفوعات والمقبوضات | Payments & Collections
- تسجيل المدفوعات للموردين
- تسجيل المقبوضات من العملاء
- تتبع المصروفات اليومية
- طرق دفع متعددة (نقدي، بنكي، شيك، بطاقة)

#### 👨‍💼 المسوقين | Marketers
- إدارة المسوقين والوكلاء
- حساب العمولات تلقائياً
- تتبع المبيعات لكل مسوق
- تقارير الأداء

#### 🚚 الشحن | Shipping
- إنشاء بوالص شحن
- تتبع الشحنات
- إدارة السائقين
- حالات التوصيل

#### 📈 التقارير | Reports
- تقارير المبيعات والمشتريات
- أكثر وأقل المنتجات مبيعاً
- تحليل العملاء
- تقرير الأرباح والخسائر
- رسوم بيانية تفاعلية

#### 👤 المستخدمين | Users
- صلاحيات متعددة المستويات
- مدير النظام - صلاحيات كاملة
- مدير المتجر - صلاحيات إدارية
- كاشير - البيع والمنتجات فقط

#### ⚙️ الإعدادات | Settings
- بيانات الشركة
- إعدادات الطباعة والباركود
- النسخ الاحتياطي والاستعادة
- تخصيص العملة والمنطقة الزمنية

---

## 💾 قاعدة البيانات | Database Guide

### استخدام React Hooks

```typescript
import { useProducts } from './hooks/use-database';

function MyComponent() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  
  // Add new product
  await addProduct({
    name: "Product Name",
    price: 25.50,
    stock: 100
  });
  
  // Update product
  await updateProduct({ id, price: 30.00 });
  
  // Delete product
  await deleteProduct(productId);
}
```

### الـ Hooks المتاحة | Available Hooks

- `useProducts()` - إدارة المنتجات
- `useCustomers()` - إدارة العملاء
- `useSuppliers()` - إدارة الموردين
- `useInvoices()` - إدارة الفواتير
- `usePayments()` - إدارة المدفوعات
- `useSettings()` - إدارة الإعدادات

**للمزيد من التفاصيل، راجع ملف [DATABASE_GUIDE.md](/DATABASE_GUIDE.md)**

---

## 🎯 مثال عملي | Live Example

راجع الملف `/components/products-view-example.tsx` لمشاهدة مثال كامل متكامل مع قاعدة البيانات.

Check the `/components/products-view-example.tsx` file for a complete database-integrated example.

---

## 🔧 التقنيات المستخدمة | Tech Stack

- ⚛️ **React** - Frontend framework
- 🎨 **Tailwind CSS** - Styling
- 🗄️ **Supabase** - Database & Backend
- 📊 **Recharts** - Charts and graphs
- 🎯 **TypeScript** - Type safety
- 🔔 **Sonner** - Toast notifications
- 🎨 **Shadcn/UI** - UI components

---

## 📝 الوحدات المدعومة | Supported Units

النظام يدعم جميع وحدات القياس:

- 📦 كرتون | Carton
- 📦 علبة | Box
- 🎒 كيس | Bag
- 📦 دستة | Dozen
- ➗ نصف دستة | Half Dozen
- 🔢 قطعة | Piece
- ⚖️ كيلو | Kilogram
- 🏗️ طن | Ton
- 🍶 زجاجة | Bottle
- 📏 متر | Meter

---

## 🖨️ الطباعة | Printing

النظام يدعم الطباعة على:

- 📄 **A4** - ورق عادي
- 📄 **A5** - ورق نصف حجم
- 🧾 **Thermal 80mm** - طابعات حرارية 80 مم
- 🧾 **Thermal 58mm** - طابعات حرارية 58 مم
- 🔖 **أي مقاس آخر** | Any custom size

---

## 🔐 نظام الصلاحيات | Permissions System

### مدير النظام | Admin
صلاحيات كاملة لجميع الوظائف

### مدير المتجر | Manager
صلاحيات إدارية بدون إعدادات النظام

### كاشير | Cashier
صلاحيات البيع والمنتجات فقط

---

## ⚠️ تنبيهات هامة | Important Notes

### للتطوير والاختبار فقط | Development & Testing Only

هذا النظام مصمم للتطوير والاختبار. **لا تستخدمه لبيانات حساسة في الإنتاج**.

This system is designed for development and testing. **Do not use it for sensitive production data**.

### الأمان | Security

- 🔒 جميع البيانات محفوظة في Supabase
- 🔐 استخدام HTTPS للاتصالات
- ⚠️ لا تشارك معلومات تسجيل الدخول

---

## 📚 الموارد الإضافية | Additional Resources

- 🚀 [البدء السريع | Quick Start](QUICK_START.md)
- 🗄️ [إعداد Supabase | Supabase Setup](SUPABASE_SETUP.md) - **اختياري**
- 📖 [دليل قاعدة البيانات | Database Guide](DATABASE_GUIDE.md)
- 📊 [ملخص المشروع | Project Summary](PROJECT_SUMMARY.md)
- 🎨 [مكونات Shadcn/UI](https://ui.shadcn.com/)
- 🗄️ [توثيق Supabase](https://supabase.com/docs)
- 📊 [توثيق Recharts](https://recharts.org/)

---

## 🤝 المساهمة | Contributing

هذا المشروع مفتوح المصدر. يمكنك المساهمة بتحسينات وإضافات جديدة.

This project is open source. You can contribute improvements and new features.

---

## 📄 الترخيص | License

MIT License - استخدم بحرية مع الإشارة للمصدر

MIT License - Free to use with attribution

---

## 🎉 شكراً | Thank You

شكراً لاستخدامك نظام POS! نتمنى أن يكون مفيداً لك.

Thank you for using the POS System! We hope it serves you well.

---

**صُنع بـ ❤️ في السعودية | Made with ❤️ in Saudi Arabia**
