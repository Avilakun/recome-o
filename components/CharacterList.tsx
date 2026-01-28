import React from 'react';
import { Character } from '../types';
import { User, Trash2, Plus, PlayCircle, CircleDashed, Zap, ChevronUp } from 'lucide-react';

interface CharacterListProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
  onAddXp: (id: string, amount: number) => void;
  onLevelUp: (id: string) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters, onSelect, onDelete, onCreateNew, onAddXp, onLevelUp }) => {
  
  // Filter characters by level
  const levelZeroChars = characters.filter(c => c.level === 0);
  const nenUsers = characters.filter(c => c.level > 0);

  const renderCharacterCard = (char: Character) => {
    const currentXp = char.xp || 0;
    const nextXp = char.xp_next || 1; // avoid div by zero
    const progress = Math.min(100, (currentXp / nextXp) * 100);
    const canLevelUp = currentXp >= nextXp;

    return (
      <div 
        key={char.id} 
        className="group relative bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 hover:border-neon-theme hover:shadow-[0_0_15px_rgba(var(--theme-color),0.2)]"
      >
        <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-700 group-hover:border-neon-theme/50 relative">
                {char.image ? (
                <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <User size={24} />
                </div>
                )}
                {/* Level Badge */}
                <div className="absolute bottom-0 right-0 bg-neon-theme text-black text-[10px] font-black px-1.5 py-0.5 rounded-tl-lg">
                    LV.{char.level}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-white truncate group-hover:text-neon-theme transition-colors text-lg">
                {char.name || "Sem Nome"}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 border border-gray-700 truncate max-w-[100px]">
                    {char.class}
                </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1 truncate">
                {char.race} • {char.background}
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
                <button 
                onClick={() => onSelect(char)}
                className="p-2 bg-neon-theme/10 text-neon-theme rounded-lg hover:bg-neon-theme hover:text-black transition-all"
                title="Abrir Ficha"
                >
                <PlayCircle size={20} />
                </button>
                <button 
                onClick={(e) => { e.stopPropagation(); if(confirm('Tem certeza que deseja deletar esta ficha?')) onDelete(char.id!); }}
                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                title="Deletar Ficha"
                >
                <Trash2 size={20} />
                </button>
            </div>
        </div>

        {/* XP Bar & Progress Controls */}
        <div className="pt-2 border-t border-gray-800/50">
            <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1 font-bold uppercase tracking-wider">
                <span>XP Progress</span>
                <span className={canLevelUp ? 'text-neon-yellow animate-pulse' : 'text-gray-400'}>{currentXp} / {nextXp}</span>
            </div>
            
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2 relative">
                <div 
                    className={`h-full transition-all duration-500 ${canLevelUp ? 'bg-neon-yellow shadow-[0_0_10px_#ffe600]' : 'bg-neon-theme'}`} 
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex gap-2">
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        const amount = prompt("Adicionar quanto de XP?", "50");
                        if (amount && !isNaN(parseInt(amount))) {
                            onAddXp(char.id!, parseInt(amount));
                        }
                    }}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-xs text-white py-1.5 rounded font-bold border border-gray-700 transition-colors"
                 >
                    + XP
                 </button>
                 
                 {canLevelUp && (
                     <button 
                        onClick={(e) => { e.stopPropagation(); onLevelUp(char.id!); }}
                        className="flex-1 bg-neon-yellow text-black text-xs py-1.5 rounded font-black tracking-wider animate-pulse hover:brightness-110 flex items-center justify-center gap-1"
                     >
                        <ChevronUp size={12} strokeWidth={3} /> LEVEL UP
                     </button>
                 )}
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] p-6 text-gray-200">
      
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-display font-black text-3xl tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,255,157,0.5)] mb-2">
          HxH 5e RPG
        </h1>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Banco de Dados</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-4 custom-scrollbar">
        <div className="space-y-8">
            
            {/* Section 1: Level 0 */}
            <div>
                <div className="flex items-center gap-2 mb-3 text-gray-400 border-b border-gray-800 pb-2">
                    <CircleDashed size={14} />
                    <h2 className="text-[10px] font-bold uppercase tracking-widest">Iniciantes (Nível 0)</h2>
                </div>
                <div className="space-y-3">
                    {levelZeroChars.length === 0 ? (
                        <div className="py-6 rounded-xl border border-dashed border-gray-800 bg-gray-900/20 text-center">
                            <p className="text-[10px] text-gray-600">Nenhuma ficha de nível 0 encontrada.</p>
                        </div>
                    ) : (
                        levelZeroChars.map(renderCharacterCard)
                    )}
                </div>
            </div>

            {/* Section 2: Level 1+ */}
            <div>
                <div className="flex items-center gap-2 mb-3 text-neon-theme border-b border-gray-800 pb-2">
                    <Zap size={14} />
                    <h2 className="text-[10px] font-bold uppercase tracking-widest">Usuários de Nen (Nível 1-12)</h2>
                </div>
                <div className="space-y-3">
                    {nenUsers.length === 0 ? (
                        <div className="py-6 rounded-xl border border-dashed border-gray-800 bg-gray-900/20 text-center">
                            <p className="text-[10px] text-gray-600">Nenhum Hunter registrado.</p>
                        </div>
                    ) : (
                        nenUsers.map(renderCharacterCard)
                    )}
                </div>
            </div>

        </div>
      </div>

      {/* Create Button - Fixed at bottom of container area */}
      <div className="pt-4 mt-auto">
        <button 
            onClick={onCreateNew}
            className="w-full py-4 bg-neon-theme text-black font-black font-display tracking-widest rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(var(--theme-color),0.4)] transition-all flex items-center justify-center gap-2"
        >
            <Plus size={24} />
            CRIAR NOVA FICHA
        </button>
      </div>

    </div>
  );
};