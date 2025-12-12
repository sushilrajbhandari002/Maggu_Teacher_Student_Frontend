import { useState, useRef } from 'react';
import { User } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { UserCircle, Camera, Mail, Phone, MapPin, Calendar, Hash, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner@2.0.3';

interface StudentProfileSectionProps {
  user: User;
}

export function StudentProfileSection({ user }: StudentProfileSectionProps) {
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
            <UserCircle className="size-5 text-green-600" />
            Profile Picture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="size-32">
                <AvatarImage src={profileImage || undefined} alt={user.name} />
                <AvatarFallback className="text-3xl bg-green-100 text-green-600">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-lg"
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
              <p className="text-sm text-gray-600">{user.class}</p>
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
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="text-gray-900">{user.rollNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <p className="text-gray-900">{user.class}</p>
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
              <p className="text-gray-900">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="text-gray-900">15th January, 2010</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-gray-900">123 Main Street, Kathmandu, Nepal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardian Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Father's Name</p>
              <p className="text-gray-900">Mr. Rajesh Kumar</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Father's Contact</p>
              <p className="text-gray-900">+91 98765 11111</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Mother's Name</p>
              <p className="text-gray-900">Mrs. Priya Kumar</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Mother's Contact</p>
              <p className="text-gray-900">+91 98765 22222</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Academic Year</p>
              <p className="text-gray-900">2025-2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Admission Date</p>
              <p className="text-gray-900">1st April, 2020</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <UserCircle className="size-5 text-gray-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Section</p>
              <p className="text-gray-900">A</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
