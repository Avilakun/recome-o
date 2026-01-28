import React, { useState, useRef } from 'react';
import { Shield, X, Dices, Brain, Activity, Eye, MessageCircle, Swords, Wind, Heart, BookOpen, Compass, Crown, Target, Dumbbell, Circle, CheckCircle } from 'lucide-react';
import { CharacterAttributes, RollEntry } from '../types';

interface AttributeGridProps {
  attributes: CharacterAttributes;
  level: number;
  skillProficiencies: string[];
  onAttributeChange?: (key: string, value: number) => void;
  onToggleSaveProficiency: (attrKey: string) => void;
  onToggleSkillProficiency: (skillName: string) => void;
  onRegisterRoll?: (entry: RollEntry) => void;
}

// Mapeamento de Perícias por Atributo
const SKILLS_BY_ATTR: Record<string, string[]> = {
  FOR: ['Atletismo'],
  DES: ['Acrobacia', 'Furtividade', 'Prestidigitação'],
  CON: ['Resistência'], 
  INT: ['Arcanismo / Nen', 'História', 'Investigação', 'Natureza', 'Religião'],
  SAB: ['Adestrar Animais', 'Intuição', 'Medicina', 'Percepção', 'Sobrevivência'],
  CAR: ['Atuação', 'Enganação', 'Intimidação', 'Persuasão']
};

const ATTRIBUTE_ICONS: Record<string, any> = {
  FOR: Dumbbell, 
  DES: Target,   
  CON: Activity,
  INT: Brain,
  SAB: Eye,
  CAR: MessageCircle
};

const SECONDARY_ICONS: Record<string, any> = {
  FOR: Swords,
  DES: Wind,
  CON: Heart,
  INT: BookOpen,
  SAB: Compass,
  CAR: Crown
};

const AttributeCard: React.FC<{ 
  attributeKey: string;
  label: string; 
  value: number; 
  modifier: number; 
  saveModifier: number;
  saveProficiency: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onRollSave: () => void;
}> = ({ 
  attributeKey, 
  label, 
  value, 
  modifier, 
  saveModifier,
  saveProficiency,
  onClick, 
  onDoubleClick, 
  onIncrease, 
  onDecrease,
  onRollSave
}) => {
  
  const modString = modifier >= 0 ? `+${modifier}` : `${modifier}`;
  const saveString = saveModifier >= 0 ? `+${saveModifier}` : `${saveModifier}`;
  const Icon = ATTRIBUTE_ICONS[attributeKey] || Shield;
  const SecondaryIcon = SECONDARY_ICONS[attributeKey];

  // Lógica para diferenciar Click de DoubleClick
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Se clicar nos botões de +/- ou no escudo, não dispara o popup do card
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.shield-trigger')) return;

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      onDoubleClick();
    } else {
      timer.current = setTimeout(() => {
        timer.current = null;
        onClick();
      }, 250); 
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="relative bg-gray-900/60 border border-neon-theme/30 rounded-3xl p-4 flex flex-col items-center justify-center backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-neon-theme/60 hover:bg-gray-800/80 cursor-pointer active:scale-95 select-none"
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <Icon size={12} className="text-neon-theme" />
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{label}</span>
        {SecondaryIcon && <SecondaryIcon size={12} className="text-neon-theme/40 ml-1" />}
      </div>
      
      {/* Main Value */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={(e) => { e.stopPropagation(); onDecrease(); }}
          className="text-gray-600 text-xs hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          -
        </button>
        <span className="font-display text-4xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
          {value}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onIncrease(); }}
          className="text-gray-600 text-xs hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          +
        </button>
      </div>

      {/* Modifier Pill */}
      <div className="mt-2 bg-neon-theme/10 border border-neon-theme/30 text-neon-theme px-3 py-0.5 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(var(--theme-color),0.1)] transition-colors duration-300">
        {modString}
      </div>

      {/* Defense/Shield Icon (Saving Throw) */}
      <div 
        onDoubleClick={(e) => { e.stopPropagation(); onRollSave(); }}
        className={`shield-trigger absolute top-4 right-4 flex flex-col items-center cursor-pointer transition-all hover:scale-110 active:scale-95 ${saveProficiency ? 'text-neon-theme drop-shadow-[0_0_5px_rgba(var(--theme-color),0.8)]' : 'text-gray-700 hover:text-gray-500'}`}
        title="Teste de Resistência (Duplo clique para rolar)"
      >
        <Shield size={20} className={saveProficiency ? "fill-neon-theme/20 stroke-neon-theme" : "fill-gray-900/50 stroke-current"} />
        <span className="text-[10px] mt-1 font-bold">{saveString}</span>
      </div>
    </div>
  );
};

export const AttributeGrid: React.FC<AttributeGridProps> = ({ 
  attributes, 
  level, 
  skillProficiencies, 
  onAttributeChange, 
  onToggleSaveProficiency, 
  onToggleSkillProficiency,
  onRegisterRoll
}) => {
  const [activeTab, setActiveTab] = useState('NORMAL');
  const [selectedSkillAttr, setSelectedSkillAttr] = useState<string | null>(null);
  
  // Calculate Proficiency Bonus based on level
  const proficiencyBonus = level >= 17 ? 6 : level >= 13 ? 5 : level >= 9 ? 4 : level >= 5 ? 3 : 2;

  interface RollResultState {
    total: number;
    d20: number;
    rolls: number[];
    mod: number;
    attr: string;
    mode: string;
  }

  const [rollResult, setRollResult] = useState<RollResultState | null>(null);

  const tabs = ['NORMAL', 'VANTAGEM', 'DESVANTAGEM', 'ÊNFASE'];
  const attributeKeys: (keyof CharacterAttributes)[] = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'];

  // Função centralizada de rolagem
  const performRoll = (label: string, modifier: number) => {
    const r1 = Math.floor(Math.random() * 20) + 1;
    let rolls = [r1];
    let selected = r1;

    if (activeTab !== 'NORMAL') {
        const r2 = Math.floor(Math.random() * 20) + 1;
        rolls = [r1, r2];

        if (activeTab === 'VANTAGEM') {
            selected = Math.max(r1, r2);
        } else if (activeTab === 'DESVANTAGEM') {
            selected = Math.min(r1, r2);
        } else if (activeTab === 'ÊNFASE') {
            // Seleciona o valor mais afastado de 10
            const dist1 = Math.abs(r1 - 10);
            const dist2 = Math.abs(r2 - 10);
            if (dist1 > dist2) selected = r1;
            else if (dist2 > dist1) selected = r2;
            else selected = Math.max(r1, r2); // Empate, critério arbitrário (maior)
        }
    }

    const total = selected + modifier;

    setRollResult({
      total: total,
      d20: selected,
      rolls: rolls,
      mod: modifier,
      attr: label,
      mode: activeTab
    });

    if (onRegisterRoll) {
        onRegisterRoll({
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            label: label,
            total: total,
            diceResults: rolls,
            modifier: modifier,
            mode: activeTab
        });
    }
  };

  // Manipulador de Rolagem (Double Click no Atributo)
  const handleRoll = (key: string) => {
    const attr = attributes[key as keyof CharacterAttributes];
    performRoll(attr.name, attr.modifier);
  };

  // Manipulador de Rolagem de TR
  const handleSaveRoll = (attrKey: string) => {
    const attr = attributes[attrKey as keyof CharacterAttributes];
    const mod = attr.modifier + (attr.saveProficiency ? proficiencyBonus : 0);
    performRoll(`TR ${attr.name}`, mod);
  };

  // Manipulador de Rolagem de Perícia (Double Click na Perícia)
  const handleSkillRoll = (skillName: string, attrKey: string) => {
    const attr = attributes[attrKey as keyof CharacterAttributes];
    const isProficient = skillProficiencies.includes(skillName);
    const mod = attr.modifier + (isProficient ? proficiencyBonus : 0);
    performRoll(skillName, mod);
  };

  return (
    <div className="flex-1 px-4 py-6 flex flex-col space-y-6 overflow-y-auto pb-24">
      
      {/* Tabs */}
      <div className="flex p-1 bg-gray-900 rounded-xl border border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300
              ${activeTab === tab 
                ? 'bg-neon-theme text-black shadow-[0_0_15px_rgba(var(--theme-color),0.4)]' 
                : 'text-gray-500 hover:text-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {attributeKeys.map((key) => {
          const attr = attributes[key];
          const saveMod = attr.modifier + (attr.saveProficiency ? proficiencyBonus : 0);
          
          return (
            <AttributeCard 
              key={key}
              attributeKey={key}
              label={attr.name}
              value={attr.value}
              modifier={attr.modifier}
              saveModifier={saveMod}
              saveProficiency={attr.saveProficiency || false}
              onClick={() => setSelectedSkillAttr(key)}
              onDoubleClick={() => handleRoll(key)}
              onIncrease={() => onAttributeChange && onAttributeChange(key, attr.value + 1)}
              onDecrease={() => onAttributeChange && onAttributeChange(key, attr.value - 1)}
              onRollSave={() => handleSaveRoll(key)}
            />
          );
        })}
      </div>

      {/* --- MODAL: PERÍCIAS (Single Click) --- */}
      {selectedSkillAttr && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedSkillAttr(null)}>
          <div className="bg-gray-900 border border-neon-theme rounded-2xl w-full max-w-xs overflow-hidden shadow-[0_0_30px_rgba(var(--theme-color),0.3)]" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-neon-theme/10 p-4 border-b border-neon-theme/30 flex justify-between items-center">
              <h3 className="text-neon-theme font-display font-bold text-lg flex items-center gap-2">
                {attributes[selectedSkillAttr as keyof CharacterAttributes].name}
              </h3>
              <button onClick={() => setSelectedSkillAttr(null)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Skills List Only - TR removed from here */}
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-3 tracking-widest">Perícias Relacionadas</p>
                <div className="space-y-2">
                    {SKILLS_BY_ATTR[selectedSkillAttr].map(skill => {
                        const isProficient = skillProficiencies.includes(skill);
                        const mod = attributes[selectedSkillAttr as keyof CharacterAttributes].modifier + (isProficient ? proficiencyBonus : 0);
                        
                        return (
                        <div 
                            key={skill} 
                            className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700 hover:border-neon-theme/50 transition-colors group cursor-pointer select-none"
                        >
                            <div className="flex items-center gap-3">
                                <button onClick={(e) => { e.stopPropagation(); onToggleSkillProficiency(skill); }} className="focus:outline-none">
                                    {isProficient ? 
                                        <CheckCircle className="text-neon-theme" size={16} /> : 
                                        <Circle className="text-gray-500 hover:text-gray-300" size={16} />
                                    }
                                </button>
                                <span 
                                    className="text-gray-200 font-medium text-sm group-hover:text-neon-theme transition-colors"
                                    onDoubleClick={() => handleSkillRoll(skill, selectedSkillAttr)}
                                >
                                    {skill}
                                </span>
                            </div>
                            <div 
                                className="bg-black/40 px-2 py-1 rounded text-xs font-bold text-gray-400"
                                onDoubleClick={() => handleSkillRoll(skill, selectedSkillAttr)}
                            >
                                {mod >= 0 ? '+' : ''}{mod}
                            </div>
                        </div>
                        );
                    })}
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-black/20 text-center">
              <p className="text-[10px] text-gray-500 italic">Toque duplo no valor para rolar</p>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: ROLAGEM DE DADOS (Double Click) --- */}
      {rollResult && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in zoom-in-95 duration-200" onClick={() => setRollResult(null)}>
          <div className="relative flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-neon-theme/20 blur-[100px] rounded-full"></div>

            <Dices size={48} className="text-neon-theme mb-4 animate-bounce" />
            
            <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-wider uppercase">{rollResult.attr}</h2>
            {rollResult.mode !== 'NORMAL' && (
                <span className="text-[10px] bg-neon-theme/20 text-neon-theme px-2 py-1 rounded mb-4 font-bold border border-neon-theme/30 uppercase tracking-widest">
                    {rollResult.mode}
                </span>
            )}
            
            <div className="relative w-48 h-48 flex items-center justify-center bg-gray-900 border-4 border-neon-theme rounded-full shadow-[0_0_50px_rgba(var(--theme-color),0.5)]">
               <span className={`text-6xl font-black font-display ${rollResult.d20 === 20 ? 'text-neon-yellow animate-pulse' : rollResult.d20 === 1 ? 'text-neon-red' : 'text-white'}`}>
                 {rollResult.total}
               </span>
               
               {/* Detail Bubble */}
               <div className="absolute -bottom-4 bg-gray-800 px-4 py-1 rounded-full border border-gray-600 flex items-center gap-2 shadow-lg">
                 <span className="text-gray-400 text-xs font-bold">d20 ({rollResult.d20})</span>
                 <span className="text-gray-600 text-[10px]">+</span>
                 <span className="text-neon-theme text-xs font-bold">Mod ({rollResult.mod})</span>
               </div>
            </div>

            {/* Display Multiple Rolls if applicable */}
            {rollResult.rolls.length > 1 && (
                <div className="flex gap-2 mt-8">
                    {rollResult.rolls.map((r, i) => (
                        <div key={i} className={`flex flex-col items-center p-2 rounded border ${r === rollResult.d20 ? 'bg-neon-theme/10 border-neon-theme' : 'bg-gray-800 border-gray-700 opacity-50'}`}>
                            <span className="text-[10px] text-gray-500 uppercase">Dado {i + 1}</span>
                            <span className={`text-xl font-bold ${r === 20 ? 'text-neon-yellow' : r === 1 ? 'text-neon-red' : 'text-white'}`}>{r}</span>
                        </div>
                    ))}
                </div>
            )}

            <p className="mt-8 text-gray-400 text-sm animate-pulse">Toque em qualquer lugar para fechar</p>
          </div>
        </div>
      )}

    </div>
  );
};