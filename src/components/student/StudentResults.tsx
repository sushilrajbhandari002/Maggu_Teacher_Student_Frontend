import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TrendingUp, Award } from 'lucide-react';
import { User } from '../../App';
import { useState } from 'react';

interface StudentResultsProps {
  user: User;
}

const exams = ['First Terminal', 'Mid Terminal', 'Final Terminal'];

const mockResults = {
  'First Terminal': [
    { subject: 'Mathematics', marks: 85, total: 100, grade: 'A' },
    { subject: 'Physics', marks: 78, total: 100, grade: 'B+' },
    { subject: 'Chemistry', marks: 92, total: 100, grade: 'A+' },
    { subject: 'Biology', marks: 88, total: 100, grade: 'A' },
    { subject: 'English', marks: 82, total: 100, grade: 'A' }
  ],
  'Mid Terminal': [
    { subject: 'Mathematics', marks: 90, total: 100, grade: 'A+' },
    { subject: 'Physics', marks: 82, total: 100, grade: 'A' },
    { subject: 'Chemistry', marks: 88, total: 100, grade: 'A' },
    { subject: 'Biology', marks: 85, total: 100, grade: 'A' },
    { subject: 'English', marks: 87, total: 100, grade: 'A' }
  ],
  'Final Terminal': []
};

export function StudentResults({ user }: StudentResultsProps) {
  const [selectedExam, setSelectedExam] = useState('Mid Terminal');

  const results = mockResults[selectedExam as keyof typeof mockResults];
  const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
  const totalPossible = results.reduce((sum, r) => sum + r.total, 0);
  const percentage = totalPossible > 0 ? ((totalMarks / totalPossible) * 100).toFixed(2) : 0;

  return (
    <Card className="p-6">
      <h2 className="flex items-center text-gray-900 mb-4">
        <Award className="size-5 mr-2" />
        Exam Results
      </h2>

      <div className="space-y-4">
        <Select value={selectedExam} onValueChange={setSelectedExam}>
          <SelectTrigger>
            <SelectValue placeholder="Select exam" />
          </SelectTrigger>
          <SelectContent>
            {exams.map((exam) => (
              <SelectItem key={exam} value={exam}>{exam}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {results.length > 0 ? (
          <>
            {/* Summary Card */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Overall Percentage</p>
                  <p className="text-gray-900">{percentage}%</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <TrendingUp className="size-8 text-green-600" />
                </div>
              </div>
              <div className="mt-3 flex justify-between text-sm text-gray-600">
                <span>Total: {totalMarks}/{totalPossible}</span>
                <span className="text-green-600">
                  {Number(percentage) >= 90 ? 'Excellent!' :
                   Number(percentage) >= 75 ? 'Good Job!' :
                   Number(percentage) >= 60 ? 'Keep Improving!' : 'Need More Effort'}
                </span>
              </div>
            </div>

            {/* Subject-wise Results */}
            <div className="space-y-3">
              <h3 className="text-gray-900">Subject-wise Performance</h3>
              {results.map((result, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">{result.subject}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      result.grade.includes('A') ? 'bg-green-100 text-green-700' :
                      result.grade.includes('B') ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      Grade: {result.grade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className={`h-2 rounded-full ${
                          result.marks >= 90 ? 'bg-green-600' :
                          result.marks >= 75 ? 'bg-blue-600' :
                          result.marks >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${(result.marks / result.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-900">
                      {result.marks}/{result.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">
            Results not published yet
          </div>
        )}
      </div>
    </Card>
  );
}
