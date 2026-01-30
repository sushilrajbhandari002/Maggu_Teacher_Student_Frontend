import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { GraduationCap, User, Shield } from 'lucide-react';
import { User as UserType } from '../App';
import { API_BASE_URL } from '../lib/api';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    const login = async () => {
      try {
        setIsSubmitting(true);
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            role: selectedRole,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.message ?? 'Invalid email or password');
        }

        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        onLogin(data.user as UserType);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to login');
      } finally {
        setIsSubmitting(false);
      }
    };

    void login();
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

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>

            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-500">
                Admin: admin@sushilschool.edu / admin123
                <br />
                Teacher: john.doe@sushilschool.edu / teacher123
                <br />
                Student: alice.johnson@student.sushilschool.edu / student123
              </p>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}