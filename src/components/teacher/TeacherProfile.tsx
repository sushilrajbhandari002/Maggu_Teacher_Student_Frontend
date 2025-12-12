import { useState } from 'react';
import { User } from '../../App';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { UserCircle, Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TeacherProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export function TeacherProfile({ user, onUpdateUser }: TeacherProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    address: user.address || '',
    image: user.image || ''
  });

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    onUpdateUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-gray-900">
          <UserCircle className="size-5 mr-2" />
          My Profile
        </h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
            <Edit2 className="size-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              <Save className="size-4 mr-2" />
              Save
            </Button>
            <Button onClick={() => {
              setIsEditing(false);
              setFormData({
                name: user.name,
                phone: user.phone || '',
                address: user.address || '',
                image: user.image || ''
              });
            }} variant="outline" size="sm">
              <X className="size-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="size-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden mb-4">
            {formData.image ? (
              <img src={formData.image} alt="Profile" className="size-full object-cover" />
            ) : (
              <UserCircle className="size-16 text-indigo-600" />
            )}
          </div>
          {isEditing && (
            <div>
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                  Upload Photo
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">Name</label>
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <p className="text-gray-900">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Email</label>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Phone Number</label>
            {isEditing ? (
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            ) : (
              <p className="text-gray-900">{user.phone || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Address</label>
            {isEditing ? (
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
              />
            ) : (
              <p className="text-gray-900">{user.address || 'Not provided'}</p>
            )}
          </div>

          {user.classTeacherOf && (
            <div>
              <label className="block mb-2 text-gray-700">Class Teacher Of</label>
              <p className="text-gray-900">{user.classTeacherOf}</p>
            </div>
          )}

          <div>
            <label className="block mb-2 text-gray-700">Assigned Classes</label>
            <div className="flex flex-wrap gap-2">
              {user.assignedClasses?.map((cls) => (
                <span key={cls} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  {cls}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
