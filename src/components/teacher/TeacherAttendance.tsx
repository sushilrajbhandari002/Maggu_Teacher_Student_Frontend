import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { CheckSquare, Clock, Check, X } from 'lucide-react';
import { User } from '../../App';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface TeacherAttendanceProps {
  user: User;
}

const mockStudents = [
  { id: 's1', name: 'Alice Johnson', rollNumber: '101', present: false },
  { id: 's2', name: 'Bob Wilson', rollNumber: '102', present: false },
  { id: 's3', name: 'Charlie Brown', rollNumber: '103', present: false },
  { id: 's4', name: 'Diana Prince', rollNumber: '104', present: false },
  { id: 's5', name: 'Ethan Hunt', rollNumber: '105', present: false }
];

const mockPendingAttendance = [
  {
    id: 'p1',
    studentName: 'Alice Johnson',
    rollNumber: '101',
    date: '2025-11-23',
    time: '08:15 AM',
    location: '27.7172°N, 85.3240°E',
    selfieUrl: 'https://via.placeholder.com/100'
  },
  {
    id: 'p2',
    studentName: 'Bob Wilson',
    rollNumber: '102',
    date: '2025-11-23',
    time: '08:20 AM',
    location: '27.7172°N, 85.3240°E',
    selfieUrl: 'https://via.placeholder.com/100'
  }
];

export function TeacherAttendance({ user }: TeacherAttendanceProps) {
  const [students, setStudents] = useState(mockStudents);
  const [pendingRequests, setPendingRequests] = useState(mockPendingAttendance);

  const toggleAttendance = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  const handleSubmitAttendance = () => {
    const presentCount = students.filter(s => s.present).length;
    toast.success(`Attendance submitted: ${presentCount}/${students.length} present`);
  };

  const handleApprove = (id: string) => {
    setPendingRequests(pendingRequests.filter(r => r.id !== id));
    toast.success('Attendance request approved');
  };

  const handleReject = (id: string) => {
    setPendingRequests(pendingRequests.filter(r => r.id !== id));
    toast.error('Attendance request rejected');
  };

  if (!user.classTeacherOf) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-600">
          You need to be a class teacher to mark attendance
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="mark" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Requests
            {pendingRequests.length > 0 && (
              <Badge className="ml-2 bg-red-500">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mark" className="mt-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center text-gray-900">
                <CheckSquare className="size-5 mr-2" />
                Mark Attendance - {user.classTeacherOf}
              </h2>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={student.present}
                      onCheckedChange={() => toggleAttendance(student.id)}
                    />
                    <div>
                      <p className="text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">Roll: {student.rollNumber}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    student.present ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {student.present ? 'Present' : 'Absent'}
                  </span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmitAttendance}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Submit Attendance
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-4">
          {pendingRequests.length === 0 ? (
            <Card className="p-6">
              <p className="text-center text-gray-600">No pending attendance requests</p>
            </Card>
          ) : (
            pendingRequests.map((request) => (
              <Card key={request.id} className="p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={request.selfieUrl}
                    alt="Student selfie"
                    className="size-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{request.studentName}</h3>
                    <p className="text-sm text-gray-600 mb-2">Roll: {request.rollNumber}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Clock className="size-4 mr-1" />
                        {request.time}
                      </span>
                      <span>{request.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Location: {request.location}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Check className="size-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="outline"
                        size="sm"
                      >
                        <X className="size-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
