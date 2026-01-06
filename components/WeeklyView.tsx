
import React from 'react';
import { Task, ScheduleEvent } from '../types';
import { ICONS } from '../constants';

interface WeeklyViewProps { tasks: Task[]; events: ScheduleEvent[]; }

const WeeklyView: React.FC<WeeklyViewProps> = ({ tasks, events }) => {
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const days = getNext7Days();

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl md:text-3xl text-planner-header dark:text-rose-200">Weekly Overview</h2>
        <div className="text-planner-muted dark:text-planner-secondary/70 text-xs md:text-sm font-medium shrink-0">Fresh Cycle: {days[0].toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-5">
        {days.map((day, idx) => {
          const isToday = idx === 0;
          return (
            <div 
              key={idx} 
              className={`flex flex-col min-h-[220px] md:min-h-[260px] p-4 md:p-5 rounded-[24px] md:rounded-[28px] border transition-all ${
                isToday 
                  ? 'bg-planner-bg dark:bg-[#0E140E] border-planner-header dark:border-planner-header shadow-md ring-1 ring-planner-header/20' 
                  : 'bg-white dark:bg-[#1B261B]/40 border-planner-secondary/30 dark:border-[#2D3D2D] hover:border-planner-accent'
              }`}
            >
              <div className="mb-3 md:mb-5">
                <div className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${isToday ? 'text-planner-header dark:text-rose-200' : 'text-planner-muted/80 dark:text-planner-secondary/60'}`}>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-2xl md:text-3xl font-serif font-bold ${isToday ? 'text-planner-text dark:text-white' : 'text-planner-accent dark:text-planner-secondary/80'}`}>
                  {day.getDate()}
                </div>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto max-h-[120px] md:max-h-[160px] pr-1 no-scrollbar">
                {isToday && events.length > 0 && events.map(e => (
                   <div key={e.id} className="p-2 bg-white dark:bg-[#1B261B] rounded-xl text-[9px] md:text-[10px] shadow-sm border border-planner-header/20 border-l-4 border-l-planner-header">
                    <span className="font-black text-planner-header">{e.time}</span> <span className="dark:text-rose-50 font-medium truncate inline-block w-full">{e.title}</span>
                   </div>
                ))}
                
                {isToday && tasks.filter(t => !t.completed).length > 0 && (
                   <div className="text-[9px] md:text-[10px] font-bold text-planner-accent pt-2 px-1">
                    +{tasks.filter(t => !t.completed).length} items
                   </div>
                )}
              </div>

              <button className="mt-4 p-2 w-full flex items-center justify-center bg-planner-bg/60 dark:bg-[#1B261B] hover:bg-planner-accent hover:text-white rounded-xl border border-planner-secondary/30 text-planner-accent transition-all active:scale-95 shadow-sm">
                {ICONS.Plus}
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4 md:pt-8">
        <div className="p-8 md:p-10 bg-planner-accent dark:bg-[#0E140E] rounded-[32px] md:rounded-[48px] text-white relative overflow-hidden group shadow-lg">
          <div className="absolute top-[-30px] right-[-30px] w-32 md:w-48 h-32 md:h-48 bg-white/10 rounded-full transition-transform group-hover:scale-110 duration-1000"></div>
          <h3 className="font-serif text-2xl md:text-3xl mb-4 md:mb-5 relative z-10">Main Harvest</h3>
          <p className="text-white/80 dark:text-planner-secondary/60 font-light mb-6 md:mb-8 relative z-10 max-w-sm text-base md:text-lg leading-relaxed">
            Concentrate on your core goals and maintain a refreshing balance between work and life.
          </p>
          <div className="relative z-10 w-full bg-white/20 h-2.5 md:h-3 rounded-full overflow-hidden">
            <div className="w-[65%] h-full bg-planner-header rounded-full transition-all duration-1000 ease-out"></div>
          </div>
          <div className="mt-4 md:mt-5 text-[10px] md:text-[11px] font-black text-white/70 uppercase tracking-[0.25em] relative z-10">Growth Track: 65%</div>
        </div>

        <div className="p-8 md:p-10 bg-planner-bg/60 dark:bg-[#1B261B]/50 rounded-[32px] md:rounded-[48px] border border-planner-secondary/40 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-planner-header dark:text-rose-200 mb-5 md:mb-6">Self-Care Wins</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center gap-3 md:gap-4 text-planner-text dark:text-rose-100">
                <div className="p-1.5 md:p-2 bg-white dark:bg-[#1B261B] rounded-full shadow-sm scale-90 shrink-0 text-planner-header">{ICONS.Heart}</div>
                <span className="text-sm md:text-base font-medium">Savor a cold healthy snack</span>
              </li>
              <li className="flex items-center gap-3 md:gap-4 text-planner-text dark:text-rose-100">
                <div className="p-1.5 md:p-2 bg-white dark:bg-[#1B261B] rounded-full shadow-sm scale-90 shrink-0 text-planner-accent">{ICONS.Sparkles}</div>
                <span className="text-sm md:text-base font-medium">10 mins mindful breathing</span>
              </li>
            </ul>
          </div>
          <button className="mt-8 md:mt-10 text-[10px] md:text-sm font-black text-planner-header dark:text-rose-200 flex items-center gap-2 md:gap-3 hover:translate-x-2 transition-transform uppercase tracking-widest">
            New Win {ICONS.Next}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;
