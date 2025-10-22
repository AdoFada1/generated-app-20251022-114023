import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.enum(['admin', 'staff', 'student']),
  rank: z.enum(['Principal', 'Teacher', 'SS1', 'SS2', 'SS3']).optional().nullable(),
  photoUrl: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
  password: z.union([z.string().length(0), z.string().min(6, { message: "Password must be at least 6 characters." })]).optional(),
});
type UserFormValues = z.infer<typeof userSchema>;
interface UserFormProps {
  user?: User | null;
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel, isLoading }) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'student',
      rank: user?.rank || null,
      photoUrl: user?.photoUrl || '',
      password: '',
    },
  });
  const role = form.watch('role');
  useEffect(() => {
    // When role changes, reset the rank if it's no longer applicable
    form.setValue('rank', null);
  }, [role, form]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rank / Class</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ''} disabled={!role || role === 'admin'}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a rank or class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {role === 'staff' && (
                      <>
                        <SelectItem value="Principal">Principal</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                      </>
                    )}
                    {role === 'student' && (
                      <>
                        <SelectItem value="SS1">SS1</SelectItem>
                        <SelectItem value="SS2">SS2</SelectItem>
                        <SelectItem value="SS3">SS3</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/photo.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder={user ? "Leave blank to keep unchanged" : "Set initial password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save User'}
          </Button>
        </div>
      </form>
    </Form>
  );
};