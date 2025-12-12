import { Card } from '../ui/card';
import { Bell, Calendar, Activity } from 'lucide-react';
import { User } from '../../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface StudentNoticesProps {
  user: User;
}

const mockNotices = [
  {
    id: 1,
    title: 'Annual Sports Day',
    content: 'Annual Sports Day will be held on December 15, 2025. All students are required to participate.',
    date: '2025-11-20',
    type: 'event'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    content: 'Parent-Teacher meeting scheduled for November 30, 2025. Please inform your parents.',
    date: '2025-11-18',
    type: 'notice'
  },
  {
    id: 3,
    title: 'Mid-Term Examination',
    content: 'Mid-term examinations will commence from December 1, 2025. Please prepare accordingly.',
    date: '2025-11-15',
    type: 'exam'
  }
];

const mockEvents = [
  { id: 1, title: 'Science Exhibition', date: '2025-12-10', time: '10:00 AM' },
  { id: 2, title: 'Cultural Program', date: '2025-12-20', time: '2:00 PM' },
  { id: 3, title: 'Winter Break Starts', date: '2025-12-25', time: 'All Day' }
];

const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

export function StudentNotices({ user }: StudentNoticesProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="notices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="notices" className="space-y-3 mt-4">
          {mockNotices.map((notice) => (
            <Card key={notice.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  notice.type === 'event' ? 'bg-purple-100' :
                  notice.type === 'exam' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  <Bell className={`size-5 ${
                    notice.type === 'event' ? 'text-purple-600' :
                    notice.type === 'exam' ? 'text-orange-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{notice.title}</h3>
                  <p className="text-gray-600 mb-2">{notice.content}</p>
                  <p className="text-sm text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-3 mt-4">
          {mockEvents.map((event) => (
            <Card key={event.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="size-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">November 2025</h3>
              <Calendar className="size-5 text-gray-600" />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((day) => (
                <div
                  key={day}
                  className={`text-center p-2 rounded ${
                    day === 23 ? 'bg-green-600 text-white' :
                    [15, 20, 30].includes(day) ? 'bg-green-100 text-green-700' :
                    'text-gray-900'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="size-4 bg-green-600 rounded"></div>
                <span className="text-gray-600">Today</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="size-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-gray-600">Events</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
