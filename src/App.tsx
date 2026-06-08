/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import FamilyTree from './components/FamilyTree';
import AdminPanel from './components/AdminPanel';
import MemberModal from './components/MemberModal';

import { FamilyMember, FamilyInfo, GalleryItem, ContactMessage } from './types';
import { 
  DEFAULT_FAMILY_MEMBERS, 
  DEFAULT_FAMILY_INFO, 
  DEFAULT_GALLERY 
} from './data';
import { TreePine } from 'lucide-react';

export default function App() {
  // 1. Core States (Synchronized with localStorage)
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('family_members');
    return saved ? JSON.parse(saved) : DEFAULT_FAMILY_MEMBERS;
  });

  const [familyInfo, setFamilyInfo] = useState<FamilyInfo>(() => {
    const saved = localStorage.getItem('family_info');
    return saved ? JSON.parse(saved) : DEFAULT_FAMILY_INFO;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('family_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('family_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Navigation & View States
  const [currentTab, setCurrentTab] = useState<'home' | 'tree' | 'admin'>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode_v1');
    return saved ? saved === 'true' : false;
  });

  // Selected member detail popup state
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [treeHighlightId, setTreeHighlightId] = useState<string | null>(null);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('family_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('family_info', JSON.stringify(familyInfo));
  }, [familyInfo]);

  useEffect(() => {
    localStorage.setItem('family_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('family_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('darkMode_v1', darkMode.toString());
    // Also toggle actual html class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle adding contact messages
  const handleSendMessage = (msgData: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    const dateFormatted = new Date().toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msgData.name,
      email: msgData.email,
      subject: msgData.subject,
      message: msgData.message,
      date: dateFormatted,
      isRead: false,
    };

    setMessages((prev) => [newMsg, ...prev]);
  };

  // Navigating between modal and tree focus
  const handleNavigateToMember = (memberId: string) => {
    const target = members.find((m) => m.id === memberId);
    if (target) {
      setSelectedMember(target);
      setTreeHighlightId(target.id);
      // If we are looking for a relative, let's also automatically shift them to view tree
      setCurrentTab('tree');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-art-bg text-art-ink ${
      darkMode ? 'dark' : ''
    }`}>
      
      {/* Dynamic Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // Scroll to top of window smoothly when changing views
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        familyName={familyInfo.familyName}
      />

      {/* RENDER TAB 1: HOME LANDING PAGE */}
      {currentTab === 'home' && (
        <main className="animate-in fade-in duration-300">
          {/* Hero Section */}
          <Hero
            familyName={familyInfo.familyName}
            aboutText={familyInfo.aboutText}
            onExploreTree={() => {
              setCurrentTab('tree');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreHistory={() => {
              const el = document.getElementById('about-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Core About & Values */}
          <About historyText={familyInfo.historyText} />

          {/* Dynamic Statistics Panel */}
          <Stats members={members} />

          {/* Photo Gallery Grid with lightbox Modal */}
          <Gallery galleryItems={galleryItems} />

          {/* Contact Us Form and Info */}
          <Contact
            contactEmail={familyInfo.contactEmail}
            contactPhone={familyInfo.contactPhone}
            contactAddress={familyInfo.contactAddress}
            onSendMessage={handleSendMessage}
          />
        </main>
      )}

      {/* RENDER TAB 2: INTERACTIVE FAMILY TREE */}
      {currentTab === 'tree' && (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-350">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
              <TreePine className="h-5 w-5 text-emerald-600" />
              أعقاب ومحيط شجرة العائلة
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              لوحة فحص تفاعلية؛ يمكنك الضغط على أي فرد لعرض نسبه وعائلته وسيرته، والبحث لتحديد الكيانات.
            </p>
          </div>

          <FamilyTree
            members={members}
            onSelectMember={(m) => setSelectedMember(m)}
            highlightedMemberId={treeHighlightId}
          />
        </main>
      )}

      {/* RENDER TAB 3: ADMIN PANEL DASHBOARD */}
      {currentTab === 'admin' && (
        <main className="animate-in fade-in duration-300">
          <AdminPanel
            members={members}
            setMembers={setMembers}
            familyInfo={familyInfo}
            setFamilyInfo={setFamilyInfo}
            galleryItems={galleryItems}
            setGalleryItems={setGalleryItems}
            messages={messages}
            setMessages={setMessages}
          />
        </main>
      )}

      {/* Dynamic Member Bio details Modal */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          allMembers={members}
          onClose={() => {
            setSelectedMember(null);
            setTreeHighlightId(null);
          }}
          onNavigateToMember={handleNavigateToMember}
        />
      )}

      {/* Simple, Humble footer credit and site status */}
      <footer className="border-t border-art-border py-8 text-center text-xs font-semibold text-art-ink-muted bg-art-surface/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {familyInfo.familyName}. كافة الحقوق محفوظة لدى مجلس أمناء شؤون النسب والتآخي.</p>
          <p className="mt-2 text-[11px] text-slate-400/80">تطوير ميثاق عائلي تآلفي لتوثيق الصلات والتربية الصالحة والأثر المستدام.</p>
        </div>
      </footer>
    </div>
  );
}
