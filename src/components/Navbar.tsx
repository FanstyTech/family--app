/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, Moon, TreePine, Menu, X, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'tree' | 'admin';
  setCurrentTab: (tab: 'home' | 'tree' | 'admin') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  familyName: string;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  familyName,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'tree', label: 'شجرة العائلة التفاعلية' },
    { id: 'admin', label: 'بوابة الإدارة' },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-art-border bg-art-bg/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex cursor-pointer items-center gap-3 transition-transform hover:scale-102"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-art-brass text-art-bg shadow-md">
              <TreePine className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-art-ink font-sans">
                {familyName}
              </span>
              <span className="block text-xs font-semibold text-art-brass">
                شرف النسب الممتد ومكارم الأخلاق
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => {
                    setCurrentTab(tab.id);
                    setIsOpen(false);
                  }}
                  className={`relative px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-art-brass bg-art-surface/80 font-bold'
                      : 'text-art-ink-muted hover:text-art-ink hover:bg-art-surface/40'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-art-brass rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions: Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-art-border bg-art-surface text-art-ink hover:bg-art-surface/80 transition-all pointer-coarse:h-12 pointer-coarse:w-12"
              title={darkMode ? 'التبديل للمظهر الفاتح' : 'التبديل للمظهر الداكن'}
              aria-label="تبديل مظهر الموقع"
            >
              {darkMode ? <Sun className="h-5 w-5 text-art-gold" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-art-border text-art-ink bg-art-surface/60 hover:bg-art-surface pointer-coarse:h-12 pointer-coarse:w-12"
              aria-label="افتح القائمة الرئيسية"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-art-border bg-art-bg px-4 py-3 space-y-2 shadow-inner">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`mobile-nav-tab-${tab.id}`}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-right px-4 py-3 text-base font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'text-art-brass bg-art-surface font-bold'
                    : 'text-art-ink hover:bg-art-surface/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
