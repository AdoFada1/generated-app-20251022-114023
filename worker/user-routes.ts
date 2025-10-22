import { Hono } from "hono";
import { bearerAuth } from 'hono/bearer-auth'
import type { Env } from './core-utils';
import { UserEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { User } from "@shared/types";
import { Context } from "hono";
// This is a placeholder for a real auth system.
// In a real app, you'd use a JWT library to verify the token.
const verifyToken = (token: string, c: Context) => {
  if (token.startsWith('mock-token-for-')) {
    const userId = token.replace('mock-token-for-', '');
    c.set('user', { id: userId });
    return true;
  }
  return false;
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // PUBLIC AUTH ROUTE
  app.post('/api/auth/login', async (c) => {
    const { email, password } = await c.req.json();
    if (!isStr(email) || !isStr(password)) {
      return bad(c, 'Email and password are required');
    }
    await UserEntity.ensureSeed(c.env);
    const usersPage = await UserEntity.list(c.env, null, 1000); // Fetch all users
    const user = usersPage.items.find(u => u.email === email);
    if (!user) {
      return notFound(c, 'Invalid credentials');
    }
    // MOCK PASSWORD CHECK: In a real app, compare hashed passwords.
    if (user.email === 'admin@test.com' && password !== 'password') {
        return bad(c, 'Invalid credentials for admin');
    }
    const token = `mock-token-for-${user.id}`;
    return ok(c, { user, token });
  });
  // PROTECTED ROUTES
  const protectedRoutes = new Hono<{ Bindings: Env, Variables: { user: { id: string } } }>();
  protectedRoutes.use('*', bearerAuth({ verifyToken }));
  // USER MANAGEMENT (ADMIN-ONLY - Note: Role check should be added here in a real app)
  protectedRoutes.get('/users', async (c) => {
    const requestingUserEntity = new UserEntity(c.env, c.get('user').id);
    const requestingUser = await requestingUserEntity.getState();
    if (requestingUser?.role !== 'admin') {
      return c.json({ error: 'Forbidden' }, 403);
    }
    await UserEntity.ensureSeed(c.env);
    const page = await UserEntity.list(c.env, null, 1000); // Simplified: get all users
    return ok(c, page.items);
  });
  protectedRoutes.get('/users/:id', async (c) => {
    const requestingUserEntity = new UserEntity(c.env, c.get('user').id);
    const requestingUser = await requestingUserEntity.getState();
    if (requestingUser?.role !== 'admin') {
      return c.json({ error: 'Forbidden' }, 403);
    }
    const id = c.req.param('id');
    const user = new UserEntity(c.env, id);
    if (!await user.exists()) return notFound(c, 'User not found');
    return ok(c, await user.getState());
  });
  protectedRoutes.post('/users', async (c) => {
    const requestingUserEntity = new UserEntity(c.env, c.get('user').id);
    const requestingUser = await requestingUserEntity.getState();
    if (requestingUser?.role !== 'admin') {
      return c.json({ error: 'Forbidden' }, 403);
    }
    const userData = await c.req.json<Partial<User> & { password?: string }>();
    if (!userData.name || !userData.email || !userData.role) {
      return bad(c, 'Missing required fields: name, email, role');
    }
    const now = Date.now();
    const newUser: User = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      rank: userData.rank,
      photoUrl: userData.photoUrl || `https://i.pravatar.cc/150?u=${crypto.randomUUID()}`,
      createdAt: now,
      updatedAt: now,
    };
    if (userData.password) {
      console.log(`Password received for new user ${newUser.id}: ${userData.password} (should be hashed)`);
    }
    const created = await UserEntity.create(c.env, newUser);
    return ok(c, created);
  });
  protectedRoutes.put('/users/:id', async (c) => {
    const requestingUserEntity = new UserEntity(c.env, c.get('user').id);
    const requestingUser = await requestingUserEntity.getState();
    if (requestingUser?.role !== 'admin') {
      return c.json({ error: 'Forbidden' }, 403);
    }
    const id = c.req.param('id');
    const { password, ...userData } = await c.req.json<Partial<User> & { password?: string }>();
    const user = new UserEntity(c.env, id);
    if (!await user.exists()) return notFound(c, 'User not found');
    if (password) {
      console.log(`Password updated for user ${id}: ${password} (should be hashed)`);
    }
    const updatedUser = await user.mutate(current => ({ ...current, ...userData, updatedAt: Date.now() }));
    return ok(c, updatedUser);
  });
  protectedRoutes.delete('/users/:id', async (c) => {
    const requestingUserEntity = new UserEntity(c.env, c.get('user').id);
    const requestingUser = await requestingUserEntity.getState();
    if (requestingUser?.role !== 'admin') {
      return c.json({ error: 'Forbidden' }, 403);
    }
    const id = c.req.param('id');
    const deleted = await UserEntity.delete(c.env, id);
    if (!deleted) return notFound(c, 'User not found');
    return ok(c, { id, deleted: true });
  });
  // USER-SPECIFIC ACTIONS (SELF)
  protectedRoutes.post('/users/change-password', async (c) => {
    const { id } = c.get('user');
    const { currentPassword, newPassword } = await c.req.json();
    if (!isStr(currentPassword) || !isStr(newPassword)) {
      return bad(c, 'Current and new passwords are required.');
    }
    const userEntity = new UserEntity(c.env, id);
    if (!await userEntity.exists()) {
      return notFound(c, 'User not found.');
    }
    const user = await userEntity.getState();
    // MOCK PASSWORD CHECK: In a real app, compare hashed passwords.
    if (user.email === 'admin@test.com' && currentPassword !== 'password') {
      return bad(c, 'Invalid current password.');
    }
    console.log(`User ${id} is changing password. Current: ${currentPassword}, New: ${newPassword}`);
    // In a real app, you would hash and save the newPassword here.
    console.log(`Password updated for user ${id}: ${newPassword} (should be hashed)`);
    return ok(c, { success: true, message: 'Password updated successfully.' });
  });
  // Register all protected routes under the /api path
  app.route('/api', protectedRoutes);
}