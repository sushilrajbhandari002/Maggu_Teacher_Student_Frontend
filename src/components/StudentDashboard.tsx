import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { LogOut, Home, CheckSquare, BookOpen, FolderOpen, UserCircle } from 'lucide-react';
import { StudentOverviewSection } from './student/StudentOverviewSection';
import { StudentAttendanceSection } from './student/StudentAttendanceSection';
import { StudentAcademicsSection } from './student/StudentAcademicsSection';
import { StudentMaterialsSection } from './student/StudentMaterialsSection';
import { StudentProfileSection } from './student/StudentProfileSection';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

type TabType = 'overview' | 'attendance' | 'academics' | 'materials' | 'profile';

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const navItems = [
    { id: 'overview' as TabType, icon: Home, label: 'Overview' },
    { id: 'attendance' as TabType, icon: CheckSquare, label: 'Attendance' },
    { id: 'academics' as TabType, icon: BookOpen, label: 'Academics' },
    { id: 'materials' as TabType, icon: FolderOpen, label: 'Materials' },
    { id: 'profile' as TabType, icon: UserCircle, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white">Sushil School</h1>
            <p className="text-sm text-green-100">Student Portal</p>
          </div>
          <Button
            onClick={onLogout}
            variant="ghost"
            className="text-white hover:bg-green-700"
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600">Welcome,</p>
          <h2 className="text-gray-900">{user.name}</h2>
          <p className="text-sm text-green-600">{user.class} - Roll No: {user.rollNumber}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {activeTab === 'overview' && <StudentOverviewSection user={user} />}
        {activeTab === 'attendance' && <StudentAttendanceSection user={user} />}
        {activeTab === 'academics' && <StudentAcademicsSection user={user} />}
        {activeTab === 'materials' && <StudentMaterialsSection user={user} />}
        {activeTab === 'profile' && <StudentProfileSection user={user} />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 flex-1 transition-colors ${
                  isActive
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`size-6 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
