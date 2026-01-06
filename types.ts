
export type TabType = 'Daily' | 'Weekly' | 'To-Do' | 'Notes';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  type: 'Work' | 'Personal' | 'Health' | 'Social';
}

export interface WeeklyDay {
  date: Date;
  tasksCount: number;
}
