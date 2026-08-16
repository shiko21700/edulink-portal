'use client';

import React from 'react';
import { Navbar } from '../src/components/Navbar';
import { AttendanceTracker } from '../src/components/AttendanceTracker';
import { AnnouncementList } from '../src/components/AnnouncementList';
import { ChatBox } from '../src/components/ChatBox';
import { AnalyticsDashboard } from '../src/components/AnalyticsDashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Жобаның баннері */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md">
          <h2 className="text-2xl font-bold">EduLink — Ата-ана мен Мұғалім порталы</h2>
          <p className="text-blue-100 text-sm mt-1 max-w-2xl">
            Сынып ішіндегі сабаққа қатысу журналын бақылау, графикалық аналитика, хабарландыру тақтасы және жеке чат жүйесі.
          </p>
        </div>

        {/* Аналитикалық секция (4-кезең) */}
        <AnalyticsDashboard />

        {/* Негізгі тор (Grid layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AttendanceTracker />
          </div>
          <div className="lg:col-span-1">
            <AnnouncementList />
          </div>
          <div className="lg:col-span-1">
            <ChatBox />
          </div>
        </div>
      </main>
    </div>
  );
}