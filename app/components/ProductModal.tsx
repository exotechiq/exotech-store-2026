'use client';
import React, { useState } from 'react';

interface ProductDetailsViewProps {
  product: any;
  onBack: () => void;
  onAddToCart: (product: any, qty: number) => void;
  formatIQD: (amount: number) => string;
  lang: 'ar' | 'en';
  colors: any;
}

export default function ProductDetailsView({
  product,
  onBack,
  onAddToCart,
  formatIQD,
  lang,
  colors,
}: ProductDetailsViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'shipping'>('desc');

  if (!product) return null;

  const extractImages = (raw: any): string[] => {
    if (!raw) return ['https://via.placeholder.com/600?text=EXOTECH'];
    if (Array.isArray(raw) && raw.length > 0) return raw;
    if (typeof raw === 'string') {
      const split = raw
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      if (split.length > 0) return split;
    }
    return ['https://via.placeholder.com/600?text=EXOTECH'];
  };

  const images = extractImages(product.image_url);

  return (
    <div
      style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '24px 20px',
        minHeight: '85vh',
      }}
    >
      <style>{`
        .product-page-grid {
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 48px;
          margin-bottom: 36px;
          align-items: center;
        }

        .gallery-wrapper {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .thumbs-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 420px;
          overflow-y: auto;
        }

        .main-img-container {
          width: 420px;
          height: 420px;
          background-color: #0d111a;
          border-radius: 18px;
          border: 1px solid #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-sizing: border-box;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }

        @media (max-width: 900px) {
          .product-page-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .gallery-wrapper {
            flex-direction: column-reverse !important;
            align-items: center !important;
          }
          .thumbs-container {
            flex-direction: row !important;
            max-height: none !important;
            width: 100% !important;
            justify-content: center;
            overflow-x: auto !important;
            padding-bottom: 8px;
          }
          .main-img-container {
            width: 100% !important;
            max-width: 360px !important;
            height: 340px !important;
          }
        }
      `}</style>

      {/* مسار التنقل وزر الرجوع */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: '14px',
        }}
      >
        <div
          style={{
            fontSize: '13.5px',
            color: colors.muted,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            onClick={onBack}
            style={{
              cursor: 'pointer',
              color: colors.primary,
              fontWeight: 'bold',
            }}
          >
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </span>
          <span>‹</span>
          <span>{product.category || 'العامة'}</span>
          <span>‹</span>
          <span style={{ color: colors.text, fontWeight: '600' }}>
            {product.name}
          </span>
        </div>

        <button
          onClick={onBack}
          style={{
            backgroundColor: colors.cardInner,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            padding: '7px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background-color 0.2s',
          }}
        >
          {lang === 'ar' ? '← العودة للمتجر' : '← Back to Store'}
        </button>
      </div>

      {/* شبكة تفاصيل المنتج والمعرض */}
      <div className="product-page-grid">
        {/* معرض الصور */}
        <div className="gallery-wrapper">
          {images.length > 1 && (
            <div className="thumbs-container">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '64px',
                    height: '64px',
                    minWidth: '64px',
                    borderRadius: '10px',
                    border:
                      activeImageIndex === idx
                        ? '2px solid #f97316'
                        : `1px solid ${colors.border}`,
                    backgroundColor: colors.cardInner,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    padding: '4px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`thumb-${idx}`}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://via.placeholder.com/400?text=EXOTECH';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="main-img-container">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600?text=EXOTECH';
              }}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))',
              }}
            />
          </div>
        </div>

        {/* معلومات المنتج، التسعير، والطلب */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 16px 0',
              lineHeight: '1.4',
            }}
          >
            {product.name}
          </h1>

          <div
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#f97316',
              marginBottom: '22px',
            }}
          >
            {formatIQD(Number(product.price))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '22px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                color: colors.muted,
                fontWeight: 'bold',
              }}
            >
              {lang === 'ar' ? 'الكمية :' : 'Quantity :'}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#111622',
                border: '1px solid #1e293b',
                borderRadius: '8px',
              }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                -
              </button>
              <span
                style={{
                  width: '36px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  color: colors.primary,
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product, quantity)}
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: '1.5px solid #f97316',
              padding: '13px 26px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 0 15px rgba(249, 115, 22, 0.15)',
              marginBottom: '16px',
              maxWidth: '300px',
              transition: 'all 0.2s ease',
            }}
          >
            🛒 {lang === 'ar' ? 'إضافة إلى عربة التسوق' : 'Add to Cart'}
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('تم نسخ الرابط بنجاح!');
            }}
            style={{
              backgroundColor: '#111622',
              color: colors.muted,
              border: '1px solid #1e293b',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: 'fit-content',
            }}
          >
            🔄 {lang === 'ar' ? 'مشاركة' : 'Share'}
          </button>
        </div>
      </div>

      {/* التبويبات السفلية بدون إخلاء المسؤولية */}
      <div
        style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '16px' }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            borderBottom: `1px solid ${colors.border}`,
            marginBottom: '18px',
          }}
        >
          <button
            onClick={() => setActiveTab('desc')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom:
                activeTab === 'desc'
                  ? '2px solid #f97316'
                  : '2px solid transparent',
              color: activeTab === 'desc' ? '#f97316' : colors.muted,
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {lang === 'ar' ? 'وصف' : 'Description'}
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom:
                activeTab === 'shipping'
                  ? '2px solid #f97316'
                  : '2px solid transparent',
              color: activeTab === 'shipping' ? '#f97316' : colors.muted,
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {lang === 'ar' ? 'الشحن والإسترجاع' : 'Shipping & Returns'}
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#0a0d14',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '24px',
            color: '#cbd5e1',
            fontSize: '14px',
            lineHeight: '1.85',
          }}
        >
          {activeTab === 'desc' && (
            <div style={{ whiteSpace: 'pre-line' }}>
              {product.description ||
                (lang === 'ar'
                  ? '• منتج أصلي ومفحوص بالكامل مع ضمان موثوق من EXOTECH.\n• أداء استثنائي وجودة معتمدة.'
                  : '• Authentic product with full official warranty.')}
            </div>
          )}
          {activeTab === 'shipping' && (
            <div>
              📦 متاح التوصيل السريع لكافة محافظات العراق خلال 24-48 ساعة مع
              إمكانية الفحص عند الاستلام.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
