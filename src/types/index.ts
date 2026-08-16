export type Role = 'teacher' | 'parent';

export interface Student {
  id: string;
  name: string;
  parentName: string;
  avatar?: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  category: 'general' | 'homework' | 'event';
}

export interface Message {
  id: string;
  studentId: string; // Қай оқушының чаты екенін анықтау үшін
  senderRole: Role;
  text: string;
  timestamp: string;
}