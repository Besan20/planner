
import React, { useState } from 'react';
import { ScheduleEvent, Task } from '../types';
import { ICONS, COLORS } from '../constants';

interface DailyViewProps {
  events: ScheduleEvent[];
  setEvents: React.Dispatch<React.SetStateAction<ScheduleEvent[]>>;
  tasks: Task[];
}

const DailyView: React.FC<DailyViewProps> = ({ events, setEvents, tasks }) => {
  const [newEvent, setNewEvent] = useState({ title: '', time: '09:00' });
  
  const addEvent = () => {
    if (!newEvent.title) return;
    const item: ScheduleEvent = {
      id: Date.now().toString(),
      time: newEvent.time,
      title: newEvent.title,
      type: 'Personal'
    };
    setEvents([...events, item].sort((a, b) => a.time.localeCompare(b.time)));
    setNewEvent({ title: '', time: '09:00' });
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const pendingTasks = tasks.filter(t => !t.completed).slice(0, 3);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-10">
      <div className="lg:col-span-2 order-2 lg:order-1">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-planner-header dark:text-rose-200">Today's Pulse</h2>
          <div className="hidden sm:flex items-center gap-2 p-1.5 bg-planner-bg dark:bg-[#0E140E] rounded-full pr-4 shadow-sm">
            <span className="bg-planner-accent text-white p-2 rounded-full scale-90">{ICONS.Sparkles}</span>
            <span className="text-sm font-medium text-planner-accent dark:text-planner-secondary">Keep it fresh.</span>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-10 md:py-12 text-planner-muted dark:text-planner-secondary/60 italic border-2 border-dashed border-planner-secondary/40 dark:border-[#2D3D2D] rounded-2xl">
              No events scheduled. Enjoy your freedom!
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="group flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl hover:bg-planner-bg/40 dark:hover:bg-[#1B261B]/60 transition-all border border-transparent hover:border-planner-secondary/40">
                <div className="w-12 md:w-16 font-bold text-planner-header dark:text-planner-secondary text-xs md:text-sm">{event.time}</div>
                <div className="h-8 md:h-10 w-1 md:w-1.5 bg-planner-accent dark:bg-planner-secondary/40 rounded-full shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-planner-text dark:text-rose-50 truncate text-sm md:text-base">{event.title}</h3>
                  <span className="text-[10px] md:text-[11px] font-bold text-planner-muted dark:text-planner-secondary/70 uppercase tracking-widest">{event.type}</span>
                </div>
                <button 
                  onClick={() => removeEvent(event.id)}
                  className="p-2 text-rose-300 dark:text-rose-900 hover:text-planner-header transition-opacity"
                >
                  {ICONS.Trash}
                </button>
              </div>
            ))
          )}

          <div className="mt-8 md:mt-10 p-5 md:p-7 bg-planner-bg/30 dark:bg-[#0E140E]/50 rounded-[24px] md:rounded-[32px] border border-planner-secondary/30 dark:border-[#2D3D2D]">
            <h4 className="font-serif text-lg md:text-xl mb-4 md:mb-5 text-planner-header dark:text-rose-200">New Entry</h4>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <input 
                type="time" 
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                className="px-4 py-2.5 rounded-xl border border-planner-secondary/60 dark:border-[#2D3D2D] bg-white dark:bg-[#1B261B] dark:text-white focus:outline-none focus:ring-2 focus:ring-planner-header text-sm shadow-sm"
              />
              <input 
                type="text" 
                placeholder="Next event..."
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                onKeyDown={(e) => e.key === 'Enter' && addEvent()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-planner-secondary/60 dark:border-[#2D3D2D] bg-white dark:bg-[#1B261B] dark:text-white focus:outline-none focus:ring-2 focus:ring-planner-header text-sm shadow-sm"
              />
              <button 
                onClick={addEvent}
                className="bg-planner-accent text-white px-6 py-2.5 rounded-xl hover:bg-planner-text transition-all font-medium shadow-md shadow-green-900/10 active:scale-95"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
        <section className="p-6 md:p-7 bg-planner-header/10 dark:bg-[#1B261B]/60 rounded-[24px] md:rounded-[32px] shadow-sm border border-planner-header/20 dark:border-[#2D3D2D]">
          <h3 className="font-serif text-xl md:text-2xl text-planner-header dark:text-rose-200 mb-3 md:mb-4">Daily Focus</h3>
          <p className="text-planner-text dark:text-rose-50/90 italic font-medium leading-relaxed text-sm md:text-base">
            "Savor the day like a cold watermelon on a summer afternoon. Productive, sweet, and refreshing."
          </p>
          <div className="mt-4 md:mt-5 flex justify-end text-planner-header/60 dark:text-planner-secondary/80">{ICONS.Heart}</div>
        </section>

        <section className="p-6 md:p-7 bg-white dark:bg-[#0E140E]/40 rounded-[24px] md:rounded-[32px] border border-planner-secondary/30 dark:border-[#2D3D2D] shadow-sm">
          <h3 className="font-serif text-lg md:text-xl text-planner-accent dark:text-planner-secondary mb-4 md:mb-5">Top Goals</h3>
          <div className="space-y-3 md:space-y-4">
            {pendingTasks.map(task => (
              <div key={task.id} className="flex items-center gap-3 md:gap-3.5 text-xs md:text-sm text-planner-text/90 dark:text-rose-100">
                <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-planner-header/60 shrink-0"></div>
                <span className="truncate">{task.text}</span>
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <p className="text-xs md:text-sm text-planner-muted dark:text-planner-secondary/60 italic">Goal list is clear!</p>
            )}
          </div>
          <button className="w-full mt-6 md:mt-7 py-2.5 md:py-3 border border-planner-secondary/60 dark:border-[#2D3D2D] rounded-2xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-planner-accent dark:text-planner-secondary hover:bg-planner-bg/40 transition-colors">
            Manage Tasks
          </button>
        </section>

        <section className="p-6 md:p-7 bg-planner-secondary/20 dark:bg-[#1B261B]/40 rounded-[24px] md:rounded-[32px] border border-planner-secondary/30 dark:border-[#2D3D2D]">
          <h3 className="font-serif text-lg md:text-xl text-planner-header dark:text-rose-200 mb-4 md:mb-5">Hydration Habit</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square rounded-xl md:rounded-2xl border-2 border-white dark:border-[#2D3D2D] bg-planner-bg dark:bg-[#1B261B] hover:bg-planner-header hover:text-white transition-colors cursor-pointer flex items-center justify-center text-[10px] text-planner-header dark:text-planner-secondary font-black shadow-sm active:scale-90">
                {i}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DailyView;
