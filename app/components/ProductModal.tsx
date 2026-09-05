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

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-view-root">
      <style>{`
        .product-view-root {
          max-width: 1180px;
          margin: 0 auto;
          padding: 20px 16px;
          min-height: 85vh;
          box-sizing: border-box;
          width: 100%;
          color: #fff;
        }

        .p-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #1e293b;
          gap: 12px;
          width: 100%;
        }

        .p-breadcrumbs {
          font-size: 13px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          line-height: 1.4;
        }

        .p-back-btn {
          background-color: #141a24;
          color: #f8fafc;
          border: 1px solid #1e293b;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12.5px;
          font-weight: bold;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .p-grid {
          display: grid;
          grid-template-columns: 440px 1fr;
          gap: 40px;
          margin-bottom: 30px;
          align-items: start;
          width: 100%;
        }

        .p-gallery {
          display: flex;
          flex-direction: column !important;
          width: 100%;
          gap: 12px;
        }

        .p-main-frame {
          position: relative;
          width: 100%;
          height: 380px;
          background-color: #0c1017;
          border: 1px solid #1e293b;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 16px;
          box-sizing: border-box;
        }

        .p-main-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
          margin: auto;
          user-select: none;
        }

        .p-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          z-index: 20;
          outline: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        .p-arrow-btn:active {
          transform: translateY(-50%) scale(0.92);
        }

        .p-arrow-prev {
          left: 10px;
        }

        .p-arrow-next {
          right: 10px;
        }

        .p-thumbs-row {
          display: flex !important;
          flex-direction: row !important;
          justify-content: flex-start;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 100%;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          white-space: nowrap;
          padding: 4px 2px 10px 2px;
          box-sizing: border-box;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }

        .p-thumb {
          width: 62px !important;
          min-width: 62px !important;
          height: 62px !important;
          border-radius: 10px;
          background-color: #0c1017;
          cursor: pointer;
          overflow: hidden;
          padding: 4px;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid #1e293b;
        }

        .p-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .p-info {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .p-title {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 14px 0;
          line-height: 1.4;
        }

        .p-price {
          font-size: 26px;
          font-weight: 900;
          color: #f97316;
          margin-bottom: 20px;
        }

        .p-qty-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .p-qty-box {
          display: inline-flex;
          align-items: center;
          background-color: #111622;
          border: 1px solid #1e293b;
          border-radius: 8px;
          height: 40px;
          overflow: hidden;
        }

        .p-qty-btn {
          background: none;
          border: none;
          color: #fff;
          padding: 0 14px;
          height: 100%;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .p-qty-num {
          width: 36px;
          text-align: center;
          font-weight: bold;
          font-size: 15px;
          color: #00d2ff;
        }

        .p-cart-btn {
          background-color: transparent;
          color: #ffffff;
          border: 1.5px solid #f97316;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          max-width: 320px;
          width: 100%;
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.15);
          margin-bottom: 14px;
        }

        .p-share-btn {
          background-color: #111622;
          color: #94a3b8;
          border: 1px solid #1e293b;
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 12.5px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
        }

        @media (max-width: 768px) {
          .p-nav-bar {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 14px;
          }
          .p-back-btn {
            width: 100%;
            justify-content: center;
            padding: 8px;
          }
          .p-grid {
            grid-template-columns: 100% !important;
            gap: 18px !important;
          }
          .p-main-frame {
            height: 300px !important;
            border-radius: 14px;
            padding: 10px;
          }
          .p-arrow-btn {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }
          .p-arrow-prev { left: 8px; }
          .p-arrow-next { right: 8px; }
          .p-thumbs-row {
            justify-content: flex-start !important;
          }
          .p-thumb {
            width: 54px !important;
            min-width: 54px !important;
            height: 54px !important;
          }
          .p-title {
            font-size: 18px;
            margin-bottom: 8px;
          }
          .p-price {
            font-size: 22px;
            margin-bottom: 16px;
          }
          .p-cart-btn {
            max-width: 100%;
          }
        }
      `}</style>

      {/* مسار التنقل وزر الرجوع */}
      <div className="p-nav-bar">
        <div className="p-breadcrumbs">
          <span
            onClick={onBack}
            style={{
              cursor: 'pointer',
              color: '#00d2ff',
              fontWeight: 'bold',
            }}
          >
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </span>
          <span>‹</span>
          <span>{product.category || 'العامة'}</span>
          <span>‹</span>
          <span style={{ color: '#f8fafc', fontWeight: '600' }}>
            {product.name}
          </span>
        </div>

        <button onClick={onBack} className="p-back-btn">
          {lang === 'ar' ? '← العودة للمتجر' : '← Back to Store'}
        </button>
      </div>

      {/* شبكة المعرض والمعلومات */}
      <div className="p-grid">
        {/* المعرض */}
        <div className="p-gallery">
          <div className="p-main-frame">
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="p-arrow-btn p-arrow-prev"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="p-arrow-btn p-arrow-next"
                >
                  ›
                </button>
              </>
            )}

            <img
              className="p-main-img"
              src={images[activeImageIndex] || images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600?text=EXOTECH';
              }}
            />
          </div>

          {images.length > 1 && (
            <div className="p-thumbs-row">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className="p-thumb"
                  style={{
                    borderColor: activeImageIndex === idx ? '#f97316' : '#1e293b',
                    boxShadow: activeImageIndex === idx ? '0 0 8px rgba(249, 115, 22, 0.4)' : 'none',
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`thumb-${idx}`}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400?text=EXOTECH';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* معلومات المنتج */}
        <div className="p-info">
          <h1 className="p-title">{product.name}</h1>

          <div className="p-price">
            {formatIQD(Number(product.price))}
          </div>

          <div className="p-qty-row">
            <span style={{ fontSize: '13.5px', color: '#94a3b8', fontWeight: 'bold' }}>
              {lang === 'ar' ? 'الكمية :' : 'Quantity :'}
            </span>
            <div className="p-qty-box">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-qty-btn"
              >
                -
              </button>
              <span className="p-qty-num">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product, quantity)}
            className="p-cart-btn"
          >
            🛒 {lang === 'ar' ? 'إضافة إلى عربة التسوق' : 'Add to Cart'}
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('تم نسخ الرابط بنجاح!');
            }}
            className="p-share-btn"
          >
            🔄 {lang === 'ar' ? 'مشاركة' : 'Share'}
          </button>
        </div>
      </div>

      {/* التبويبات السفلية */}
      <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            borderBottom: '1px solid #1e293b',
            marginBottom: '16px',
          }}
        >
          <button
            onClick={() => setActiveTab('desc')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'desc' ? '2px solid #f97316' : '2px solid transparent',
              color: activeTab === 'desc' ? '#f97316' : '#94a3b8',
              padding: '8px 16px',
              fontSize: '14px',
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
              borderBottom: activeTab === 'shipping' ? '2px solid #f97316' : '2px solid transparent',
              color: activeTab === 'shipping' ? '#f97316' : '#94a3b8',
              padding: '8px 16px',
              fontSize: '14px',
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
            padding: '20px',
            color: '#cbd5e1',
            fontSize: '13.5px',
            lineHeight: '1.8',
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
