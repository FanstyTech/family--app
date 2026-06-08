/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Shield, Sparkles } from 'lucide-react';

interface AboutProps {
  historyText: string;
}

export default function About({ historyText }: AboutProps) {
  const cards = [
    {
      icon: <Shield className="h-6 w-6 text-art-brass" />,
      title: 'القيم والأخلاق',
      desc: 'المحافظة على المبادئ الإسلامية السمحة والتقاليد العربية الأصيلة وبثها في نفوس الأجيال الصاعدة.',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-art-brass" />,
      title: 'العمل المستدام',
      desc: 'النهوض بالوعي الثقافي ودعم مبادرات ريادة الأعمال من خلال منح وصناديق تكافل عائلية رائدة.',
    },
    {
      icon: <Bookmark className="h-6 w-6 text-art-brass" />,
      title: 'صلة الرحم والتواصل',
      desc: 'بناء جسور ترابط مستمرة تجمع المغترب وتدعم الفرد وتصل الرحم عبر اللقاءات والمشاورات الدورية.',
    },
  ];

  return (
    <div id="about-section" className="py-16 md:py-24 bg-art-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Detailed Family History */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-art-brass bg-art-surface px-3 py-1.5 rounded-full border border-art-border">
              عبق الماضي وإشراقة الحاضر
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-art-ink leading-tight font-sans">
              نبذة تاريخية عن النسب والجذور
            </h2>
            <div className="mt-6 text-[15px] leading-relaxed text-art-ink-muted space-y-4 font-medium">
              <p>{historyText}</p>
              <p>
                تمتد هذه المنصة لتكون سجلاً تاريخياً إلكترونياً موثقاً ومحفوظاً، يربط السلالة والأعقاب، ويتيح الاستفسار وإثراء المعارف العائلية بأسلوب علمي رصين بعيدٍ عن التعصب، صوناً للمودة ونشراً للبر بين ذوي القربى.
              </p>
            </div>
          </div>

          {/* Core Values Cards */}
          <div className="mt-12 lg:mt-0 lg:col-span-5 space-y-4">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-art-border bg-art-surface/40 p-6 shadow-xs"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-art-surface border border-art-border shadow-xs">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-art-ink font-sans">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold leading-relaxed text-art-ink-muted">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
