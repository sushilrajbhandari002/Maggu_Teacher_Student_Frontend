import { useState } from 'react';
import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Trophy, TrendingUp, BookOpen } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface StudentAcademicsSectionProps {
  user: User;
}

const mockExamResults = [
  {
    exam: 'Half Yearly Examination 2025',
    date: '2025-11-15',
    results: [
      { subject: 'Mathematics', fullMarks: 100, obtained: 92, grade: 'A+' },
      { subject: 'English', fullMarks: 100, obtained: 88, grade: 'A+' },
      { subject: 'Science', fullMarks: 100, obtained: 85, grade: 'A' },
      { subject: 'Social Studies', fullMarks: 100, obtained: 90, grade: 'A+' },
      { subject: 'Hindi', fullMarks: 100, obtained: 82, grade: 'A' },
      { subject: 'Computer', fullMarks: 50, obtained: 45, grade: 'A+' }
    ],
    totalObtained: 482,
    totalMarks: 550,
    percentage: 87.6,
    rank: 3
  },
  {
    exam: 'First Term Examination 2025',
    date: '2025-09-20',
    results: [
      { subject: 'Mathematics', fullMarks: 100, obtained: 88, grade: 'A+' },
      { subject: 'English', fullMarks: 100, obtained: 85, grade: 'A' },
      { subject: 'Science', fullMarks: 100, obtained: 90, grade: 'A+' },
      { subject: 'Social Studies', fullMarks: 100, obtained: 87, grade: 'A+' },
      { subject: 'Hindi', fullMarks: 100, obtained: 80, grade: 'A' },
      { subject: 'Computer', fullMarks: 50, obtained: 42, grade: 'A' }
    ],
    totalObtained: 472,
    totalMarks: 550,
    percentage: 85.8,
    rank: 5
  }
];

const mockSubjectPerformance = [
  {
    subject: 'Mathematics',
    average: 90,
    trend: 'up',
    exams: [
      { name: 'Half Yearly', marks: 92, outOf: 100 },
      { name: 'First Term', marks: 88, outOf: 100 },
      { name: 'Unit Test 2', marks: 85, outOf: 50 },
      { name: 'Unit Test 1', marks: 42, outOf: 50 }
    ]
  },
  {
    subject: 'English',
    average: 86.5,
    trend: 'up',
    exams: [
      { name: 'Half Yearly', marks: 88, outOf: 100 },
      { name: 'First Term', marks: 85, outOf: 100 },
      { name: 'Unit Test 2', marks: 40, outOf: 50 },
      { name: 'Unit Test 1', marks: 38, outOf: 50 }
    ]
  },
  {
    subject: 'Science',
    average: 87.5,
    trend: 'down',
    exams: [
      { name: 'Half Yearly', marks: 85, outOf: 100 },
      { name: 'First Term', marks: 90, outOf: 100 },
      { name: 'Unit Test 2', marks: 43, outOf: 50 },
      { name: 'Unit Test 1', marks: 44, outOf: 50 }
    ]
  },
  {
    subject: 'Social Studies',
    average: 88.5,
    trend: 'up',
    exams: [
      { name: 'Half Yearly', marks: 90, outOf: 100 },
      { name: 'First Term', marks: 87, outOf: 100 },
      { name: 'Unit Test 2', marks: 42, outOf: 50 },
      { name: 'Unit Test 1', marks: 40, outOf: 50 }
    ]
  },
  {
    subject: 'Hindi',
    average: 81,
    trend: 'up',
    exams: [
      { name: 'Half Yearly', marks: 82, outOf: 100 },
      { name: 'First Term', marks: 80, outOf: 100 },
      { name: 'Unit Test 2', marks: 38, outOf: 50 },
      { name: 'Unit Test 1', marks: 37, outOf: 50 }
    ]
  },
  {
    subject: 'Computer',
    average: 87,
    trend: 'up',
    exams: [
      { name: 'Half Yearly', marks: 45, outOf: 50 },
      { name: 'First Term', marks: 42, outOf: 50 },
      { name: 'Unit Test 2', marks: 23, outOf: 25 },
      { name: 'Unit Test 1', marks: 22, outOf: 25 }
    ]
  }
];

export function StudentAcademicsSection({ user }: StudentAcademicsSectionProps) {
  const [selectedExam, setSelectedExam] = useState(mockExamResults[0].exam);
  const [selectedSubject, setSelectedSubject] = useState(mockSubjectPerformance[0].subject);

  const currentExam = mockExamResults.find(e => e.exam === selectedExam);
  const currentSubject = mockSubjectPerformance.find(s => s.subject === selectedSubject);

  return (
    <div className="space-y-4">
      {/* Exam Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5 text-green-600" />
            Exam Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Exam Selector */}
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockExamResults.map((exam) => (
                <SelectItem key={exam.exam} value={exam.exam}>
                  {exam.exam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {currentExam && (
            <>
              {/* Overall Performance */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Total Marks</p>
                    <p className="text-2xl text-gray-900">
                      {currentExam.totalObtained}/{currentExam.totalMarks}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="text-2xl text-green-600">{currentExam.percentage}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-green-200">
                  <span className="text-sm text-gray-600">Class Rank</span>
                  <span className="text-green-700 flex items-center gap-1">
                    <Trophy className="size-4" />
                    Rank {currentExam.rank}
                  </span>
                </div>
              </div>

              {/* Subject-wise Results */}
              <div className="space-y-2">
                <h3 className="text-gray-900">Subject-wise Marks</h3>
                {currentExam.results.map((result, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">{result.subject}</span>
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
                        {result.grade}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(result.obtained / result.fullMarks) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        {result.obtained}/{result.fullMarks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Subject-wise Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-green-600" />
            Subject-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Subject Selector */}
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockSubjectPerformance.map((subject) => (
                <SelectItem key={subject.subject} value={subject.subject}>
                  {subject.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {currentSubject && (
            <>
              {/* Average Score */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-3xl text-blue-600">{currentSubject.average}%</p>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    currentSubject.trend === 'up' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp className={`size-4 ${
                      currentSubject.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {currentSubject.trend === 'up' ? 'Improving' : 'Needs Attention'}
                  </div>
                </div>
              </div>

              {/* Performance Timeline */}
              <div className="space-y-2">
                <h3 className="text-gray-900">Performance Timeline</h3>
                {currentSubject.exams.map((exam, idx) => {
                  const percentage = (exam.marks / exam.outOf) * 100;
                  return (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900">{exam.name}</span>
                        <span className="text-sm text-gray-600">
                          {exam.marks}/{exam.outOf}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              percentage >= 90 ? 'bg-green-600' :
                              percentage >= 75 ? 'bg-blue-600' :
                              percentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-700">{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overall Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border text-center">
                  <p className="text-sm text-gray-600">Best</p>
                  <p className="text-xl text-green-600">
                    {Math.max(...currentSubject.exams.map(e => (e.marks / e.outOf) * 100)).toFixed(0)}%
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border text-center">
                  <p className="text-sm text-gray-600">Average</p>
                  <p className="text-xl text-blue-600">{currentSubject.average}%</p>
                </div>
                <div className="p-3 bg-white rounded-lg border text-center">
                  <p className="text-sm text-gray-600">Tests</p>
                  <p className="text-xl text-gray-900">{currentSubject.exams.length}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
