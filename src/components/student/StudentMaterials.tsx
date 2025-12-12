import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BookOpen, Download, FileText } from 'lucide-react';
import { User } from '../../App';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface StudentMaterialsProps {
  user: User;
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

const mockMaterials = [
  {
    id: 1,
    subject: 'Mathematics',
    title: 'Chapter 5 - Algebra Notes',
    uploadedBy: 'John Doe',
    date: '2025-11-20',
    type: 'PDF'
  },
  {
    id: 2,
    subject: 'Physics',
    title: 'Newton\'s Laws of Motion',
    uploadedBy: 'Sarah Smith',
    date: '2025-11-18',
    type: 'PDF'
  },
  {
    id: 3,
    subject: 'Mathematics',
    title: 'Quadratic Equations Practice',
    uploadedBy: 'John Doe',
    date: '2025-11-15',
    type: 'DOC'
  },
  {
    id: 4,
    subject: 'Chemistry',
    title: 'Periodic Table Reference',
    uploadedBy: 'John Doe',
    date: '2025-11-12',
    type: 'PDF'
  }
];

export function StudentMaterials({ user }: StudentMaterialsProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredMaterials = selectedSubject === 'all'
    ? mockMaterials
    : mockMaterials.filter(m => m.subject === selectedSubject);

  const handleDownload = (material: typeof mockMaterials[0]) => {
    toast.success(`Downloading ${material.title}`);
  };

  return (
    <Card className="p-6">
      <h2 className="flex items-center text-gray-900 mb-4">
        <BookOpen className="size-5 mr-2" />
        Study Materials
      </h2>

      <div className="space-y-4">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-3">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="size-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{material.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      {material.subject}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                      {material.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Uploaded by: {material.uploadedBy}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(material.date).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  onClick={() => handleDownload(material)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
          ))}

          {filteredMaterials.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              No materials available for this subject
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
