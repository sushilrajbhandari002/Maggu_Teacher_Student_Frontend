import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Award, Save } from 'lucide-react';
import { User } from '../../App';
import { toast } from 'sonner@2.0.3';

interface TeacherMarksProps {
  user: User;
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
const exams = ['First Terminal', 'Mid Terminal', 'Final Terminal'];

const mockStudents = [
  { id: 's1', name: 'Alice Johnson', rollNumber: '101', marks: '' },
  { id: 's2', name: 'Bob Wilson', rollNumber: '102', marks: '' },
  { id: 's3', name: 'Charlie Brown', rollNumber: '103', marks: '' },
  { id: 's4', name: 'Diana Prince', rollNumber: '104', marks: '' },
  { id: 's5', name: 'Ethan Hunt', rollNumber: '105', marks: '' }
];

export function TeacherMarks({ user }: TeacherMarksProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [students, setStudents] = useState(mockStudents);

  const handleMarksChange = (id: string, value: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, marks: value } : s));
  };

  const handleSubmit = () => {
    if (!selectedClass || !selectedSubject || !selectedExam) {
      toast.error('Please select class, subject, and exam');
      return;
    }

    const filledMarks = students.filter(s => s.marks !== '').length;
    if (filledMarks === 0) {
      toast.error('Please enter marks for at least one student');
      return;
    }

    toast.success(`Marks submitted for ${filledMarks} students`);
    setStudents(mockStudents);
  };

  return (
    <Card className="p-6">
      <h2 className="flex items-center text-gray-900 mb-4">
        <Award className="size-5 mr-2" />
        Enter Exam Marks
      </h2>

      <div className="space-y-4">
        <div className="grid gap-3">
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

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger>
              <SelectValue placeholder="Select Exam" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((exam) => (
                <SelectItem key={exam} value={exam}>{exam}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedClass && selectedSubject && selectedExam && (
          <>
            <div className="space-y-3 mt-4">
              <div className="grid grid-cols-3 gap-3 p-3 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-700">Roll No</span>
                <span className="text-sm text-gray-700">Name</span>
                <span className="text-sm text-gray-700 text-right">Marks (100)</span>
              </div>
              {students.map((student) => (
                <div key={student.id} className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg items-center">
                  <span className="text-sm text-gray-900">{student.rollNumber}</span>
                  <span className="text-sm text-gray-900">{student.name}</span>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={student.marks}
                    onChange={(e) => handleMarksChange(student.id, e.target.value)}
                    placeholder="0-100"
                    className="text-right"
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              <Save className="size-4 mr-2" />
              Submit Marks
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
