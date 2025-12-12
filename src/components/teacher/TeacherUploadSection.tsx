import { useState, useRef } from 'react';
import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Upload, FileText, Eye, Trash2, File } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface TeacherUploadSectionProps {
  user: User;
}

const mockClasses = ['Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'];
const mockSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer'];

const mockUploadedMaterials = [
  {
    id: 1,
    title: 'Quadratic Equations - Chapter Notes',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PDF',
    size: '2.5 MB',
    uploadedOn: '2025-12-10',
    downloads: 45
  },
  {
    id: 2,
    title: 'Trigonometry - Practice Questions',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PDF',
    size: '1.2 MB',
    uploadedOn: '2025-12-04',
    downloads: 38
  },
  {
    id: 3,
    title: 'Algebra Fundamentals',
    subject: 'Mathematics',
    class: 'Class 9',
    type: 'PDF',
    size: '2.1 MB',
    uploadedOn: '2025-12-02',
    downloads: 32
  },
  {
    id: 4,
    title: 'Geometry Basic Concepts',
    subject: 'Mathematics',
    class: 'Class 9',
    type: 'DOCX',
    size: '1.8 MB',
    uploadedOn: '2025-11-28',
    downloads: 29
  },
  {
    id: 5,
    title: 'Statistics and Probability',
    subject: 'Mathematics',
    class: 'Class 10',
    type: 'PPTX',
    size: '3.5 MB',
    uploadedOn: '2025-11-25',
    downloads: 41
  }
];

export function TeacherUploadSection({ user }: TeacherUploadSectionProps) {
  const [view, setView] = useState<'upload' | 'existing'>('upload');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast.error('File size should be less than 50MB');
        return;
      }
      setSelectedFile(file);
      toast.success('File selected successfully!');
    }
  };

  const handleUpload = () => {
    if (!selectedClass || !selectedSubject || !title || !selectedFile) {
      toast.error('Please fill all required fields');
      return;
    }

    // Mock upload
    toast.success('Study material uploaded successfully!');
    
    // Reset form
    setSelectedClass('');
    setSelectedSubject('');
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteMaterial = (id: number) => {
    toast.success('Material deleted successfully!');
  };

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

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={view === 'upload' ? 'default' : 'outline'}
          onClick={() => setView('upload')}
          className={view === 'upload' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          <Upload className="size-4 mr-2" />
          Upload Materials
        </Button>
        <Button
          variant={view === 'existing' ? 'default' : 'outline'}
          onClick={() => setView('existing')}
          className={view === 'existing' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          <FileText className="size-4 mr-2" />
          My Materials ({mockUploadedMaterials.length})
        </Button>
      </div>

      {/* Upload View */}
      {view === 'upload' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="size-5 text-indigo-600" />
              Upload Study Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Class Selection */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Class <span className="text-red-600">*</span>
              </label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
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

            {/* Subject Selection */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Subject <span className="text-red-600">*</span>
              </label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {mockSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Title <span className="text-red-600">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Chapter 5 - Quadratic Equations"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Description (Optional)
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the material..."
                rows={3}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Upload File <span className="text-red-600">*</span>
              </label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                  className="hidden"
                />
                {selectedFile ? (
                  <div className="space-y-2">
                    <FileText className="size-12 mx-auto text-indigo-600" />
                    <p className="text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="size-12 mx-auto text-gray-400" />
                    <p className="text-gray-600">Click to select file</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse Files
                    </Button>
                    <p className="text-xs text-gray-500">
                      Supported: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (Max 50MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              <Upload className="size-4 mr-2" />
              Upload Material
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Existing Materials View */}
      {view === 'existing' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5 text-indigo-600" />
              My Uploaded Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUploadedMaterials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="size-12 mx-auto mb-2 opacity-50" />
                <p>No materials uploaded yet</p>
              </div>
            ) : (
              mockUploadedMaterials.map((material) => (
                <div key={material.id} className="p-4 bg-white rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {getFileIcon(material.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1 line-clamp-1">{material.title}</h3>
                      <div className="flex flex-wrap gap-2 text-xs mb-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                          {material.subject}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {material.class}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {material.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Size: {material.size}</p>
                        <p>Uploaded: {new Date(material.uploadedOn).toLocaleDateString()}</p>
                        <p>Downloads: {material.downloads}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="size-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => deleteMaterial(material.id)}
                    >
                      <Trash2 className="size-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
