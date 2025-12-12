import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, UserPlus, Edit2, Trash2, Mail, Phone } from 'lucide-react';

const mockTeachers = [
  { id: 't1', name: 'John Doe', email: 'john.doe@sushilschool.edu', phone: '+1234567890', classTeacher: 'Class 10A', status: 'Active' },
  { id: 't2', name: 'Sarah Smith', email: 'sarah.smith@sushilschool.edu', phone: '+1234567891', classTeacher: '-', status: 'Active' },
  { id: 't3', name: 'Michael Brown', email: 'michael.brown@sushilschool.edu', phone: '+1234567892', classTeacher: 'Class 9A', status: 'Active' },
];

const mockStudents = [
  { id: 's1', name: 'Alice Johnson', email: 'alice.johnson@student.sushilschool.edu', phone: '+1234567893', class: 'Class 10A', rollNo: '101', status: 'Active' },
  { id: 's2', name: 'Bob Wilson', email: 'bob.wilson@student.sushilschool.edu', phone: '+1234567894', class: 'Class 10A', rollNo: '102', status: 'Active' },
  { id: 's3', name: 'Charlie Davis', email: 'charlie.davis@student.sushilschool.edu', phone: '+1234567895', class: 'Class 9A', rollNo: '201', status: 'Active' },
];

export function AdminUsersView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="size-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div>
                <Label htmlFor="userType">User Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Add User
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="teachers" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="teachers">Teachers ({mockTeachers.length})</TabsTrigger>
          <TabsTrigger value="students">Students ({mockStudents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {mockTeachers.map((teacher) => (
              <Card key={teacher.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="size-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-700">{teacher.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1">{teacher.name}</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="size-3" />
                          <span className="truncate">{teacher.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="size-3" />
                          <span>{teacher.phone}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs">
                          Class Teacher: {teacher.classTeacher}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs">
                          {teacher.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Edit2 className="size-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="size-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {mockStudents.map((student) => (
              <Card key={student.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="size-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-700">{student.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1">{student.name}</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="size-3" />
                          <span className="truncate">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="size-3" />
                          <span>{student.phone}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs">
                          {student.class} - Roll No: {student.rollNo}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs">
                          {student.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Edit2 className="size-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="size-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
