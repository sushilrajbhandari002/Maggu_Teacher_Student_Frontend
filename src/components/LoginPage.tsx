import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { GraduationCap, User, Shield } from 'lucide-react';
import { User as UserType } from '../App';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

// Mock data for demo purposes
const mockUsers = {
  admin: {
    id: 'admin1',
    email: 'admin@sushilschool.edu',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Super Admin',
    needsPasswordChange: false
  },
  teachers: [
    {
      id: 't1',
      email: 'john.doe@sushilschool.edu',
      username: 'john.doe',
      password: 'teacher123',
      role: 'teacher' as const,
      name: 'John Doe',
      teacherId: 'T001',
      phone: '+1234567890',
      address: '123 Main St, City',
      classTeacherOf: 'Class 10A',
      assignedClasses: ['Class 10A', 'Class 9B', 'Class 8C'],
      needsPasswordChange: true
    },
    {
      id: 't2',
      email: 'sarah.smith@sushilschool.edu',
      username: 'sarah.smith',
      password: 'teacher123',
      role: 'teacher' as const,
      name: 'Sarah Smith',
      teacherId: 'T002',
      phone: '+1234567891',
      address: '456 Oak Ave, City',
      assignedClasses: ['Class 7A', 'Class 6B'],
      needsPasswordChange: false
    }
  ],
  students: [
    {
      id: 's1',
      email: 'alice.johnson@student.sushilschool.edu',
      username: 'alice.johnson',
      password: 'student123',
      role: 'student' as const,
      name: 'Alice Johnson',
      phone: '+1234567892',
      address: '789 Pine Rd, City',
      class: 'Class 10A',
      rollNumber: '101',
      needsPasswordChange: true
    },
    {
      id: 's2',
      email: 'bob.wilson@student.sushilschool.edu',
      username: 'bob.wilson',
      password: 'student123',
      role: 'student' as const,
      name: 'Bob Wilson',
      phone: '+1234567893',
      address: '321 Elm St, City',
      class: 'Class 10A',
      rollNumber: '102',
      needsPasswordChange: false
    }
  ]
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    let user;
    if (selectedRole === 'admin') {
      user = mockUsers.admin.email === email && mockUsers.admin.password === password ? mockUsers.admin : null;
    } else {
      const users = selectedRole === 'teacher' ? mockUsers.teachers : mockUsers.students;
      user = users.find(u => u.email === email && u.password === password);
    }

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <GraduationCap className="size-16 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-indigo-600 mb-2">Sushil School</h1>
          <p className="text-gray-600">Welcome back! Please login to continue</p>
        </div>

        {!selectedRole ? (
          <div className="space-y-4">
            <h2 className="text-center text-gray-700 mb-6">Select Login Type</h2>
            {/* <Button
              onClick={() => setSelectedRole('admin')}
              className="w-full h-16 bg-purple-600 hover:bg-purple-700"
            >
              <Shield className="size-5 mr-2" />
              Login as Super Admin
            </Button> */}
            <Button
              onClick={() => setSelectedRole('teacher')}
              className="w-full h-16 bg-indigo-600 hover:bg-indigo-700"
            >
              <User className="size-5 mr-2" />
              Login as Teacher
            </Button>
            <Button
              onClick={() => setSelectedRole('student')}
              className="w-full h-16 bg-green-600 hover:bg-green-700"
            >
              <GraduationCap className="size-5 mr-2" />
              Login as Student
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setSelectedRole(null);
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                className="text-sm"
              >
                ← Change Login Type
              </Button>
              <p className="mt-2 text-gray-600">
                Logging in as <span className="capitalize">{selectedRole}</span>
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              Login
            </Button>

            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-500">
                {selectedRole === 'admin' ? (
                  <>Admin: admin@sushilschool.edu / admin123</>
                ) : selectedRole === 'teacher' ? (
                  <>Teacher: john.doe@sushilschool.edu / teacher123</>
                ) : (
                  <>Student: alice.johnson@student.sushilschool.edu / student123</>
                )}
              </p>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}