/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FamilyMember, FamilyInfo, GalleryItem, ContactMessage } from '../types';
import { 
  UserPlus, Edit3, Trash2, Layout, Image, Mail,
  Check, Save, RefreshCw, PlusCircle, Trash, CheckSquare, EyeOff
} from 'lucide-react';
import { getGenerationLabel } from '../utils';

interface AdminPanelProps {
  members: FamilyMember[];
  setMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
  familyInfo: FamilyInfo;
  setFamilyInfo: (info: FamilyInfo) => void;
  galleryItems: GalleryItem[];
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
}

export default function AdminPanel({
  members,
  setMembers,
  familyInfo,
  setFamilyInfo,
  galleryItems,
  setGalleryItems,
  messages,
  setMessages,
}: AdminPanelProps) {
  // Tabs
  const [activeTab, setActiveTab] = useState<'members' | 'site' | 'gallery' | 'messages'>('members');

  // Form states for member management
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [memberForm, setMemberForm] = useState<Omit<FamilyMember, 'id'>>({
    name: '',
    gender: 'male',
    fatherId: '',
    motherId: '',
    spouseId: '',
    birthDate: '',
    isAlive: true,
    deathDate: '',
    bio: '',
    profession: '',
    residence: '',
    photo: '',
    generation: 3,
  });

  // State for landing page info form
  const [siteForm, setSiteForm] = useState<FamilyInfo>({ ...familyInfo });

  // State for gallery form
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    url: '',
    description: '',
  });

  // Notification Banner
  const [notif, setNotif] = useState<string | null>(null);
  const triggerNotification = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  // 1. Members Handlers
  const handleResetMemberForm = () => {
    setMemberForm({
      name: '',
      gender: 'male',
      fatherId: '',
      motherId: '',
      spouseId: '',
      birthDate: '',
      isAlive: true,
      deathDate: '',
      bio: '',
      profession: '',
      residence: '',
      photo: '',
      generation: 3,
    });
    setIsEditingMember(false);
    setEditingId(null);
  };

  const handleEditMemberClick = (m: FamilyMember) => {
    setEditingId(m.id);
    setIsEditingMember(true);
    setMemberForm({
      name: m.name,
      gender: m.gender,
      fatherId: m.fatherId || '',
      motherId: m.motherId || '',
      spouseId: m.spouseId || '',
      birthDate: m.birthDate || '',
      isAlive: m.isAlive,
      deathDate: m.deathDate || '',
      bio: m.bio || '',
      profession: m.profession || '',
      residence: m.residence || '',
      photo: m.photo || '',
      generation: m.generation,
    });
  };

  const handleDeleteMember = (id: string) => {
    const confirmDelete = window.confirm('هل أنت متأكد من رغبتك بحذف هذا العضو بالكامل من الشجرة؟ ستفقد جميع علاقاته نسبياً.');
    if (!confirmDelete) return;

    setMembers(prev => prev.filter(m => m.id !== id));
    triggerNotification('تم حذف العضو من قاعدة بيانات الشجرة بنجاح!');
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name) return;

    if (isEditingMember && editingId) {
      // Update
      setMembers(prev => 
        prev.map(m => 
          m.id === editingId 
            ? { ...m, ...memberForm } 
            : m
        )
      );
      triggerNotification('تم تحديث بيانات فرد العائلة وتزامنها بنجاح!');
    } else {
      // Create new
      const newId = `m-${Date.now()}`;
      const newMember: FamilyMember = {
        id: newId,
        ...memberForm,
      };
      setMembers(prev => [...prev, newMember]);
      triggerNotification('تمت إضافة العضو الجديد وتوسيع الشجرة بنجاح!');
    }

    handleResetMemberForm();
  };

  // 2. Site Content Handlers
  const handleSaveSiteInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setFamilyInfo(siteForm);
    triggerNotification('تم حفظ بيانات ومعلومات الصفحة الرئيسية بنجاح!');
  };

  // 3. Gallery Handlers
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.url) return;

    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: newPhoto.title,
      url: newPhoto.url,
      description: newPhoto.description,
    };

    setGalleryItems(prev => [newItem, ...prev]);
    setNewPhoto({ title: '', url: '', description: '' });
    triggerNotification('تمت إضافة الصورة الجديدة للألبوم العائلي!');
  };

  const handleDeletePhoto = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
    triggerNotification('تمت إزالة الصورة من ألبوم الصور.');
  };

  // 4. Messages Handlers
  const handleMarkAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    triggerNotification('تم حذف رسالة الزائر المحددة في لوحة التحكم.');
  };

  const males = members.filter(m => m.gender === 'male' && m.id !== editingId);
  const females = members.filter(m => m.gender === 'female' && m.id !== editingId);
  const allPotentialSpouses = members.filter(m => m.id !== editingId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title & Back story */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-art-ink font-sans">
            بوابة الإدارة والأمانة العائلية
          </h2>
          <p className="mt-1 text-sm font-semibold text-art-ink-muted">
            تأمين الشجرة العائلية والتحكم في محتويات الموقع وإضافات النسب وحفظ أرشيف المراسلات واللقطات المميزة.
          </p>
        </div>

        {/* Sync Info Notification */}
        {notif && (
          <div className="bg-art-surface text-art-brass border border-art-border px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 animate-bounce">
            <Check className="h-4 w-4" />
            <span>{notif}</span>
          </div>
        )}
      </div>

      {/* Admin Tab Switches */}
      <div className="flex border-b border-art-border mb-8 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
            activeTab === 'members'
              ? 'border-art-brass text-art-brass font-extrabold'
              : 'border-transparent text-art-ink-muted hover:text-art-ink'
          }`}
        >
          <UserPlus className="h-4 w-4" />
          إدارة الأفراد والنسب
        </button>
        <button
          onClick={() => setActiveTab('site')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
            activeTab === 'site'
              ? 'border-art-brass text-art-brass font-extrabold'
              : 'border-transparent text-art-ink-muted hover:text-art-ink'
          }`}
        >
          <Layout className="h-4 w-4" />
          نصوص وبيانات الموقع
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'border-art-brass text-art-brass font-extrabold'
              : 'border-transparent text-art-ink-muted hover:text-art-ink'
          }`}
        >
          <Image className="h-4 w-4" />
          ألبوم ومعرض الصور
        </button>
        <button
          onClick={() => {
            setActiveTab('messages');
          }}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all relative cursor-pointer ${
            activeTab === 'messages'
              ? 'border-art-brass text-art-brass font-extrabold'
              : 'border-transparent text-art-ink-muted hover:text-art-ink'
          }`}
        >
          <Mail className="h-4 w-4" />
          صندوق الرسائل الواردة
          {messages.filter(m => !m.isRead).length > 0 && (
            <span className="absolute top-1 left-2 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* TAB CONTENT 1: MEMBERS */}
      {activeTab === 'members' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Member listing and search on left side */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-black text-art-ink font-sans">
              البحث والإجراء السريع عن فروع الشجرة ({members.length})
            </h3>
            
            <div className="max-h-[600px] overflow-y-auto space-y-2 border border-art-border rounded-2xl p-3 bg-art-bg">
              {members.map(m => (
                <div 
                  key={m.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-art-border bg-art-surface/50 hover:shadow-xs transition-shadow"
                >
                  <div className="min-w-0 flex-grow pr-1.5">
                    <span className="block text-xs font-black text-art-ink truncate">{m.name}</span>
                    <span className="block text-[10px] font-bold text-art-ink-muted mt-0.5">
                      {getGenerationLabel(m.generation)} {m.profession && `| ${m.profession}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleEditMemberClick(m)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-art-surface text-art-brass transition-colors pointer-coarse:h-10 pointer-coarse:w-10 cursor-pointer"
                      title="تحرير"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(m.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-rose-50/10 text-rose-500 transition-colors pointer-coarse:h-10 pointer-coarse:w-10 cursor-pointer"
                      title="حذف الفرد"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Member Edit / Creation form on right side */}
          <div className="lg:col-span-8 bg-art-bg p-6 md:p-8 border border-art-border rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[17px] font-black text-art-ink font-sans">
                {isEditingMember ? 'تعديل بيانات فرد مسجل بالشجرة' : 'إضافة فرد غصن جديد للشجرة'}
              </h3>
              {isEditingMember && (
                <button
                  onClick={handleResetMemberForm}
                  className="text-xs font-bold text-art-ink-muted hover:text-art-ink cursor-pointer"
                >
                  إلغاء التعديل والرجوع للإضافة
                </button>
              )}
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    الاسم الكامل للفرد *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="مثال: المهندس أحمد بن محمد الغانم"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    الجنس *
                  </label>
                  <select
                    value={memberForm.gender}
                    onChange={(e) => setMemberForm({ ...memberForm, gender: e.target.value as 'male' | 'female' })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-950 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="male">ذكر (ابن / والد)</option>
                    <option value="female">أنثى (بنت / والدة / زوجة)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    الجيل السني للشجرة *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={memberForm.generation}
                    onChange={(e) => setMemberForm({ ...memberForm, generation: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-950 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    سنة التقويم لميلاده م
                  </label>
                  <input
                    type="text"
                    value={memberForm.birthDate}
                    onChange={(e) => setMemberForm({ ...memberForm, birthDate: e.target.value })}
                    placeholder="مثال: 1982"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    حالة الحياة والوجوب *
                  </label>
                  <div className="flex items-center gap-4 py-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        checked={memberForm.isAlive}
                        onChange={() => setMemberForm({ ...memberForm, isAlive: true })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      على قيد الحياة
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        checked={!memberForm.isAlive}
                        onChange={() => setMemberForm({ ...memberForm, isAlive: false })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      متوفى رحمه الله
                    </label>
                  </div>
                </div>
              </div>

              {!memberForm.isAlive && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    سنة الوفاة م (اختياري)
                  </label>
                  <input
                    type="text"
                    value={memberForm.deathDate}
                    onChange={(e) => setMemberForm({ ...memberForm, deathDate: e.target.value })}
                    placeholder="مثال: 2018"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-hidden"
                  />
                </div>
              )}

              {/* Relationship mapping selects */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  بنية النسب وعلاقات القربى
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      الوالد (الأب)
                    </label>
                    <select
                      value={memberForm.fatherId}
                      onChange={(e) => setMemberForm({ ...memberForm, fatherId: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-950 bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                      <option value="">-- لم يسجل أو مجهود --</option>
                      {males.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      الوالدة (الأم)
                    </label>
                    <select
                      value={memberForm.motherId}
                      onChange={(e) => setMemberForm({ ...memberForm, motherId: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-950 bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                      <option value="">-- لم تسجل أو مجهود --</option>
                      {females.map(mother => (
                        <option key={mother.id} value={mother.id}>{mother.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      الزوج أو شريك الدرب (لتوصيل بطاقات الربط)
                    </label>
                    <select
                      value={memberForm.spouseId}
                      onChange={(e) => setMemberForm({ ...memberForm, spouseId: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-950 bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    >
                      <option value="">-- لا يوجد أو مستقل --</option>
                      {allPotentialSpouses.map(spouse => (
                        <option key={spouse.id} value={spouse.id}>{spouse.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Extras: Residence, Bio, Careers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    المهنة أو الصفة العائلية
                  </label>
                  <input
                    type="text"
                    value={memberForm.profession}
                    onChange={(e) => setMemberForm({ ...memberForm, profession: e.target.value })}
                    placeholder="مثال: استشاري قانوني، رئيس شركة، طالب..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    مكان الإقامة الحالي أو المنبع
                  </label>
                  <input
                    type="text"
                    value={memberForm.residence}
                    onChange={(e) => setMemberForm({ ...memberForm, residence: e.target.value })}
                    placeholder="مثال: الرياض، السعودية"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  السيرة الذاتية وأبرز الأعمال (اختياري)
                </label>
                <textarea
                  rows={3}
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  placeholder="اكتب تاريخاً مصغراً أو سمات وخصائص عرف بها..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  رابط صورة الفرد الشخصية (اختياري)
                </label>
                <input
                  type="text"
                  value={memberForm.photo}
                  onChange={(e) => setMemberForm({ ...memberForm, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-hidden"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-art-brass hover:bg-art-brass/90 text-art-bg font-bold py-3.5 px-4 text-xs shadow-xs transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                {isEditingMember ? 'تحديث وتزامن الفرد' : 'إضافة الفرد للشجرة'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: SITE INFO */}
      {activeTab === 'site' && (
        <div className="bg-art-bg p-6 md:p-8 border border-art-border rounded-3xl max-w-3xl mx-auto shadow-sm">
          <h3 className="text-sm font-black text-art-ink font-sans mb-6">
            لوحة تغيير معلومات الصفحة والنصوص الأساسية للمنصة
          </h3>

          <form onSubmit={handleSaveSiteInfo} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                اسم وعمادة العائلة الرسمية *
              </label>
              <input
                type="text"
                required
                value={siteForm.familyName}
                onChange={(e) => setSiteForm({ ...siteForm, familyName: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-950 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                تعريف عائلي مختصر (يظهر في المقدمة) *
              </label>
              <textarea
                rows={3}
                required
                value={siteForm.aboutText}
                onChange={(e) => setSiteForm({ ...siteForm, aboutText: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-950 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                تاريخ النسب والجذور بالتفصيل *
              </label>
              <textarea
                rows={5}
                required
                value={siteForm.historyText}
                onChange={(e) => setSiteForm({ ...siteForm, historyText: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-950 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                بيانات التواصل للأمانة ومجلس الديوانية
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">
                    البريد المعتمد
                  </label>
                  <input
                    type="email"
                    required
                    value={siteForm.contactEmail}
                    onChange={(e) => setSiteForm({ ...siteForm, contactEmail: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-950 bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">
                    الهاتف المخصص
                  </label>
                  <input
                    type="text"
                    required
                    value={siteForm.contactPhone}
                    onChange={(e) => setSiteForm({ ...siteForm, contactPhone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-950 bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">
                  العنوان الجغرافي للمجلس الرئيسي
                </label>
                <input
                  type="text"
                  required
                  value={siteForm.contactAddress}
                  onChange={(e) => setSiteForm({ ...siteForm, contactAddress: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-950 bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 text-xs shadow-md"
            >
              <Save className="h-4 w-4" />
              حفظ جميع نصوص وتعاريف الموقع
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT 3: GALLERY */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Add photo on left */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-950 p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm h-fit">
            <h3 className="text-sm font-black text-slate-950 dark:text-white font-sans mb-4">
              إضافة لقطة حدث ومناسبة جديدة للألبوم
            </h3>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  عنوان الحدث العائلي *
                </label>
                <input
                  type="text"
                  required
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="مثال: حفل عيد الفطر المبارك لعام 2026"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  رابط الصورة المباشر (أو Unsplash) *
                </label>
                <input
                  type="text"
                  required
                  value={newPhoto.url}
                  onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-hidden"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  وصف وتفاصيل المناسبة (اختياري)
                </label>
                <textarea
                  rows={3}
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  placeholder="اكتب من لقط وتاريخ الحضور وما تم تخليده..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 text-xs shadow-md"
              >
                <PlusCircle className="h-4 w-4" />
                تثبيت المناسبة في المعرض
              </button>
            </form>
          </div>

          {/* Manage existing on right */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-black text-slate-950 dark:text-white font-sans">
              إدارة الألبوم الحالي ({galleryItems.length} مناسبات مسجلة)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto p-2 border border-slate-200/50 dark:border-slate-850 rounded-2xl">
              {galleryItems.map(item => (
                <div 
                  key={item.id}
                  className="relative rounded-2xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-3 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-750 transition-all flex flex-col justify-between"
                >
                  <div className="aspect-16/10 rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-900">
                    <img
                      src={item.url}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{item.title}</h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDeletePhoto(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash className="h-3.5 w-3.5" />
                      إزالة الصورة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-sm font-black text-slate-950 dark:text-white font-sans">
            وارد استمارات نموذج الاتصال والمقترحات ({messages.length} رسائل)
          </h3>

          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    msg.isRead 
                      ? 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800' 
                      : 'bg-emerald-500/5 border-emerald-500/30 dark:bg-emerald-500/2 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-900">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block text-sm font-black text-slate-950 dark:text-white">
                          {msg.name}
                        </span>
                        {!msg.isRead && (
                          <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-md">
                            جديد
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 block mt-1" dir="ltr">
                        {msg.email}
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[10px] font-bold text-slate-400 block">
                        تاريخ وساعة الإرسال
                      </span>
                      <span className="block text-xs font-semibold text-slate-500 mt-1">
                        {msg.date}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-slate-400">موضوع الطلب:</span>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {msg.subject}
                    </span>
                    <span className="block text-xs font-bold text-slate-400 mt-4">محتوى الرسالة:</span>
                    <p className="mt-1.5 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 leading-relaxed font-sans">
                      {msg.message}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    {!msg.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-3.5 py-1.5 text-xs font-bold hover:bg-emerald-100/70 cursor-pointer"
                      >
                        <CheckSquare className="h-4 w-4" />
                        تعليم كروية مقروءة
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Trash className="h-4 w-4" />
                      تفريغ / حذف الرسالة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-2xl bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800">
              <EyeOff className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h4 className="text-sm font-black text-slate-400 dark:text-slate-500">لا توجد أي رسائل معروضة حالياً في صندوق الوارد.</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
