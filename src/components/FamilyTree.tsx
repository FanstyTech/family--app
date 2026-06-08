/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { FamilyMember } from '../types';
import { getAvatarColor, getInitials, getGenerationLabel } from '../utils';
import { 
  ZoomIn, ZoomOut, Maximize2, Search, Heart, User, 
  HelpCircle, Move, HelpCircle as HelpIcon, Sparkles, Pin
} from 'lucide-react';

interface FamilyTreeProps {
  members: FamilyMember[];
  onSelectMember: (member: FamilyMember) => void;
  highlightedMemberId?: string | null;
}

export default function FamilyTree({
  members,
  onSelectMember,
  highlightedMemberId: initialHighlightId = null,
}: FamilyTreeProps) {
  // Panning & Zoom States
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenFilter, setSelectedGenFilter] = useState<number | 'all'>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(initialHighlightId);

  useEffect(() => {
    if (initialHighlightId) {
      setHighlightedId(initialHighlightId);
      // Auto center or focus on the highlighted member
      centerOnMember(initialHighlightId);
    }
  }, [initialHighlightId]);

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.4));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Center on a specific member element
  const centerOnMember = (id: string) => {
    const el = document.getElementById(`node-card-${id}`);
    if (el && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      
      // Calculate coordinates to center this element
      const x = (containerRect.width / 2) - (elRect.width / 2) - (el.offsetLeft * zoom);
      const y = (containerRect.height / 2) - (elRect.height / 2) - (el.offsetTop * zoom);
      
      // Smooth transitions would be nice, but instant offset gets user to target reliably
      setPan({ x: x || 0, y: y || 100 });
      setHighlightedId(id);
    }
  };

  // Build high-efficiency maps
  const memberMap = new Map(members.map(m => [m.id, m]));

  // Filter members based on search query
  const filteredSearchList = members.filter(m => {
    const matchesSearch = searchQuery 
      ? m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.profession?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesGen = selectedGenFilter === 'all' 
      ? true 
      : m.generation === selectedGenFilter;

    return matchesSearch && matchesGen;
  });

  // Organize members into groups by generation for visual structuring
  const generations = [1, 2, 3, 4];

  // Helper: Get direct descendants of a coupling
  const getChildrenOfSpouses = (parentA_Id: string, parentB_Id?: string) => {
    return members.filter(m => 
      (m.fatherId === parentA_Id && m.motherId === parentB_Id) ||
      (m.fatherId === parentB_Id && m.motherId === parentA_Id) ||
      (m.fatherId === parentA_Id && !m.motherId) ||
      (m.motherId === parentA_Id && !m.fatherId)
    );
  };

  return (
    <div className="relative h-[calc(100vh-10rem)] w-full overflow-hidden bg-art-surface border border-art-border rounded-3xl flex flex-col md:flex-row shadow-xl">
      
      {/* 1. Floating Sidebar Panel (Search, Filters, Guidance) */}
      <div className="absolute top-4 right-4 z-40 w-full max-w-xs md:max-w-sm bg-art-bg/95 backdrop-blur-md rounded-2xl border border-art-border p-5 shadow-xl space-y-4 max-h-[85%] overflow-y-auto">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-art-surface text-art-brass shrink-0 border border-art-border">
            <Search className="h-4 w-4" />
          </span>
          <h3 className="text-sm font-black text-art-ink font-sans">
            البحث والتجول السريع في النسب
          </h3>
        </div>

        {/* Input Text Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن فرد بالاسم، المهنة..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightedId(null);
            }}
            className="w-full rounded-xl border border-art-border px-3 py-2.5 text-xs text-art-ink bg-art-surface focus:bg-art-bg focus:ring-2 focus:ring-art-gold/10 focus:border-art-brass outline-hidden transition-all placeholder:text-art-ink-muted"
          />
        </div>

        {/* Generation Quick Filter Tabs */}
        <div>
          <span className="block text-[11px] font-bold text-art-ink-muted mb-2">أو تصفية حسب الأجيال السنية:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedGenFilter('all')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all border ${
                selectedGenFilter === 'all'
                  ? 'bg-art-brass text-art-bg border-art-brass shadow-xs'
                  : 'bg-art-surface text-art-ink hover:bg-art-border border-art-border'
              }`}
            >
              الكل
            </button>
            {generations.map(gen => (
              <button
                key={gen}
                onClick={() => setSelectedGenFilter(gen)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all border ${
                  selectedGenFilter === gen
                    ? 'bg-art-brass text-art-bg border-art-brass shadow-xs'
                    : 'bg-art-surface text-art-ink hover:bg-art-border border-art-border'
                }`}
              >
                الجيل {gen === 1 ? 'الأول' : gen === 2 ? 'الثاني' : gen === 3 ? 'الثالث' : 'الرابع'}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results List */}
        <div className="space-y-1.5 pt-2 border-t border-art-border">
          <span className="block text-[11px] font-bold text-art-ink-muted">
            نتائج البحث والتصفية ({filteredSearchList.length}):
          </span>

          {filteredSearchList.length > 0 ? (
            <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
              {filteredSearchList.map(member => (
                <button
                   key={member.id}
                   onClick={() => centerOnMember(member.id)}
                   className={`flex w-full items-center gap-3 text-right p-2 rounded-xl transition-all border ${
                     highlightedId === member.id
                       ? 'border-art-brass bg-art-brass/10 text-art-brass font-bold'
                       : 'border-transparent text-art-ink hover:bg-art-surface'
                   }`}
                >
                  <div className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black bg-gradient-to-tr ${getAvatarColor(member.gender, member.name)}`}>
                    {getInitials(member.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-bold truncate">{member.name}</span>
                    <span className="block text-[10px] font-semibold text-art-ink-muted truncate">
                      {member.profession || getGenerationLabel(member.generation)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <span className="block text-xs text-art-ink-muted italic py-3 text-center">لا توجد نتائج مطابقة، جرب كتابة أخرى.</span>
          )}
        </div>

        {/* Small Drag/Zoom Guide */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-semibold text-art-ink-muted bg-art-surface p-2.5 rounded-lg border border-art-border">
          <Move className="h-3 w-3 shrink-0 text-art-brass" />
          <span>اسحب واحجز الشجرة بالماوس أو الجوال للمشاهدة كاملة.</span>
        </div>
      </div>

      {/* 2. Floating Action Controls for Panning & Zooming */}
      <div className="absolute bottom-6 left-6 z-40 flex items-center gap-2 bg-art-bg/95 backdrop-blur-md rounded-xl border border-art-border p-2 shadow-xl">
        <button
          onClick={handleZoomIn}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-art-surface text-art-ink transition-colors pointer-coarse:h-11 pointer-coarse:w-11"
          title="تكبير شاشة الشجرة"
          aria-label="تكبير"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-art-surface text-art-ink transition-colors pointer-coarse:h-11 pointer-coarse:w-11"
          title="تصغير شاشة الشجرة"
          aria-label="تصغير"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <div className="h-5 w-px bg-art-border" />
        <button
          onClick={handleResetZoom}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold font-sans text-art-ink hover:bg-art-surface rounded-lg transition-colors"
          title="ترتيب ملخص الشجرة الافتراضي"
        >
          <Maximize2 className="h-4 w-4 text-art-brass" />
          <span>إعادة ضبط</span>
        </button>
      </div>

      {/* 3. Drag-and-Drop Canvas Workspace */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-1 h-full select-none pan-container relative overflow-hidden focus:outline-hidden bg-[#F5F2EA]"
        style={{
          backgroundImage: 'radial-gradient(rgba(140, 115, 66, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div
          className="absolute origin-center transition-transform duration-75 select-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            top: '20%',
            left: '30%',
          }}
        >
          {/* Generations Tree layout - visual boxes linked by traditional family connectors */}
          <div className="flex flex-col gap-24 items-center min-w-[2000px] py-12 p-36">
            
            {generations.map((genNum) => {
              // Extract members of this generation
              const genMembers = members.filter(m => m.generation === genNum);
              // Filter out spouses from the primary list, as they will be rendered paired side-by-side with their spouse!
              const primaryMembersInGen = genMembers.filter(m => {
                // Keep if they are NOT a spouse pointing to some other node as spouseId
                return !m.spouseId;
              });

              return (
                <div key={genNum} className="relative flex flex-col items-center">
                  {/* Generation Title Watermark badge */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-art-brass text-art-bg border border-art-gold text-[11px] font-black tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    {getGenerationLabel(genNum)}
                  </div>

                  {/* Render Members in this Generation Side-by-Side */}
                  <div className="flex flex-wrap items-start justify-center gap-16 min-h-[140px] pt-4">
                    {primaryMembersInGen.map((member) => {
                      // Find if this primary member has a spouse in the tree
                      const spouse = members.find(m => m.spouseId === member.id || member.spouseId === m.id);
                      const hasSpouse = !!spouse;
                      
                      // Highlight matching search cards
                      const isSearched = searchQuery 
                      ? member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (spouse && spouse.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      : false;

                      const isNodeHighlighted = highlightedId === member.id || (spouse && highlightedId === spouse.id);

                      return (
                        <div 
                          key={member.id} 
                          className="flex flex-col items-center"
                        >
                          {/* Main Couple Card box - holds parent + spouse together */}
                          <div className={`flex items-center gap-1 p-2 rounded-3xl bg-art-bg/95 border transition-all ${
                            isNodeHighlighted 
                              ? 'border-art-brass ring-4 ring-art-gold/20 shadow-lg'
                              : isSearched 
                                ? 'border-art-gold hover:border-art-gold/80'
                                : 'border-art-border hover:border-art-brass'
                          }`}>
                            
                            {/* Husband/Wife Primary Node */}
                            <div 
                              id={`node-card-${member.id}`}
                              onClick={() => {
                                onSelectMember(member);
                                setHighlightedId(member.id);
                              }}
                              className={`flex items-center gap-3 w-56 p-3 rounded-2xl cursor-pointer transition-all bg-art-surface border ${
                                highlightedId === member.id 
                                  ? 'border-art-brass bg-art-surface-gold/10' 
                                  : 'border-art-border hover:bg-art-surface/50'
                              } relative`}
                            >
                              <div className={`h-11 w-11 rounded-xl shrink-0 flex items-center justify-center text-xs font-black bg-gradient-to-tr ${getAvatarColor(member.gender, member.name)} shadow-sm`}>
                                {getInitials(member.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-black text-art-ink truncate leading-tight">{member.name}</span>
                                {member.birthDate && (
                                  <span className="block text-[10px] font-bold text-art-ink-muted mt-1 leading-none">
                                    {member.isAlive ? `ولد ${member.birthDate} م` : `توفي (${member.birthDate} م)`}
                                  </span>
                                )}
                                {member.profession && (
                                  <span className="block text-[9px] font-semibold text-art-brass mt-1 truncate">
                                    {member.profession}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Spousal Connection Heart symbol in-between if spouse exists */}
                            {spouse && (
                              <div className="h-6 w-6 rounded-full bg-art-bg flex items-center justify-center shrink-0 border border-art-border z-10 mx-[-4px]">
                                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                              </div>
                            )}

                            {/* Spouse Node if exists */}
                            {spouse && (
                              <div 
                                id={`node-card-${spouse.id}`}
                                onClick={() => {
                                  onSelectMember(spouse);
                                  setHighlightedId(spouse.id);
                                }}
                                className={`flex items-center gap-3 w-50 p-3 rounded-2xl cursor-pointer transition-all bg-art-surface border ${
                                  highlightedId === spouse.id 
                                    ? 'border-art-brass bg-art-surface-gold/10' 
                                    : 'border-art-border hover:bg-art-surface/50'
                                }`}
                              >
                                <div className={`h-10 w-10 rounded-xl shrink-0 flex items-center justify-center text-xs font-black bg-gradient-to-tr ${getAvatarColor(spouse.gender, spouse.name)} shadow-md`}>
                                  {getInitials(spouse.name)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="block text-xs font-black text-art-ink truncate leading-tight">{spouse.name}</span>
                                  {spouse.birthDate && (
                                    <span className="block text-[9px] font-bold text-art-ink-muted mt-1 leading-none">
                                      {spouse.birthDate} م
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Connection point from parent to descending Generation arrow indicators */}
                          {getDescendantChildrenCount(member.id, spouse?.id) > 0 && (
                            <div className="h-12 w-0.5 bg-art-brass/60 relative">
                              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-art-brass" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );

  function getDescendantChildrenCount(parentA_Id: string, parentB_Id?: string) {
    return getChildrenOfSpouses(parentA_Id, parentB_Id).length;
  }
}
