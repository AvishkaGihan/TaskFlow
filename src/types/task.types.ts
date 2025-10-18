export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type FilterType = 'all' | 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
}