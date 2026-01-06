
import React, { useState, useEffect } from 'react';
import { TabType, Task, Note, ScheduleEvent } from './types';
import { COLORS, ICONS } from './constants';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import TodoView from './components/TodoView';
import NotesView from './components/NotesView';

const Logo = () => (
  <div className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-transform hover:scale-[1.02]">
    <div className="relative w-12 h-10 md:w-16 md:h-12 shrink-0">
      <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-sm">
        {/* Watermelon Rind (Outer) */}
        <path 
          d="M10 20 Q 10 15, 15 15 L 50 20 L 85 15 Q 90 15, 90 20 L 90 65 Q 90 70, 85 70 L 50 65 L 15 70 Q 10 70, 10 65 Z" 
          className="fill-planner-secondary dark:fill-[#1B261B] stroke-planner-accent dark:stroke-planner-secondary" 
          strokeWidth="3" 
        />
        {/* Inner Flesh */}
        <path 
          d="M20 25 L 50 28 L 80 25 L 80 60 L 50 58 L 20 60 Z" 
          className="fill-planner-header opacity-90"
        />
        {/* Seeds */}
        <circle cx="35" cy="35" r="1.5" className="fill-planner-text" />
        <circle cx="50" cy="40" r="1.5" className="fill-planner-text" />
        <circle cx="65" cy="35" r="1.5" className="fill-planner-text" />
        <circle cx="40" cy="50" r="1.5" className="fill-planner-text" />
        <circle cx="60" cy="50" r="1.5" className="fill-planner-text" />
      </svg>
    </div>
    <div className="flex flex-col">
      <h1 className="font-serif text-xl md:text-3xl font-semibold text-planner-header dark:text-rose-200 leading-none tracking-tight">
        Watermelon
      </h1>
      <h1 className="font-serif text-xl md:text-3xl font-light text-planner-accent dark:text-planner-secondary leading-none tracking-tight mt-0 md:mt-1">
        Planner
      </h1>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Daily');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('planner_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const savedTasks = localStorage.getItem('planner_tasks');
    const savedNotes = localStorage.getItem('planner_notes');
    const savedEvents = localStorage.getItem('planner_events');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    
    if (!savedEvents || JSON.parse(savedEvents).length === 0) {
      setEvents([
        { id: '1', time: '08:00', title: 'Morning Yoga', type: 'Health' },
        { id: '2', time: '10:30', title: 'Deep Work Session', type: 'Work' },
        { id: '3', time: '13:00', title: 'Healthy Lunch', type: 'Health' },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('planner_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('planner_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('planner_events', JSON.stringify(events));
  }, [events]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('planner_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('planner_theme', 'light');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Daily':
        return <DailyView events={events} setEvents={setEvents} tasks={tasks} />;
      case 'Weekly':
        return <WeeklyView tasks={tasks} events={events} />;
      case 'To-Do':
        return <TodoView tasks={tasks} setTasks={setTasks} />;
      case 'Notes':
        return <NotesView notes={notes} setNotes={setNotes} />;
      default:
        return <DailyView events={events} setEvents={setEvents} tasks={tasks} />;
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-rose-100 dark:selection:bg-planner-accent/30 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-planner-bg/90 dark:bg-[#0E140E]/90 backdrop-blur-md border-b border-planner-secondary/30 dark:border-[#1B261B] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-4 md:pt-8 pb-2 md:pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-4 md:mb-8">
            <div className="flex items-center justify-between w-full">
              <div onClick={() => setActiveTab('Daily')}>
                <Logo />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleTheme}
                  className="p-2.5 md:p-3 rounded-2xl bg-white dark:bg-[#1B261B] text-planner-header dark:text-planner-secondary shadow-sm border border-planner-secondary/30 transition-all active:scale-95"
                >
                  {isDarkMode ? ICONS.Sun : ICONS.Moon}
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end w-full md:w-auto">
              <div className="text-planner-header dark:text-rose-200 font-serif italic text-lg md:text-2xl pb-1">
                <span className="opacity-80">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <p className="hidden md:flex text-planner-muted dark:text-planner-secondary/70 font-medium items-center gap-2 text-sm">
                {ICONS.Sparkles}
                <span>{isDarkMode ? 'Cool watermelon nights focus.' : 'Stay fresh and productive!'}</span>
              </p>
            </div>
          </div>

          <nav className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2 md:mx-0 md:px-0">
            {(['Daily', 'Weekly', 'To-Do', 'Notes'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-t-2xl transition-all duration-300 font-medium whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab
                    ? 'bg-white dark:bg-[#1B261B] text-planner-header dark:text-planner-secondary shadow-[-4px_-4px_12px_rgba(0,0,0,0.03)]'
                    : 'text-planner-muted dark:text-planner-secondary/60 hover:text-planner-header hover:bg-white/40'
                }`}
              >
                <span className={activeTab === tab ? 'text-planner-accent' : ''}>{ICONS[tab]}</span>
                <span>{tab}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="bg-white dark:bg-[#1B261B] rounded-3xl p-5 md:p-8 shadow-[0_12px_45px_-12px_rgba(0,0,0,0.08)] border border-planner-secondary/20 dark:border-[#2D3D2D] transition-colors duration-300 min-h-[60vh]">
          {renderContent()}
        </div>
      </main>

      <footer className="text-center py-8 md:py-12 text-planner-muted/60 dark:text-planner-secondary/40 text-xs md:text-sm font-light">
        <p>&copy; {new Date().getFullYear()} Watermelon Planner • Fresh Perspective</p>
      </footer>
    </div>
  );
};

export default App;
