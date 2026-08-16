'use client';

import React from 'react';
import { useEduStore } from '../store/useEduStore';
import { GraduationCap, UserCheck, Users } from 'lucide-react';

export const Navbar = () => {
  const { currentRole, setRole } = useEduStore();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 leading-none">EduLink</h1>
            <p className="text-xs text-gray-500 mt-0.5">Parent & Teacher Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setRole('teacher')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentRole === 'teacher'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserCheck size={16} /> Мұғалім
          </button>
          <button
            onClick={() => setRole('parent')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentRole === 'parent'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users size={16} /> Ата-ана
          </button>
        </div>
      </div>
    </header>
  );
};