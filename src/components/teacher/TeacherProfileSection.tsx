import { useState, useRef } from 'react';
import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { UserCircle, Camera, Mail, Phone, MapPin, Calendar, Hash, Upload, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner@2.0.3';

interface TeacherProfileSectionProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export function TeacherProfileSection({ user, onUpdateUser }: TeacherProfileSectionProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast.success('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      {/* Profile Picture Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="size-5 text-indigo-600" />
            Profile Picture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="size-32">
                <AvatarImage src={profileImage || undefined} alt={user.name} />
                <AvatarFallback className="text-3xl bg-indigo-100 text-indigo-600">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
              >
                <Camera className="size-5" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-center">
              <h3 className="text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">Teacher ID: {user.teacherId}</p>
              {user.classTeacherOf && (
                <p className="text-sm text-indigo-600">Class Teacher: {user.classTeacherOf}</p>
              )}
            </div>
            <Button onClick={triggerFileInput} variant="outline" className="w-full">
              <Upload className="size-4 mr-2" />
              Change Profile Picture
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Supported formats: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-gray-900">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Hash className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Teacher ID</p>
              <p className="text-gray-900">{user.teacherId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{user.username}@sushilschool.edu</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900">+91 98765 11111</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="text-gray-900">15th March, 1985</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-gray-900">456 Teacher Lane, Kathmandu, Nepal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <BookOpen className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Subject</p>
              <p className="text-gray-900">Mathematics</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Qualification</p>
              <p className="text-gray-900">M.Sc. Mathematics, B.Ed.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Joining Date</p>
              <p className="text-gray-900">1st June, 2015</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Hash className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="text-gray-900">10 Years</p>
            </div>
          </div>

          {user.classTeacherOf && (
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <UserCircle className="size-5 text-indigo-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-indigo-600">Class Teacher Of</p>
                <p className="text-indigo-900">{user.classTeacherOf}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Teaching Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-2xl text-blue-600">5</p>
              <p className="text-sm text-gray-600">Classes</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-2xl text-green-600">142</p>
              <p className="text-sm text-gray-600">Students</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-2xl text-purple-600">28</p>
              <p className="text-sm text-gray-600">Materials</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <p className="text-2xl text-orange-600">95%</p>
              <p className="text-sm text-gray-600">Avg. Attendance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
