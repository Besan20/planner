
import React from 'react';
import { 
  Calendar, 
  CheckSquare, 
  FileText, 
  Layout, 
  Clock, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Heart, 
  Coffee,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';

export const COLORS = {
  background: '#F4F9F4',
  card: '#FFFFFF',
  pinkAccent: '#E65C67',
  greenAccent: '#4B7F52',
  softGreen: '#B5D6B2',
  textMain: '#1B261B',
  textMuted: '#5C6B5C',
};

export const ICONS = {
  Daily: <Clock className="w-5 h-5" />,
  Weekly: <Layout className="w-5 h-5" />,
  'To-Do': <CheckSquare className="w-5 h-5" />,
  Notes: <FileText className="w-5 h-5" />,
  Plus: <Plus className="w-4 h-4" />,
  Trash: <Trash2 className="w-4 h-4" />,
  Next: <ChevronRight className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Moon: <Moon className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />
};

export const CATEGORIES = ['Personal', 'Work', 'Health', 'Social', 'Admin'];
export const PRIORITIES = ['Low', 'Medium', 'High'] as const;
