import { Card } from '../ui/card';
import { Calendar as CalendarIcon, Bell, Calendar as CalendarEvent, Clock } from 'lucide-react';
import { User } from '../../App';
import { Calendar } from '../ui/calendar';

interface StudentOverviewProps {
  user: User;
}

// Mock data
const notices = [
  {
    id: 1,
    title: 'School Annual Day',
    description: 'Annual day celebration on December 25th. All students must attend.',
    date: '2025-12-10',
    type: 'important'
  },
  {
    id: 2,
    title: 'Mid-term Exam Schedule',
    description: 'Mid-term exams will start from January 5th, 2026.',
    date: '2025-12-08',
    type: 'exam'
  },
  {
    id: 3,
    title: 'Library Books Return',
    description: 'Return all library books by December 20th.',
    date: '2025-12-12',
    type: 'general'
  }
];

const events = [
  {
    id: 1,
    title: 'Science Exhibition',
    date: '2025-12-18',
    time: '10:00 AM',
    location: 'School Auditorium'
  },
  {
    id: 2,
    title: 'Sports Day',
    date: '2025-12-22',
    time: '8:00 AM',
    location: 'School Ground'
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting',
    date: '2025-12-15',
    time: '2:00 PM',
    location: 'Respective Classrooms'
  }
];

const routine = [
  { day: 'Monday', periods: [
    { time: '8:00-8:45', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '8:45-9:30', subject: 'English', teacher: 'Ms. Patel' },
    { time: '9:30-10:15', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '10:15-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:15', subject: 'Social Studies', teacher: 'Mrs. Singh' },
    { time: '11:15-12:00', subject: 'Hindi', teacher: 'Mr. Verma' }
  ]},
  { day: 'Tuesday', periods: [
    { time: '8:00-8:45', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '8:45-9:30', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '9:30-10:15', subject: 'English', teacher: 'Ms. Patel' },
    { time: '10:15-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:15', subject: 'Computer', teacher: 'Mr. Joshi' },
    { time: '11:15-12:00', subject: 'Physical Education', teacher: 'Coach Rao' }
  ]},
  // Add more days as needed
];

export function StudentOverview({ user }: StudentOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Notices */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <Bell className="size-5 mr-2 text-green-600" />
          Notices
        </h2>
        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`p-3 rounded-lg border-l-4 ${
                notice.type === 'important'
                  ? 'bg-red-50 border-red-500'
                  : notice.type === 'exam'
                  ? 'bg-orange-50 border-orange-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <h3 className="text-gray-900 mb-1">{notice.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{notice.description}</p>
              <p className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Events */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <CalendarEvent className="size-5 mr-2 text-green-600" />
          Upcoming Events
        </h2>
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="p-3 bg-green-50 rounded-lg">
              <h3 className="text-gray-900 mb-1">{event.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="size-4" />
                  {new Date(event.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {event.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.location}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Calendar */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <CalendarIcon className="size-5 mr-2 text-green-600" />
          Calendar
        </h2>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            className="rounded-md border"
          />
        </div>
      </Card>

      {/* Class Routine */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <Clock className="size-5 mr-2 text-green-600" />
          Class Routine
        </h2>
        <div className="space-y-4">
          {routine.map((day) => (
            <div key={day.day} className="border rounded-lg overflow-hidden">
              <div className="bg-green-600 text-white p-2">
                <h3>{day.day}</h3>
              </div>
              <div className="divide-y">
                {day.periods.map((period, idx) => (
                  <div
                    key={idx}
                    className={`p-3 flex justify-between items-center ${
                      period.subject === 'Break' ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-gray-900">{period.subject}</p>
                      <p className="text-xs text-gray-500">{period.teacher}</p>
                    </div>
                    <p className="text-sm text-gray-600">{period.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
