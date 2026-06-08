/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FamilyMember {
  id: string;
  name: string;
  gender: 'male' | 'female';
  fatherId?: string;
  motherId?: string;
  spouseId?: string; // Secondary link
  birthDate?: string;
  isAlive: boolean;
  deathDate?: string;
  bio?: string;
  profession?: string;
  residence?: string;
  photo?: string;
  generation: number;
}

export interface FamilyInfo {
  familyName: string;
  aboutText: string;
  historyText: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}
