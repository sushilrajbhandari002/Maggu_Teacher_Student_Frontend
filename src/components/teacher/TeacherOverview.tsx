import { Card } from '../ui/card';
import { Calendar as CalendarIcon, Bell, Users, BookOpen, TrendingUp } from 'lucide-react';
import { User } from '../../App';
import { Calendar } from '../ui/calendar';

interface TeacherOverviewProps {
  user: User;
}

export function TeacherOverview({ user }: TeacherOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Classes</p>
              <p className="text-2xl text-gray-900">{user.assignedClasses?.length || 3}</p>
            </div>
            <Users className="size-10 text-indigo-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-2xl text-gray-900">120</p>
            </div>
            <Users className="size-10 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Requests</p>
              <p className="text-2xl text-gray-900">5</p>
            </div>
            <Bell className="size-10 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Materials Uploaded</p>
              <p className="text-2xl text-gray-900">24</p>
            </div>
            <BookOpen className="size-10 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Calendar */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <CalendarIcon className="size-5 mr-2 text-indigo-600" />
          Calendar
        </h2>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            className="rounded-md border"
          />
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <TrendingUp className="size-5 mr-2 text-indigo-600" />
          Recent Activities
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p className="text-gray-900 text-sm">Attendance marked for Class 10-A</p>
            <p className="text-xs text-gray-500 mt-1">Today at 9:30 AM</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-900 text-sm">Study material uploaded - Mathematics Chapter 5</p>
            <p className="text-xs text-gray-500 mt-1">Yesterday at 3:45 PM</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="text-gray-900 text-sm">Exam marks entered for Mid-term Exam</p>
            <p className="text-xs text-gray-500 mt-1">2 days ago</p>
          </div>
        </div>
      </Card>

      {/* Today's Schedule */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <CalendarIcon className="size-5 mr-2 text-indigo-600" />
          Today's Schedule
        </h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
            <div>
              <p className="text-gray-900">Class 10-A - Mathematics</p>
              <p className="text-xs text-gray-600">Algebra and Equations</p>
            </div>
            <p className="text-sm text-indigo-600">8:00 - 8:45 AM</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
            <div>
              <p className="text-gray-900">Class 9-B - Mathematics</p>
              <p className="text-xs text-gray-600">Geometry Basics</p>
            </div>
            <p className="text-sm text-indigo-600">9:30 - 10:15 AM</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
            <div>
              <p className="text-gray-900">Class 10-B - Mathematics</p>
              <p className="text-xs text-gray-600">Statistics</p>
            </div>
            <p className="text-sm text-indigo-600">11:15 - 12:00 PM</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
