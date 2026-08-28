'use client';
import React, { useState } from 'react';

export interface CategoryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  subcategories?: { id: string; titleAr: string; titleEn: string }[];
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
  const [expandedCats, setExpandedCats] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (!isOpen) return null;

  const toggleExpand = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCats((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1400,
        display: 'flex',
        justifyContent: lang === 'ar' ? 'flex-start' : 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '320px',
          maxWidth: '85vw',
          height: '100vh',
          backgroundColor: '#07090e',
          borderLeft: lang === 'ar' ? 'none' : `1px solid ${colors.border}`,
          borderRight: lang === 'ar' ? `1px solid ${colors.border}` : 'none',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 30px rgba(0,0,0,0.9)',
          boxSizing: 'border-box',
        }}
      >
        {/* رأس القائمة */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: colors.primary,
            }}
          >
            📂 {lang === 'ar' ? 'أقسام المتجر' : 'Store Categories'}
          </span>
          <button
            onClick={onClose}
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

        {/* قائمة الأقسام الرئيسية والفرعية */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {categories.map((cat) => {
            const hasSubs = cat.subcategories && cat.subcategories.length > 0;
            const isExpanded = !!expandedCats[cat.id];
            const isSelected = selectedCategory === cat.id;

            return (
              <div key={cat.id} style={{ marginBottom: '4px' }}>
                <div
                  onClick={() => {
                    onSelectCategory(cat.id);
                    if (!hasSubs) onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    backgroundColor: isSelected
                      ? 'rgba(0, 210, 255, 0.12)'
                      : 'transparent',
                    border: isSelected
                      ? `1.5px solid ${colors.primary}`
                      : '1px solid transparent',
                    color: isSelected ? colors.primary : '#e2e8f0',
                    cursor: 'pointer',
                    fontSize: '13.5px',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{lang === 'ar' ? cat.titleAr : cat.titleEn}</span>

                  {hasSubs && (
                    <button
                      onClick={(e) => toggleExpand(cat.id, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: colors.muted,
                        cursor: 'pointer',
                        fontSize: '11px',
                        transform: isExpanded
                          ? 'rotate(90deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        padding: '4px',
                      }}
                    >
                      {lang === 'ar' ? '◀' : '▶'}
                    </button>
                  )}
                </div>

                {/* الأقسام الفرعية المنسدلة */}
                {hasSubs && isExpanded && (
                  <div
                    style={{
                      marginRight: lang === 'ar' ? '18px' : '0',
                      marginLeft: lang === 'ar' ? '0' : '18px',
                      paddingLeft: lang === 'ar' ? '0' : '10px',
                      paddingRight: lang === 'ar' ? '10px' : '0',
                      borderRight:
                        lang === 'ar'
                          ? `2px solid ${colors.primary}44`
                          : 'none',
                      borderLeft:
                        lang === 'ar'
                          ? 'none'
                          : `2px solid ${colors.primary}44`,
                      marginTop: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                    }}
                  >
                    {cat.subcategories!.map((sub) => {
                      const isSubSelected = selectedCategory === sub.id;
                      return (
                        <div
                          key={sub.id}
                          onClick={() => {
                            onSelectCategory(sub.id);
                            onClose();
                          }}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: isSubSelected
                              ? colors.cardInner
                              : 'transparent',
                            color: isSubSelected ? colors.primary : '#94a3b8',
                            fontSize: '12.5px',
                            fontWeight: isSubSelected ? 'bold' : 'normal',
                            cursor: 'pointer',
                          }}
                        >
                          • {lang === 'ar' ? sub.titleAr : sub.titleEn}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: '14px',
            borderTop: `1px solid ${colors.border}`,
            textAlign: 'center',
            fontSize: '11.5px',
            color: colors.muted,
          }}
        >
          EXOTECH Store © 2026
        </div>
      </div>
    </div>
  );
}
