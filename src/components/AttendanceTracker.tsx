'use client';

import React, { useState } from 'react';
import { useEduStore } from '../store/useEduStore';
import { Calendar, Check, Clock, X } from 'lucide-react';

export const AttendanceTracker = () => {
  const { currentRole, students, attendance, toggleAttendance } = useEduStore();
  
  // Ағымдағы таңдалған дата (дефолт бойынша 08-16)
  const [selectedDate, setSelectedDate] = useState('08-16');

  const dates = ['08-12', '08-13', '08-14', '08-15', '08-16'];

  const getStatus = (studentId: string, date: string) => {
    const record = attendance.find((a) => a.studentId === studentId && a.date === date);
    return record ? record.status : null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="text-blue-600" size={18} />
            Сабаққа қатысу журналы
          </h2>
          <p className="text-[11px] text-gray-500">Күнді таңдап, оқушы мәртебесін белгілеңіз</p>
        </div>

        {/* Күндерді таңдау бөлгіші */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition ${
                selectedDate === date
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Оқушылар тізімі мен таңдалған дата бойынша мәртебесі */}
      <div className="space-y-2">
        {students.map((student) => {
          const status = getStatus(student.id, selectedDate);

          return (
            <div
              key={student.id}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50/80 transition"
            >
              <div>
                <p className="text-xs font-semibold text-gray-800">{student.name}</p>
                <p className="text-[10px] text-gray-400">Таңдалған күн: {selectedDate}</p>
              </div>

              {currentRole === 'teacher' ? (
                /* Мұғалім үшін: Мәртебені өзгерту батырмалары */
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleAttendance(student.id, selectedDate, 'present')}
                    className={`p-1.5 rounded-lg border transition ${
                      status === 'present'
                        ? 'bg-green-500 text-white border-green-500'
                        : 'border-gray-200 text-gray-400 hover:border-green-300'
                    }`}
                    title="Қатысты"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => toggleAttendance(student.id, selectedDate, 'late')}
                    className={`p-1.5 rounded-lg border transition ${
                      status === 'late'
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'border-gray-200 text-gray-400 hover:border-amber-300'
                    }`}
                    title="Кешікті"
                  >
                    <Clock size={14} />
                  </button>
                  <button
                    onClick={() => toggleAttendance(student.id, selectedDate, 'absent')}
                    className={`p-1.5 rounded-lg border transition ${
                      status === 'absent'
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-gray-200 text-gray-400 hover:border-red-300'
                    }`}
                    title="Қатыспады"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                /* Ата-ана үшін: Тек қарау индикаторы */
                <div>
                  {status === 'present' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[11px] rounded-md font-medium">
                      Қатысты
                    </span>
                  )}
                  {status === 'late' && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[11px] rounded-md font-medium">
                      Кешікті
                    </span>
                  )}
                  {status === 'absent' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-[11px] rounded-md font-medium">
                      Қатыспады
                    </span>
                  )}
                  {!status && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[11px] rounded-md">
                      Белгіленбеген
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};