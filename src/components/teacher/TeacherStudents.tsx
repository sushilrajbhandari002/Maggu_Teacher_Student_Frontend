import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Users, Search, Calendar } from 'lucide-react';
import { User } from '../../App';

interface TeacherStudentsProps {
  user: User;
}

const mockStudentDetails = [
  {
    id: 's1',
    name: 'Alice Johnson',
    rollNumber: '101',
    class: 'Class 10A',
    attendance: '92%',
    attendanceHistory: [
      { date: '2025-11-22', status: 'Present' },
      { date: '2025-11-21', status: 'Present' },
      { date: '2025-11-20', status: 'Absent' },
      { date: '2025-11-19', status: 'Present' },
      { date: '2025-11-18', status: 'Present' }
    ]
  },
  {
    id: 's2',
    name: 'Bob Wilson',
    rollNumber: '102',
    class: 'Class 10A',
    attendance: '88%',
    attendanceHistory: [
      { date: '2025-11-22', status: 'Present' },
      { date: '2025-11-21', status: 'Absent' },
      { date: '2025-11-20', status: 'Present' },
      { date: '2025-11-19', status: 'Present' },
      { date: '2025-11-18', status: 'Absent' }
    ]
  }
];

export function TeacherStudents({ user }: TeacherStudentsProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudentDetails[0] | null>(null);

  return (
    <Card className="p-6">
      <h2 className="flex items-center text-gray-900 mb-4">
        <Users className="size-5 mr-2" />
        Student Details & Attendance History
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {user.assignedClasses?.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student..."
              className="pl-10"
            />
          </div>
        </div>

        {selectedClass && (
          <div className="space-y-3">
            {mockStudentDetails.map((student) => (
              <div
                key={student.id}
                className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {student.attendance}
                  </span>
                </div>

                {selectedStudent?.id === student.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="flex items-center text-gray-900 mb-3">
                      <Calendar className="size-4 mr-2" />
                      Recent Attendance
                    </h4>
                    <div className="space-y-2">
                      {student.attendanceHistory.map((record, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{record.date}</span>
                          <span className={`px-2 py-1 rounded ${
                            record.status === 'Present' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
