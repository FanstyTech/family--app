/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactProps {
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
}

export default function Contact({
  contactEmail,
  contactPhone,
  contactAddress,
  onSendMessage,
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    onSendMessage(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div id="contact-section" className="py-16 bg-art-surface/20 border-t border-art-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-art-brass bg-art-surface px-3 py-1.5 rounded-full border border-art-border">
                اتصل بنا
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-art-ink font-sans">
                مجلس إدارة ومعلومات التواصل للعائلة
              </h2>
              <p className="mt-2 text-sm font-semibold text-art-ink-muted leading-relaxed">
                هل لديك استفسار بخصوص تدقيق نسب، أو تريد اقتراح إضافة فرد أو مشاركة صور ومخطوطات عائلية نادرة؟ تفضل بالتواصل معنا مباشرة.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-art-surface border border-art-border text-art-brass shadow-xs">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-art-ink-muted uppercase tracking-wider">
                    البريد الإلكتروني للأمانة العائلية
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-art-ink">
                    {contactEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-art-surface border border-art-border text-art-brass shadow-xs">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-art-ink-muted uppercase tracking-wider">
                    الخط الهاتفي المباشر لخدمة مجلس العائلة
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-art-ink" dir="ltr">
                    {contactPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-art-surface border border-art-border text-art-brass shadow-xs">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-art-ink-muted uppercase tracking-wider">
                    المقر الرئيسي والمجلس العام لعمادة آل غانم
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-art-ink leading-relaxed">
                    {contactAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-art-surface/40 p-6 md:p-8 rounded-3xl border border-art-border shadow-sm">
            <h3 className="text-lg font-bold text-art-ink font-sans mb-6">
              نموذج المراسلة السريع للأمانة والأمور التقنية
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-art-bg border border-art-border text-art-brass mb-4 animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-base font-bold text-art-ink font-sans">
                  تم إرسال رسالتك بنجاح!
                </h4>
                <p className="mt-2 text-xs font-semibold text-art-ink-muted max-w-sm">
                  شكرًا لتواصلك معنا. تم تحويل استفسارك لأمانة شؤون مجلس العائلة، وسيجري مراجعته والرد عليه في أقرب وقت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-art-ink-muted mb-1.5">
                      الاسم الكريم
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="الاسم الثلاثي أو اللقب"
                      className="w-full rounded-xl border border-art-border px-4 py-3 text-sm text-art-ink bg-art-bg/80 focus:bg-art-bg focus:ring-2 focus:ring-art-gold/20 focus:border-art-brass outline-hidden transition-all placeholder:text-art-ink-muted"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-art-ink-muted mb-1.5">
                      البريد الإلكتروني للرد
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-art-border px-4 py-3 text-sm text-art-ink bg-art-bg/80 focus:bg-art-bg focus:ring-2 focus:ring-art-gold/20 focus:border-art-brass outline-hidden transition-all placeholder:text-art-ink-muted"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-art-ink-muted mb-1.5">
                    موضوع الرسالة
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="مثال: تصحيح تاريخ ميلاد، اقتراح لم الشمل..."
                    className="w-full rounded-xl border border-art-border px-4 py-3 text-sm text-art-ink bg-art-bg/80 focus:bg-art-bg focus:ring-2 focus:ring-art-gold/20 focus:border-art-brass outline-hidden transition-all placeholder:text-art-ink-muted"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-art-ink-muted mb-1.5">
                    نص الرسالة بالتفصيل
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="تفضل بكتابة طلبك أو استفسارك هنا بكل وضوح..."
                    className="w-full rounded-xl border border-art-border px-4 py-3 text-sm text-art-ink bg-art-bg/80 focus:bg-art-bg focus:ring-2 focus:ring-art-gold/20 focus:border-art-brass outline-hidden transition-all placeholder:text-art-ink-muted"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-art-brass hover:bg-art-brass/90 text-art-bg font-bold py-3.5 px-4 text-sm shadow-xs transition-all pointer-coarse:py-4 pointer-coarse:text-base cursor-pointer"
                >
                  إرسال الرسالة للأمانة والعلاقات
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
