/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FamilyMember } from '../types';
import { Users, Landmark, UserCheck, Award, Heart } from 'lucide-react';

interface StatsProps {
  members: FamilyMember[];
}

export default function Stats({ members }: StatsProps) {
  // Dynamic Calculations
  const totalCount = members.length;
  
  // Calculate unique generations
  const uniqueGenerations = Array.from(new Set(members.map(m => m.generation))).length;
  
  // Alive members
  const aliveCount = members.filter(m => m.isAlive).length;
  
  // Gender stats
  const maleCount = members.filter(m => m.gender === 'male').length;
  const femaleCount = members.filter(m => m.gender === 'female').length;

  const statItems = [
    {
      id: 'stat-total-members',
      icon: <Users className="h-6 w-6 text-art-brass" />,
      value: totalCount,
      label: 'إجمالي أفراد العائلة',
      desc: 'مسجلين نشطين في الشجرة السلالية',
    },
    {
      id: 'stat-generations',
      icon: <Landmark className="h-6 w-6 text-art-brass" />,
      value: uniqueGenerations,
      label: 'الأجيال الموثقة',
      desc: 'طيف عمري يبدأ من الجد الأكبر',
    },
    {
      id: 'stat-alive',
      icon: <UserCheck className="h-6 w-6 text-art-brass" />,
      value: aliveCount,
      label: 'أطال الله في عمرهم',
      desc: 'منارات بركة من الأبناء والأحفاد الحاضرين',
    },
    {
      id: 'stat-males-females',
      icon: <Heart className="h-6 w-6 text-art-brass" />,
      value: `${maleCount} ذكور / ${femaleCount} إناث`,
      label: 'التنوع المبهج',
      desc: 'نسيج متماسك يغمره الود وصلة القربى',
    },
  ];

  return (
    <div id="stats-section" className="py-16 bg-art-surface/30 border-y border-art-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-art-ink font-sans">
            إحصائيات وأرقام المنصة الرقمية
          </h2>
          <p className="mt-2 text-sm font-semibold text-art-ink-muted">
            أرقام تعكس امتداد العائلة وبركتها، وتوفر نظرة حية سريعة على التركيبة الديموغرافية لسلالتنا.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="flex flex-col justify-between rounded-2xl border border-art-border bg-art-bg/85 p-6 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-art-surface border border-art-border text-art-brass">
                {item.icon}
              </div>
              <div className="mt-6">
                <span className="block text-2xl font-black text-art-ink font-sans tracking-tight">
                  {item.value}
                </span>
                <span className="mt-1 block text-sm font-bold text-art-brass">
                  {item.label}
                </span>
                <span className="mt-2 block text-xs font-semibold text-art-ink-muted">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
