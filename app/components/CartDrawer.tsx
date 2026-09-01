'use client';
import React, { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  formatIQD: (amount: number) => string;
  lang: 'ar' | 'en';
  colors: any;
  botToken: string;
  chatId: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  formatIQD,
  lang,
  colors,
  botToken,
  chatId,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('بغداد');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'mastercard'>('cod');
  const [transferRef, setTransferRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.qty || 1),
    0
  );

  const handleCopyCard = () => {
    navigator.clipboard.writeText('7112712786');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendOrder = async (e: any) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      return alert(
        lang === 'ar' ? 'يرجى ملء جميع الحقول!' : 'Please fill all fields!'
      );
    }
    if (paymentMethod === 'mastercard' && !transferRef.trim()) {
      return alert(
        lang === 'ar'
          ? 'يرجى كتابة رقم الحوالة / العملية للتأكد من استلام الدفع'
          : 'Please enter the transaction reference number'
      );
    }
    if (cart.length === 0)
      return alert(lang === 'ar' ? 'السلة فارغة' : 'Cart is empty');

    setIsSubmitting(true);
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} × ${item.qty || 1} (${formatIQD(
            Number(item.price) * (item.qty || 1)
          )})`
      )
      .join('\n');

    const paymentDetails =
      paymentMethod === 'cod'
        ? `💵 الدفع عند الاستلام (كاش)`
        : `💳 تحويل ماستر كارد مباشر\n🔢 رقم العملية/الإشعار: ${transferRef.trim()}`;

    const messageText =
      `🛍️ طلب جديد - EXOTECH Store\n\n` +
      `👤 العميل: ${customerName}\n` +
      `📞 رقم الهاتف: ${customerPhone}\n` +
      `📍 المحافظة: ${customerCity}\n` +
      `🏠 العنوان: ${customerAddress}\n\n` +
      `💳 طريقة الدفع: ${paymentDetails}\n\n` +
      `🛒 المنتجات المطلوبة:\n${itemsList}\n\n` +
      `💰 الإجمالي: ${formatIQD(totalAmount)}`;

    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        messageText
      )}`;
      const res = await fetch(url);
      const resData = await res.json();
      if (resData.ok) {
        alert(
          lang === 'ar'
            ? '🎉 تم تثبيت طلبك بنجاح! سيتم التواصل معك للشحن.'
            : '🎉 Order confirmed successfully!'
        );
        onClearCart();
        setCustomerName('');
        setCustomerPhone('');
        setCustomerAddress('');
        setTransferRef('');
        onClose();
      } else {
        alert(`Error: ${resData.description}`);
      }
    } catch (err) {
      alert('Network Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        [lang === 'ar' ? 'left' : 'right']: 0,
        width: '360px',
        height: '100vh',
        backgroundColor: colors.surface,
        borderLeft: lang === 'ar' ? 'none' : `1px solid ${colors.border}`,
        borderRight: lang === 'ar' ? `1px solid ${colors.border}` : 'none',
        padding: '24px',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 0 30px rgba(0,0,0,0.8)',
        overflowY: 'auto',
      }}
    >
      <div>
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
              color: colors.primary,
            }}
          >
            {lang === 'ar' ? 'سلة المشتريات' : 'Cart'}
          </h3>
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

        {cart.length === 0 ? (
          <p
            style={{
              color: colors.muted,
              textAlign: 'center',
              marginTop: '40px',
            }}
          >
            {lang === 'ar' ? 'السلة فارغة' : 'Cart is empty'}
          </p>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxHeight: '180px',
                overflowY: 'auto',
                marginBottom: '16px',
                backgroundColor: colors.cardInner,
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold' }}>
                      {item.name}{' '}
                      <span style={{ color: '#f97316' }}>
                        × {item.qty || 1}
                      </span>
                    </div>
                    <div style={{ color: colors.primary, fontSize: '12px' }}>
                      {formatIQD(Number(item.price) * (item.qty || 1))}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(idx)}
                    style={{
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    {lang === 'ar' ? 'حذف' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendOrder}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                style={{
                  padding: '10px',
                  backgroundColor: colors.cardInner,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  borderRadius: '6px',
                }}
              />
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder={lang === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
                style={{
                  padding: '10px',
                  backgroundColor: colors.cardInner,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  borderRadius: '6px',
                }}
              />
              <select
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                style={{
                  padding: '10px',
                  backgroundColor: colors.cardInner,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  borderRadius: '6px',
                }}
              >
                <option value="بغداد">بغداد (Baghdad)</option>
                <option value="البصرة">البصرة (Basra)</option>
                <option value="أربيل">أربيل (Erbil)</option>
                <option value="النجف">النجف (Najaf)</option>
                <option value="كربلاء">كربلاء (Karbala)</option>
                <option value="المحافظات الأخرى">المحافظات الأخرى</option>
              </select>
              <input
                type="text"
                required
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder={
                  lang === 'ar' ? 'العنوان بالتفصيل *' : 'Detailed Address *'
                }
                style={{
                  padding: '10px',
                  backgroundColor: colors.cardInner,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  borderRadius: '6px',
                }}
              />

              {/* قسم اختيار طريقة الدفع */}
              <div style={{ marginTop: '6px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: colors.muted,
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {lang === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: `1px solid ${paymentMethod === 'cod' ? colors.primary : colors.border}`,
                      backgroundColor: paymentMethod === 'cod' ? colors.primary + '22' : colors.cardInner,
                      color: paymentMethod === 'cod' ? colors.primary : colors.text,
                      fontSize: '11.5px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    💵 {lang === 'ar' ? 'عند الاستلام' : 'Cash on Delivery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mastercard')}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: `1px solid ${paymentMethod === 'mastercard' ? colors.primary : colors.border}`,
                      backgroundColor: paymentMethod === 'mastercard' ? colors.primary + '22' : colors.cardInner,
                      color: paymentMethod === 'mastercard' ? colors.primary : colors.text,
                      fontSize: '11.5px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    💳 {lang === 'ar' ? 'ماستر كارد' : 'MasterCard'}
                  </button>
                </div>
              </div>

              {/* صندوق تفاصيل تحويل الماستر كارد */}
              {paymentMethod === 'mastercard' && (
                <div
                  style={{
                    backgroundColor: colors.cardInner,
                    border: `1px dashed ${colors.primary}`,
                    borderRadius: '8px',
                    padding: '12px',
                    marginTop: '4px',
                    fontSize: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.muted }}>صاحب الحساب:</span>
                    <span style={{ fontWeight: 'bold' }}>حسين تقي</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: colors.muted }}>رقم الحساب/الماستر:</span>
                    <span style={{ fontWeight: 'bold', color: colors.primary, letterSpacing: '1px' }}>
                      7112712786
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCard}
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.primaryText,
                      border: 'none',
                      padding: '6px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? '✅ تم النسخ!' : '📋 نسخ رقم الماستر كارد'}
                  </button>
                  <input
                    type="text"
                    required={paymentMethod === 'mastercard'}
                    value={transferRef}
                    onChange={(e) => setTransferRef(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'رقم عملية التحويل / الحوالة *'
                        : 'Transaction / Transfer Ref *'
                    }
                    style={{
                      padding: '8px',
                      backgroundColor: colors.surface,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      borderRadius: '4px',
                      fontSize: '11.5px',
                      marginTop: '4px',
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  margin: '10px 0',
                }}
              >
                <span>{lang === 'ar' ? 'المجموع:' : 'Total:'}</span>
                <span style={{ color: colors.primary }}>
                  {formatIQD(totalAmount)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.primaryText,
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {isSubmitting
                  ? lang === 'ar'
                    ? 'جاري الإرسال...'
                    : 'Submitting...'
                  : lang === 'ar'
                  ? 'تثبيت الطلب عبر تليجرام'
                  : 'Confirm Order'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
