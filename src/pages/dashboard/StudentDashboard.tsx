import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
const StudentDashboard = () => {
  const user = useAuthStore(state => state.user);
  if (!user) return null;
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  return (
    <div className="animate-fade-in">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user.name}!</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Here is your information as a student of GDSS Waziri Ibrahim.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoUrl} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <Badge className="capitalize bg-green-500 hover:bg-green-600 text-white">{user.role}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Class</p>
              <p className="font-semibold">{user.rank || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default StudentDashboard;