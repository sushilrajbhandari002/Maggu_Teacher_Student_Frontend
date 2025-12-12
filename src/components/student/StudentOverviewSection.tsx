import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bell, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';

interface StudentOverviewSectionProps {
  user: User;
}

const mockNotices = [
  {
    id: 1,
    title: 'Annual Sports Day',
    content: 'Annual Sports Day will be held on December 20th, 2025. All students must participate.',
    date: '2025-12-10',
    type: 'Event'
  },
  {
    id: 2,
    title: 'Winter Break Announcement',
    content: 'School will remain closed from December 25th to January 5th for winter break.',
    date: '2025-12-08',
    type: 'Notice'
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting',
    content: 'Parent-Teacher meeting scheduled for December 18th. Parents are requested to attend.',
    date: '2025-12-07',
    type: 'Meeting'
  }
];

const mockEvents = [
  {
    id: 1,
    title: 'Science Exhibition',
    date: '2025-12-15',
    time: '10:00 AM',
    venue: 'School Auditorium'
  },
  {
    id: 2,
    title: 'Annual Sports Day',
    date: '2025-12-20',
    time: '8:00 AM',
    venue: 'School Ground'
  },
  {
    id: 3,
    title: 'Cultural Program',
    date: '2025-12-22',
    time: '2:00 PM',
    venue: 'School Auditorium'
  }
];

const mockRoutine = [
  { day: 'Monday', periods: [
    { time: '8:00-9:00', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '9:00-10:00', subject: 'English', teacher: 'Ms. Patel' },
    { time: '10:00-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:30', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '11:30-12:30', subject: 'Social Studies', teacher: 'Mrs. Singh' }
  ]},
  { day: 'Tuesday', periods: [
    { time: '8:00-9:00', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '9:00-10:00', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '10:00-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:30', subject: 'Hindi', teacher: 'Ms. Verma' },
    { time: '11:30-12:30', subject: 'Computer', teacher: 'Mr. Gupta' }
  ]},
  { day: 'Wednesday', periods: [
    { time: '8:00-9:00', subject: 'English', teacher: 'Ms. Patel' },
    { time: '9:00-10:00', subject: 'Physical Education', teacher: 'Mr. Yadav' },
    { time: '10:00-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:30', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '11:30-12:30', subject: 'Art', teacher: 'Mrs. Joshi' }
  ]},
  { day: 'Thursday', periods: [
    { time: '8:00-9:00', subject: 'Social Studies', teacher: 'Mrs. Singh' },
    { time: '9:00-10:00', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '10:00-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:30', subject: 'English', teacher: 'Ms. Patel' },
    { time: '11:30-12:30', subject: 'Mathematics', teacher: 'Mr. Sharma' }
  ]},
  { day: 'Friday', periods: [
    { time: '8:00-9:00', subject: 'Hindi', teacher: 'Ms. Verma' },
    { time: '9:00-10:00', subject: 'Computer', teacher: 'Mr. Gupta' },
    { time: '10:00-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:30', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '11:30-12:30', subject: 'Music', teacher: 'Mr. Thakur' }
  ]}
];

export function StudentOverviewSection({ user }: StudentOverviewSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = useState('Monday');

  return (
    <div className="space-y-4">
      {/* Notices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5 text-green-600" />
            Recent Notices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockNotices.map((notice) => (
            <div key={notice.id} className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-gray-900">{notice.title}</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                  {notice.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
              <p className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-green-600" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockEvents.map((event) => (
            <div key={event.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-gray-900 mb-1">{event.title}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-4" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" />
                  {event.time} - {event.venue}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5 text-green-600" />
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
        </CardContent>
      </Card>

      {/* Routine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5 text-green-600" />
            Class Routine
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Day selector */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {mockRoutine.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedDay === day.day
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day.day}
              </button>
            ))}
          </div>

          {/* Periods */}
          <div className="space-y-2">
            {mockRoutine
              .find((r) => r.day === selectedDay)
              ?.periods.map((period, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    period.subject === 'Break'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900">{period.subject}</p>
                      <p className="text-sm text-gray-600">{period.teacher}</p>
                    </div>
                    <span className="text-sm text-gray-500">{period.time}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
