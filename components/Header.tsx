import React, { useState } from 'react';
import { Sparkles, Plus, Minus, ChevronUp, ChevronLeft, Dices, ShieldAlert, Swords } from 'lucide-react';

interface HeaderProps {
  name: string;
  className: string;
  level: number;
  xp: number;
  xpNext: number;
  protagonistActionAvailable?: boolean;
  onAddXp: (amount: number) => void;
  onLevelUp: () => void;
  onToggleProtagonistAction: () => void;
  onUseProtagonistAction: (type: 'A' | 'B' | 'C') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  name, 
  level, 
  xp, 
  xpNext, 
  protagonistActionAvailable = false,
  onAddXp, 
  onLevelUp,
  onToggleProtagonistAction,
  onUseProtagonistAction
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const canLevelUp = xp >= xpNext;

  const handleProtagonistClick = () => {
    if (!protagonistActionAvailable) {
      if (confirm("Adicionar ação protagonista?")) {
        onToggleProtagonistAction();
      }
    } else {
      // Se já tem a ação, alterna o menu de rolagem
      setShowActionMenu(!showActionMenu);
    }
  };

  const handleActionSelection = (type: 'A' | 'B' | 'C') => {
    onUseProtagonistAction(type);
    setShowActionMenu(false);
  };

  return (
    <div className="relative pt-10 pb-6 px-6 flex justify-between items-end bg-gradient-to-b from-neon-dark/80 to-transparent z-40">
      
      {/* Content Area (Name/XP OR Protagonist Menu) */}
      <div className="flex-1 min-w-0 pr-4 relative h-[60px] flex items-end">
        
        {/* Default View: Name & XP */}
        <div className={`w-full transition-all duration-500 absolute bottom-0 left-0 ${showActionMenu ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <h1 className="font-display font-black text-3xl tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] truncate leading-tight uppercase">
            {name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-2 flex-1 bg-gray-950 rounded-full overflow-hidden border border-gray-800 shadow-inner">
              <div 
                className={`h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(var(--theme-color),0.5)] ${canLevelUp ? 'bg-neon-yellow shadow-[0_0_15px_#ffe600]' : 'bg-neon-theme'}`}
                style={{ width: `${Math.min(100, (xp / xpNext) * 100)}%` }}
              />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tighter ${canLevelUp ? 'text-neon-yellow animate-pulse' : 'text-gray-500'}`}>
              {xp} <span className="text-[8px] opacity-40 mx-0.5">/</span> {xpNext} XP
            </span>
          </div>
        </div>

        {/* Action Menu View */}
        <div className={`w-full transition-all duration-500 absolute bottom-0 left-0 flex gap-2 ${showActionMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <button 
              onClick={() => handleActionSelection('A')}
              className="flex-1 bg-neon-blue/20 border border-neon-blue/50 text-neon-blue rounded-lg p-1.5 hover:bg-neon-blue hover:text-black transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <Swords size={14} />
              <div className="flex flex-col leading-none text-center">
                <span className="text-[9px] font-black">NOVO D20</span>
                <span className="text-[7px] opacity-70 group-hover:opacity-100">MAIOR RES.</span>
              </div>
            </button>

            <button 
              onClick={() => handleActionSelection('B')}
              className="flex-1 bg-neon-red/20 border border-neon-red/50 text-neon-red rounded-lg p-1.5 hover:bg-neon-red hover:text-white transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <ShieldAlert size={14} />
              <div className="flex flex-col leading-none text-center">
                <span className="text-[9px] font-black">NOVO D20</span>
                <span className="text-[7px] opacity-70 group-hover:opacity-100">MENOR RES.</span>
              </div>
            </button>

            <button 
              onClick={() => handleActionSelection('C')}
              className="flex-1 bg-neon-yellow/20 border border-neon-yellow/50 text-neon-yellow rounded-lg p-1.5 hover:bg-neon-yellow hover:text-black transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <Dices size={14} />
              <div className="flex flex-col leading-none text-center">
                <span className="text-[9px] font-black">ROLE 3d6</span>
                <span className="text-[7px] opacity-70 group-hover:opacity-100">ADD / REDUZ</span>
              </div>
            </button>
        </div>

      </div>

      <div className="flex items-center gap-3">
        {/* XP Controls */}
        <div className="flex flex-col gap-1.5">
          <button 
            onClick={() => {
              const val = prompt("Deseja adicionar quanto de XP?", "50");
              if (val && !isNaN(parseInt(val))) onAddXp(parseInt(val));
            }}
            className="w-8 h-8 flex items-center justify-center bg-gray-900/80 border border-gray-700 text-neon-theme rounded-xl hover:bg-neon-theme hover:text-black transition-all shadow-lg active:scale-90"
          >
            <Plus size={16} strokeWidth={4} />
          </button>
          <button 
            onClick={() => {
              const val = prompt("Deseja remover quanto de XP?", "10");
              if (val && !isNaN(parseInt(val))) onAddXp(-Math.abs(parseInt(val)));
            }}
            className="w-8 h-8 flex items-center justify-center bg-gray-900/80 border border-gray-700 text-gray-500 rounded-xl hover:border-neon-red hover:text-neon-red transition-all shadow-lg active:scale-90"
          >
            <Minus size={16} strokeWidth={4} />
          </button>
        </div>

        {/* Level Badge */}
        <div className="relative scale-110">
          <svg width="75" height="85" viewBox="0 0 100 115" className={`fill-neon-dark stroke-[4px] transition-all duration-500 drop-shadow-[0_0_10px_rgba(var(--theme-color),0.8)] ${canLevelUp ? 'stroke-neon-yellow' : 'stroke-neon-theme'}`}>
            <path d="M50 0 L95 25 L95 75 L50 100 L5 75 L5 25 Z" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
              <Sparkles size={14} className={`mb-1 transition-colors ${canLevelUp ? 'text-neon-yellow' : 'text-neon-theme/60'}`} />
              <span className={`text-[11px] font-display font-black leading-none text-white`}>LV.{level}</span>
          </div>
        </div>

        {/* Action Buttons Column */}
        <div className="flex flex-col gap-2">
            {/* Level Up Button */}
            <button 
                onClick={onLevelUp}
                disabled={!canLevelUp}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all shadow-xl active:scale-95 ${canLevelUp ? 'bg-neon-yellow border-white text-black animate-bounce shadow-[0_0_20px_#ffe600] scale-110' : 'bg-gray-950 border-gray-800 text-gray-800 cursor-not-allowed grayscale'}`}
            >
                <ChevronUp size={32} strokeWidth={4} />
            </button>

            {/* Protagonist Action Button */}
            <button 
                onClick={handleProtagonistClick}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all shadow-xl active:scale-95 ${
                    protagonistActionAvailable 
                    ? 'bg-neon-blue border-white text-black shadow-[0_0_20px_#00f0ff] animate-pulse' 
                    : 'bg-gray-950 border-gray-800 text-gray-600 hover:border-neon-blue/50 hover:text-neon-blue'
                }`}
                title={protagonistActionAvailable ? "Usar Ação Protagonista" : "Adicionar Ação Protagonista"}
            >
                <ChevronLeft size={32} strokeWidth={4} className={showActionMenu ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
        </div>
      </div>
    </div>
  );
};
