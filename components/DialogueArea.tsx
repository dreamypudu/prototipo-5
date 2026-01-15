import React from 'react';
import { Stakeholder, TimeSlotType } from '../types';
import { useTypewriter } from '../hooks/useTypewriter';

interface DialogueAreaProps {
  stakeholder: Stakeholder; // The currently speaking/focused stakeholder
  participants?: Stakeholder[]; // List of all stakeholders present in the scene
  dialogue: string;
  timeSlot: TimeSlotType;
}

const backgroundImages: Record<TimeSlotType, string> = {
    'mañana': 'https://i.pinimg.com/736x/35/a9/f3/35a9f3bb8237d372fb960e95354aba20.jpg', // bright/day
    tarde: 'https://i.pinimg.com/736x/02/aa/5d/02aa5dae9b46b77ad4f8a387ab24ce3c.jpg', // brighter golden/sunset
    noche: 'https://i.pinimg.com/736x/02/aa/5d/02aa5dae9b46b77ad4f8a387ab24ce3c.jpg', // fallback for night
};

const DialogueArea: React.FC<DialogueAreaProps> = ({ stakeholder, participants, dialogue, timeSlot }) => {
  const displayedText = useTypewriter(dialogue, 30);
  const bgImage = backgroundImages[timeSlot] || backgroundImages['mañana'];

  // Use passed participants, or fallback to just the current stakeholder if not provided
  const activeParticipants = participants && participants.length > 0 ? participants : [stakeholder];

  return (
    <div 
      className="relative w-full h-full bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* Character Sprites Container */}
      <div className="absolute bottom-0 left-0 w-full h-full flex justify-center items-end px-4 gap-4 lg:gap-8 pb-32 lg:pb-10 pointer-events-none">
        {activeParticipants.map((p) => {
            const isActive = p.id === stakeholder.id;
            return (
                <div 
                    key={p.id}
                    className={`transition-all duration-500 ease-in-out transform flex flex-col justify-end
                        ${isActive ? 'scale-110 z-20 filter-none opacity-100' : 'scale-90 z-10 grayscale-[50%] opacity-80'}
                    `}
                    style={{ maxHeight: '85%' }}
                >
                    <img 
                        src={p.portraitUrl} 
                        alt={p.name} 
                        className="max-h-[60vh] w-auto object-contain drop-shadow-2xl"
                    />
                </div>
            );
        })}
      </div>

      {/* Dialogue Box */}
      <div className="absolute bottom-5 left-5 right-5 bg-gray-900/80 p-4 rounded-xl border-2 border-blue-500/50 backdrop-blur-sm shadow-2xl animate-fade-in z-30">
        <div className="absolute -top-4 left-8 bg-gray-900 border-2 border-blue-500/50 rounded-t-lg px-4 py-1 flex items-center gap-2">
            <h3 className="text-xl font-bold text-blue-300 drop-shadow-md">{stakeholder.name}</h3>
            <span className="text-xs text-gray-400 uppercase tracking-widest">({stakeholder.role})</span>
        </div>
        <p className="text-md lg:text-lg text-gray-200 leading-relaxed font-serif h-24 overflow-y-auto mt-4 pr-2">
          {displayedText}
          <span className={`inline-block w-2 h-5 bg-gray-200 ml-1 ${displayedText.length === dialogue.length ? 'animate-none opacity-0' : 'animate-pulse'}`} />
        </p>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-in forwards; }
      `}</style>
    </div>
  );
};

export default DialogueArea;
