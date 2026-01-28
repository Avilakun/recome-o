import React from 'react';
import { Camera, CreditCard, Shield, Zap, User } from 'lucide-react';
import { Character } from '../types';

interface IdTabProps {
  character: Character;
  onUpdate: (character: Character) => void;
}

export const IdTab: React.FC<IdTabProps> = ({ character, onUpdate }) => {
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({
          ...character,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 px-4 py-6 flex flex-col space-y-6 overflow-y-auto pb-24 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Hunter License Card Look */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-neon-theme rounded-2xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(var(--theme-color),0.2)]">
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 opacity-10">
           <CreditCard size={150} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
            {/* License Header */}
            <div className="w-full flex justify-between items-start mb-4 border-b border-gray-700 pb-2">
                <div>
                    <h2 className="font-display font-black text-xl italic tracking-wider text-white">HUNTER LICENSE</h2>
                    <p className="text-[10px] text-neon-theme font-mono">OFFICIAL DOCUMENT</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-gray-700 font-display">No. 990-{Math.floor(Math.random()*1000)}</p>
                </div>
            </div>

            {/* Avatar & Upload */}
            <div className="mb-6 flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-lg border-2 border-dashed border-gray-600 bg-gray-900/50 flex items-center justify-center overflow-hidden mb-3 group shadow-lg">
                    {character.image ? (
                        <img src={character.image} alt="Character" className="w-full h-full object-cover" />
                    ) : (
                        <User size={48} className="text-gray-700" />
                    )}
                </div>

                <label className="cursor-pointer">
                    <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                    <div className="h-8 px-4 py-1.5 rounded-lg font-medium flex items-center justify-center gap-2 text-xs bg-neon-theme/10 border border-neon-theme/50 text-neon-theme hover:bg-neon-theme/20 transition-all shadow-[0_0_10px_rgba(var(--theme-color),0.3)]">
                        <Camera size={14} /> 
                        <span>{character.image ? 'ALTERAR FOTO' : 'ADICIONAR FOTO'}</span>
                    </div>
                </label>
            </div>

            {/* Info Grid */}
            <div className="w-full grid grid-cols-1 gap-3 text-sm">
                <div className="bg-black/30 p-2 rounded border-l-2 border-neon-theme">
                    <span className="text-[10px] text-gray-500 uppercase block font-bold">Nome</span>
                    <span className="font-display text-white tracking-wide">{character.name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/30 p-2 rounded border-l-2 border-neon-blue">
                        <span className="text-[10px] text-gray-500 uppercase block font-bold">Classe</span>
                        <div className="flex items-center space-x-1">
                            <Zap size={12} className="text-neon-blue" />
                            <span className="font-bold text-white">{character.class}</span>
                        </div>
                    </div>
                    <div className="bg-black/30 p-2 rounded border-l-2 border-neon-green">
                        <span className="text-[10px] text-gray-500 uppercase block font-bold">Nível</span>
                        <div className="flex items-center space-x-1">
                            <Shield size={12} className="text-neon-green" />
                            <span className="font-bold text-white">LV. {character.level}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/30 p-2 rounded border-l-2 border-gray-600">
                        <span className="text-[10px] text-gray-500 uppercase block font-bold">Raça</span>
                        <span className="text-gray-300 text-xs">{character.race || 'Desconhecida'}</span>
                    </div>
                    <div className="bg-black/30 p-2 rounded border-l-2 border-gray-600">
                        <span className="text-[10px] text-gray-500 uppercase block font-bold">Antecedente</span>
                        <span className="text-gray-300 text-xs">{character.background || 'Desconhecido'}</span>
                    </div>
                </div>
            </div>

            {/* Footer Barcode decoration */}
            <div className="w-full mt-6 flex flex-col items-center opacity-30">
                <div className="h-4 w-full bg-repeating-linear-gradient-to-r from-transparent via-white to-transparent" style={{backgroundSize: '4px 100%'}}></div>
                <span className="text-[8px] tracking-[0.5em] mt-1">HUNTER ASSOCIATION</span>
            </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-4 px-8">
          "Hunters dedicam-se à proteção do conhecimento, das pessoas e da natureza."
      </div>

    </div>
  );
};
