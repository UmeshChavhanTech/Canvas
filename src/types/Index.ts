export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  createdBy: User;
  collaborators: User[];
  likes: number;
  createdAt: string;
  isPublic: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface CanvasState {
  isDrawing: boolean;
  tool: 'brush' | 'eraser' | 'rectangle' | 'circle' | 'text';
  color: string;
  brushSize: number;
  collaborators: User[];
}
