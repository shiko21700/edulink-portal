import { create } from 'zustand';
import { Role, Student, AttendanceRecord, Announcement, Message } from '../types';

interface EduState {
  currentRole: Role;
  selectedStudentId: string;
  setRole: (role: Role) => void;
  setSelectedStudentId: (id: string) => void;
  
  students: Student[];
  attendance: AttendanceRecord[];
  announcements: Announcement[];
  messages: Message[];

  toggleAttendance: (studentId: string, date: string, status: 'present' | 'absent' | 'late') => void;
  addAnnouncement: (title: string, content: string, category: 'general' | 'homework' | 'event') => void;
  sendMessage: (studentId: string, text: string) => void;
}

export const useEduStore = create<EduState>((set) => ({
  currentRole: 'teacher',
  selectedStudentId: '1',
  setRole: (role) => set({ currentRole: role }),
  setSelectedStudentId: (id) => set({ selectedStudentId: id }),

  students: [
    { id: '1', name: 'Айша Серік', parentName: 'Гульнара Серікқызы' },
    { id: '2', name: 'Әлішер Болат', parentName: 'Нұрлан Болатұлы' },
    { id: '3', name: 'Дильназ Нұрлан', parentName: 'Алма Нұрланқызы' },
    { id: '4', name: 'Санжар Арман', parentName: 'Бауыржан Арманұлы' },
  ],

  attendance: [
    { studentId: '1', date: '08-10', status: 'present' },
    { studentId: '1', date: '08-11', status: 'present' },
    { studentId: '1', date: '08-12', status: 'late' },
    { studentId: '1', date: '08-13', status: 'present' },
    { studentId: '1', date: '08-14', status: 'present' },
    { studentId: '1', date: '08-15', status: 'absent' },
    { studentId: '1', date: '08-16', status: 'present' },
    { studentId: '2', date: '08-16', status: 'absent' },
  ],

  announcements: [
    {
      id: '1',
      title: 'Ата-аналар жиналысы',
      content: 'Жұма күні сағат 18:00-де мектепте жалпы ата-аналар жиналысы өтеді.',
      authorName: 'Ахметов А.Б. (Сынып жетекшісі)',
      createdAt: '2026-08-15',
      category: 'general',
    },
  ],

  messages: [
    {
      id: '1',
      studentId: '1',
      senderRole: 'teacher',
      text: 'Сәлеметсіз бе! Айшаның сабаққа қатысуы мен үлгерімі өте жақсы.',
      timestamp: '10:30',
    },
    {
      id: '2',
      studentId: '1',
      senderRole: 'parent',
      text: 'Сәлеметсіз бе! Үлкен рахмет, мұғалім!',
      timestamp: '10:32',
    },
    {
      id: '3',
      studentId: '2',
      senderRole: 'teacher',
      text: 'Сәлеметсіз бе, Нұрлан мырза! Әлішер бүгін сабақта болмады, себебін білуге бола ма?',
      timestamp: '11:00',
    },
  ],

  toggleAttendance: (studentId, date, status) =>
    set((state) => {
      const existingIndex = state.attendance.findIndex(
        (a) => a.studentId === studentId && a.date === date
      );
      let updated = [...state.attendance];
      if (existingIndex >= 0) {
        updated[existingIndex] = { studentId, date, status };
      } else {
        updated.push({ studentId, date, status });
      }
      return { attendance: updated };
    }),

  addAnnouncement: (title, content, category) =>
    set((state) => ({
      announcements: [
        {
          id: Date.now().toString(),
          title,
          content,
          authorName: state.currentRole === 'teacher' ? 'Ахметов А.Б. (Мұғалім)' : 'Ата-ана',
          createdAt: new Date().toISOString().split('T')[0],
          category,
        },
        ...state.announcements,
      ],
    })),

  sendMessage: (studentId, text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          studentId,
          senderRole: state.currentRole,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    })),
}));