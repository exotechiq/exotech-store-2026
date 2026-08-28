'use client';
import React, { useState } from 'react';
import { CategoryItem } from './SidebarDrawer';

interface AdminPanelProps {
  categories: CategoryItem[];
  onAddCategory: (titleAr: string, titleEn: string) => void;
  onDeleteCategory: (catId: string) => void;
  onAddSubcategory: (
    parentCatId: string,
    subTitleAr: string,
    subTitleEn: string
  ) => void;
  onDeleteSubcategory: (parentCatId: string, subId: string) => void;
  products: any[];
  onSaveProduct: (payload: any, editingId: number | null) => Promise<void>;
  onDeleteProduct: (id: number) => Promise<void>;
  formatIQD: (amount: number) => string;
  lang: 'ar' | 'en';
  colors: any;
}

export default function AdminPanel({
  categories,
  onAddCategory,
  onDeleteCategory,
  onAddSubcategory,
  onDeleteSubcategory,
  products,
  onSaveProduct,
  onDeleteProduct,
  formatIQD,
  lang,
  colors,
}: AdminPanelProps) {
  // حالة المنتجات
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'عام');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // حالة إضافة قسم رئيسي
  const [newCatAr, setNewCatAr] = useState('');
  const [newCatEn, setNewCatEn] = useState('');

  // حالة إضافة قسم فرعي
  const [selectedParentCat, setSelectedParentCat] = useState(
    categories[0]?.id || ''
  );
  const [newSubAr, setNewSubAr] = useState('');
  const [newSubEn, setNewSubEn] = useState('');

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert('يرجى ملء الاسم والسعر');
    const payload = {
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      image_url: imageUrl.trim(),
      description: description.trim(),
    };
    await onSaveProduct(payload, editingId);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory(categories[0]?.id || 'عام');
    setImageUrl('');
    setDescription('');
    setEditingId(null);
  };

  const startEdit = (p: any) => {
    setEditingId(p.id);
    setName(p.name || '');
    setPrice(p.price?.toString() || '');
    setCategory(p.category || categories[0]?.id || 'عام');
    setImageUrl(
      Array.isArray(p.image_url) ? p.image_url.join('\n') : p.image_url || ''
    );
    setDescription(p.description || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 20px',
        color: colors.text,
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: '900',
          color: colors.primary,
          marginBottom: '24px',
        }}
      >
        ⚙️{' '}
        {lang === 'ar' ? 'لوحة تحكم وإدارة EXOTECH' : 'EXOTECH Admin Dashboard'}
      </h1>

      {/* إدارة الأقسام الرئيسية والفرعية */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {/* إضافة قسم رئيسي */}
        <div
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '14px',
            padding: '20px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '14px',
              color: '#fff',
            }}
          >
            ➕ {lang === 'ar' ? 'إضافة قسم رئيسي جديد' : 'Add Main Category'}
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <input
              type="text"
              placeholder="اسم القسم بالعربي (مثال: شاشات)"
              value={newCatAr}
              onChange={(e) => setNewCatAr(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            />
            <input
              type="text"
              placeholder="اسم القسم بالإنكليزي (مثال: Monitors)"
              value={newCatEn}
              onChange={(e) => setNewCatEn(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            />
            <button
              onClick={() => {
                if (!newCatAr.trim()) return alert('اكتب اسم القسم بالعربي');
                onAddCategory(newCatAr.trim(), newCatEn.trim());
                setNewCatAr('');
                setNewCatEn('');
              }}
              style={{
                backgroundColor: colors.primary,
                color: colors.primaryText,
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              حفظ القسم الرئيسي
            </button>
          </div>
        </div>

        {/* إضافة مكونات / أقسام فرعية داخل قائمة */}
        <div
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '14px',
            padding: '20px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '14px',
              color: '#fff',
            }}
          >
            🔀 {lang === 'ar' ? 'إضافة مكون فرعي داخل قسم' : 'Add Subcategory'}
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <select
              value={selectedParentCat}
              onChange={(e) => setSelectedParentCat(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            >
              {categories
                .filter((c) => c.id !== 'all')
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    تفريغ بداخل: {c.titleAr}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="اسم المكون الفرعي بالعربي (مثال: معالجات CPU)"
              value={newSubAr}
              onChange={(e) => setNewSubAr(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            />
            <input
              type="text"
              placeholder="الاسم بالإنكليزي (مثال: Processors)"
              value={newSubEn}
              onChange={(e) => setNewSubEn(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            />
            <button
              onClick={() => {
                if (!newSubAr.trim() || !selectedParentCat)
                  return alert('اختر القسم واكتب اسم المكون الفرعي');
                onAddSubcategory(
                  selectedParentCat,
                  newSubAr.trim(),
                  newSubEn.trim()
                );
                setNewSubAr('');
                setNewSubEn('');
              }}
              style={{
                backgroundColor: '#10b981',
                color: '#fff',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              + إضافة المكون للقائمة
            </button>
          </div>
        </div>
      </div>

      {/* استعراض وحذف الأقسام والمكونات الحالية */}
      <div
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: '14px',
          padding: '20px',
          marginBottom: '32px',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '14px',
            color: '#fff',
          }}
        >
          📑{' '}
          {lang === 'ar'
            ? 'هيكلية الأقسام والمكونات الحالية'
            : 'Current Categories Tree'}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {categories
            .filter((c) => c.id !== 'all')
            .map((cat) => (
              <div
                key={cat.id}
                style={{
                  backgroundColor: colors.cardInner,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  padding: '10px 14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: '13.5px',
                    }}
                  >
                    {cat.titleAr}
                  </span>
                  <button
                    onClick={() => onDeleteCategory(cat.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div
                    style={{
                      marginTop: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '12px',
                          color: '#94a3b8',
                        }}
                      >
                        <span>• {sub.titleAr}</span>
                        <button
                          onClick={() => onDeleteSubcategory(cat.id, sub.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#f87171',
                            cursor: 'pointer',
                            fontSize: '10px',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* إضافة / تعديل منتج */}
      <div
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '32px',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '18px',
            color: colors.primary,
          }}
        >
          {editingId ? '✏️ تعديل بيانات منتج' : '📦 إضافة منتج جديد'}
        </h3>
        <form
          onSubmit={handleSubmitProduct}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
            }}
          >
            <input
              type="text"
              required
              placeholder="اسم المنتج (مثال: شاشة Redragon 24 Inch)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            />
            <input
              type="number"
              required
              placeholder="السعر بالدينار العراقي (مثال: 145000)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
            }}
          >
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            >
              {categories
                .filter((c) => c.id !== 'all')
                .map((c) => (
                  <optgroup key={c.id} label={c.titleAr}>
                    <option value={c.id}>{c.titleAr} (عام)</option>
                    {c.subcategories?.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        ↳ {sub.titleAr}
                      </option>
                    ))}
                  </optgroup>
                ))}
            </select>

            <input
              type="text"
              placeholder="رابط الصورة (Image URL)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: colors.cardInner,
                border: `1px solid ${colors.border}`,
                color: '#fff',
              }}
            />
          </div>

          <textarea
            rows={4}
            placeholder="وصف ومواصفات المنتج..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: colors.cardInner,
              border: `1px solid ${colors.border}`,
              color: '#fff',
            }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                color: colors.primaryText,
                padding: '14px',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {editingId ? 'تحديث المنتج' : 'حفظ ونشر المنتج'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  backgroundColor: colors.cardInner,
                  color: colors.muted,
                  padding: '14px 24px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  cursor: 'pointer',
                }}
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        </form>
      </div>

      {/* جدول المنتجات المضافة */}
      <div
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: '14px',
          padding: '20px',
          overflowX: 'auto',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '14px',
            color: '#fff',
          }}
        >
          📋 قائمة المنتجات ({products.length})
        </h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'right',
            fontSize: '13px',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${colors.border}`,
                color: colors.muted,
              }}
            >
              <th style={{ padding: '10px' }}>الصورة</th>
              <th style={{ padding: '10px' }}>الاسم</th>
              <th style={{ padding: '10px' }}>القسم</th>
              <th style={{ padding: '10px' }}>السعر</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                style={{ borderBottom: `1px solid ${colors.border}` }}
              >
                <td style={{ padding: '10px' }}>
                  <img
                    src={
                      p.image_url?.split(/[\n,]+/)[0] ||
                      'https://via.placeholder.com/60'
                    }
                    alt={p.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain',
                      borderRadius: '6px',
                    }}
                  />
                </td>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>
                  {p.name}
                </td>
                <td style={{ padding: '10px', color: colors.primary }}>
                  {p.category}
                </td>
                <td
                  style={{
                    padding: '10px',
                    fontWeight: 'bold',
                    color: '#f97316',
                  }}
                >
                  {formatIQD(Number(p.price))}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button
                    onClick={() => startEdit(p)}
                    style={{
                      backgroundColor: colors.cardInner,
                      color: colors.primary,
                      border: `1px solid ${colors.border}`,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginLeft: '6px',
                    }}
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    style={{
                      backgroundColor: '#ef444422',
                      color: '#ef4444',
                      border: '1px solid #ef444455',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
