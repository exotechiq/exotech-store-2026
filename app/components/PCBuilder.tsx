'use client';
import React, { useState } from 'react';

interface PCBuilderProps {
  products: any[];
  onBack: () => void;
  onAddBuildToCart: (buildItems: any[], buildTotal: number) => void;
  formatIQD: (amount: number) => string;
  lang: 'ar' | 'en';
  colors: any;
}

interface BuildSlot {
  key: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  categoryKeyword: string;
}

const BUILD_SLOTS: BuildSlot[] = [
  {
    key: 'cpu',
    nameAr: 'المعالج (CPU)',
    nameEn: 'Processor (CPU)',
    icon: '🔲',
    categoryKeyword: 'معالج',
  },
  {
    key: 'motherboard',
    nameAr: 'اللوحة الأم (Motherboard)',
    nameEn: 'Motherboard',
    icon: '🟩',
    categoryKeyword: 'لوحة',
  },
  {
    key: 'gpu',
    nameAr: 'كرت الشاشة (GPU)',
    nameEn: 'Graphics Card (GPU)',
    icon: '🎮',
    categoryKeyword: 'كارت',
  },
  {
    key: 'ram',
    nameAr: 'الذاكرة العشوائية (RAM)',
    nameEn: 'Memory (RAM)',
    icon: '⚡',
    categoryKeyword: 'رام',
  },
  {
    key: 'storage',
    nameAr: 'وحدة التخزين (SSD / M.2)',
    nameEn: 'Storage (SSD / M.2)',
    icon: '💾',
    categoryKeyword: 'تخزين',
  },
  {
    key: 'psu',
    nameAr: 'مزود الطاقة (Power Supply)',
    nameEn: 'Power Supply (PSU)',
    icon: '🔌',
    categoryKeyword: 'بور',
  },
  {
    key: 'case',
    nameAr: 'الصندوق (Case)',
    nameEn: 'PC Case',
    icon: '🖥️',
    categoryKeyword: 'كيس',
  },
  {
    key: 'cooler',
    nameAr: 'نظام التبريد (Cooler)',
    nameEn: 'Cooling System',
    icon: '❄️',
    categoryKeyword: 'تبريد',
  },
];

export default function PCBuilder({
  products,
  onBack,
  onAddBuildToCart,
  formatIQD,
  lang,
  colors,
}: PCBuilderProps) {
  const [selectedParts, setSelectedParts] = useState<{ [key: string]: any }>(
    {}
  );
  const [activeSlotKey, setActiveSlotKey] = useState<string | null>(null);

  // حساب المجموع الإجمالي لقطع التجميعة
  const totalPrice = Object.values(selectedParts).reduce(
    (sum, item) => sum + Number(item?.price || 0),
    0
  );
  const selectedCount = Object.keys(selectedParts).length;

  const handleSelectPart = (slotKey: string, product: any) => {
    setSelectedParts((prev) => ({ ...prev, [slotKey]: product }));
    setActiveSlotKey(null);
  };

  const handleRemovePart = (slotKey: string) => {
    setSelectedParts((prev) => {
      const next = { ...prev };
      delete next[slotKey];
      return next;
    });
  };

  const getCleanProductImage = (rawUrl: any): string => {
    if (!rawUrl) return 'https://via.placeholder.com/400?text=EXOTECH';
    if (typeof rawUrl === 'string') {
      const parts = rawUrl
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      if (parts.length > 0) return parts[0];
    }
    return 'https://via.placeholder.com/400?text=EXOTECH';
  };

  // فلترة القطع الخاصة بالسلوت النشط
  const activeSlot = BUILD_SLOTS.find((s) => s.key === activeSlotKey);
  const availableProductsForSlot = activeSlot
    ? products.filter(
        (p) =>
          p.category?.toLowerCase().includes(activeSlot.categoryKeyword) ||
          p.name?.toLowerCase().includes(activeSlot.categoryKeyword) ||
          p.category?.toLowerCase().includes('قطع')
      )
    : [];

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 20px',
        minHeight: '85vh',
      }}
    >
      <style>{`
        .builder-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 28px;
          align-items: flex-start;
        }
        @media (max-width: 900px) {
          .builder-layout {
            grid-template-columns: 1fr !important;
          }
        }
        .slot-card {
          background-color: #0c101a;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s ease;
        }
        .slot-card:hover {
          border-color: ${colors.primary};
        }
      `}</style>

      {/* الرأس والرجوع */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: '14px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '900',
              color: '#ffffff',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            🛠️{' '}
            {lang === 'ar'
              ? 'مجمّع الحواسيب الاحترافي (Build My PC)'
              : 'Custom PC Builder'}
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: colors.muted,
              margin: '6px 0 0 0',
            }}
          >
            {lang === 'ar'
              ? 'اختر قطع تجميعتك المتوافقة خطوة بخطوة واحصل على السعر الإجمالي فوراً'
              : 'Select your custom compatible parts and get real-time pricing.'}
          </p>
        </div>

        <button
          onClick={onBack}
          style={{
            backgroundColor: colors.cardInner,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
          }}
        >
          {lang === 'ar' ? '← العودة للمتجر' : '← Back'}
        </button>
      </div>

      <div className="builder-layout">
        {/* قائمة السلوتس واختيار القطع */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {BUILD_SLOTS.map((slot) => {
            const selected = selectedParts[slot.key];
            return (
              <div
                key={slot.key}
                className="slot-card"
                style={{
                  border: selected
                    ? `1.5px solid ${colors.primary}`
                    : '1px solid #1e293b',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  {selected ? (
                    <img
                      src={getCleanProductImage(selected.image_url)}
                      alt={selected.name}
                      style={{
                        width: '54px',
                        height: '54px',
                        objectFit: 'contain',
                        backgroundColor: '#141a24',
                        borderRadius: '10px',
                        padding: '4px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        backgroundColor: '#141a24',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                      }}
                    >
                      {slot.icon}
                    </div>
                  )}

                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: colors.muted,
                        fontWeight: 'bold',
                      }}
                    >
                      {lang === 'ar' ? slot.nameAr : slot.nameEn}
                    </div>
                    {selected ? (
                      <div>
                        <div
                          style={{
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            marginTop: '2px',
                          }}
                        >
                          {selected.name}
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: '900',
                            color: '#f97316',
                            marginTop: '2px',
                          }}
                        >
                          {formatIQD(Number(selected.price))}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: '13px',
                          color: '#64748b',
                          fontStyle: 'italic',
                          marginTop: '2px',
                        }}
                      >
                        {lang === 'ar'
                          ? 'لم يتم اختيار قطعة بعد'
                          : 'No component selected'}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {selected ? (
                    <button
                      onClick={() => handleRemovePart(slot.key)}
                      style={{
                        backgroundColor: '#ef444422',
                        color: '#ef4444',
                        border: '1px solid #ef444455',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      ✕ {lang === 'ar' ? 'إزالة' : 'Remove'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveSlotKey(slot.key)}
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.primaryText,
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      + {lang === 'ar' ? 'اختر قطعة' : 'Choose'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ملخص التجميعة والسعر وزر الطلب */}
        <div
          style={{
            backgroundColor: '#0c101a',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '24px',
            position: 'sticky',
            top: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: colors.primary,
              margin: '0 0 16px 0',
            }}
          >
            📊 {lang === 'ar' ? 'ملخص التجميعة' : 'Build Summary'}
          </h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              color: colors.muted,
              marginBottom: '10px',
            }}
          >
            <span>
              {lang === 'ar' ? 'عدد القطع المحددة:' : 'Selected Parts:'}
            </span>
            <span style={{ fontWeight: 'bold', color: '#fff' }}>
              {selectedCount} / {BUILD_SLOTS.length}
            </span>
          </div>

          <div
            style={{
              borderTop: '1px solid #1e293b',
              margin: '16px 0',
              paddingTop: '16px',
            }}
          >
            <div style={{ fontSize: '13px', color: colors.muted }}>
              {lang === 'ar' ? 'السعر الإجمالي التقديري:' : 'Estimated Total:'}
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#f97316',
                marginTop: '4px',
              }}
            >
              {formatIQD(totalPrice)}
            </div>
          </div>

          <button
            disabled={selectedCount === 0}
            onClick={() => {
              const itemsToAdd = Object.values(selectedParts).map((part) => ({
                ...part,
                name: `[تجميعة] ${part.name}`,
                qty: 1,
              }));
              onAddBuildToCart(itemsToAdd, totalPrice);
            }}
            style={{
              width: '100%',
              backgroundColor: selectedCount > 0 ? '#f97316' : '#334155',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
              boxShadow:
                selectedCount > 0 ? '0 0 20px rgba(249, 115, 22, 0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            🛒{' '}
            {lang === 'ar' ? 'إضافة التجميعة إلى السلة' : 'Add Build to Cart'}
          </button>
        </div>
      </div>

      {/* نافذة اختيار القطع من المنتجات المتاحة */}
      {activeSlotKey && activeSlot && (
        <div
          onClick={() => setActiveSlotKey(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(6px)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0a0d14',
              border: '1px solid #1e293b',
              borderRadius: '18px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '18px',
                borderBottom: '1px solid #1e293b',
                paddingBottom: '12px',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: colors.primary,
                  margin: 0,
                }}
              >
                {activeSlot.icon}{' '}
                {lang === 'ar'
                  ? `اختر ${activeSlot.nameAr}`
                  : `Select ${activeSlot.nameEn}`}
              </h3>
              <button
                onClick={() => setActiveSlotKey(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.muted,
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {availableProductsForSlot.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: colors.muted,
                  }}
                >
                  <p style={{ margin: 0 }}>
                    {lang === 'ar'
                      ? 'لا توجد قطع مضافة في هذا القسم حالياً، يمكنك إضافتها من لوحة الأدمن.'
                      : 'No parts found in this category.'}
                  </p>
                </div>
              ) : (
                availableProductsForSlot.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#111622',
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <img
                        src={getCleanProductImage(item.image_url)}
                        alt={item.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'contain',
                          backgroundColor: '#141a24',
                          borderRadius: '8px',
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#fff',
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontSize: '13px',
                            color: '#f97316',
                            fontWeight: 'bold',
                            marginTop: '2px',
                          }}
                        >
                          {formatIQD(Number(item.price))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectPart(activeSlotKey, item)}
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.primaryText,
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {lang === 'ar' ? 'تحديد القطعة' : 'Select'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
