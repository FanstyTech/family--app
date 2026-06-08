/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FamilyMember } from '../types';
import { getAvatarColor, getInitials, getGenerationLabel } from '../utils';
import { X, Calendar, MapPin, Briefcase, Heart, User, Sparkles, AlertCircle } from 'lucide-react';

interface MemberModalProps {
  member: FamilyMember;
  allMembers: FamilyMember[];
  onClose: () => void;
  onNavigateToMember: (id: string) => void;
}

export default function MemberModal({
  member,
  allMembers,
  onClose,
  onNavigateToMember,
}: MemberModalProps) {
  // Find key relatives
  const father = member.fatherId ? allMembers.find((m) => m.id === member.fatherId) : null;
  const mother = member.motherId ? allMembers.find((m) => m.id === member.motherId) : null;
  
  // Find spouse
  let spouse: FamilyMember | null = null;
  if (member.spouseId) {
    spouse = allMembers.find((m) => m.id === member.spouseId) || null;
  } else {
    // Look for someone pointing to this member as spouse
    spouse = allMembers.find((m) => m.spouseId === member.id) || null;
  }

  // Find children
  const children = allMembers.filter((m) => m.fatherId === member.id || m.motherId === member.id);

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-art-ink/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full rounded-3xl bg-art-bg border border-art-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon Indicator of Life Status */}
        <div className={`h-2 w-full ${member.isAlive ? 'bg-art-brass' : 'bg-art-border'}`} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-art-surface text-art-ink-muted hover:text-art-ink transition-colors border border-art-border/40"
          aria-label="إغلاق التفاصيل"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Member Profile Banner and Avatar */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-right">
            {/* Advanced Avatar */}
            <div className="relative shrink-0">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="h-24 w-24 rounded-2xl object-cover border-4 border-art-border shadow-xs"
                />
              ) : (
                <div className={`h-24 w-24 rounded-2xl bg-gradient-to-tr ${getAvatarColor(member.gender, member.name)} flex items-center justify-center text-2xl font-black shadow-md border-4 border-art-border`}>
                  {getInitials(member.name)}
                </div>
              )}
              {/* Gender badge */}
              <span className={`absolute -bottom-2 -left-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs text-white ${member.gender === 'male' ? 'bg-[#5B6B8C]' : 'bg-[#C27D80]'}`}>
                {member.gender === 'male' ? 'ذكر' : 'أنثى'}
              </span>
            </div>

            {/* General Info */}
            <div className="flex-1 space-y-2">
              <span className="inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-art-surface text-art-brass border border-art-border">
                {getGenerationLabel(member.generation)}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-art-ink font-sans">
                {member.name}
              </h3>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-semibold text-art-ink-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-art-brass" />
                  {member.birthDate ? `${member.birthDate} م` : 'غير مسجل'}
                  {!member.isAlive && member.deathDate && ` - ت. ${member.deathDate} م`}
                  {!member.isAlive && !member.deathDate && ' (متوفى)'}
                  {member.isAlive && ' (أطال الله عمره)'}
                </span>

                {member.residence && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-art-brass" />
                    {member.residence}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Biography Text / Bio */}
          <div className="mt-6 border-t border-art-border pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-art-ink-muted mb-2">
              السيرة المختصرة والأثر الطيب
            </h4>
            <p className="text-[14px] leading-relaxed text-art-ink bg-art-surface/50 p-4 rounded-2xl border border-art-border font-medium">
              {member.bio || 'لا تتوفر سيرة ذاتية مسجلة حالياً لهذا الفرد، يمكن تحديثها عبر بوابة الإدارة.'}
            </p>
          </div>

          {/* Quick Stats: Profession, etc. */}
          {member.profession && (
            <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-art-ink">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-art-surface border border-art-border text-art-brass shrink-0">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-art-ink-muted">المهنة / الصفة العائلية</span>
                <span className="block text-art-ink font-sans">{member.profession}</span>
              </div>
            </div>
          )}

          {/* Quick Navigation Panel of Relatives */}
          <div className="mt-6 border-t border-art-border pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-art-ink-muted mb-3 col-span-2">
              الروابط والقرابة المباشرة (انقر للتصفح)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Father & Mother */}
              <div className="space-y-3">
                <div>
                  <span className="block text-[11px] font-bold text-art-ink-muted mb-1">الوالد</span>
                  {father ? (
                    <button
                      onClick={() => onNavigateToMember(father.id)}
                      className="flex w-full items-center gap-2 rounded-xl border border-art-border p-2.5 text-right text-xs font-bold text-art-ink hover:border-art-brass hover:bg-art-surface cursor-pointer"
                    >
                      <User className="h-4 w-4 text-art-brass" />
                      <span className="truncate">{father.name}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-art-ink-muted italic block py-2 px-1">غير مسجّل أو الجيل الأول</span>
                  )}
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-art-ink-muted mb-1">الوالدة</span>
                  {mother ? (
                    <button
                      onClick={() => onNavigateToMember(mother.id)}
                      className="flex w-full items-center gap-2 rounded-xl border border-art-border p-2.5 text-right text-xs font-bold text-art-ink hover:border-art-brass hover:bg-art-surface cursor-pointer"
                    >
                      <User className="h-4 w-4 text-art-brass" />
                      <span className="truncate">{mother.name}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-art-ink-muted italic block py-2 px-1">غير مسجلة أو الجيل الأول</span>
                  )}
                </div>
              </div>

              {/* Spouses & Children */}
              <div className="space-y-3">
                <div>
                  <span className="block text-[11px] font-bold text-art-ink-muted mb-1">الزوج أو شريك الدرب</span>
                  {spouse ? (
                    <button
                      onClick={() => onNavigateToMember(spouse.id)}
                      className="flex w-full items-center gap-2 rounded-xl border border-art-border p-2.5 text-right text-xs font-bold text-art-ink hover:border-art-brass hover:bg-art-surface cursor-pointer"
                    >
                      <Heart className="h-4 w-4 text-rose-400" />
                      <span className="truncate">{spouse.name}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-art-ink-muted italic block py-2 px-1">لا يوجد شريك مسجل حالياً</span>
                  )}
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-art-ink-muted mb-1">الأبناء والبنات ({children.length})</span>
                  {children.length > 0 ? (
                    <div className="max-h-24 overflow-y-auto space-y-1.5 border border-art-border rounded-xl p-1.5 bg-art-surface/20">
                      {children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => onNavigateToMember(child.id)}
                          className="flex w-full items-center gap-2 rounded-lg p-1.5 text-right text-xs font-bold text-art-ink hover:text-art-brass hover:bg-art-surface cursor-pointer"
                        >
                          <span className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${child.gender === 'male' ? 'bg-art-brass' : 'bg-rose-400'}`} />
                          <span className="truncate">{child.name}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] font-semibold text-art-ink-muted italic block py-2 px-1">لا يوجد أبناء مسجلين</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
