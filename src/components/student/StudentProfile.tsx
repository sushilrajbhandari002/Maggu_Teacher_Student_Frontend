import { Card } from '../ui/card';
import { UserCircle, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { User } from '../../App';

interface StudentProfileProps {
  user: User;
}

export function StudentProfile({ user }: StudentProfileProps) {
  return (
    <Card className="p-6">
      <h2 className="flex items-center text-gray-900 mb-6">
        <UserCircle className="size-5 mr-2" />
        My Profile
      </h2>

      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="size-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden mb-4">
            {user.image ? (
              <img src={user.image} alt="Profile" className="size-full object-cover" />
            ) : (
              <UserCircle className="size-16 text-green-600" />
            )}
          </div>
          <h3 className="text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.class}</p>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="size-5 text-gray-600" />
              <span className="text-gray-700">Roll Number</span>
            </div>
            <p className="ml-8 text-gray-900">{user.rollNumber}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="size-5 text-gray-600" />
              <span className="text-gray-700">Email</span>
            </div>
            <p className="ml-8 text-gray-900">{user.email}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="size-5 text-gray-600" />
              <span className="text-gray-700">Phone Number</span>
            </div>
            <p className="ml-8 text-gray-900">{user.phone || 'Not provided'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="size-5 text-gray-600" />
              <span className="text-gray-700">Address</span>
            </div>
            <p className="ml-8 text-gray-900">{user.address || 'Not provided'}</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            Note: To update your profile information, please contact the school administration.
          </p>
        </div>
      </div>
    </Card>
  );
}
