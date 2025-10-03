# 🗄️ دليل استخدام قاعدة البيانات - نظام الكاشير POS

## 📋 نظرة عامة

تم ربط نظام الكاشير بقاعدة بيانات **Supabase** لحفظ جميع البيانات بشكل دائم وآمن. البيانات محفوظة في جدول `kv_store_6ffc6762` باستخدام نظام Key-Value.

---

## ✅ المميزات الرئيسية

- ✨ **حفظ تلقائي**: جميع البيانات تُحفظ فوراً في Supabase
- 🔄 **مزامنة فورية**: البيانات متزامنة عبر جميع الأجهزة
- 🔒 **آمنة**: حماية كاملة للبيانات المالية والشخصية
- 📊 **بيانات نموذجية**: يتم تحميل بيانات تجريبية تلقائياً عند التشغيل الأول
- 🚀 **سريعة**: استجابة فورية باستخدام React Hooks

---

## 🛠️ كيفية الاستخدام

### 1️⃣ استخدام الـ Hooks الجاهزة

تم إنشاء مجموعة من الـ Custom Hooks لتسهيل التعامل مع قاعدة البيانات:

```typescript
import { 
  useProducts, 
  useCustomers, 
  useSuppliers, 
  useInvoices,
  usePayments,
  useSettings 
} from '../hooks/use-database';
```

### 2️⃣ مثال: إدارة المنتجات

```typescript
function ProductsComponent() {
  // استدعاء الـ Hook
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();

  // إضافة منتج جديد
  const handleAddProduct = async () => {
    const newProduct = {
      name: "شاي أحمد",
      price: 25.50,
      cost: 18.00,
      stock: 150,
      category: "مشروبات",
      unit: "علبة",
      barcode: "123456789"
    };
    
    await addProduct(newProduct);
  };

  // تحديث منتج
  const handleUpdateProduct = async (product) => {
    await updateProduct({ ...product, price: 30.00 });
  };

  // حذف منتج
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

---

## 📂 الوظائف المتاحة

### 🛍️ المنتجات (Products)

```typescript
const { products, loading, addProduct, updateProduct, deleteProduct, reload } = useProducts();

// إضافة منتج
await addProduct({
  name: string,
  category: string,
  price: number,
  cost: number,
  stock: number,
  unit: string,
  barcode: string
});

// تحديث منتج
await updateProduct({ id, ...productData });

// حذف منتج
await deleteProduct(productId);

// إعادة تحميل البيانات
await reload();
```

### 👥 العملاء (Customers)

```typescript
const { customers, loading, addCustomer, reload } = useCustomers();

await addCustomer({
  name: string,
  phone: string,
  email: string,
  balance: number,
  type: "customer"
});
```

### 🏢 الموردين (Suppliers)

```typescript
const { suppliers, loading, addSupplier, reload } = useSuppliers();

await addSupplier({
  name: string,
  phone: string,
  email: string,
  balance: number,
  type: "supplier"
});
```

### 🧾 الفواتير (Invoices)

```typescript
const { invoices, loading, addInvoice, reload } = useInvoices();

await addInvoice({
  type: "sale" | "purchase",
  customer: string,
  items: array,
  total: number,
  status: "paid" | "pending",
  date: string
});
```

### 💰 المدفوعات (Payments)

```typescript
const { payments, loading, addPayment, reload } = usePayments();

await addPayment({
  type: "payment" | "collection",
  recipient: string,
  amount: number,
  method: string,
  status: string,
  date: string
});
```

### ⚙️ الإعدادات (Settings)

```typescript
const { settings, loading, updateSettings, reload } = useSettings();

await updateSettings({
  companyName: string,
  taxNumber: string,
  currency: string,
  ...
});
```

---

## 🔧 استخدام kvService مباشرة

إذا كنت تحتاج المزيد من التحكم، يمكنك استخدام `kvService` مباشرة:

```typescript
import { kvService } from '../lib/db-service';

// جلب جميع المنتجات
const products = await kvService.getProducts();

// جلب منتج واحد
const product = await kvService.getProduct(productId);

// حفظ منتج
const saved = await kvService.saveProduct(productData);

// حذف منتج
await kvService.deleteProduct(productId);

// تهيئة بيانات نموذجية
await kvService.initializeSampleData();
```

---

## 📊 هيكل البيانات

### المنتج (Product)
```typescript
{
  id: string,           // معرّف فريد
  name: string,         // اسم المنتج
  category: string,     // الفئة
  price: number,        // سعر البيع
  cost: number,         // سعر التكلفة
  stock: number,        // الكمية المتوفرة
  unit: string,         // الوحدة (علبة، كيس، قطعة...)
  barcode: string       // رقم الباركود
}
```

### العميل / المورد (Customer / Supplier)
```typescript
{
  id: string,
  name: string,         // الاسم
  phone: string,        // رقم الهاتف
  email: string,        // البريد الإلكتروني
  balance: number,      // الرصيد
  type: "customer" | "supplier"
}
```

### الفاتورة (Invoice)
```typescript
{
  id: string,
  type: "sale" | "purchase" | "sale-return" | "purchase-return",
  customer: string,     // اسم العميل/المورد
  items: array,         // قائمة المنتجات
  total: number,        // المبلغ الإجمالي
  discount: number,     // الخصم
  status: "paid" | "pending",
  date: string
}
```

---

## 🎯 مثال عملي كامل

راجع الملف `/components/products-view-example.tsx` لمشاهدة مثال كامل يوضح:

- ✅ جلب البيانات من قاعدة البيانات
- ✅ عرض البيانات في جدول
- ✅ إضافة منتج جديد
- ✅ حذف منتج
- ✅ البحث والفلترة
- ✅ معالجة الأخطاء
- ✅ عرض رسائل التأكيد (Toast notifications)

---

## 🚨 ملاحظات مهمة

1. **التهيئة التلقائية**: عند تشغيل النظام للمرة الأولى، يتم تحميل بيانات نموذجية تلقائياً
2. **معالجة الأخطاء**: جميع الوظائف تستخدم try-catch لمعالجة الأخطاء
3. **الـ Loading State**: استخدم `loading` للتحقق من حالة التحميل
4. **الـ Reload**: استخدم `reload()` لإعادة تحميل البيانات من السيرفر

---

## 📱 للمطورين

### إضافة نوع بيانات جديد

1. أضف الوظائف في `/lib/db-service.ts`:
```typescript
async getYourData() {
  const { data, error } = await supabase
    .from('kv_store_6ffc6762')
    .select('*')
    .like('key', 'yourdata:%');
  
  if (error) throw error;
  return data?.map(item => ({ 
    id: item.key.split(':')[1], 
    ...JSON.parse(item.value) 
  })) || [];
}
```

2. أنشئ Hook في `/hooks/use-database.ts`:
```typescript
export function useYourData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await kvService.getYourData();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, reload: loadData };
}
```

---

## 🎓 خلاصة

نظام قاعدة البيانات جاهز للاستخدام بالكامل! يمكنك الآن:

- ✅ إضافة وحذف وتعديل المنتجات
- ✅ إدارة العملاء والموردين
- ✅ حفظ الفواتير والمعاملات
- ✅ تخزين الإعدادات
- ✅ كل ذلك بشكل آمن ودائم في Supabase

**مهم**: هذا النظام مخصص للتطوير والاختبار فقط. لا تستخدمه لبيانات حساسة في الإنتاج.
