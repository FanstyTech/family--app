/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FamilyMember } from './types';

export function getGenerationLabel(gen: number): string {
  const labels: Record<number, string> = {
    1: 'الجيل الأول (الجيل المؤسس)',
    2: 'الجيل الثاني (الأبناء)',
    3: 'الجيل الثالث (الأحفاد)',
    4: 'الجيل الرابع (أبناء الأحفاد)',
    5: 'الجيل الخامس'
  };
  return labels[gen] || `الجيل ${gen}`;
}

export function getAvatarColor(gender: 'male' | 'female', name: string): string {
  // Generate a premium gradient based on name/gender
  const s = name.length % 3;
  if (gender === 'male') {
    if (s === 0) return 'from-teal-600 to-emerald-800 text-teal-50';
    if (s === 1) return 'from-slate-700 to-slate-900 text-slate-100';
    return 'from-blue-700 to-indigo-950 text-blue-50';
  } else {
    if (s === 0) return 'from-rose-500 to-pink-700 text-rose-50';
    if (s === 1) return 'from-amber-500 to-rose-700 text-amber-50';
    return 'from-purple-600 to-indigo-800 text-purple-50';
  }
}

export function getInitials(name: string): string {
  if (!name) return 'ع';
  // Remove titles like "الشيخ", "الأستاذ", "د."
  const cleanName = name
    .replace(/^(الشيخ|الشيخة|المستشار|الأستاذة|الأستاذ|المهندس|المهندسة|الدكتور|الدكتورة|الابن|الابنة|الآنسة|د\.|أ\.)\s+/g, '')
    .trim();
  const parts = cleanName.split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]} ${parts[1][0]}`;
  }
  return parts[0] ? parts[0].substring(0, 2) : 'ع';
}
