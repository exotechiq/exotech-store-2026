'use client';
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
  supabaseUrl: string;
  supabaseAnonKey: string;
  lang: 'ar' | 'en';
  colors: any;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  supabaseUrl,
  supabaseAnonKey,
  lang,
  colors,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        // إنشاء حساب جديد عبر Supabase Auth
        const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseAnonKey,
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
            },
          }),
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(
            data.msg ||
              data.error_description ||
              data.message ||
              'فشل إنشاء الحساب'
          );

        alert(
          lang === 'ar'
            ? '🎉 تم إنشاء الحساب بنجاح! تم تسجيل دخولك.'
            : '🎉 Account created successfully!'
        );
        const userData = {
          email: data.user?.email || email,
          name: fullName || email.split('@')[0],
          phone: phone,
        };
        localStorage.setItem('exotech_user', JSON.stringify(userData));
        onLoginSuccess(userData);
        onClose();
      } else {
        // تسجيل الدخول لحساب موجود
        const res = await fetch(
          `${supabaseUrl}/auth/v1/token?grant_type=password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: supabaseAnonKey,
            },
            body: JSON.stringify({
              email: email.trim(),
              password: password,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok)
          throw new Error(
            data.error_description ||
              data.msg ||
              'البريد أو كلمة السر غير صحيحة'
          );

        alert(
          lang === 'ar'
            ? '👋 أهلاً بك! تم تسجيل الدخول بنجاح.'
            : '👋 Welcome back! Logged in successfully.'
        );
        const userData = {
          email: data.user?.email || email,
          name: data.user?.user_metadata?.full_name || email.split('@')[0],
          phone: data.user?.user_metadata?.phone || '',
        };
        localStorage.setItem('exotech_user', JSON.stringify(userData));
        onLoginSuccess(userData);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ أثناء المعالجة');
    } finally {
      setLoading(false);
    }
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
          backgroundColor: '#0c101a',
          border: '1px solid #1e293b',
          borderRadius: '20px',
          maxWidth: '440px',
          width: '100%',
          padding: '28px',
          boxSizing: 'border-box',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
        }}
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            [lang === 'ar' ? 'left' : 'right']: '18px',
            background: 'none',
            border: 'none',
            color: colors.muted,
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* أزرار التبديل بين تسجيل الدخول وإنشاء الحساب */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#141a24',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '24px',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              backgroundColor:
                mode === 'login' ? colors.primary : 'transparent',
              color: mode === 'login' ? colors.primaryText : colors.muted,
              transition: 'all 0.2s',
            }}
          >
            {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              backgroundColor:
                mode === 'signup' ? colors.primary : 'transparent',
              color: mode === 'signup' ? colors.primaryText : colors.muted,
              transition: 'all 0.2s',
            }}
          >
            {lang === 'ar' ? 'إنشاء حساب جديد' : 'Register'}
          </button>
        </div>

        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fff',
            margin: '0 0 8px 0',
            textAlign: 'center',
          }}
        >
          {mode === 'login'
            ? lang === 'ar'
              ? 'مرحباً بك في EXOTECH'
              : 'Welcome to EXOTECH'
            : lang === 'ar'
            ? 'إنشاء حساب زبون جديد'
            : 'Create Customer Account'}
        </h2>
        <p
          style={{
            fontSize: '12.5px',
            color: colors.muted,
            textAlign: 'center',
            margin: '0 0 20px 0',
          }}
        >
          {mode === 'login'
            ? lang === 'ar'
              ? 'سجل دخولك لمتابعة طلباتك ومفضلتك'
              : 'Sign in to access your orders and wishlist'
            : lang === 'ar'
            ? 'سجل معنا لتجربة تسوق سريعة ومميزة'
            : 'Join us for a seamless shopping experience'}
        </p>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#ef444422',
              border: '1px solid #ef444466',
              color: '#f87171',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '12px',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {mode === 'signup' && (
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: colors.muted,
                  marginBottom: '4px',
                }}
              >
                {lang === 'ar' ? 'الاسم الثلاثي *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={
                  lang === 'ar' ? 'مثال: علي محمد' : 'e.g. Ali Mohammed'
                }
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#141a24',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                color: colors.muted,
                marginBottom: '4px',
              }}
            >
              {lang === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#141a24',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: colors.muted,
                  marginBottom: '4px',
                }}
              >
                {lang === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0770xxxxxxx"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#141a24',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                color: colors.muted,
                marginBottom: '4px',
              }}
            >
              {lang === 'ar' ? 'كلمة المرور *' : 'Password *'}
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#141a24',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              backgroundColor: colors.primary,
              color: colors.primaryText,
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            {loading
              ? lang === 'ar'
                ? 'جاري المعالجة...'
                : 'Processing...'
              : mode === 'login'
              ? lang === 'ar'
                ? 'دخول الحساب'
                : 'Sign In'
              : lang === 'ar'
              ? 'تأكيد وإنشاء الحساب'
              : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
