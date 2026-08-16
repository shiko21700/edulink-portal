'use client';

import React, { useState } from 'react';
import { useEduStore } from '../store/useEduStore';
import { Bell, Plus, Send } from 'lucide-react';

export const AnnouncementList = () => {
  const { currentRole, announcements, addAnnouncement } = useEduStore();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'general' | 'homework' | 'event'>('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addAnnouncement(title, content, category);
    setTitle('');
    setContent('');
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold text-gray-900">Хабарландырулар</h2>
        </div>
        {currentRole === 'teacher' && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg transition"
          >
            <Plus size={14} /> Жаңа жазылым
          </button>
        )}
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
          <input
            type="text"
            placeholder="Тақырыбы"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <textarea
            placeholder="Хабарландыру матні..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-sm p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-20"
          />
          <div className="flex items-center justify-between">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="text-xs p-2 rounded-lg border border-gray-300 bg-white"
            >
              <option value="general">Жалпы</option>
              <option value="homework">Үй тапсырмасы</option>
              <option value="event">Іс-шара</option>
            </select>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              <Send size={14} /> Жариялау
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {announcements.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
              <span className="text-xs text-gray-400">{item.createdAt}</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
            <p className="text-[10px] text-gray-400 pt-1">{item.authorName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};