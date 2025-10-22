import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Laptop } from 'lucide-react';
type Theme = 'light' | 'dark' | 'system';
const SettingsPage = () => {
  const [theme, setTheme] = React.useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'system'
  );
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const handleThemeChange = (newTheme: Theme) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>Choose how AcademiaPortal looks on your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={theme}
            onValueChange={(value: Theme) => handleThemeChange(value)}
            className="grid max-w-md grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <Label className="cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
              <RadioGroupItem value="light" className="sr-only" />
              <div className="flex flex-col items-center gap-2">
                <Sun className="h-6 w-6" />
                <span className="font-semibold">Light</span>
              </div>
            </Label>
            <Label className="cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
              <RadioGroupItem value="dark" className="sr-only" />
              <div className="flex flex-col items-center gap-2">
                <Moon className="h-6 w-6" />
                <span className="font-semibold">Dark</span>
              </div>
            </Label>
            <Label className="cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
              <RadioGroupItem value="system" className="sr-only" />
              <div className="flex flex-col items-center gap-2">
                <Laptop className="h-6 w-6" />
                <span className="font-semibold">System</span>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};
export default SettingsPage;