import { createContext, useContext } from 'react';

export interface TeacherDashboardData {
  overview: {
    stats: { label: string; value: string }[];
    schedule: { class: string; subject: string; room: string; time: string; days?: string }[];
    notices: { id: number; title: string; content: string; date: string; priority: string }[];
  };
  classes: {
    assigned: { id: number; name: string; subject: string; students: number; schedule: string }[];
    students: {
      id: number;
      name: string;
      rollNo?: string | null;
      class?: string | null;
      attendance: number;
      lastExam: number | null;
      status: 'Excellent' | 'Good' | 'Average' | 'Needs Attention';
    }[];
  };
  attendance: {
    classes: string[];
    students: { id: number; name: string; rollNo?: string | null; class?: string | null; status: 'present' | 'absent' }[];
    pendingRequests: Array<{
      id: number;
      studentName: string;
      rollNo?: string | null;
      class?: string | null;
      date: string;
      time: string;
      location: string;
      reason: string;
    }>;
    details: Array<{
      studentName: string;
      rollNo?: string | null;
      class?: string | null;
      records: { date: string; status: string }[];
      totalPresent: number;
      totalAbsent: number;
      percentage: number;
    }>;
  };
  materials: {
    classes: string[];
    subjects: string[];
    uploads: Array<{
      id: number;
      title: string;
      subject: string;
      class: string;
      type: string;
      size: string;
      uploadedByName: string;
      uploadedOn: string;
      url: string;
    }>;
  };
  exams: {
    classes: string[];
    exams: string[];
    subjects: string[];
    students: { id: number; name: string; rollNo?: string | null }[];
    existingMarks: Array<{
      exam: string;
      class: string;
      subject: string;
      year: string;
      totalMarks: number;
      students: { rollNo?: string | null; name: string; marks: number }[];
    }>;
  };
}

const TeacherDataContext = createContext<TeacherDashboardData | null>(null);

export const TeacherDataProvider = TeacherDataContext.Provider;

export function useTeacherData() {
  const context = useContext(TeacherDataContext);
  if (!context) {
    throw new Error('useTeacherData must be used within TeacherDataProvider');
  }
  return context;
}

