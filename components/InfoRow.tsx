import React from 'react';
import { Character } from '../types';
import { UserCircle, Award, Compass } from 'lucide-react';

interface InfoRowProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
}

export const InfoRow: React.FC<InfoRowProps> = ({ character, onUpdate }) => {
  // Cálculo de Proficiência: Começa em 2, vira 3 no nível 5, 4 no 9, etc.
  const proficiency = character.level >= 17 ? 6 : character.level >= 13 ? 5 : character.level >= 9 ? 4 : character.level >= 5 ? 3 : 2;

  const alignments = ["Heróico", "Neutro", "Caótico", "Maligno"];

  return (
    <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-neon-card border-t border-gray-800">
      
      {/* Tendência Dropdown */}
      <div className="flex flex-col justify-end w-full px-1 border-r border-gray-800/50">
        <div className="flex items-center gap-1 mb-1">
            <Compass size={10} className="text-neon-blue" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neon-blue">
            Tendência
            </span>
        </div>
        <div className="relative">
            <select 
                value={character.alignment || "Neutro"}
                onChange={(e) => onUpdate({ alignment: e.target.value })}
                className="w-full bg-transparent text-white font-display font-bold text-sm appearance-none outline-none cursor-pointer hover:text-neon-theme transition-colors pb-1"
            >
                {alignments.map(a => (
                    <option key={a} value={a} className="bg-gray-900 text-gray-300">{a}</option>
                ))}
            </select>
        </div>
      </div>

      {/* Valor de Proficiência */}
      <div className="flex flex-col justify-end w-full px-1 items-center border-r border-gray-800/50">
        <div className="flex items-center gap-1 mb-1">
            <Award size={10} className="text-neon-yellow" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neon-yellow">
            Proficiência
            </span>
        </div>
        <div className="font-display text-2xl font-bold text-white leading-none">
            +{proficiency}
        </div>
      </div>

      {/* Nome do Jogador */}
      <div className="flex flex-col justify-end w-full px-1">
        <div className="flex items-center gap-1 mb-1">
            <UserCircle size={10} className="text-gray-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Jogador
            </span>
        </div>
        <input 
            type="text" 
            value={character.playerName || ""} 
            onChange={(e) => onUpdate({ playerName: e.target.value })}
            placeholder="Nome..."
            className="w-full bg-transparent text-white font-display font-bold text-sm outline-none placeholder-gray-700 focus:border-b focus:border-neon-theme transition-all pb-1"
        />
      </div>

    </div>
  );
};
