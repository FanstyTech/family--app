/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ZoomIn } from 'lucide-react';

interface GalleryProps {
  galleryItems: GalleryItem[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <div id="gallery-section" className="py-16 bg-art-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-art-brass bg-art-surface px-3 py-1.5 rounded-full border border-art-border">
            ألبوم الذاكرة
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-art-ink font-sans">
            معرض صور ومناسبات العائلة وعمادتها
          </h2>
          <p className="mt-2 text-sm font-semibold text-art-ink-muted">
            لقطات مضيئة ومناسبات مباركة تم تخليدها لتراقبوا نمو الأجيال وترابطها المبهج على مر السنين والرحلات والتجمعات السنوية.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-art-border bg-art-surface/40 shadow-xs hover:shadow-sm transition-all"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-art-surface">
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-art-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-art-bg/20 backdrop-blur-md text-art-bg border border-art-gold">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-5">
                <h3 className="text-base font-bold text-art-ink font-sans truncate">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 text-xs font-semibold text-art-ink-muted line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <div 
              className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-art-ink/70 backdrop-blur-xs"
              onClick={() => setActiveImage(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full rounded-3xl bg-art-bg overflow-hidden border border-art-border shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent close on card click
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-art-ink/60 hover:bg-art-ink text-white transition-all shadow-md"
                  aria-label="إغلاق المعاينة"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Big Image */}
                <div className="aspect-16/10 bg-art-ink/90 flex items-center justify-center">
                  <img
                    src={activeImage.url}
                    alt={activeImage.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[70vh] w-full object-contain"
                  />
                </div>

                {/* Meta details */}
                <div className="p-6 bg-art-surface border-t border-art-border">
                  <h3 className="text-lg font-bold text-art-ink font-sans">
                    {activeImage.title}
                  </h3>
                  {activeImage.description && (
                    <p className="mt-2 text-sm font-semibold text-art-ink-muted">
                      {activeImage.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
