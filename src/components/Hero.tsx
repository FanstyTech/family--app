/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, TreePine } from 'lucide-react';

interface HeroProps {
  familyName: string;
  aboutText: string;
  onExploreTree: () => void;
  onExploreHistory: () => void;
}

export default function Hero({
  familyName,
  aboutText,
  onExploreTree,
  onExploreHistory,
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-art-bg via-art-surface/20 to-art-surface/50 py-16 md:py-24 border-b border-art-border">
      {/* Decorative premium shapes */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-art-brass/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-art-gold/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-art-surface border border-art-border text-art-brass mb-6 shadow-xs"
        >
          <TreePine className="h-8 w-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl xs:text-5xl md:text-6xl font-extrabold tracking-tight text-art-ink leading-tight font-sans"
        >
          البوابة الرقمية لنسب <br className="sm:hidden" />
          <span className="text-art-brass font-black">
            {familyName}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-art-ink-muted font-medium"
        >
          {aboutText} نستحضر التاريخ لنربطه بالحاضر ونبني امتداداً مشرفاً للمستقبل للتعارف والتآلف وبث قيم المحبة وصلة الرحم.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            id="hero-explore-tree-btn"
            onClick={onExploreTree}
            className="group flex items-center justify-center gap-2 rounded-xl bg-art-brass hover:bg-art-brass/90 px-6 py-4 text-[15px] font-bold text-art-bg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            استكشف الشجرة التفاعلية
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </button>

          <button
            id="hero-explore-history-btn"
            onClick={onExploreHistory}
            className="flex items-center justify-center gap-2 rounded-xl border border-art-border bg-art-surface hover:bg-art-surface/80 px-6 py-4 text-[15px] font-bold text-art-ink shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <BookOpen className="h-5 w-5 text-art-brass" />
            تعرف على تاريخ العائلة
          </button>
        </motion.div>
      </div>
    </div>
  );
}
