'use client';

import React, { useState } from 'react';
import { useEduStore } from '../store/useEduStore';
import { Send, User, Clock, AlertCircle } from 'lucide-react';

export const ChatBox = () => {
  const { currentRole, students, selectedStudentId, messages, sendMessage } = useEduStore();
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const filteredMessages = messages.filter((m) => m.studentId === currentStudent.id);

  // Жұмыс уақытын тексеру (08:00 - 18:00)
  const checkIsWorkingHours = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 8 && hours < 18;
  };

  const isWorkingHours = checkIsWorkingHours();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!checkIsWorkingHours()) {
      setErrorMsg('Чат тек жұмыс уақытында (08:00 - 18:00) қолжетімді!');
      return;
    }

    if (!input.trim()) return;

    sendMessage(currentStudent.id, input);
    setInput('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col h-[420px]">
      {/* Чат заголовогы */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <User size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              {currentRole === 'teacher' ? currentStudent.parentName : 'Ахметов А.Б. (Сынып жетекшісі)'}
            </h2>
            <p className="text-[11px] text-gray-500">
              Оқушы: <span className="font-medium text-gray-700">{currentStudent.name}</span>
            </p>
          </div>
        </div>

        {/* Жұмыс уақыты индикаторы */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
            isWorkingHours
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <Clock size={12} />
          <span>{isWorkingHours ? '08:00 - 18:00 (Ашық)' : 'Жұмыс уақыты аяқталды'}</span>
        </div>
      </div>

      {/* Хабарламалар тізімі */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {filteredMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-gray-400">
            Сөйлесу тарихы бос. Алғашқы хабарламаны жазыңыз.
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isMe = msg.senderRole === currentRole;

            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Ескерту хабарламасы (егер сағат 18:00-ден асқан болса) */}
      {!isWorkingHours && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-amber-800">
          <AlertCircle size={14} className="shrink-0 text-amber-600" />
          <span>Чат жабық. Хабарламаларды тек жұмыс уақытында (08:00 - 18:00) жібере аласыз.</span>
        </div>
      )}

      {errorMsg && (
        <div className="text-[11px] text-red-600 font-medium px-1">{errorMsg}</div>
      )}

      {/* Енгізу формасы */}
      <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-gray-100">
        <input
          type="text"
          disabled={!isWorkingHours}
          placeholder={
            !isWorkingHours
              ? 'Чат 18:00-де жабылды (08:00-де ашылады)...'
              : currentRole === 'teacher'
              ? `${currentStudent.parentName} мырзаға/ханымға жазу...`
              : 'Сынып жетекшісіне жазу...'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        />
        <button
          type="submit"
          disabled={!isWorkingHours}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};