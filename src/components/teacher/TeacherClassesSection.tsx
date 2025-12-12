import { useState } from 'react';
import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Users, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface TeacherClassesSectionProps {
  user: User;
}

const mockAssignedClasses = [
  {
    id: 1,
    name: 'Class 10-A',
    subject: 'Mathematics',
    students: 35,
    schedule: 'Mon, Wed, Fri - 8:00 AM'
  },
  {
    id: 2,
    name: 'Class 10-B',
    subject: 'Mathematics',
    students: 32,
    schedule: 'Mon, Wed, Fri - 9:00 AM'
  },
  {
    id: 3,
    name: 'Class 9-A',
    subject: 'Mathematics',
    students: 38,
    schedule: 'Tue, Thu - 10:30 AM'
  },
  {
    id: 4,
    name: 'Class 9-B',
    subject: 'Mathematics',
    students: 37,
    schedule: 'Tue, Thu - 11:30 AM'
  }
];

const mockStudents = [
  {
    id: 1,
    name: 'Aditya Sharma',
    rollNo: '101',
    class: 'Class 10-A',
    attendance: 95,
    lastExam: 92,
    status: 'Excellent'
  },
  {
    id: 2,
    name: 'Priya Patel',
    rollNo: '102',
    class: 'Class 10-A',
    attendance: 98,
    lastExam: 88,
    status: 'Good'
  },
  {
    id: 3,
    name: 'Rahul Kumar',
    rollNo: '103',
    class: 'Class 10-A',
    attendance: 88,
    lastExam: 75,
    status: 'Average'
  },
  {
    id: 4,
    name: 'Sneha Singh',
    rollNo: '104',
    class: 'Class 10-A',
    attendance: 92,
    lastExam: 85,
    status: 'Good'
  },
  {
    id: 5,
    name: 'Arjun Verma',
    rollNo: '105',
    class: 'Class 10-A',
    attendance: 85,
    lastExam: 70,
    status: 'Needs Attention'
  },
  {
    id: 6,
    name: 'Ananya Gupta',
    rollNo: '106',
    class: 'Class 10-A',
    attendance: 100,
    lastExam: 95,
    status: 'Excellent'
  },
  {
    id: 7,
    name: 'Vikram Joshi',
    rollNo: '107',
    class: 'Class 10-A',
    attendance: 90,
    lastExam: 80,
    status: 'Good'
  },
  {
    id: 8,
    name: 'Kavya Thakur',
    rollNo: '108',
    class: 'Class 10-A',
    attendance: 94,
    lastExam: 87,
    status: 'Good'
  }
];

export function TeacherClassesSection({ user }: TeacherClassesSectionProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [view, setView] = useState<'classes' | 'students'>('classes');

  const filteredStudents = selectedClass 
    ? mockStudents.filter(s => s.class === selectedClass)
    : mockStudents;

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={view === 'classes' ? 'default' : 'outline'}
          onClick={() => setView('classes')}
          className={view === 'classes' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          <BookOpen className="size-4 mr-2" />
          Assigned Classes
        </Button>
        <Button
          variant={view === 'students' ? 'default' : 'outline'}
          onClick={() => setView('students')}
          className={view === 'students' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          <Users className="size-4 mr-2" />
          Students
        </Button>
      </div>

      {/* Assigned Classes View */}
      {view === 'classes' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-5 text-indigo-600" />
              My Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAssignedClasses.map((cls) => (
              <div key={cls.id} className="p-4 bg-white rounded-lg border hover:border-indigo-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{cls.name}</h3>
                    <p className="text-sm text-indigo-600 mb-2">{cls.subject}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="size-4" />
                        {cls.students} Students
                      </span>
                      <span>{cls.schedule}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedClass(cls.name);
                      setView('students');
                    }}
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Students View */}
      {view === 'students' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5 text-indigo-600" />
                Students
                {selectedClass && (
                  <span className="text-sm px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                    {selectedClass}
                  </span>
                )}
              </CardTitle>
              {selectedClass && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedClass(null)}
                >
                  Show All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Class Filter */}
            {!selectedClass && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {mockAssignedClasses.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClass(cls.name)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            )}

            {/* Students List */}
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <div key={student.id} className="p-4 bg-white rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">
                        Roll No: {student.rollNo} • {student.class}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      student.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                      student.status === 'Good' ? 'bg-blue-100 text-blue-700' :
                      student.status === 'Average' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-green-50 rounded text-center">
                      <p className="text-xs text-gray-600">Attendance</p>
                      <p className="text-green-600">{student.attendance}%</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-center">
                      <p className="text-xs text-gray-600">Last Exam</p>
                      <p className="text-blue-600">{student.lastExam}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
