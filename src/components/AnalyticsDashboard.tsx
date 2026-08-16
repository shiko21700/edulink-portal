'use client';

import React from 'react';
import { useEduStore } from '../store/useEduStore';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { TrendingUp, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { students, attendance, selectedStudentId, setSelectedStudentId } = useEduStore();

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const studentRecords = attendance.filter((a) => a.studentId === selectedStudent.id);

  const presentCount = studentRecords.filter((r) => r.status === 'present').length;
  const lateCount = studentRecords.filter((r) => r.status === 'late').length;
  const absentCount = studentRecords.filter((r) => r.status === 'absent').length;

  const total = studentRecords.length || 1;
  const attendanceRate = Math.round(((presentCount + lateCount * 0.5) / total) * 100);

  const chartData = [
    { name: 'Қатысты', count: presentCount, color: '#22c55e' },
    { name: 'Кешікті', count: lateCount, color: '#f59e0b' },
    { name: 'Қатыспады', count: absentCount, color: '#ef4444' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={20} />
            Қатысу аналитикасы
          </h2>
          <p className="text-xs text-gray-500">Оқушының сабаққа қатысу көрсеткіші мен статистикасы</p>
        </div>

        {/* Оқушыны таңдау */}
        <select
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="text-xs font-semibold p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Көрсеткіштер карточкасы */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-600 font-medium">Қатысу пайызы</p>
          <p className="text-2xl font-black text-blue-700 mt-1">{attendanceRate}%</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-green-600 font-medium">Қатысқан күндер</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{presentCount}</p>
          </div>
          <CheckCircle className="text-green-500" size={24} />
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-600 font-medium">Кешіккендер</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">{lateCount}</p>
          </div>
          <AlertTriangle className="text-amber-500" size={24} />
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-red-600 font-medium">Себепсіз қалған</p>
            <p className="text-2xl font-bold text-red-700 mt-1">{absentCount}</p>
          </div>
          <XCircle className="text-red-500" size={24} />
        </div>
      </div>

      {/* Диаграмма */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4b5563' }} />
            <Tooltip />
            <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};