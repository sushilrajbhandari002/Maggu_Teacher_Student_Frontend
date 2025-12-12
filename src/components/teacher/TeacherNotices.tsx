import { Card } from '../ui/card';
import { Bell, Calendar, FileText, Award, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const mockNotices = [
  {
    id: 1,
    title: 'Annual Sports Day',
    content: 'Annual Sports Day will be held on December 15, 2025. All teachers are requested to coordinate with their respective classes.',
    date: '2025-11-20',
    type: 'event'
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    content: 'Parent-Teacher meeting scheduled for November 30, 2025. Please prepare progress reports for all students.',
    date: '2025-11-18',
    type: 'notice'
  },
  {
    id: 3,
    title: 'Mid-Term Examination Schedule',
    content: 'Mid-term examinations will commence from December 1, 2025. Please ensure all syllabus is covered.',
    date: '2025-11-15',
    type: 'exam'
  }
];

const mockRoutine = [
  { day: 'Monday', periods: ['Math (10A)', 'Physics (9B)', 'Free', 'Math (8C)', 'Chemistry (10A)'] },
  { day: 'Tuesday', periods: ['Physics (10A)', 'Math (9B)', 'Free', 'Physics (8C)', 'Math (10A)'] },
  { day: 'Wednesday', periods: ['Math (10A)', 'Free', 'Physics (9B)', 'Math (8C)', 'Free'] },
  { day: 'Thursday', periods: ['Free', 'Math (9B)', 'Physics (10A)', 'Free', 'Math (8C)'] },
  { day: 'Friday', periods: ['Physics (9B)', 'Math (10A)', 'Free', 'Physics (8C)', 'Math (9B)'] }
];

const mockActivities = [
  { id: 1, title: 'Science Exhibition', date: '2025-12-10', description: 'Annual science project exhibition' },
  { id: 2, title: 'Cultural Program', date: '2025-12-20', description: 'Year-end cultural celebration' },
  { id: 3, title: 'Workshop: Digital Teaching', date: '2025-11-28', description: 'Training on modern teaching methods' }
];

export function TeacherNotices() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="notices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="routine">Routine</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="notices" className="space-y-4 mt-4">
          {mockNotices.map((notice) => (
            <Card key={notice.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  notice.type === 'event' ? 'bg-green-100' :
                  notice.type === 'exam' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  {notice.type === 'event' ? (
                    <Calendar className="size-5 text-green-600" />
                  ) : notice.type === 'exam' ? (
                    <FileText className="size-5 text-orange-600" />
                  ) : (
                    <Bell className="size-5 text-blue-600" />
                  )}
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

        <TabsContent value="routine" className="mt-4">
          <Card className="p-4">
            <h3 className="flex items-center text-gray-900 mb-4">
              <Calendar className="size-5 mr-2" />
              Weekly Class Routine
            </h3>
            <div className="space-y-3">
              {mockRoutine.map((day, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <p className="text-gray-900 mb-2">{day.day}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {day.periods.map((period, pIndex) => (
                      <div
                        key={pIndex}
                        className={`p-2 rounded text-center text-xs ${
                          period === 'Free' ? 'bg-gray-100 text-gray-500' : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4 mt-4">
          {mockActivities.map((activity) => (
            <Card key={activity.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="size-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{activity.title}</h3>
                  <p className="text-gray-600 mb-2">{activity.description}</p>
                  <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
