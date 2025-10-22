import React from 'react';
import { useAuthStore } from '@/hooks/use-auth';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';
import StudentDashboard from './StudentDashboard';
import { Skeleton } from '@/components/ui/skeleton';
const DashboardPage = () => {
  const user = useAuthStore(state => state.user);
  if (!user) {
    // This loading state is shown while the auth state is being hydrated from storage.
    return (
      <div>
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    );
  }
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'staff':
      return <StaffDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <div>Unknown user role. Please contact support.</div>;
  }
};
export default DashboardPage;