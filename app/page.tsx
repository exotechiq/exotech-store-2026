'use client';
import { useState, useEffect } from 'react';
import SidebarDrawer, { CategoryItem } from './components/SidebarDrawer';
import ProductDetailsView from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

const SUPABASE_URL = 'https://rharksujeckaseweipsm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_P3zgWszt9ogANugiu0eaYA_QdCmknId';

const TELEGRAM_BOT_TOKEN = '8799921084:AAEEfJKvvTcIn4df6kaMcV0TL6uxiF4Kx3A';
const TELEGRAM_CHAT_ID = '1830795899';
const WHATSAPP_NUMBER = '9647700000000';

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'all', titleAr: 'الكل', titleEn: 'All' },
  {
    id: 'متممات وأدوات',
    titleAr: 'متممات وأدوات',
    titleEn: 'Tools & Accessories',
  },
  { id: 'محولات', titleAr: 'محولات', titleEn: 'Adapters & Converters' },
  { id: 'الصوت', titleAr: 'الصوت', titleEn: 'Audio & Sound' },
  { id: 'مايكات', titleAr: 'مايكات واحترافية', titleEn: 'Microphones' },
  { id: 'حقائب', titleAr: 'حقائب', titleEn: 'Bags & Cases' },
  { id: 'كيبلات', titleAr: 'كيبلات', titleEn: 'Cables & Wires' },
  {
    id: 'الكاميرات والأمان',
    titleAr: 'الكاميرات والأمان',
    titleEn: 'Cameras & Security',
  },
  { id: 'كراسي وطاولات', titleAr: 'كراسي وطاولات', titleEn: 'Chairs & Desks' },
  {
    id: 'قطع كمبيوتر',
    titleAr: 'مكونات الحاسب الشخصي',
    titleEn: 'PC Components',
    subcategories: [
      { id: 'معالج', titleAr: 'المعالجات (CPU)', titleEn: 'Processors' },
      { id: 'كارت', titleAr: 'كروت الشاشة (GPU)', titleEn: 'Graphics Cards' },
      {
        id: 'لوحة',
        titleAr: 'اللوحات الأم (Motherboards)',
        titleEn: 'Motherboards',
      },
      { id: 'رام', titleAr: 'الرامات (RAM)', titleEn: 'Memory' },
      { id: 'بور', titleAr: 'مزودات الطاقة (PSU)', titleEn: 'Power Supplies' },
      { id: 'تبريد', titleAr: 'المبردات (Coolers)', titleEn: 'Coolers' },
      { id: 'كيس', titleAr: 'الكيسات (Cases)', titleEn: 'Cases' },
    ],
  },
  {
    id: 'لابتوبات وحاسبات',
    titleAr: 'لابتوبات وحاسبات',
    titleEn: 'Laptops & Computers',
  },
  { id: 'أجهزة ألعاب', titleAr: 'أجهزة ألعاب', titleEn: 'Gaming Consoles' },
  { id: 'تخزين', titleAr: 'تخزين البيانات و SSD', titleEn: 'Storage & SSD' },
  { id: 'قبضات تحكم', titleAr: 'قبضات تحكم', titleEn: 'Controllers' },
  { id: 'ألعاب', titleAr: 'ألعاب', titleEn: 'Games' },
  {
    id: 'إكسسوارات الألعاب',
    titleAr: 'إكسسوارات الألعاب',
    titleEn: 'Gaming Accessories',
  },
  {
    id: 'أطقم الفأرات ولوحات المفاتيح',
    titleAr: 'أطقم الفأرات ولوحات المفاتيح',
    titleEn: 'Keyboard & Mouse Combos',
  },
  { id: 'لوحات المفاتيح', titleAr: 'لوحات المفاتيح', titleEn: 'Keyboards' },
  {
    id: 'إكسسوارات الموبايل',
    titleAr: 'إكسسوارات الموبايل',
    titleEn: 'Mobile Accessories',
  },
  {
    id: 'شاشات',
    titleAr: 'الشاشات وأجهزة العرض',
    titleEn: 'Monitors & Displays',
  },
  {
    id: 'رفعات الفأرة وسطح المكتب',
    titleAr: 'رفعات الفأرة وسجاد المكتب',
    titleEn: 'Mousepads & Desk Mats',
  },
  { id: 'الفأرات', titleAr: 'الفأرات (Mouse)', titleEn: 'Mice' },
  {
    id: 'معدات الشبكات',
    titleAr: 'معدات الشبكات',
    titleEn: 'Networking Equipment',
    subcategories: [
      { id: 'راوترات', titleAr: 'راوترات', titleEn: 'Routers' },
    ],
  },
  { id: 'طاقة و UPS', titleAr: 'طاقة و UPS', titleEn: 'Power & UPS' },
  { id: 'تجميعات', titleAr: 'تجميعات كمبيوتر', titleEn: 'PC Builds' },
  {
    id: 'الطابعات والاحبار',
    titleAr: 'الطابعات والاحبار',
    titleEn: 'Printers & Inks',
  },
  { id: 'عطور', titleAr: 'عطور', titleEn: 'Perfumes' },
];

const INITIAL_HOME_CATEGORIES = [
  {
    id: 'all',
    titleAr: 'الكل',
    titleEn: 'All',
    bg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'قطع كمبيوتر',
    titleAr: 'قطع كمبيوتر',
    titleEn: 'PC Parts',
    bg: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'تجميعات',
    titleAr: 'تجميعات كمبيوتر',
    titleEn: 'PC Builds',
    bg: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'شاشات',
    titleAr: 'شاشات وأجهزة عرض',
    titleEn: 'Monitors',
    bg: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'لوحات المفاتيح',
    titleAr: 'لوحات المفاتيح',
    titleEn: 'Keyboards',
    bg: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'الفأرات',
    titleAr: 'الفأرات (Mouse)',
    titleEn: 'Gaming Mice',
    bg: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'مايكات',
    titleAr: 'مايكات احترافية',
    titleEn: 'Microphones',
    bg: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'الصوت',
    titleAr: 'سماعات وصوتيات',
    titleEn: 'Headsets & Audio',
    bg: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'إكسسوارات الألعاب',
    titleAr: 'إكسسوارات الألعاب',
    titleEn: 'Gaming Accessories',
    bg: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'لابتوبات وحاسبات',
    titleAr: 'لابتوبات وحاسبات',
    titleEn: 'Laptops',
    bg: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'تخزين',
    titleAr: 'تخزين و SSD',
    titleEn: 'Storage & SSD',
    bg: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'طاقة و UPS',
    titleAr: 'طاقة و UPS',
    titleEn: 'Power & UPS',
    bg: 'https://images.unsplash.com/photo-1608248597359-5975d4fa3962?auto=format&fit=crop&w=400&q=80',
  },
];

const BANNERS = [
  {
    titleAr: 'تجميعات احترافية بأفضل الأسعار',
    descAr: 'قطع أصلية مع ضمان حقيقي وخدمة تجميع وصيانة فورية',
    titleEn: 'Ultimate Gaming & Workstation Builds',
    descEn: 'Genuine parts with full warranty and rapid assembly services',
    bg: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    titleAr: 'أقوى كروت الشاشة والمعالجات',
    descAr: 'أحدث ملحقات القيمنق ومعدات الأداء الفائق متوفرة الآن',
    titleEn: 'Next-Gen GPUs & Processors',
    descEn: 'Equip your battle station with high-tier gaming components',
    bg: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    titleAr: 'شاشات قيمنق احترافية للـ PC',
    descAr: 'شاشات عالية التردد 144Hz و 240Hz بدقة 2K و 4K لأقوى أداء وأعلى وضوح',
    titleEn: 'High-End PC Gaming Monitors',
    descEn: 'Fast-response IPS curved and flat monitors for competitive gaming',
    bg: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [products, setProducts] = useState<any[]>([]);
  const [shuffledProducts, setShuffledProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(24);
  const [sidebarCategories, setSidebarCategories] =
    useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [homeCategories, setHomeCategories] = useState<any[]>(INITIAL_HOME_CATEGORIES);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isDark = theme === 'dark';
  const colors = {
    bg: isDark ? '#07090e' : '#f8fafc',
    surface: isDark ? '#0c0f17' : '#ffffff',
    card: isDark ? '#0c0f17' : '#ffffff',
    cardInner: isDark ? '#141a24' : '#f1f5f9',
    text: isDark ? '#f8fafc' : '#0f172a',
    muted: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#1a202c' : '#e2e8f0',
    primary: isDark ? '#00d2ff' : '#0284c7',
    primaryText: '#07090e',
    heart: '#ef4444',
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('exotech_theme', next);
    } catch (e) {
      console.error(e);
    }
  };

  const formatIQD = (amount: number) =>
    `${amount.toLocaleString()} ${lang === 'ar' ? 'دينار' : 'IQD'}`;

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

  const shuffleArray = (array: any[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('exotech_theme') as 'dark' | 'light';
      if (savedTheme) setTheme(savedTheme);

      const savedCats = localStorage.getItem('exotech_nested_categories');
      if (savedCats) {
        const parsedCats = JSON.parse(savedCats);
        const merged = [...INITIAL_CATEGORIES];
        parsedCats.forEach((pCat: any) => {
          if (!merged.some((m) => m.id === pCat.id)) merged.push(pCat);
        });
        setSidebarCategories(merged);
      }

      const savedHomeCats = localStorage.getItem('exotech_home_categories');
      if (savedHomeCats) setHomeCategories(JSON.parse(savedHomeCats));

      const savedWishlist = localStorage.getItem('exotech_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedUser = localStorage.getItem('exotech_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCategories = (updated: CategoryItem[]) => {
    setSidebarCategories(updated);
    localStorage.setItem('exotech_nested_categories', JSON.stringify(updated));
  };

  const handleAddCategory = (titleAr: string, titleEn: string) => {
    const newCat: CategoryItem = {
      id: titleAr.trim(),
      titleAr: titleAr.trim(),
      titleEn: titleEn.trim() || titleAr.trim(),
      subcategories: [],
    };
    const updated = [...sidebarCategories, newCat];
    saveCategories(updated);
    alert('تمت إضافة القسم الرئيسي بنجاح!');
  };

  const handleDeleteCategory = (catId: string) => {
    if (catId === 'all') return;
    if (!confirm('هل تريد حذف هذا القسم الرئيسي؟')) return;
    const updated = sidebarCategories.filter((c) => c.id !== catId);
    saveCategories(updated);
  };

  const handleAddSubcategory = (
    parentCatId: string,
    subTitleAr: string,
    subTitleEn: string
  ) => {
    const updated = sidebarCategories.map((cat) => {
      if (cat.id === parentCatId) {
        const subs = cat.subcategories || [];
        return {
          ...cat,
          subcategories: [
            ...subs,
            {
              id: subTitleAr.trim(),
              titleAr: subTitleAr.trim(),
              titleEn: subTitleEn.trim() || subTitleAr.trim(),
            },
          ],
        };
      }
      return cat;
    });
    saveCategories(updated);
    alert('تمت إضافة المكون الفرعي بنجاح!');
  };

  const handleDeleteSubcategory = (parentCatId: string, subId: string) => {
    const updated = sidebarCategories.map((cat) => {
      if (cat.id === parentCatId && cat.subcategories) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter((s) => s.id !== subId),
        };
      }
      return cat;
    });
    saveCategories(updated);
  };

  const handleAddHomeCategory = (newHomeCat: any) => {
    const updated = [...homeCategories, newHomeCat];
    setHomeCategories(updated);
    localStorage.setItem('exotech_home_categories', JSON.stringify(updated));
    alert('تمت إضافة كرت القسم للواجهة الرئيسية بنجاح!');
  };

  const handleUpdateHomeCategory = (updatedCat: any) => {
    const updated = homeCategories.map((cat) =>
      cat.id === updatedCat.id ? updatedCat : cat
    );
    setHomeCategories(updated);
    localStorage.setItem('exotech_home_categories', JSON.stringify(updated));
    alert('تم تحديث كرت القسم بنجاح!');
  };

  const handleDeleteHomeCategory = (catId: string) => {
    if (catId === 'all') return;
    if (!confirm('هل تريد بالتأكيد حذف هذا الكرت من الواجهة الرئيسية؟')) return;
    const updated = homeCategories.filter((c) => c.id !== catId);
    setHomeCategories(updated);
    localStorage.setItem('exotech_home_categories', JSON.stringify(updated));
  };

  const toggleWishlist = (product: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const exists = wishlist.some((item) => item.id === product.id);
    const updated = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem('exotech_wishlist', JSON.stringify(updated));
  };

  const handleLogout = () => {
    if (
      confirm(
        lang === 'ar' ? 'هل تريد تسجيل الخروج؟' : 'Do you want to log out?'
      )
    ) {
      setCurrentUser(null);
      localStorage.removeItem('exotech_user');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/products?select=*&order=id.desc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
        setShuffledProducts(shuffleArray(data));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.shiftKey &&
        (event.code === 'KeyH' ||
          event.key === 'H' ||
          event.key === 'h' ||
          event.key === 'ا')
      ) {
        event.preventDefault();
        const password = prompt(
          lang === 'ar' ? 'أدخل كلمة سر الإدارة:' : 'Enter Admin Password:'
        );
        if (password === 'exotech2026' || password === 'exotech212627') {
          setView((prev) => (prev === 'admin' ? 'store' : 'admin'));
          setSelectedProduct(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lang]);

  const handleSaveProduct = async (
    productPayload: any,
    editingId: number | null
  ) => {
    if (editingId) {
      await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(productPayload),
      });
      alert('تم تحديث المنتج بنجاح!');
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(productPayload),
      });
      alert('تمت إضافة المنتج بنجاح!');
    }
    fetchProducts();
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('هل تريد بالتأكيد حذف هذا المنتج؟')) return;
    await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    fetchProducts();
  };

  const displaySource =
    selectedCategory === 'all' && !searchQuery ? shuffledProducts : products;

  const allFilteredProducts = displaySource.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      p.category?.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const visibleProducts =
    selectedCategory === 'all' && !searchQuery
      ? allFilteredProducts.slice(0, visibleCount)
      : allFilteredProducts;

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: 'sans-serif',
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; width: 100%; max-width: 100vw; margin: 0; padding: 0; }
        @keyframes rgbGlow {
          0% { color: #00d2ff; text-shadow: 0 0 12px rgba(0, 210, 255, 0.8); }
          50% { color: #ff0055; text-shadow: 0 0 12px rgba(255, 0, 85, 0.8); }
          100% { color: #00d2ff; text-shadow: 0 0 12px rgba(0, 210, 255, 0.8); }
        }
        .rgb-logo { animation: rgbGlow 6s linear infinite; }

        .categories-scroll-row {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 14px;
          margin-bottom: 34px;
          width: 100%;
          scrollbar-width: thin;
        }
        .categories-scroll-row::-webkit-scrollbar {
          height: 6px;
        }
        .categories-scroll-row::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 6px;
        }
        .cat-card-item {
          width: 130px;
          min-width: 130px;
          height: 250px;
          border-radius: 16px;
        }
        .cat-card-text {
          font-size: 16px;
          letter-spacing: 1px;
        }

        .header-btn {
          background-color: ${colors.cardInner};
          color: ${colors.text};
          border: 1px solid ${colors.border};
          padding: 7px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12.5px;
          font-weight: bold;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .wishlist-count {
          display: inline-block;
        }

        @media (max-width: 768px) {
          .banner-container { height: 180px !important; margin-bottom: 20px !important; border-radius: 14px !important; }
          .banner-title { font-size: 16px !important; margin-bottom: 4px !important; }
          .banner-desc { font-size: 11px !important; line-height: 1.4 !important; }
          .banner-content { padding: 0 16px !important; }
          .header-container { padding: 8px 10px !important; }
          .header-left-group { gap: 6px !important; }
          .header-right-group { gap: 4px !important; }
          .header-btn { padding: 6px 8px !important; min-width: 34px !important; height: 34px !important; font-size: 11px !important; }
          .wishlist-count { display: none !important; }
          .site-title { font-size: 17px !important; }
          .btn-text-hide { display: none !important; }
          .categories-scroll-row { gap: 10px !important; margin-bottom: 24px !important; }
          .cat-card-item { width: 95px !important; min-width: 95px !important; height: 180px !important; border-radius: 14px !important; }
          .cat-card-text { font-size: 13.5px !important; letter-spacing: 0.5px !important; }
          .products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; }
          .product-card { padding: 10px !important; border-radius: 12px !important; }
          .product-img-box { height: 120px !important; margin-bottom: 8px !important; }
          .product-title { font-size: 12px !important; margin: 4px 0 !important; }
          .product-price { font-size: 13px !important; }
          .product-btn { padding: 6px 8px !important; font-size: 11px !important; }
        }
      `}</style>

      {/* نافذة الحساب */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
        supabaseUrl={SUPABASE_URL}
        supabaseAnonKey={SUPABASE_ANON_KEY}
        lang={lang}
        colors={colors}
      />

      {/* القائمة الجانبية الهرمية */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={sidebarCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setVisibleCount(24);
          setSelectedProduct(null);
          setView('store');
        }}
        lang={lang}
        colors={colors}
      />

      {/* نافذة المفضلة */}
      {isWishlistOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            [lang === 'ar' ? 'left' : 'right']: 0,
            width: '360px',
            maxWidth: '90vw',
            height: '100vh',
            backgroundColor: colors.surface,
            borderLeft: lang === 'ar' ? 'none' : `1px solid ${colors.border}`,
            borderRight: lang === 'ar' ? `1px solid ${colors.border}` : 'none',
            padding: '20px',
            zIndex: 1200,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 30px rgba(0,0,0,0.8)',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: colors.heart,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: 0,
              }}
            >
              ❤️ {lang === 'ar' ? 'المفضلة' : 'Wishlist'} ({wishlist.length})
            </h3>
            <button
              onClick={() => setIsWishlistOpen(false)}
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

          {wishlist.length === 0 ? (
            <p
              style={{
                color: colors.muted,
                textAlign: 'center',
                marginTop: '40px',
              }}
            >
              {lang === 'ar'
                ? 'قائمة المفضلة فارغة حالياً'
                : 'Wishlist is empty'}
            </p>
          ) : (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: colors.cardInner,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <img
                    src={getCleanProductImage(item.image_url)}
                    alt={item.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      backgroundColor: colors.surface,
                      borderRadius: '8px',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: '13px',
                        color: colors.text,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '120px',
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        color: '#f97316',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {formatIQD(Number(item.price))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => {
                        const idx = cart.findIndex((i) => i.id === item.id);
                        if (idx > -1) {
                          const updated = [...cart];
                          updated[idx].qty = (updated[idx].qty || 1) + 1;
                          setCart(updated);
                        } else {
                          setCart((c) => [...c, { ...item, qty: 1 }]);
                        }
                        setIsWishlistOpen(false);
                        setIsCartOpen(true);
                      }}
                      title="نقل للسلة"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.primaryText,
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      🛒
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      title="حذف"
                      style={{
                        backgroundColor: '#ef444422',
                        color: '#ef4444',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* السلة */}
      <CartDrawer
        isOpen={isCartOpen && view === 'store'}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={(index) => setCart(cart.filter((_, i) => i !== index))}
        onClearCart={() => setCart([])}
        formatIQD={formatIQD}
        lang={lang}
        colors={colors}
        botToken={TELEGRAM_BOT_TOKEN}
        chatId={TELEGRAM_CHAT_ID}
      />

      {/* الهيدر */}
      <header
        className="header-container"
        style={{
          borderBottom: `1px solid ${colors.border}`,
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.surface,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
        }}
      >
        <div className="header-left-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="header-btn"
            style={{ fontSize: '15px' }}
          >
            ☰
          </button>
          <h1
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setVisibleCount(24);
              setSelectedProduct(null);
              setView('store');
            }}
            className="rgb-logo site-title"
            style={{
              fontSize: '24px',
              fontWeight: '900',
              letterSpacing: '1px',
              cursor: 'pointer',
              margin: 0,
            }}
          >
            EXOTECH
          </h1>
        </div>

        <div className="header-right-group" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {currentUser ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: colors.cardInner,
                padding: '5px 8px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
              }}
            >
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 'bold',
                  color: colors.primary,
                  maxWidth: '75px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                👤 {currentUser.name}
              </span>
              <button
                onClick={handleLogout}
                title="تسجيل الخروج"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="header-btn"
            >
              <span>👤</span>
              <span className="btn-text-hide">{lang === 'ar' ? 'حسابي' : 'Account'}</span>
            </button>
          )}

          {/* زر التبديل بين الوضع الليلي والنهاري */}
          <button
            onClick={toggleTheme}
            className="header-btn"
            title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="header-btn"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="header-btn"
            style={{
              color: wishlist.length > 0 ? colors.heart : colors.muted,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={wishlist.length > 0 ? colors.heart : 'none'}
              stroke={colors.heart}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="wishlist-count">({wishlist.length})</span>
          </button>

          {view === 'admin' && (
            <button
              onClick={() => {
                setView('store');
                setSelectedProduct(null);
              }}
              className="header-btn"
              style={{
                color: colors.primary,
              }}
            >
              العودة للمتجر
            </button>
          )}

          {view === 'store' && (
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              style={{
                backgroundColor: colors.primary,
                color: colors.primaryText,
                border: 'none',
                padding: '7px 11px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12.5px',
                minWidth: '34px',
                height: '34px',
                justifyContent: 'center',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>({cart.reduce((acc, item) => acc + (item.qty || 1), 0)})</span>
            </button>
          )}
        </div>
      </header>

      {/* تبديل الواجهات */}
      {view === 'admin' ? (
        <AdminPanel
          categories={sidebarCategories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddSubcategory={handleAddSubcategory}
          onDeleteSubcategory={handleDeleteSubcategory}
          homeCategories={homeCategories}
          onAddHomeCategory={handleAddHomeCategory}
          onUpdateHomeCategory={handleUpdateHomeCategory}
          onDeleteHomeCategory={handleDeleteHomeCategory}
          products={products}
          onSaveProduct={handleSaveProduct}
          onDeleteProduct={handleDeleteProduct}
          formatIQD={formatIQD}
          lang={lang}
          colors={colors}
        />
      ) : selectedProduct ? (
        <ProductDetailsView
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={(p, qty) => {
            const idx = cart.findIndex((i) => i.id === p.id);
            if (idx > -1) {
              const updated = [...cart];
              updated[idx].qty = (updated[idx].qty || 1) + qty;
              setCart(updated);
            } else {
              setCart((c) => [...c, { ...p, qty }]);
            }
            setIsCartOpen(true);
          }}
          formatIQD={formatIQD}
          lang={lang}
          colors={colors}
        />
      ) : (
        <main
          style={{
            maxWidth: '1340px',
            margin: '0 auto',
            padding: '20px 16px 0 16px',
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          {/* بانر العروض المتجاوب */}
          <div
            className="banner-container"
            style={{
              position: 'relative',
              height: '320px',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '28px',
              border: `1px solid ${colors.border}`,
              backgroundColor: '#0c0f17',
              width: '100%',
            }}
          >
            {BANNERS.map((banner, index) => (
              <div
                key={index}
                className="banner-content"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(${
                    lang === 'ar' ? 'to left' : 'to right'
                  }, rgba(7, 9, 14, 0.92) 20%, rgba(7, 9, 14, 0.4) 65%, rgba(0,0,0,0.2) 100%), url(${
                    banner.bg
                  })`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: index === currentSlide ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '0 40px',
                  zIndex: index === currentSlide ? 1 : 0,
                  pointerEvents: index === currentSlide ? 'auto' : 'none',
                }}
              >
                <h2
                  className="banner-title"
                  style={{
                    fontSize: '30px',
                    fontWeight: '900',
                    color: '#fff',
                    margin: '0 0 8px 0',
                    textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                  }}
                >
                  {lang === 'ar' ? banner.titleAr : banner.titleEn}
                </h2>
                <p
                  className="banner-desc"
                  style={{
                    fontSize: '14.5px',
                    color: '#cbd5e1',
                    margin: 0,
                    textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                  }}
                >
                  {lang === 'ar' ? banner.descAr : banner.descEn}
                </p>
              </div>
            ))}

            {/* مؤشرات التبديل التفاعلية */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
                zIndex: 10,
              }}
            >
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: i === currentSlide ? '24px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor:
                      i === currentSlide ? colors.primary : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* شريط البحث المطور */}
          <div style={{ maxWidth: '850px', margin: '0 auto 28px auto', width: '100%' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              placeholder="ابحث عن منتج، قطعة، قسم، أو علامة تجارية..."
              style={{
                width: '100%',
                padding: '14px 22px',
                fontSize: '14.5px',
                borderRadius: '14px',
                border: `1.5px solid ${colors.border}`,
                backgroundColor: colors.surface,
                color: colors.text,
                outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            />
          </div>

          {/* شريط الأقسام الأفقي القابل للتمرير والسحب والمربوط بالأدمن */}
          <div
            className="categories-scroll-row"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {homeCategories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleCount(24);
                  }}
                  className="cat-card-item"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(7, 9, 14, 0.95), rgba(7, 9, 14, 0.25)), url(${cat.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: isSelected
                      ? `2px solid ${colors.primary}`
                      : '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                    boxShadow: isSelected
                      ? '0 0 20px rgba(0, 210, 255, 0.4)'
                      : '0 4px 15px rgba(0,0,0,0.3)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      className="cat-card-text"
                      style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'center center',
                        whiteSpace: 'nowrap',
                        color: isSelected ? colors.primary : '#ffffff',
                        fontWeight: '800',
                        textShadow: '0 2px 10px rgba(0,0,0,0.95)',
                        userSelect: 'none',
                        display: 'block',
                        width: '230px',
                        textAlign: 'center',
                      }}
                    >
                      {lang === 'ar' ? cat.titleAr : cat.titleEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* رأس قسم المنتجات */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px',
              borderBottom: `1px solid ${colors.border}`,
              paddingBottom: '12px',
            }}
          >
            <h3
              style={{
                fontSize: '19px',
                fontWeight: 'bold',
                color: colors.primary,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {selectedCategory === 'all' && !searchQuery
                ? lang === 'ar'
                  ? '✨ مقترحة لك'
                  : '✨ Recommended'
                : `${lang === 'ar' ? 'قسم:' : 'Category:'} ${selectedCategory}`}
              <span style={{ fontSize: '13px', color: colors.muted }}>
                ({visibleProducts.length})
              </span>
            </h3>

            {selectedCategory === 'all' && !searchQuery && (
              <button
                onClick={() => {
                  setShuffledProducts(shuffleArray(products));
                  setVisibleCount(24);
                }}
                style={{
                  backgroundColor: colors.cardInner,
                  color: colors.primary,
                  border: `1px solid ${colors.border}`,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                🔄 {lang === 'ar' ? 'اقتراحات' : 'Shuffle'}
              </button>
            )}
          </div>

          {/* شبكة المنتجات */}
          <div
            className="products-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '18px',
              width: '100%',
            }}
          >
            {visibleProducts.map((p) => {
              const displayImg = getCleanProductImage(p.image_url);
              const isFav = wishlist.some((item) => item.id === p.id);
              return (
                <div
                  key={p.id}
                  className="product-card"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '16px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={(e) => toggleWishlist(p, e)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      [lang === 'ar' ? 'left' : 'right']: '16px',
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(4px)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 5,
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill={isFav ? colors.heart : 'none'}
                      stroke={isFav ? colors.heart : '#ffffff'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>

                  <div
                    onClick={() => {
                      setSelectedProduct(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      className="product-img-box"
                      style={{
                        width: '100%',
                        height: '170px',
                        backgroundColor: colors.cardInner,
                        borderRadius: '10px',
                        marginBottom: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={displayImg}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
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
                    <span style={{ fontSize: '11px', color: colors.primary, fontWeight: 'bold' }}>
                      {p.category || 'عام'}
                    </span>
                    <h4
                      className="product-title"
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 'bold',
                        margin: '6px 0',
                        lineHeight: '1.4',
                        height: '38px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {p.name}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '8px',
                      borderTop: `1px solid ${colors.border}`,
                      paddingTop: '8px',
                    }}
                  >
                    <span
                      className="product-price"
                      style={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: colors.primary,
                      }}
                    >
                      {formatIQD(Number(p.price))}
                    </span>
                    <button
                      className="product-btn"
                      onClick={() => {
                        setSelectedProduct(p);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.primaryText,
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '11.5px',
                        cursor: 'pointer',
                      }}
                    >
                      عرض
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* زر تحميل المزيد */}
          {selectedCategory === 'all' &&
            !searchQuery &&
            visibleCount < allFilteredProducts.length && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '34px',
                  marginBottom: '24px',
                }}
              >
                <button
                  onClick={() => setVisibleCount((prev) => prev + 24)}
                  style={{
                    backgroundColor: colors.cardInner,
                    color: colors.primary,
                    border: `1.5px solid ${colors.primary}`,
                    padding: '11px 28px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0, 210, 255, 0.15)',
                  }}
                >
                  {lang === 'ar'
                    ? 'عرض المزيد من المنتجات ➕'
                    : 'Load More Products ➕'}
                </button>
              </div>
            )}
        </main>
      )}

      {/* الفوتر */}
      {view === 'store' && !selectedProduct && (
        <Footer
          lang={lang}
          colors={colors}
          categories={sidebarCategories}
          whatsappNumber={WHATSAPP_NUMBER}
          onNavigateCategory={(catId) => {
            setSelectedCategory(catId);
            setVisibleCount(24);
          }}
        />
      )}
    </div>
  );
}
