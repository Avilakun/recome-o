import React from 'react';
import { Character, RollEntry } from '../types';
import { Trash2, Copy, Dices, Clock } from 'lucide-react';

interface DiceTabProps {
  character: Character;
  onClearHistory: () => void;
}

export const DiceTab: React.FC<DiceTabProps> = ({ character, onClearHistory }) => {
  const history = character.rollHistory || [];

  // Sort history by newest first
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = (entry: RollEntry) => {
    const modStr = entry.modifier >= 0 ? `+${entry.modifier}` : `${entry.modifier}`;
    const diceStr = entry.diceResults.length > 1 
        ? `[${entry.diceResults.join(', ')}]` 
        : `[${entry.diceResults[0]}]`;
    
    let text = `🎲 **${entry.label}**`;
    if (entry.mode !== 'NORMAL') text += ` (${entry.mode})`;
    text += `\nResultado: ${diceStr} ${modStr} = **${entry.total}**`;

    navigator.clipboard.writeText(text).then(() => {
        alert("Rolagem copiada!");
    });
  };

  return (
    <div className="flex-1 px-4 py-6 flex flex-col space-y-6 overflow-y-auto pb-24 animate-in fade-in duration-300">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-gray-900 border border-gray-800 p-4 rounded-xl">
        <div className="flex items-center gap-2 text-neon-theme">
            <Dices size={20} />
            <span className="font-display font-bold text-sm tracking-widest">REGISTRO DE DADOS</span>
        </div>
        <button 
            onClick={onClearHistory}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
        >
            <Trash2 size={14} />
            LIMPAR
        </button>
      </div>

      {/* Rolls List */}
      <div className="space-y-3">
        {sortedHistory.length > 0 ? (
            sortedHistory.map((entry) => (
                <div key={entry.id} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 flex justify-between items-center group hover:border-neon-theme/30 transition-all">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                                <Clock size={10} /> {formatTime(entry.timestamp)}
                            </span>
                            {entry.mode !== 'NORMAL' && (
                                <span className="text-[9px] bg-neon-theme/10 text-neon-theme px-1.5 py-0.5 rounded font-bold uppercase">
                                    {entry.mode}
                                </span>
                            )}
                        </div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide">{entry.label}</h4>
                        <div className="text-xs text-gray-400 mt-1">
                            <span className="text-gray-500">Dados:</span> {entry.diceResults.join(', ')} 
                            <span className="mx-1">•</span> 
                            <span className="text-gray-500">Mod:</span> {entry.modifier >= 0 ? '+' : ''}{entry.modifier}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <span className={`text-2xl font-display font-black ${entry.diceResults.includes(20) ? 'text-neon-yellow' : entry.diceResults.includes(1) ? 'text-neon-red' : 'text-white'}`}>
                                {entry.total}
                            </span>
                        </div>
                        <button 
                            onClick={() => copyToClipboard(entry)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-500 hover:text-neon-theme hover:bg-gray-700 transition-colors"
                            title="Copiar rolagem"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-600 gap-2 border-2 border-dashed border-gray-800 rounded-xl">
                <Dices size={32} className="opacity-20" />
                <p className="text-xs italic">Nenhuma rolagem registrada hoje.</p>
            </div>
        )}
      </div>

    </div>
  );
};
