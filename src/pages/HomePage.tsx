import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpenCheck } from 'lucide-react';
import { Toaster, toast } from '@/components/ui/sonner';
import { useAuthStore } from '@/hooks/use-auth';
export function HomePage() {
  const navigate = useNavigate();
  const login = useAuthStore(s => s.login);
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Login Successful!', {
        description: 'Redirecting to your dashboard...',
      });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error('Login Failed', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-md mx-auto z-10 shadow-xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
              <BookOpenCheck className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-display">AcademiaPortal</CardTitle>
          <CardDescription>GDSS Waziri Ibrahim Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@test.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-center text-muted-foreground/80 text-sm">
        <p>&copy; 2025 ABJ-IT Support. Built with ❤️ at Cloudflare.</p>
      </footer>
      <Toaster richColors closeButton />
    </div>
  );
}