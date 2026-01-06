
import React, { useState } from 'react';
import { Task } from '../types';
import { ICONS, CATEGORIES, PRIORITIES } from '../constants';

interface TodoViewProps { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>>; }

const TodoView: React.FC<TodoViewProps> = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState<typeof PRIORITIES[number]>('Medium');

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      priority: selectedPriority,
      category: activeCategory === 'All' ? 'Personal' : activeCategory
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => activeCategory === 'All' || t.category === activeCategory);

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        <h2 className="font-serif text-2xl md:text-3xl text-planner-header dark:text-rose-200">Goal Garden</h2>
        
        <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-planner-accent text-white shadow-md'
                  : 'bg-planner-bg/60 dark:bg-[#1B261B] text-planner-muted dark:text-planner-secondary/60 border border-planner-secondary/30 hover:bg-planner-bg'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-planner-bg/40 dark:bg-[#0E140E]/40 p-5 md:p-8 rounded-[32px] md:rounded-[40px] border border-planner-secondary/30 shadow-inner">
        <div className="flex flex-col gap-4 md:gap-5">
           <div className="flex gap-2 bg-white dark:bg-[#1B261B] rounded-2xl p-1.5 border border-planner-secondary/30 self-start">
            {PRIORITIES.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-3 md:px-5 py-1.5 md:py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                  selectedPriority === p ? 'bg-planner-header text-white' : 'text-planner-muted dark:text-planner-secondary/70 hover:bg-planner-bg/40'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Sow a new goal..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 px-5 md:px-7 py-3 md:py-4 rounded-[18px] md:rounded-[22px] bg-white dark:bg-[#1B261B] border border-planner-secondary/60 dark:border-[#2D3D2D] focus:outline-none focus:ring-2 focus:ring-planner-accent text-sm md:text-base text-planner-text dark:text-white placeholder:text-stone-300 shadow-sm"
            />
            <button
              onClick={addTask}
              className="bg-planner-header text-white p-3 md:p-4.5 md:px-6 rounded-[18px] md:rounded-[22px] hover:bg-planner-accent transition-all shadow-lg active:scale-95"
            >
              {ICONS.Plus}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 md:py-24 bg-planner-bg/20 dark:bg-[#1B261B]/20 border border-dashed border-planner-secondary/60 rounded-[32px] md:rounded-[40px]">
            <div className="inline-block p-4 md:p-5 bg-planner-secondary/20 rounded-full text-planner-accent mb-4 md:mb-5">
              {ICONS.Sparkles}
            </div>
            <p className="text-planner-muted dark:text-planner-secondary/60 font-serif italic text-xl md:text-2xl px-4">Your garden is waiting for seeds.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id}
              className={`group flex items-center gap-4 md:gap-5 p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all ${
                task.completed ? 'bg-planner-bg/40 opacity-50' : 'bg-white dark:bg-[#1B261B] shadow-sm border-planner-secondary/20 hover:border-planner-accent'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                  task.completed ? 'bg-planner-accent border-planner-accent' : 'border-planner-secondary/60 hover:border-planner-header'
                }`}
              >
                {task.completed && <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-white rounded-full"></div>}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm md:text-lg truncate ${task.completed ? 'line-through text-planner-muted' : 'text-planner-text dark:text-rose-50'}`}>
                  {task.text}
                </p>
                <div className="flex items-center gap-3 md:gap-4 mt-1">
                  <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md ${
                    task.priority === 'High' ? 'bg-planner-header/10 text-planner-header' : 
                    task.priority === 'Medium' ? 'bg-planner-secondary/20 text-planner-accent' : 
                    'bg-stone-100 text-stone-600'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-planner-muted font-bold dark:text-planner-secondary/60 uppercase tracking-widest">{task.category}</span>
                </div>
              </div>

              <button 
                onClick={() => deleteTask(task.id)}
                className="p-2 text-rose-300 hover:text-planner-header transition-all shrink-0"
              >
                {ICONS.Trash}
              </button>
            </div>
          ))
        )}
      </div>

      <div className="pt-6 md:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
        <div className="p-6 md:p-8 bg-planner-accent/5 rounded-[28px] md:rounded-[36px] border border-planner-accent/10 text-center shadow-sm">
          <div className="text-3xl md:text-4xl font-serif text-planner-accent mb-1 md:mb-2">{tasks.filter(t => !t.completed).length}</div>
          <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-planner-accent/80">Active Focus</div>
        </div>
        <div className="p-6 md:p-8 bg-planner-header/5 rounded-[28px] md:rounded-[36px] border border-planner-header/10 text-center shadow-sm">
          <div className="text-3xl md:text-4xl font-serif text-planner-header mb-1 md:mb-2">{tasks.filter(t => t.completed).length}</div>
          <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-planner-header/80">Harvested</div>
        </div>
        <div className="p-6 md:p-8 bg-planner-secondary/10 rounded-[28px] md:rounded-[36px] border border-planner-secondary/20 text-center shadow-sm">
          <div className="text-3xl md:text-4xl font-serif text-planner-accent mb-1 md:mb-2">
            {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
          </div>
          <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-planner-accent/80">Momentum</div>
        </div>
      </div>
    </div>
  );
};

export default TodoView;
