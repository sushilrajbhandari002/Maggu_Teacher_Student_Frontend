import { useState } from 'react';
import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FolderOpen, Download, Eye, FileText, File, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface StudentMaterialsSectionProps {
  user: User;
}

const mockClasses = ['Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'];
const mockSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer'];

const mockMaterials = [
  {
    id: 1,
    title: 'Quadratic Equations - Chapter Notes',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PDF',
    size: '2.5 MB',
    uploadedBy: 'Mr. Sharma',
    uploadedOn: '2025-12-10',
    url: '#'
  },
  {
    id: 2,
    title: 'Periodic Table and Chemical Bonding',
    subject: 'Science',
    class: 'Class 10',
    type: 'PDF',
    size: '3.2 MB',
    uploadedBy: 'Dr. Kumar',
    uploadedOn: '2025-12-09',
    url: '#'
  },
  {
    id: 3,
    title: 'Shakespeare - Merchant of Venice Summary',
    subject: 'English',
    class: 'Class 10',
    type: 'DOCX',
    size: '1.8 MB',
    uploadedBy: 'Ms. Patel',
    uploadedOn: '2025-12-08',
    url: '#'
  },
  {
    id: 4,
    title: 'Indian Independence Movement',
    subject: 'Social Studies',
    class: 'Class 10',
    type: 'PDF',
    size: '4.1 MB',
    uploadedBy: 'Mrs. Singh',
    uploadedOn: '2025-12-07',
    url: '#'
  },
  {
    id: 5,
    title: 'Python Programming Basics',
    subject: 'Computer',
    class: 'Class 10',
    type: 'PDF',
    size: '2.8 MB',
    uploadedBy: 'Mr. Gupta',
    uploadedOn: '2025-12-06',
    url: '#'
  },
  {
    id: 6,
    title: 'Hindi Grammar - Vyakaran Notes',
    subject: 'Hindi',
    class: 'Class 10',
    type: 'PDF',
    size: '1.5 MB',
    uploadedBy: 'Ms. Verma',
    uploadedOn: '2025-12-05',
    url: '#'
  },
  {
    id: 7,
    title: 'Trigonometry - Practice Questions',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PDF',
    size: '1.2 MB',
    uploadedBy: 'Mr. Sharma',
    uploadedOn: '2025-12-04',
    url: '#'
  },
  {
    id: 8,
    title: 'Cell Biology and Genetics',
    subject: 'Science',
    class: 'Class 10',
    type: 'PPTX',
    size: '5.6 MB',
    uploadedBy: 'Dr. Kumar',
    uploadedOn: '2025-12-03',
    url: '#'
  },
  // Class 9 materials
  {
    id: 9,
    title: 'Algebra Fundamentals',
    subject: 'Mathematics',
    class: 'Class 9',
    type: 'PDF',
    size: '2.1 MB',
    uploadedBy: 'Mr. Sharma',
    uploadedOn: '2025-12-02',
    url: '#'
  },
  {
    id: 10,
    title: 'Forces and Motion',
    subject: 'Science',
    class: 'Class 9',
    type: 'PDF',
    size: '3.4 MB',
    uploadedBy: 'Dr. Kumar',
    uploadedOn: '2025-12-01',
    url: '#'
  }
];

export function StudentMaterialsSection({ user }: StudentMaterialsSectionProps) {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [viewingFile, setViewingFile] = useState<typeof mockMaterials[0] | null>(null);

  const filteredMaterials = mockMaterials.filter(material => {
    const classMatch = material.class === selectedClass;
    const subjectMatch = selectedSubject === 'All Subjects' || material.subject === selectedSubject;
    return classMatch && subjectMatch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="size-8 text-red-600" />;
      case 'DOCX':
        return <FileText className="size-8 text-blue-600" />;
      case 'PPTX':
        return <FileText className="size-8 text-orange-600" />;
      default:
        return <File className="size-8 text-gray-600" />;
    }
  };

  const viewFile = (material: typeof mockMaterials[0]) => {
    setViewingFile(material);
  };

  const downloadFile = (material: typeof mockMaterials[0]) => {
    // Mock download - in real implementation, this would trigger actual download
    const link = document.createElement('a');
    link.href = material.url;
    link.download = material.title;
    // link.click(); // Commented out for mock
    alert(`Downloading: ${material.title}`);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="size-5 text-green-600" />
            Study Materials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Subjects">All Subjects</SelectItem>
                  {mockSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Materials List */}
          <div className="space-y-2">
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="size-12 mx-auto mb-2 opacity-50" />
                <p>No materials found for selected filters</p>
              </div>
            ) : (
              filteredMaterials.map((material) => (
                <div key={material.id} className="p-4 bg-white rounded-lg border hover:border-green-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {getFileIcon(material.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1 line-clamp-1">{material.title}</h3>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          {material.subject}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {material.class}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {material.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Uploaded by {material.uploadedBy} • {new Date(material.uploadedOn).toLocaleDateString()}</p>
                        <p>Size: {material.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => viewFile(material)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="size-4 mr-1" />
                      View
                    </Button>
                    <Button
                      onClick={() => downloadFile(material)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="size-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Viewer Dialog */}
      <Dialog open={!!viewingFile} onOpenChange={() => setViewingFile(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="line-clamp-1 pr-8">{viewingFile?.title}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewingFile(null)}
                className="absolute right-4 top-4"
              >
                <X className="size-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {viewingFile && (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                    {viewingFile.subject}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {viewingFile.class}
                  </span>
                  <span>•</span>
                  <span>{viewingFile.uploadedBy}</span>
                  <span>•</span>
                  <span>{new Date(viewingFile.uploadedOn).toLocaleDateString()}</span>
                </div>

                {/* Mock file viewer */}
                <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    {getFileIcon(viewingFile.type)}
                    <p className="text-gray-600 mt-4">
                      File preview not available in demo mode
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      In production, this would display the actual file content
                    </p>
                    <p className="text-sm text-gray-500">
                      ({viewingFile.type} - {viewingFile.size})
                    </p>
                    <Button
                      onClick={() => downloadFile(viewingFile)}
                      className="mt-4 bg-green-600 hover:bg-green-700"
                    >
                      <Download className="size-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
