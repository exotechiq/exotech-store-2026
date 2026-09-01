'use client';
import React, { useState } from 'react';

export interface SubcategoryItem {
  id: string;
  titleAr: string;
  titleEn: string;
}

export interface CategoryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  subcategories?: SubcategoryItem[];
}

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  lang: 'ar' | 'en';
  colors: any;
}

export default function SidebarDrawer({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  lang,
  colors,
}: SidebarDrawerProps) {
  // حالة تتبع فتح وإغلاق تفرعات كل قسم
  const [expandedCats, setExpandedCats] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const toggleExpand = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCats((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <>
      {/* خلفية معتمة عند الفتح */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 1400,
        }}
      />

      {/* القائمة الجانبية - تفتح من اليمين في العربي */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: lang === 'ar' ? 0 : 'auto',
          left: lang === 'ar' ? 'auto' : 0,
          width: '300px',
          maxWidth: '85vw',
          height: '100vh',
          backgroundColor: colors.surface,
          borderLeft: lang === 'ar' ? `1px solid ${colors.border}` : 'none',
          borderRight: lang === 'ar' ? 'none' : `1px solid ${colors.border}`,
          zIndex: 1500,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 30px rgba(0,0,0,0.8)',
          overflowY: 'auto',
          padding: '20px',
          direction: lang === 'ar' ? 'rtl' : 'ltr',
          boxSizing: 'border-box',
        }}
      >
        {/* رأس القائمة */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: `1px solid ${colors.border}`,
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
            {lang === 'ar' ? 'الأقسام والمنتجات' : 'Categories'}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: colors.muted,
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </div>

        {/* عناصر الأقسام */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const hasSubs = cat.subcategories && cat.subcategories.length > 0;
            const isExpanded = !!expandedCats[cat.id];

            return (
              <div
                key={cat.id}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.cardInner,
                    borderRadius: '10px',
                    border: `1px solid ${
                      isSelected ? colors.primary : colors.border
                    }`,
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      color: isSelected ? colors.primaryText : colors.text,
                      border: 'none',
                      padding: '10px 14px',
                      textAlign: lang === 'ar' ? 'right' : 'left',
                      fontSize: '13.5px',
                      fontWeight: isSelected ? 'bold' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {lang === 'ar' ? cat.titleAr : cat.titleEn}
                  </button>

                  {/* زر السهم لفتح وقفل التفرعات */}
                  {hasSubs && (
                    <button
                      onClick={(e) => toggleExpand(cat.id, e)}
                      style={{
                        background: isSelected
                          ? 'rgba(0,0,0,0.12)'
                          : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: isSelected ? colors.primaryText : colors.muted,
                        padding: '10px 12px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="عرض المكونات الفرعية"
                    >
                      {isExpanded ? '▲' : '▼'}
                    </button>
                  )}
                </div>

                {/* الأقسام الفرعية - تظهر فقط عند النقر على السهم */}
                {hasSubs && isExpanded && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      paddingRight: lang === 'ar' ? '14px' : '0',
                      paddingLeft: lang === 'ar' ? '0' : '14px',
                      marginTop: '4px',
                      borderRight:
                        lang === 'ar' ? `2px solid ${colors.primary}` : 'none',
                      borderLeft:
                        lang === 'ar' ? 'none' : `2px solid ${colors.primary}`,
                      marginRight: lang === 'ar' ? '6px' : '0',
                      marginLeft: lang === 'ar' ? '0' : '6px',
                    }}
                  >
                    {cat.subcategories!.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onSelectCategory(sub.id);
                          onClose();
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color:
                            selectedCategory === sub.id
                              ? colors.primary
                              : colors.muted,
                          padding: '6px 8px',
                          textAlign: lang === 'ar' ? 'right' : 'left',
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontWeight:
                            selectedCategory === sub.id ? 'bold' : 'normal',
                        }}
                      >
                        • {lang === 'ar' ? sub.titleAr : sub.titleEn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
