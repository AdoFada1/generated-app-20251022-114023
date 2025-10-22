import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Home, Users, User, Settings, BookOpenCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/hooks/use-auth';
const NavItem = ({ to, icon: Icon, children, badgeCount }: { to: string; icon: React.ElementType; children: React.ReactNode; badgeCount?: number }) => (
  <NavLink
    to={to}
    end // Use `end` prop for the dashboard link to avoid it being active for all child routes
    className={({ isActive }) =>
      cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        isActive && 'bg-muted text-primary'
      )
    }
  >
    <Icon className="h-4 w-4" />
    {children}
    {badgeCount && (
      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        {badgeCount}
      </Badge>
    )}
  </NavLink>
);
export function DashboardSidebar() {
  const user = useAuthStore(state => state.user);
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/dashboard" className="flex items-center gap-2 font-semibold">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <span className="">AcademiaPortal</span>
        </NavLink>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavItem to="/dashboard" icon={Home}>
            Dashboard
          </NavItem>
          {user?.role === 'admin' && (
            <NavItem to="/dashboard/users" icon={Users}>
              User Management
            </NavItem>
          )}
          <NavItem to="/dashboard/profile" icon={User}>
            Profile
          </NavItem>
          <NavItem to="/dashboard/settings" icon={Settings}>
            Settings
          </NavItem>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="text-xs text-muted-foreground">
          &copy; 2025 ABJ-IT Support
        </div>
      </div>
    </div>
  );
}