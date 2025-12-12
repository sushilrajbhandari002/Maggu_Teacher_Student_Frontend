import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { LogOut, Home, Users, CheckSquare, Upload, FileText, UserCircle } from 'lucide-react';
import { TeacherOverviewSection } from './teacher/TeacherOverviewSection';
import { TeacherClassesSection } from './teacher/TeacherClassesSection';
import { TeacherAttendanceSection } from './teacher/TeacherAttendanceSection';
import { TeacherUploadSection } from './teacher/TeacherUploadSection';
import { TeacherExamMarksSection } from './teacher/TeacherExamMarksSection';
import { TeacherProfileSection } from './teacher/TeacherProfileSection';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

type TabType = 'overview' | 'classes' | 'attendance' | 'upload' | 'marks' | 'profile';

export function TeacherDashboard({ user, onLogout, onUpdateUser }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const navItems = [
    { id: 'overview' as TabType, icon: Home, label: 'Overview' },
    { id: 'classes' as TabType, icon: Users, label: 'Classes' },
    { id: 'attendance' as TabType, icon: CheckSquare, label: 'Attendance' },
    { id: 'upload' as TabType, icon: Upload, label: 'Materials' },
    { id: 'marks' as TabType, icon: FileText, label: 'Marks' },
    { id: 'profile' as TabType, icon: UserCircle, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white">Sushil School</h1>
            <p className="text-sm text-indigo-100">Teacher Portal</p>
          </div>
          <Button
            onClick={onLogout}
            variant="ghost"
            className="text-white hover:bg-indigo-700"
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600">Welcome back,</p>
          <h2 className="text-gray-900">{user.name}</h2>
          {user.classTeacherOf && (
            <p className="text-sm text-indigo-600">Class Teacher: {user.classTeacherOf}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {activeTab === 'overview' && <TeacherOverviewSection user={user} />}
        {activeTab === 'classes' && <TeacherClassesSection user={user} />}
        {activeTab === 'attendance' && <TeacherAttendanceSection user={user} />}
        {activeTab === 'upload' && <TeacherUploadSection user={user} />}
        {activeTab === 'marks' && <TeacherExamMarksSection user={user} />}
        {activeTab === 'profile' && <TeacherProfileSection user={user} onUpdateUser={onUpdateUser} />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`size-5 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
