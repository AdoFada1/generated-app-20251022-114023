import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, BookUser, History } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api-client';
import { User } from '@shared/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
const fetchUsers = async (): Promise<User[]> => {
  return api<User[]>('/api/users');
};
const StatCard = ({ title, value, icon: Icon, description, isLoading }: { title: string; value: string; icon: React.ElementType; description: string, isLoading?: boolean }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <>
          <Skeleton className="h-8 w-20 mb-1" />
          <Skeleton className="h-4 w-40" />
        </>
      ) : (
        <>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </>
      )}
    </CardContent>
  </Card>
);
const AdminDashboard = () => {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  const studentCount = users?.filter(u => u.role === 'student').length || 0;
  const staffCount = users?.filter(u => u.role === 'staff').length || 0;
  const recentActivity = users
    ?.sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0))
    .slice(0, 5);
  if (isError) {
    return <div className="text-red-500">Error loading dashboard data: {error.message}</div>;
  }
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Students"
          value={studentCount.toLocaleString()}
          icon={Users}
          description="Currently enrolled students"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Staff"
          value={staffCount.toLocaleString()}
          icon={UserCheck}
          description="Active teachers and principals"
          isLoading={isLoading}
        />
        <StatCard
          title="Classes"
          value="3"
          icon={BookUser}
          description="SS1, SS2, SS3"
          isLoading={false} // This is static data
        />
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest user creations and updates in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity?.map(user => (
                  <div key={user.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoUrl} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.createdAt === user.updatedAt ? 'Created' : 'Updated'} account as <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(user.updatedAt || user.createdAt || 0), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default AdminDashboard;