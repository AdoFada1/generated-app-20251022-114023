import type { User } from './types';
const now = Date.now();
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Abubakar Bello', email: 'principal@gdss.com', role: 'staff', rank: 'Principal', photoUrl: 'https://i.pravatar.cc/150?u=u1', createdAt: now - 86400000 * 10, updatedAt: now - 86400000 * 1 },
  { id: 'u2', name: 'Aisha Mohammed', email: 'a.mohammed@gdss.com', role: 'staff', rank: 'Teacher', photoUrl: 'https://i.pravatar.cc/150?u=u2', createdAt: now - 86400000 * 9, updatedAt: now - 86400000 * 2 },
  { id: 'u3', name: 'Chinedu Okoro', email: 'c.okoro@student.gdss.com', role: 'student', rank: 'SS3', photoUrl: 'https://i.pravatar.cc/150?u=u3', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 3 },
  { id: 'u4', name: 'Fatima Garba', email: 'f.garba@student.gdss.com', role: 'student', rank: 'SS2', photoUrl: 'https://i.pravatar.cc/150?u=u4', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 4 },
  { id: 'u5', name: 'David Adeleke', email: 'd.adeleke@student.gdss.com', role: 'student', rank: 'SS1', photoUrl: 'https://i.pravatar.cc/150?u=u5', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 5 },
  { id: 'u6', name: 'Ngozi Eze', email: 'n.eze@gdss.com', role: 'staff', rank: 'Teacher', photoUrl: 'https://i.pravatar.cc/150?u=u6', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 6 },
  { id: 'u7', name: 'Admin User', email: 'admin@test.com', role: 'admin', photoUrl: 'https://i.pravatar.cc/150?u=u7', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 7 },
  { id: 'u8', name: 'Binta Sani', email: 'b.sani@student.gdss.com', role: 'student', rank: 'SS3', photoUrl: 'https://i.pravatar.cc/150?u=u8', createdAt: now - 86400000 * 3, updatedAt: now - 86400000 * 8 },
  { id: 'u9', name: 'Musa Ibrahim', email: 'm.ibrahim@student.gdss.com', role: 'student', rank: 'SS2', photoUrl: 'https://i.pravatar.cc/150?u=u9', createdAt: now - 86400000 * 2, updatedAt: now - 86400000 * 9 },
  { id: 'u10', name: 'Yemi Alade', email: 'y.alade@gdss.com', role: 'staff', rank: 'Teacher', photoUrl: 'https://i.pravatar.cc/150?u=u10', createdAt: now - 86400000 * 1, updatedAt: now - 86400000 * 10 },
];