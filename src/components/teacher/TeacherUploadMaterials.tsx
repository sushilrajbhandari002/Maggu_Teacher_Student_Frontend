import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Upload, File } from 'lucide-react';
import { User } from '../../App';
import { toast } from 'sonner@2.0.3';

interface TeacherUploadMaterialsProps {
  user: User;
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

export function TeacherUploadMaterials({ user }: TeacherUploadMaterialsProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass || !selectedSubject || !title || !fileName) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // In a real app, this would upload to a server
    toast.success('Study material uploaded successfully');
    setSelectedClass('');
    setSelectedSubject('');
    setTitle('');
    setDescription('');
    setFileName('');
  };

  return (
    <Card className="p-6">
      <h2 className="flex items-center text-gray-900 mb-4">
        <Upload className="size-5 mr-2" />
        Upload Notes & Study Materials
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700">Select Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a class" />
            </SelectTrigger>
            <SelectContent>
              {user.assignedClasses?.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2 text-gray-700">Select Subject</label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2 text-gray-700">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Chapter 5 - Algebra Notes"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700">Description (Optional)</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the material"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700">Upload File</label>
          <div className="flex items-center gap-2">
            <label htmlFor="file-upload" className="cursor-pointer flex-1">
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50">
                <File className="size-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {fileName || 'Click to upload PDF, DOC, or PPT'}
                </p>
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
          <Upload className="size-4 mr-2" />
          Upload Material
        </Button>
      </form>
    </Card>
  );
}
