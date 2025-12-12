import { Card } from '../ui/card';
import { Trophy, TrendingUp, BookOpen } from 'lucide-react';
import { User } from '../../App';

interface StudentAcademicsProps {
  user: User;
}

// Mock exam results
const examResults = [
  {
    exam: 'Mid-term Exam 2025',
    date: '2025-11-15',
    subjects: [
      { name: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A' },
      { name: 'English', marks: 78, totalMarks: 100, grade: 'B+' },
      { name: 'Science', marks: 92, totalMarks: 100, grade: 'A+' },
      { name: 'Social Studies', marks: 80, totalMarks: 100, grade: 'A-' },
      { name: 'Hindi', marks: 75, totalMarks: 100, grade: 'B+' },
    ],
    totalMarks: 410,
    totalPossible: 500,
    percentage: 82,
    rank: 5
  },
  {
    exam: 'First Term Exam 2025',
    date: '2025-09-20',
    subjects: [
      { name: 'Mathematics', marks: 80, totalMarks: 100, grade: 'A-' },
      { name: 'English', marks: 82, totalMarks: 100, grade: 'A' },
      { name: 'Science', marks: 88, totalMarks: 100, grade: 'A' },
      { name: 'Social Studies', marks: 76, totalMarks: 100, grade: 'B+' },
      { name: 'Hindi', marks: 79, totalMarks: 100, grade: 'B+' },
    ],
    totalMarks: 405,
    totalPossible: 500,
    percentage: 81,
    rank: 7
  }
];

// Mock subject performance data
const subjectPerformance = [
  {
    subject: 'Mathematics',
    currentMarks: 85,
    previousMarks: 80,
    average: 82.5,
    trend: 'up',
    color: 'blue'
  },
  {
    subject: 'English',
    currentMarks: 78,
    previousMarks: 82,
    average: 80,
    trend: 'down',
    color: 'purple'
  },
  {
    subject: 'Science',
    currentMarks: 92,
    previousMarks: 88,
    average: 90,
    trend: 'up',
    color: 'green'
  },
  {
    subject: 'Social Studies',
    currentMarks: 80,
    previousMarks: 76,
    average: 78,
    trend: 'up',
    color: 'orange'
  },
  {
    subject: 'Hindi',
    currentMarks: 75,
    previousMarks: 79,
    average: 77,
    trend: 'down',
    color: 'red'
  }
];

export function StudentAcademics({ user }: StudentAcademicsProps) {
  return (
    <div className="space-y-4">
      {/* Exam Results */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <Trophy className="size-5 mr-2 text-green-600" />
          Exam Results
        </h2>
        
        <div className="space-y-4">
          {examResults.map((exam, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden">
              {/* Exam Header */}
              <div className="bg-green-600 text-white p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3>{exam.exam}</h3>
                    <p className="text-sm text-green-100">
                      {new Date(exam.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">{exam.percentage}%</p>
                    <p className="text-sm text-green-100">Rank: #{exam.rank}</p>
                  </div>
                </div>
              </div>

              {/* Subject-wise Marks */}
              <div className="p-3 space-y-2">
                {exam.subjects.map((subject, subIdx) => (
                  <div
                    key={subIdx}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="size-4 text-gray-600" />
                      <span className="text-gray-900">{subject.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-900">
                        {subject.marks}/{subject.totalMarks}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          subject.grade.startsWith('A')
                            ? 'bg-green-100 text-green-700'
                            : subject.grade.startsWith('B')
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {subject.grade}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex justify-between items-center p-2 bg-green-50 rounded border-t-2 border-green-600 mt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    {exam.totalMarks}/{exam.totalPossible}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Subject-wise Performance */}
      <Card className="p-4">
        <h2 className="flex items-center text-gray-900 mb-4">
          <TrendingUp className="size-5 mr-2 text-green-600" />
          Subject-wise Performance
        </h2>
        
        <div className="space-y-4">
          {subjectPerformance.map((subject, idx) => (
            <div key={idx} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-gray-900">{subject.subject}</h3>
                <div className="flex items-center gap-2">
                  <TrendingUp
                    className={`size-4 ${
                      subject.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      subject.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {subject.trend === 'up' ? '+' : '-'}
                    {Math.abs(subject.currentMarks - subject.previousMarks)} marks
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Current Performance</span>
                  <span>{subject.currentMarks}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${subject.color}-600`}
                    style={{ width: `${subject.currentMarks}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">Current</p>
                  <p className="text-gray-900">{subject.currentMarks}%</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">Previous</p>
                  <p className="text-gray-900">{subject.previousMarks}%</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-600">Average</p>
                  <p className="text-gray-900">{subject.average}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Overall Performance Summary */}
      <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
        <h2 className="text-gray-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Trophy className="size-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl text-gray-900">82%</p>
            <p className="text-xs text-gray-600">Overall Average</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <TrendingUp className="size-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl text-gray-900">#5</p>
            <p className="text-xs text-gray-600">Class Rank</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Keep up the good work!</strong> You've shown improvement in Mathematics, 
            Science, and Social Studies. Focus more on English and Hindi to maintain consistent performance.
          </p>
        </div>
      </Card>
    </div>
  );
}
