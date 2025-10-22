export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type UserRole = 'admin' | 'staff' | 'student';
export type UserRank = 'Principal' | 'Teacher' | 'SS1' | 'SS2' | 'SS3';
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rank?: UserRank;
  photoUrl: string;
  createdAt?: number;
  updatedAt?: number;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}