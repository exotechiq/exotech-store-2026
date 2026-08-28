'use client';
import React, { useState, useEffect } from 'react';

interface FooterProps {
  lang: 'ar' | 'en';
  colors: any;
  categories: { id: string; titleAr: string; titleEn: string }[];
  onNavigateCategory: (category: string) => void;
  whatsappNumber: string;
}

export default function Footer({
  lang,
  colors,
  categories,
  onNavigateCategory,
  whatsappNumber,
}: FooterProps) {
  const [randomLinks, setRandomLinks] = useState<
    { id: string; titleAr: string; titleEn: string }[]
  >([]);

  useEffect(() => {
    const validCategories = categories.filter((c) => c.id !== 'all');
    const shuffled = [...validCategories].sort(() => 0.5 - Math.random());
    setRandomLinks(shuffled.slice(0, 4));
  }, [categories]);

  return (
    <footer
      style={{
        backgroundColor: colors.surface,
        borderTop: `1px solid ${colors.border}`,
        padding: '48px 24px 24px 24px',
        marginTop: '60px',
        color: colors.text,
      }}
    >
      <style>{`
        @keyframes footerRgbGlow {
          0% { color: #00d2ff; text-shadow: 0 0 14px rgba(0, 210, 255, 0.8); }
          50% { color: #ff0055; text-shadow: 0 0 14px rgba(255, 0, 85, 0.8); }
          100% { color: #00d2ff; text-shadow: 0 0 14px rgba(0, 210, 255, 0.8); }
        }
        .footer-rgb-logo {
          animation: footerRgbGlow 6s linear infinite;
        }
        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.1fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
        }
        .footer-link {
          color: ${colors.muted};
          text-decoration: none;
          font-size: 13.5px;
          transition: all 0.2s ease;
          cursor: pointer;
          display: block;
          margin-bottom: 10px;
        }
        .footer-link:hover {
          color: ${colors.primary};
          transform: ${lang === 'ar' ? 'translateX(-4px)' : 'translateX(4px)'};
        }
        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: ${colors.cardInner};
          border: 1px solid ${colors.border};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.text};
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 16px;
        }
        .social-btn:hover {
          border-color: ${colors.primary};
          color: ${colors.primary};
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>

      <div className="footer-grid">
        {/* 1: الشعار وزر الواتساب الكبير */}
        <div>
          <h2
            className="footer-rgb-logo"
            style={{
              fontSize: '28px',
              fontWeight: '900',
              margin: '0 0 10px 0',
              letterSpacing: '2px',
              cursor: 'pointer',
            }}
          >
            EXOTECH
          </h2>
          <p
            style={{
              fontSize: '13.5px',
              color: colors.muted,
              margin: '0 0 18px 0',
              lineHeight: '1.6',
            }}
          >
            {lang === 'ar'
              ? 'تواصل معنا مباشرة عبر الواتساب للاستفسارات والطلبات السريعة.'
              : 'Chat with us directly on WhatsApp for quick inquiries & orders.'}
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#25D366',
              color: '#ffffff',
              padding: '12px 22px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)',
              transition: 'transform 0.2s ease',
            }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>
              {lang === 'ar' ? 'مراسلتنا عبر واتساب' : 'Chat via WhatsApp'}
            </span>
          </a>
        </div>

        {/* 2: روابط سريعة متجددة */}
        <div>
          <h4
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#fff',
            }}
          >
            {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
          </h4>
          {randomLinks.map((cat) => (
            <span
              key={cat.id}
              className="footer-link"
              onClick={() => {
                onNavigateCategory(cat.id);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
            >
              {lang === 'ar' ? cat.titleAr : cat.titleEn}
            </span>
          ))}
        </div>

        {/* 3: المعلومات والدعم */}
        <div>
          <h4
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#fff',
            }}
          >
            {lang === 'ar' ? 'المعلومات والدعم' : 'Information'}
          </h4>
          <span className="footer-link">
            {lang === 'ar' ? 'خدمة الصيانة الفنية' : 'Care & Support'}
          </span>
          <span className="footer-link">
            {lang === 'ar' ? 'سياسة الضمان' : 'Warranty Policy'}
          </span>
          <span className="footer-link">
            {lang === 'ar' ? 'الشحن والإرجاع' : 'Shipping & Return'}
          </span>
          <span className="footer-link">
            {lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
          </span>
        </div>

        {/* 4: عن المتجر */}
        <div>
          <h4
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#fff',
            }}
          >
            {lang === 'ar' ? 'عن EXOTECH' : 'About Us'}
          </h4>
          <p
            style={{
              fontSize: '13px',
              lineHeight: '1.8',
              color: colors.muted,
              margin: 0,
            }}
          >
            {lang === 'ar'
              ? 'وجهتك المتخصصة في عالم التكنولوجيا والإلكترونيات، تجميعات الحواسيب، ملحقات الألعاب، وخدمات الصيانة.'
              : 'Your dedicated hub for high-end electronics, custom gaming PCs, accessories, and maintenance.'}
          </p>
        </div>

        {/* 5: الموقع والعنوان */}
        <div>
          <h4
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#fff',
            }}
          >
            {lang === 'ar' ? 'موقعنا وعنواننا' : 'Our Address'}
          </h4>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#fff',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            📍 {lang === 'ar' ? 'العراق - بغداد' : 'Iraq - Baghdad'}
          </p>
        </div>
      </div>

      {/* الشريط السفلي: (فيسبوك، انستغرام، تيك توك فقط) */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          borderTop: `1px solid ${colors.border}`,
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* فيسبوك */}
          <a
            href="https://www.facebook.com/people/Exotech-التقنية-المميزة/61564355237887/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="Facebook"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>

          {/* انستغرام */}
          <a
            href="https://www.instagram.com/exotech.iq/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="Instagram"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* تيك توك */}
          <a
            href="https://www.tiktok.com/@exotech.iq"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            title="TikTok"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.35-.06 2.55-.94 2.97-2.21.27-.72.32-1.49.32-2.26V0l-.01.02z" />
            </svg>
          </a>
        </div>

        <div style={{ fontSize: '12.5px', color: colors.muted }}>
          {lang === 'ar'
            ? 'جميع الحقوق محفوظة © 2026 لشركة EXOTECH'
            : '© 2026 EXOTECH. All rights reserved.'}
        </div>
      </div>
    </footer>
  );
}
