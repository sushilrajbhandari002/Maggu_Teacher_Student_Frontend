import { Card } from '../ui/card';
import { Users, BookOpen } from 'lucide-react';
import { User } from '../../App';

interface TeacherClassesProps {
  user: User;
}

const mockClassData = {
  'Class 10A': { students: 35, subjects: ['Mathematics', 'Physics', 'Chemistry'] },
  'Class 9B': { students: 32, subjects: ['Mathematics', 'Physics'] },
  'Class 8C': { students: 30, subjects: ['Mathematics'] }
};

export function TeacherClasses({ user }: TeacherClassesProps) {
  return (
    <Card className="p-6">
      <h2 className="flex items-center text-gray-900 mb-4">
        <Users className="size-5 mr-2" />
        Assigned Classes & Students
      </h2>
      <div className="space-y-3">
        {user.assignedClasses?.map((className) => {
          const classInfo = mockClassData[className as keyof typeof mockClassData];
          return (
            <div key={className} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-900">{className}</h3>
                {user.classTeacherOf === className && (
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                    Class Teacher
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-2">
                Total Students: {classInfo?.students || 0}
              </p>
              <div className="flex flex-wrap gap-2">
                {classInfo?.subjects.map((subject) => (
                  <span key={subject} className="px-3 py-1 bg-white border rounded-full text-sm text-gray-700">
                    <BookOpen className="size-3 inline mr-1" />
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
