
import React, { useState } from 'react';
import { Note } from '../types';
import { ICONS } from '../constants';

interface NotesViewProps { notes: Note[]; setNotes: React.Dispatch<React.SetStateAction<Note[]>>; }

const NOTE_COLORS = ['#F4F9F4', '#B5D6B2', '#F9E6E8', '#F2C1C6', '#D6F2D6'];
const DARK_NOTE_COLORS = ['#1B261B', '#2D3D2D', '#3D1B20', '#1A241A', '#0E140E'];

const NotesView: React.FC<NotesViewProps> = ({ notes, setNotes }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: NOTE_COLORS[0] });

  const addNote = () => {
    if (!newNote.title && !newNote.content) { setIsAdding(false); return; }
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title || 'Fresh Thought',
      content: newNote.content,
      date: new Date().toLocaleDateString(),
      color: newNote.color
    };
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', color: NOTE_COLORS[0] });
    setIsAdding(false);
  };

  const deleteNote = (id: string) => { setNotes(notes.filter(n => n.id !== id)); };

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-serif text-2xl md:text-3xl text-planner-header dark:text-rose-200">Journal & Notes</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 bg-planner-header text-white rounded-[20px] md:rounded-[22px] hover:bg-planner-accent transition-all shadow-lg active:scale-95 text-sm md:text-base w-full sm:w-auto justify-center"
        >
          {ICONS.Plus}
          <span className="font-semibold tracking-wide">New Seed</span>
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 md:p-6 bg-planner-text/40 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white dark:bg-[#1B261B] rounded-t-[32px] sm:rounded-[40px] md:rounded-[48px] p-8 md:p-12 shadow-2xl border border-planner-secondary/40 transform animate-in slide-in-from-bottom-10 sm:zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl md:text-3xl text-planner-header dark:text-rose-200 mb-6 md:mb-10">Capture a Thought</h3>
            <div className="space-y-6 md:space-y-8">
              <input
                autoFocus
                type="text"
                placeholder="Topic..."
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                className="w-full text-xl md:text-2xl font-serif bg-transparent border-b border-planner-secondary/40 pb-2 md:pb-3 focus:outline-none focus:border-planner-header dark:text-white placeholder:text-stone-300"
              />
              <textarea
                placeholder="Let your thoughts flow like juice..."
                rows={5}
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                className="w-full bg-planner-bg/30 dark:bg-[#0E140E]/50 p-5 md:p-8 rounded-[24px] md:rounded-[32px] focus:outline-none border border-planner-secondary/30 text-sm md:text-base text-planner-text dark:text-rose-50 leading-relaxed placeholder:text-stone-300 shadow-inner"
              ></textarea>
              
              <div className="flex flex-col gap-6 pt-2">
                <div className="flex flex-wrap gap-3">
                  {(document.documentElement.classList.contains('dark') ? DARK_NOTE_COLORS : NOTE_COLORS).map(c => (
                    <button
                      key={c}
                      onClick={() => setNewNote({...newNote, color: c})}
                      style={{ backgroundColor: c }}
                      className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${newNote.color === c ? 'border-planner-header scale-110' : 'border-white dark:border-[#2D3D2D]'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-4 sm:gap-5 justify-end">
                  <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-planner-muted dark:text-planner-secondary/60 font-bold uppercase tracking-widest text-[10px] hover:text-planner-header transition-colors">Discard</button>
                  <button onClick={addNote} className="bg-planner-accent text-white px-6 md:px-9 py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] md:text-[11px] shadow-lg active:scale-95 flex-1 sm:flex-none">Harvest Note</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {notes.length === 0 ? (
          <div className="col-span-full py-20 md:py-28 text-center bg-planner-bg/20 rounded-[32px] md:rounded-[48px] border-2 border-dashed border-planner-secondary/40">
            <div className="text-5xl md:text-7xl mb-6 md:mb-8 opacity-20 filter grayscale">📖</div>
            <p className="font-serif text-xl md:text-2xl text-planner-muted dark:text-planner-secondary/60 px-4">Your journal is ready for new seeds.</p>
          </div>
        ) : (
          notes.map(note => (
            <div 
              key={note.id}
              style={{ backgroundColor: note.color }}
              className="group p-7 md:p-9 rounded-[32px] md:rounded-[48px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative border border-white/40 dark:border-white/5 flex flex-col min-h-[260px] md:min-h-[300px]"
            >
              <button 
                onClick={() => deleteNote(note.id)}
                className="absolute top-6 right-6 p-2 bg-white/40 dark:bg-black/20 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all text-planner-header hover:text-white hover:bg-planner-header/80"
              >
                {ICONS.Trash}
              </button>
              
              <div className="flex-1">
                <div className="text-[8px] md:text-[9px] font-black text-planner-header/70 uppercase tracking-[0.2em] mb-4 md:mb-5">{note.date}</div>
                <h3 className="font-serif text-xl md:text-2xl text-planner-text dark:text-white mb-3 md:mb-5 leading-tight font-bold truncate">{note.title}</h3>
                <p className="text-planner-text/80 dark:text-white/80 text-xs md:text-sm leading-relaxed whitespace-pre-wrap line-clamp-6 font-medium">
                  {note.content}
                </p>
              </div>
              
              <div className="mt-8 pt-5 md:pt-7 border-t border-planner-header/10 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] md:text-[10px] uppercase font-black text-planner-header tracking-[0.2em] italic font-serif">Fresh Insight</span>
                <div className="text-planner-header drop-shadow-sm scale-90">{ICONS.Heart}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesView;
