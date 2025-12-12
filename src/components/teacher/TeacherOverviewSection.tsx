import { useState } from 'react';
import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bell, Calendar as CalendarIcon, Users, CheckSquare, FileText } from 'lucide-react';
import { Calendar } from '../ui/calendar';

interface TeacherOverviewSectionProps {
  user: User;
}

const mockNotices = [
  {
    id: 1,
    title: 'Staff Meeting - December 15th',
    content: 'Monthly staff meeting scheduled at 3 PM in the conference room.',
    date: '2025-12-10',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Exam Schedule Released',
    content: 'Half yearly examination schedule has been released. Please check the notice board.',
    date: '2025-12-09',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'Professional Development Workshop',
    content: 'Workshop on modern teaching methodologies on December 20th.',
    date: '2025-12-08',
    priority: 'Medium'
  }
];

const mockStats = [
  { label: 'Total Classes', value: '5', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Total Students', value: '142', icon: Users, color: 'bg-green-50 text-green-600' },
  { label: 'Pending Attendance', value: '3', icon: CheckSquare, color: 'bg-orange-50 text-orange-600' },
  { label: 'Materials Uploaded', value: '28', icon: FileText, color: 'bg-purple-50 text-purple-600' }
];

const mockUpcomingClasses = [
  { time: '8:00 AM', class: 'Class 10-A', subject: 'Mathematics', room: 'Room 201' },
  { time: '9:00 AM', class: 'Class 10-B', subject: 'Mathematics', room: 'Room 202' },
  { time: '10:30 AM', class: 'Class 9-A', subject: 'Mathematics', room: 'Room 201' },
  { time: '11:30 AM', class: 'Class 9-B', subject: 'Mathematics', room: 'Room 203' }
];

export function TeacherOverviewSection({ user }: TeacherOverviewSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {mockStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-indigo-600" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockUpcomingClasses.map((cls, idx) => (
            <div key={idx} className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-indigo-600">{cls.time}</span>
                <span className="text-sm px-2 py-1 bg-white rounded text-gray-600">
                  {cls.room}
                </span>
              </div>
              <p className="text-gray-900">{cls.subject}</p>
              <p className="text-sm text-gray-600">{cls.class}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5 text-indigo-600" />
            Recent Notices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockNotices.map((notice) => (
            <div key={notice.id} className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-gray-900">{notice.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  notice.priority === 'High' 
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {notice.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
              <p className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-indigo-600" />
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border w-full"
          />
          
          {/* Important Dates */}
          <div className="mt-4 space-y-2">
            <h3 className="text-gray-900">Upcoming Important Dates</h3>
            <div className="space-y-2">
              <div className="p-2 bg-red-50 rounded border border-red-200 text-sm">
                <p className="text-red-700">Dec 15 - Staff Meeting</p>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200 text-sm">
                <p className="text-blue-700">Dec 18 - Parent-Teacher Meeting</p>
              </div>
              <div className="p-2 bg-green-50 rounded border border-green-200 text-sm">
                <p className="text-green-700">Dec 20 - Professional Development Workshop</p>
              </div>
              <div className="p-2 bg-orange-50 rounded border border-orange-200 text-sm">
                <p className="text-orange-700">Dec 25 - Winter Break Starts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
