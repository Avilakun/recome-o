import React, { useState, useEffect } from 'react';
import { SYSTEM_DB } from './data';
import { Character, CharacterAttributes, Race, RaceFeature, BackgroundFeature, Inclination } from '../types';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  User, 
  Sword, 
  BookOpen, 
  Circle,
  Zap,
  Star,
  Dumbbell,
  Target,
  Brain,
  Eye,
  MessageCircle,
  Activity,
  GraduationCap,
  Shield,
  ChevronDown,
  Info,
  Backpack,
  Sparkles,
  Dices,
  Coins,
  LayoutList,
  Edit3,
  Lock,
  AlertTriangle,
  GripVertical,
  X,
  Scale,
  ThumbsUp,
  ThumbsDown,
  Hammer
} from 'lucide-react';

interface CharacterCreatorProps {
  onComplete: (character: Character) => void;
  onCancel: () => void;
}

const STEPS = ['CONCEITO', 'RAÇA', 'ATRIBUTOS', 'ANTECEDENTE', 'INCLINAÇÃO', 'TREINAMENTOS'];

const SKILL_LIST = [
  { name: 'Atletismo', attr: 'FOR' },
  { name: 'Acrobacia', attr: 'DES' },
  { name: 'Furtividade', attr: 'DES' },
  { name: 'Prestidigitação', attr: 'DES' },
  { name: 'Arcanismo / Nen', attr: 'INT' },
  { name: 'História', attr: 'INT' },
  { name: 'Investigação', attr: 'INT' },
  { name: 'Natureza', attr: 'INT' },
  { name: 'Religião', attr: 'INT' },
  { name: 'Adestrar Animais', attr: 'SAB' },
  { name: 'Intuição', attr: 'SAB' },
  { name: 'Medicina', attr: 'SAB' },
  { name: 'Percepção', attr: 'SAB' },
  { name: 'Sobrevivência', attr: 'SAB' },
  { name: 'Atuação', attr: 'CAR' },
  { name: 'Enganação', attr: 'CAR' },
  { name: 'Intimidação', attr: 'CAR' },
  { name: 'Persuasão', attr: 'CAR' }
];

const SAVE_LIST = [
  { name: 'TR: FORÇA', attr: 'FOR', isSave: true },
  { name: 'TR: DESTREZA', attr: 'DES', isSave: true },
  { name: 'TR: CONSTITUIÇÃO', attr: 'CON', isSave: true },
  { name: 'TR: INTELIGÊNCIA', attr: 'INT', isSave: true },
  { name: 'TR: SABEDORIA', attr: 'SAB', isSave: true },
  { name: 'TR: CARISMA', attr: 'CAR', isSave: true }
];

const EQUIPMENT_OPTIONS = [
  "Armas de Cerco",
  "Equipamentos de Proteção e Armaduras Médias",
  "Equipamentos de Proteção e Armaduras Pesadas",
  "Equipamentos Improvisados/Manufaturados (Bugigangas e Armas de Hatsus criativos)",
  "Científicas/Explosivas",
  "Linguas Antigas e Culturas",
  "Marciais corpo-a-corpo",
  "Marciais à distância",
  "Simples corpo-a-corpo",
  "Simples à distância"
];

const TRAINING_OPTIONS = [...SAVE_LIST, ...SKILL_LIST];

// Ordem circular para cálculo de adjacência
const NEN_ORDER = ['INTENSIFICAÇÃO', 'TRANSFORMAÇÃO', 'MATERIALIZAÇÃO', 'ESPECIALIZAÇÃO', 'MANIPULAÇÃO', 'EMISSÃO'];

const NEN_TYPES = [
  { id: 'INTENSIFICAÇÃO', label: 'INTENSIFICAÇÃO', color: '#00ff9d', x: 150, y: 50, desc: 'Focado em fortalecer o próprio corpo ou objetos.' },
  { id: 'TRANSFORMAÇÃO', label: 'TRANSFORMAÇÃO', color: '#d946ef', x: 237, y: 100, desc: 'Muda as propriedades e atributos da aura.' },
  { id: 'MATERIALIZAÇÃO', label: 'MATERIALIZAÇÃO', color: '#ff0055', x: 237, y: 200, desc: 'Cria objetos físicos e independentes da aura.' },
  { id: 'ESPECIALIZAÇÃO', label: 'ESPECIALIZAÇÃO', color: '#00f0ff', x: 150, y: 250, desc: 'Capacidades únicas que não se encaixam em outras.' },
  { id: 'MANIPULAÇÃO', label: 'MANIPULAÇÃO', color: '#9ca3af', x: 63, y: 200, desc: 'Controla seres vivos ou objetos inanimados.' },
  { id: 'EMISSÃO', label: 'EMISSÃO', color: '#ffe600', x: 63, y: 100, desc: 'Projeta aura para longe do corpo físico.' },
];

const POINT_COST_TABLE: Record<number, number> = {
  20: 20, 19: 17, 18: 14, 17: 11, 16: 8, 15: 6, 14: 4, 13: 3, 12: 2, 11: 1,
  10: 0, 9: -1, 8: -2, 7: -4, 6: -6, 5: -8, 4: -11, 3: -14, 2: -17, 1: -20
};

const hexToRgbString = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

interface GenValue {
  id: string;
  val: number;
}

// --- Helpers para Inclinações ---

const getInclinationCost = (inc: Inclination): number => {
  // Se for uma sub-opção selecionada
  if (inc.selectedOption) {
      // 1. Verificar em 'opcoes' (Ex: Contatos, Sentidos Aguçados)
      if (inc.opcoes) {
          const opt = inc.opcoes.find((o: any) => 
              (typeof o === 'string' ? o : o.nome) === inc.selectedOption
          );
          
          if (opt) {
              // Se a opção for objeto e tiver custo explícito (Ex: Contatos)
              if (typeof opt === 'object' && opt.custo) {
                  const match = opt.custo.match(/(\d+)/);
                  return match ? parseInt(match[1]) : 0;
              }
              // Se for string ou objeto sem custo (Ex: Sentidos Aguçados)
              // Verifica custo base da inclinação pai para "por sentido" ou "por escolha"
              if (inc.custo && (inc.custo.includes("1 pt") || inc.custo.includes("1 ponto"))) return 1;
          }
      }

      // 2. Verificar em 'beneficios' (Ex: Inventor)
      if (inc.beneficios) {
          const ben = inc.beneficios.find(b => b === inc.selectedOption);
          if (ben) {
              // Procura padrão "(1 ponto)" ou "(X pontos)"
              const match = ben.match(/\((\d+)\s*(ponto|pt)/i);
              return match ? parseInt(match[1]) : 1; // Default 1 se não achar
          }
      }
  }

  // Custo base (Para inclinações simples sem sub-opções, ou se não for "Varia")
  if (inc.custo) {
      // Se diz "Varia" ou "por sentido", o custo base é 0 (vem das opções)
      if (inc.custo.toLowerCase().includes("varia") || inc.custo.toLowerCase().includes("por sentido")) {
          return 0;
      }
      const match = inc.custo.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
  }

  return 0;
};

const getInclinationValue = (inc: Inclination): number => {
  // Para inclinações negativas com categorias (Ex: Inimigo)
  if (inc.selectedOption && inc.categorias) {
       const cat = inc.categorias.find((c: any) => c.nome === inc.selectedOption);
       if (cat && cat.valor) {
            const match = cat.valor.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
       }
  }
  
  if (inc.valor_compensacao) {
      if (inc.valor_compensacao.toLowerCase().includes("varia")) return 0;
      const match = inc.valor_compensacao.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
  }
  return 0;
};

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    class: 'INTENSIFICAÇÃO', 
    race: null as Race | null,
    background: null as any,
    attributes: {
      FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10
    },
    racialAllocation: { FOR: 0, DES: 0, CON: 0, INT: 0, SAB: 0, CAR: 0 } as Record<string, number>,
    selectedTrainings: [] as string[],
    selectedEquipmentProficiencies: [] as string[],
    inclinations: [] as Inclination[]
  });

  const [bgFeatureChoice, setBgFeatureChoice] = useState<BackgroundFeature | null>(null);
  
  // Attribute Generation State
  const [genMethod, setGenMethod] = useState<'ROLAGEM' | 'COMPRA' | 'PADRAO'>('ROLAGEM');
  const [generatedValues, setGeneratedValues] = useState<GenValue[]>([]);
  const [assignedIds, setAssignedIds] = useState<Record<string, string | null>>({}); // Attr Key -> GenValue ID
  const [hasRolled, setHasRolled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // UI States for Expansion
  const [expandedRace, setExpandedRace] = useState<string | null>(null);
  const [expandedBg, setExpandedBg] = useState<string | null>(null);
  const [expandedInc, setExpandedInc] = useState<string | null>(null);

  // Reset allocations when race changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      racialAllocation: { FOR: 0, DES: 0, CON: 0, INT: 0, SAB: 0, CAR: 0 }
    }));
  }, [formData.race]);

  // Reset attributes when changing generation method
  useEffect(() => {
    if (step === 2 && !isLocked) {
        setHasRolled(false);
        setGeneratedValues([]);
        setAssignedIds({});
        setFormData(prev => ({
            ...prev,
            attributes: { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 }
        }));
    }
  }, [genMethod, step]);

  useEffect(() => {
    const selectedType = NEN_TYPES.find(t => t.id === formData.class);
    if (selectedType) {
      const rgbString = hexToRgbString(selectedType.color);
      document.documentElement.style.setProperty('--theme-color', rgbString);
    }
  }, [formData.class]);

  const allRaces = [
    ...SYSTEM_DB.personagem.racas.humanos_e_tribos,
    ...SYSTEM_DB.personagem.racas.clas_especiais,
    ...(SYSTEM_DB.personagem.racas.modificados_e_fantasia || []),
    ...(SYSTEM_DB.personagem.racas.tecnologicos_e_sobrenaturais || [])
  ];

  // Inclination Balance Logic
  const getInclinationBalance = () => {
      const positives = formData.inclinations.filter(i => SYSTEM_DB.inclinacoes_gerais_basicas?.positivas.some(p => p.nome === i.nome));
      const negatives = formData.inclinations.filter(i => SYSTEM_DB.inclinacoes_gerais_basicas?.negativas.some(n => n.nome === i.nome));

      // Calculate Negative Value (Compensation Provided)
      const negativeValue = negatives.reduce((sum, n) => sum + getInclinationValue(n), 0);

      // Calculate Positive Cost
      let positiveCosts = positives.map(p => getInclinationCost(p)).sort((a, b) => b - a);
      
      // First (most expensive) positive is free
      if (positiveCosts.length > 0) {
          positiveCosts.shift(); 
      }

      const neededCompensation = positiveCosts.reduce((sum, c) => sum + c, 0);
      
      return {
          negValue: negativeValue,
          needed: neededCompensation,
          balance: negativeValue - neededCompensation,
          positiveCount: positives.length
      };
  };
  
  const getRemainingRacialPoints = (): number => {
    if (!formData.race) return 0;
    if (!formData.race.tipo_distribuicao || formData.race.tipo_distribuicao === 'fixo') return 0;
    const maxPoints = formData.race.pontos_distribuir || 0;
    const currentPoints = (Object.values(formData.racialAllocation) as number[]).reduce((a: number, b: number) => a + b, 0);
    return maxPoints - currentPoints;
  };

  const getPointBuyCost = () => {
      return (Object.values(formData.attributes) as number[]).reduce((total: number, val: number) => {
          return total + (POINT_COST_TABLE[val] || 0);
      }, 0);
  };
  const POINT_BUY_BUDGET = 20;

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetAttr: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const valObj = generatedValues.find(g => g.id === id);
    
    if (valObj) {
        const newAssignedIds = { ...assignedIds };
        Object.keys(newAssignedIds).forEach(key => {
            if (newAssignedIds[key] === id) newAssignedIds[key] = null;
        });
        newAssignedIds[targetAttr] = id;
        setAssignedIds(newAssignedIds);
        setFormData(prev => ({
            ...prev,
            attributes: { ...prev.attributes, [targetAttr]: valObj.val }
        }));
    }
  };

  const handleUnassign = (attrKey: string) => {
      setAssignedIds(prev => ({ ...prev, [attrKey]: null }));
      setFormData(prev => ({
          ...prev,
          attributes: { ...prev.attributes, [attrKey]: 0 }
      }));
  };

  const getNenPercentage = (targetId: string, selectedId: string) => {
    if (targetId === selectedId) return '100%';
    if (targetId === 'ESPECIALIZAÇÃO') {
        if (selectedId === 'MANIPULAÇÃO' || selectedId === 'MATERIALIZAÇÃO') return '1%';
        return '0%';
    }
    const idxSelected = NEN_ORDER.indexOf(selectedId);
    const idxTarget = NEN_ORDER.indexOf(targetId);
    let dist = Math.abs(idxSelected - idxTarget);
    if (dist > 3) dist = 6 - dist;
    switch (dist) {
        case 1: return '80%';
        case 2: return '60%';
        case 3: return '40%';
        default: return '0%';
    }
  };

  const updateAttribute = (key: string, delta: number) => {
    if (!isLocked) setIsLocked(true);
    const currentVal = (formData.attributes as any)[key];
    const newVal = Math.min(20, Math.max(1, currentVal + delta));
    setFormData(prev => ({ ...prev, attributes: { ...prev.attributes, [key]: newVal } }));
  };

  const updateRacialAllocation = (key: string, delta: number) => {
    const currentVal = formData.racialAllocation[key];
    const remaining = getRemainingRacialPoints();
    if (delta > 0 && remaining <= 0) return;
    if (delta < 0 && currentVal <= 0) return;
    if (formData.race?.tipo_distribuicao === 'escolha' && formData.race.opcoes_atributo) {
        if (!formData.race.opcoes_atributo.includes(key)) return;
    }
    setFormData(prev => ({
        ...prev,
        racialAllocation: { ...prev.racialAllocation, [key]: currentVal + delta }
    }));
  };

  const toggleTraining = (optionName: string) => {
    setFormData(prev => {
      const current = [...prev.selectedTrainings];
      if (current.includes(optionName)) {
        return { ...prev, selectedTrainings: current.filter(s => s !== optionName) };
      } else if (current.length < 5) {
        return { ...prev, selectedTrainings: [...current, optionName] };
      }
      return prev;
    });
  };

  const toggleEquipmentProficiency = (optionName: string) => {
      setFormData(prev => {
          const current = [...prev.selectedEquipmentProficiencies];
          if (current.includes(optionName)) {
              return { ...prev, selectedEquipmentProficiencies: current.filter(s => s !== optionName) };
          } else if (current.length < 4) {
              return { ...prev, selectedEquipmentProficiencies: [...current, optionName] };
          }
          return prev;
      });
  };

  const handleRollStats = () => {
      if (hasRolled) return;
      setIsLocked(true);
      const newVals: GenValue[] = [];
      for (let i = 0; i < 6; i++) {
          const dice = [];
          for (let j = 0; j < 4; j++) {
              let r = Math.floor(Math.random() * 6) + 1;
              if (r === 1) r = Math.floor(Math.random() * 6) + 1;
              dice.push(r);
          }
          dice.sort((a, b) => a - b);
          const sum = dice.slice(1).reduce((a, b) => a + b, 0);
          newVals.push({ id: `roll-${i}`, val: sum });
      }
      newVals.sort((a, b) => b.val - a.val);
      setGeneratedValues(newVals);
      setHasRolled(true);
      setFormData(prev => ({...prev, attributes: { FOR:0, DES:0, CON:0, INT:0, SAB:0, CAR:0 } }));
  };

  const handleStandardArray = () => {
      setIsLocked(true);
      const std = [15, 14, 13, 12, 10, 8];
      const newVals = std.map((v, i) => ({ id: `std-${i}`, val: v }));
      setGeneratedValues(newVals);
      setHasRolled(true);
      setFormData(prev => ({...prev, attributes: { FOR:0, DES:0, CON:0, INT:0, SAB:0, CAR:0 } }));
  };

  // Logic for Inclinations Selection
  const toggleInclination = (inc: Inclination, optionName?: string) => {
      setFormData(prev => {
          const current = [...prev.inclinations];
          const existingIndex = current.findIndex(i => i.nome === inc.nome && i.selectedOption === optionName);

          if (existingIndex >= 0) {
              current.splice(existingIndex, 1);
          } else {
              // Ensure uniqueness rule if needed, or allow multiple.
              // For Inventor/Contatos/Etc, we allow multiple as long as optionName is different
              // If simple inclination (no option), uniqueness is handled by existingIndex check above.
              
              if ((inc.opcoes || inc.categorias || inc.beneficios) && !optionName) {
                  return prev; // Force user to click sub-option if available
              }

              current.push({ ...inc, selectedOption: optionName });
          }
          return { ...prev, inclinations: current };
      });
  };

  const handlePrev = () => {
    if (step === 0) {
      onCancel();
    } else {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step === 0 && !formData.name) { alert("Dê um nome ao seu Hunter!"); return; }
    if (step === 1 && !formData.race) { alert("Selecione sua raça!"); return; }
    
    if (step === 2) {
       if (genMethod === 'ROLAGEM' || genMethod === 'PADRAO') {
           if (!hasRolled) { alert("Você precisa gerar os valores primeiro!"); return; }
           const assignedCount = Object.values(assignedIds).filter(id => id !== null && id !== undefined).length;
           if (assignedCount < 6) {
               alert("Você deve distribuir todos os valores gerados nos atributos.");
               return;
           }
       }
       if (genMethod === 'COMPRA') {
           if (getPointBuyCost() > POINT_BUY_BUDGET) {
               alert(`Você gastou mais pontos do que o permitido! (${getPointBuyCost()}/${POINT_BUY_BUDGET})`);
               return;
           }
       }
       const remaining = getRemainingRacialPoints();
       if (remaining > 0) {
         alert(`Você ainda tem ${remaining} pontos de atributo racial para distribuir!`);
         return;
       }
    }

    if (step === 3) {
        if (!formData.background) { alert("Selecione seu antecedente!"); return; }
        if (formData.background.caracteristicas && formData.background.caracteristicas.length > 0 && !bgFeatureChoice) {
            alert("Selecione uma Característica Única para o Antecedente!");
            return;
        }
    }

    if (step === 4) {
        // Inclinations Validation
        const { balance, negValue } = getInclinationBalance();
        if (balance < 0) {
            alert(`Você tem inclinações positivas extras sem compensação suficiente. Faltam ${Math.abs(balance)} pontos.`);
            return;
        }
        if (negValue > 10) {
            alert(`O limite de compensação por inclinações negativas é de 10 pontos. Você tem ${negValue}.`);
            return;
        }
    }
    
    if (step === 5) {
        if (formData.selectedTrainings.length < 2) { 
            alert("Escolha pelo menos 2 treinamentos (Perícias ou TRs)!"); 
            return; 
        }
        if (formData.selectedTrainings.length > 5) {
            alert("Você selecionou mais de 5 treinamentos!");
            return;
        }
        if (formData.selectedEquipmentProficiencies.length < 4) {
            alert("Escolha 4 proficiências de equipamentos/linguagens!");
            return;
        }
    }

    if (step < STEPS.length - 1) setStep(step + 1);
    else handleFinish();
  };

  const handleFinish = () => {
    const mods = (val: number) => Math.floor((val - 10) / 2);
    const finalAttributes: any = {};
    
    Object.keys(formData.attributes).forEach(key => {
      const baseVal = (formData.attributes as any)[key];
      let fixedBonus = 0;
      if (formData.race?.aumento_atributo && typeof formData.race.aumento_atributo === 'object') {
          fixedBonus = (formData.race.aumento_atributo as any)[key] || 0;
      }
      const varBonus = formData.racialAllocation[key] || 0;
      const total = baseVal + fixedBonus + varBonus;
      const names: any = { FOR: "FORÇA", DES: "DESTREZA", CON: "CONSTITUIÇÃO", INT: "INTELIGÊNCIA", SAB: "SABEDORIA", CAR: "CARISMA" };
      
      const hasSave = formData.selectedTrainings.includes(`TR: ${names[key]}`);

      finalAttributes[key] = { 
          name: names[key], 
          value: total, 
          modifier: mods(total), 
          temp: 0, 
          saveProficiency: hasSave 
      };
    });

    let finalSkills: string[] = [];
    formData.selectedTrainings.forEach(t => {
        if (!t.startsWith('TR:')) {
            finalSkills.push(t);
        }
    });

    if (formData.background?.proficiencias) {
      const bgSkills = formData.background.proficiencias.split(/, | e /);
      bgSkills.forEach((s: string) => {
        const trimmed = s.trim();
        if (trimmed && !finalSkills.includes(trimmed) && !trimmed.toLowerCase().includes('kit')) {
             if (trimmed.includes(' ou ')) {
                 const choices = trimmed.split(' ou ');
                 const pick = choices.find(c => !finalSkills.includes(c)) || choices[0];
                 finalSkills.push(pick);
             } else {
                 finalSkills.push(trimmed);
             }
        }
      });
    }

    const newCharacter: Character = {
      name: formData.name,
      class: formData.class,
      race: formData.race?.nome,
      background: formData.background?.nome,
      level: 0,
      xp: 0,
      xp_next: 50,
      nen_unlocked: false,
      attributes: finalAttributes,
      vitals: {
        pv: { current: 15 + finalAttributes.CON.modifier, max: 15 + finalAttributes.CON.modifier },
        aura: { current: 100, max: 100 },
        san: { current: 10 + finalAttributes.INT.modifier, max: 10 + finalAttributes.INT.modifier },
        rea: { current: 7 + finalAttributes.SAB.modifier, max: 7 + finalAttributes.SAB.modifier },
        ca: 10 + finalAttributes.CON.modifier,
        desl: 9
      },
      skillProficiencies: finalSkills,
      equipmentProficiencies: formData.selectedEquipmentProficiencies,
      raceFeatures: formData.race?.caracteristicas_especiais?.map(f => ({ name: f.nome, description: f.efeito || f.mecanica || '' })) || [],
      backgroundData: formData.background ? {
          ...formData.background,
          caracteristicas: bgFeatureChoice ? [bgFeatureChoice] : formData.background.caracteristicas
      } : undefined,
      inclinations: formData.inclinations,
      inventory: [],
      dinheiro: 2000,
      rollHistory: [] 
    };
    onComplete(newCharacter);
  };

  const renderInclinationSection = () => {
      const { balance, negValue, needed, positiveCount } = getInclinationBalance();
      const positives = SYSTEM_DB.inclinacoes_gerais_basicas?.positivas || [];
      const negatives = SYSTEM_DB.inclinacoes_gerais_basicas?.negativas || [];

      return (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500 pb-20">
              <div className="text-center">
                  <h2 className="text-4xl font-display font-black text-white tracking-widest uppercase">INCLINAÇÃO</h2>
                  <p className="text-gray-500 text-xs mt-2 px-4">{SYSTEM_DB.inclinacoes_gerais_basicas?.regras_de_aquisicao}</p>
              </div>

              {/* Status Bar */}
              <div className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur border border-gray-700 rounded-xl p-4 flex justify-between items-center shadow-xl">
                  <div className="flex flex-col items-center w-1/3 border-r border-gray-800">
                      <span className="text-[9px] text-gray-500 font-bold uppercase">Custo Positivo</span>
                      <span className={`text-xl font-display font-bold ${needed > 0 ? 'text-neon-green' : 'text-gray-400'}`}>
                          {needed} <span className="text-xs font-normal text-gray-600">pts</span>
                      </span>
                  </div>
                  
                  <div className="flex flex-col items-center w-1/3">
                      <span className="text-[9px] text-gray-500 font-bold uppercase">Compensação</span>
                      <div className="flex items-center gap-2">
                          <Scale size={16} className={balance >= 0 ? 'text-neon-blue' : 'text-neon-red'} />
                          <span className={`text-xl font-display font-bold ${balance >= 0 ? 'text-neon-blue' : 'text-neon-red'}`}>
                              {balance >= 0 ? 'OK' : balance}
                          </span>
                      </div>
                  </div>

                  <div className="flex flex-col items-center w-1/3 border-l border-gray-800">
                      <span className="text-[9px] text-gray-500 font-bold uppercase">Pontos Neg.</span>
                      <span className={`text-xl font-display font-bold ${negValue > 10 ? 'text-neon-red' : 'text-neon-red/80'}`}>
                          {negValue} <span className="text-xs font-normal text-gray-600">/ 10</span>
                      </span>
                  </div>
              </div>

              <div className="space-y-6">
                  {/* Positivas */}
                  <div>
                      <div className="flex items-center gap-2 mb-4 text-neon-green border-b border-gray-800 pb-2">
                          <ThumbsUp size={18} />
                          <h3 className="text-sm font-bold uppercase tracking-widest">Gerais Positivas</h3>
                          <span className="text-[10px] text-gray-500 ml-auto bg-gray-800 px-2 py-1 rounded">1ª Grátis (Maior Valor)</span>
                      </div>
                      <div className="space-y-3">
                          {positives.map((inc) => {
                              const isSelected = formData.inclinations.some(i => i.nome === inc.nome && !i.selectedOption);
                              const isExpanded = expandedInc === inc.nome;
                              const hasOptions = inc.opcoes || inc.beneficios || (inc.nome === "Sentidos Aguçados");

                              return (
                                  <div key={inc.nome} className={`border rounded-xl transition-all ${isSelected ? 'bg-neon-green/5 border-neon-green' : 'bg-gray-900 border-gray-800'}`}>
                                      <button 
                                          onClick={() => {
                                              if (hasOptions) {
                                                  setExpandedInc(isExpanded ? null : inc.nome);
                                              } else {
                                                  toggleInclination(inc);
                                              }
                                          }}
                                          className="w-full flex items-center justify-between p-4 text-left"
                                      >
                                          <div className="flex-1">
                                              <div className="flex items-center gap-2">
                                                  <span className={`text-sm font-bold ${isSelected || isExpanded ? 'text-neon-green' : 'text-white'}`}>{inc.nome}</span>
                                                  <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 border border-gray-700">{inc.custo}</span>
                                              </div>
                                              {!isExpanded && <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{inc.descricao}</p>}
                                          </div>
                                          {hasOptions ? (
                                              isExpanded ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />
                                          ) : (
                                              isSelected && <Check size={16} className="text-neon-green" />
                                          )}
                                      </button>

                                      {(isExpanded || (hasOptions && isSelected)) && (
                                          <div className="px-4 pb-4 border-t border-gray-800/50 pt-3">
                                              <p className="text-xs text-gray-300 mb-4">{inc.descricao}</p>
                                              
                                              {/* Options Handling */}
                                              {inc.opcoes && (
                                                  <div className="space-y-2">
                                                      {inc.opcoes.map((opt: any) => {
                                                          const optName = typeof opt === 'string' ? opt : opt.nome;
                                                          const isOptSelected = formData.inclinations.some(i => i.nome === inc.nome && i.selectedOption === optName);
                                                          return (
                                                              <button 
                                                                  key={optName}
                                                                  onClick={() => toggleInclination(inc, optName)}
                                                                  className={`w-full flex justify-between items-center p-2 rounded border ${isOptSelected ? 'bg-neon-green/10 border-neon-green' : 'bg-black/30 border-gray-700 hover:border-gray-500'}`}
                                                              >
                                                                  <div className="text-left">
                                                                      <span className="text-xs font-bold text-white block">
                                                                        {optName} 
                                                                        {opt.custo && <span className="text-[9px] text-gray-500 ml-1">({opt.custo})</span>}
                                                                      </span>
                                                                      {opt.efeito && <span className="text-[10px] text-gray-400">{opt.efeito}</span>}
                                                                  </div>
                                                                  {isOptSelected && <Check size={14} className="text-neon-green" />}
                                                              </button>
                                                          );
                                                      })}
                                                  </div>
                                              )}

                                              {/* Checkbox style for benefits (Inventor) */}
                                              {inc.beneficios && (
                                                  <div className="space-y-2">
                                                      {inc.beneficios.map((opt: any) => {
                                                          const optName = typeof opt === 'string' ? opt : opt.nome || opt; 
                                                          const isOptSelected = formData.inclinations.some(i => i.nome === inc.nome && i.selectedOption === optName);
                                                          return (
                                                              <button
                                                                  key={optName}
                                                                  onClick={() => toggleInclination(inc, optName)}
                                                                  className={`w-full flex items-center gap-2 p-2 rounded border text-left ${isOptSelected ? 'bg-neon-green/10 border-neon-green' : 'bg-black/30 border-gray-700'}`}
                                                              >
                                                                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${isOptSelected ? 'bg-neon-green border-neon-green' : 'border-gray-500'}`}>
                                                                      {isOptSelected && <Check size={10} className="text-black" />}
                                                                  </div>
                                                                  <span className="text-xs text-gray-300">{optName}</span>
                                                              </button>
                                                          );
                                                      })}
                                                  </div>
                                              )}
                                          </div>
                                      )}
                                  </div>
                              );
                          })}
                      </div>
                  </div>

                  {/* Negativas */}
                  <div>
                      <div className="flex items-center gap-2 mb-4 text-neon-red border-b border-gray-800 pb-2">
                          <ThumbsDown size={18} />
                          <h3 className="text-sm font-bold uppercase tracking-widest">Gerais Negativas</h3>
                      </div>
                      <div className="space-y-3">
                          {negatives.map((inc) => {
                              const isSelected = formData.inclinations.some(i => i.nome === inc.nome && !i.selectedOption);
                              const isExpanded = expandedInc === inc.nome;
                              const hasOptions = inc.categorias; // For "Inimigo"

                              return (
                                  <div key={inc.nome} className={`border rounded-xl transition-all ${isSelected ? 'bg-neon-red/5 border-neon-red' : 'bg-gray-900 border-gray-800'}`}>
                                      <button 
                                          onClick={() => {
                                              if (hasOptions) {
                                                  setExpandedInc(isExpanded ? null : inc.nome);
                                              } else {
                                                  toggleInclination(inc);
                                              }
                                          }}
                                          className="w-full flex items-center justify-between p-4 text-left"
                                      >
                                          <div className="flex-1">
                                              <div className="flex items-center gap-2">
                                                  <span className={`text-sm font-bold ${isSelected || isExpanded ? 'text-neon-red' : 'text-white'}`}>{inc.nome}</span>
                                                  <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 border border-gray-700">{inc.valor_compensacao}</span>
                                              </div>
                                              {!isExpanded && <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{inc.descricao}</p>}
                                          </div>
                                          {hasOptions ? (
                                              isExpanded ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />
                                          ) : (
                                              isSelected && <Check size={16} className="text-neon-red" />
                                          )}
                                      </button>

                                      {(isExpanded || (hasOptions && isSelected)) && (
                                          <div className="px-4 pb-4 border-t border-gray-800/50 pt-3">
                                              <p className="text-xs text-gray-300 mb-4">{inc.descricao}</p>
                                              
                                              {/* Categories Handling (Inimigo) */}
                                              {inc.categorias && (
                                                  <div className="space-y-2">
                                                      {inc.categorias.map((cat: any) => {
                                                          const isCatSelected = formData.inclinations.some(i => i.nome === inc.nome && i.selectedOption === cat.nome);
                                                          return (
                                                              <button 
                                                                  key={cat.nome}
                                                                  onClick={() => toggleInclination(inc, cat.nome)}
                                                                  className={`w-full flex justify-between items-center p-2 rounded border ${isCatSelected ? 'bg-neon-red/10 border-neon-red' : 'bg-black/30 border-gray-700 hover:border-gray-500'}`}
                                                              >
                                                                  <div className="text-left">
                                                                      <span className="text-xs font-bold text-white block">{cat.nome} ({cat.valor})</span>
                                                                      <span className="text-[10px] text-gray-400">{cat.efeito}</span>
                                                                  </div>
                                                                  {isCatSelected && <Check size={14} className="text-neon-red" />}
                                                              </button>
                                                          );
                                                      })}
                                                  </div>
                                              )}
                                          </div>
                                      )}
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-gray-200 animate-in fade-in duration-500 overflow-hidden font-sans">
      
      {/* Dynamic Header */}
      <div className="px-8 py-6 bg-neon-dark border-b border-gray-800 flex justify-between items-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-theme/10 to-transparent pointer-events-none" />
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center z-10 transition-all duration-300">
            <div className={`w-3 h-3 rounded-full mb-2 transition-all duration-500 ${i <= step ? 'bg-neon-theme shadow-[0_0_15px_rgba(var(--theme-color),1)] scale-125' : 'bg-gray-800'}`} />
            <span className={`text-[9px] font-black tracking-[0.2em] uppercase transition-colors ${i <= step ? 'text-neon-theme' : 'text-gray-600'}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-black/50">
        <div className="p-8 max-w-xl mx-auto space-y-12 pb-24">
          
          {step === 0 && (
            <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-500">
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-display font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">IDENTIDADE</h2>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-neon-theme uppercase tracking-[0.3em] ml-2">Nome do Candidato</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-gray-950/80 border-2 border-gray-800 rounded-3xl p-6 text-2xl font-display font-bold text-white focus:border-neon-theme focus:outline-none transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]" 
                  placeholder="INSIRA SEU NOME..." 
                />
              </div>

              <div className="flex flex-col items-center bg-gray-900/40 p-10 rounded-[3rem] border border-gray-800/60 backdrop-blur-md">
                <div className="relative mb-8 transform hover:scale-105 transition-transform duration-500">
                  <svg width="260" height="260" viewBox="0 0 300 300" className="select-none overflow-visible drop-shadow-[0_0_20px_rgba(var(--theme-color),0.3)]">
                    <polygon points="150,50 237,100 237,200 150,250 63,200 63,100" fill="none" stroke="#222" strokeWidth="6" />
                    {NEN_TYPES.map((type) => {
                      const isSelected = formData.class === type.id;
                      const percentage = getNenPercentage(type.id, formData.class);
                      return (
                        <g key={type.id} onClick={() => setFormData({...formData, class: type.id})} className="cursor-pointer group">
                          <circle cx={type.x} cy={type.y} r={32} fill={isSelected ? type.color : '#0a0a0f'} stroke={type.color} strokeWidth={isSelected ? 0 : 3} className="transition-all duration-300" />
                          <text x={type.x} y={type.y + 5} textAnchor="middle" fill={isSelected ? '#000' : type.color} fontSize="14" fontWeight="900" className="pointer-events-none font-display tracking-tight">{percentage}</text>
                          <text x={type.x} y={type.y < 150 ? type.y - 45 : type.y + 55} textAnchor="middle" fill={isSelected ? type.color : '#555'} fontSize="9" fontWeight="black" className="tracking-tighter uppercase transition-colors">{type.label}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                {NEN_TYPES.find(t => t.id === formData.class) && (
                  <div className="text-center animate-in fade-in zoom-in-95 duration-500">
                    <h3 className="text-xs font-black tracking-widest text-neon-theme uppercase mb-2">{formData.class}</h3>
                    <p className="text-xs text-gray-400 italic leading-relaxed">{NEN_TYPES.find(t => t.id === formData.class)?.desc}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
              <div className="text-center">
                  <h2 className="text-4xl font-display font-black text-white tracking-widest uppercase">RAÇA</h2>
                  <p className="text-gray-500 text-xs mt-2">Escolha sua linhagem biológica.</p>
              </div>
              <div className="grid gap-4">
                {allRaces.map((race: any) => {
                  const isSelected = formData.race?.nome === race.nome;
                  const isExpanded = expandedRace === race.nome;

                  return (
                    <div 
                        key={race.nome}
                        className={`rounded-[2rem] border-2 transition-all duration-300 overflow-hidden ${isSelected ? 'bg-neon-theme/5 border-neon-theme shadow-[0_0_20px_rgba(var(--theme-color),0.2)]' : 'bg-gray-900/60 border-gray-800 hover:border-gray-600'}`}
                    >
                        <button 
                            onClick={() => {
                                setFormData({...formData, race});
                                setExpandedRace(isExpanded ? null : race.nome);
                            }}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <div>
                                <h3 className={`text-lg font-display font-bold uppercase flex items-center gap-2 ${isSelected ? 'text-neon-theme' : 'text-white'}`}>
                                    {race.nome}
                                    {isSelected && <Check size={16} className="text-neon-theme" />}
                                </h3>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider line-clamp-1">{race.descricao}</p>
                            </div>
                            {isExpanded ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
                        </button>

                        {/* Dropdown Content */}
                        {isExpanded && (
                            <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                                <div className="h-px w-full bg-gray-800 mb-4" />
                                <p className="text-xs text-gray-300 leading-relaxed mb-4">{race.descricao}</p>
                                
                                <div className="mb-4">
                                    <span className="text-[10px] font-bold text-neon-theme uppercase tracking-widest block mb-2">Bônus de Atributo</span>
                                    <div className="flex flex-wrap gap-2">
                                        {typeof race.aumento_atributo === 'object' ? (
                                            Object.entries(race.aumento_atributo).map(([attr, val]) => (
                                                <span key={attr} className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-xs text-white font-bold">
                                                    {attr} +{String(val)}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-xs text-white italic">
                                                {String(race.aumento_atributo)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {race.caracteristicas_especiais && race.caracteristicas_especiais.length > 0 && (
                                    <div>
                                        <span className="text-[10px] font-bold text-neon-theme uppercase tracking-widest block mb-2">Características</span>
                                        <div className="space-y-2">
                                            {race.caracteristicas_especiais.map((feat: any, idx: number) => (
                                                <div key={idx} className="bg-black/30 p-3 rounded-xl border-l-2 border-neon-theme">
                                                    <span className="text-xs font-bold text-white block">{feat.nome}</span>
                                                    <span className="text-[10px] text-gray-400">{feat.efeito || feat.mecanica}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-500">
              <div className="text-center">
                  <h2 className="text-4xl font-display font-black text-white tracking-widest uppercase">ATRIBUTOS</h2>
                  <p className="text-gray-500 text-xs mt-2 uppercase tracking-wider">Defina seus atributos base</p>
              </div>

              {/* Warning Banner */}
              <div className="flex items-center justify-center gap-2 text-neon-red text-[10px] font-bold uppercase tracking-widest mb-4 bg-neon-red/10 p-2 rounded-lg border border-neon-red/20 mx-4 text-center">
                  <AlertTriangle size={14} className="flex-shrink-0" />
                  <span>Atenção: Apenas um modo pode ser escolhido. Ao iniciar, os outros serão bloqueados.</span>
              </div>

              {/* GENERATION METHOD SELECTOR */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-2 flex gap-2 overflow-x-auto no-scrollbar">
                  {[
                      { id: 'ROLAGEM', icon: Dices, label: 'Rolagem' },
                      { id: 'PADRAO', icon: LayoutList, label: 'Array' },
                      { id: 'COMPRA', icon: Coins, label: 'Compra' }
                  ].map((m) => {
                      const isDisabled = isLocked && genMethod !== m.id;
                      return (
                        <button
                            key={m.id}
                            onClick={() => {
                                if (!isLocked) setGenMethod(m.id as any);
                            }}
                            disabled={isDisabled}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
                                genMethod === m.id 
                                ? 'bg-neon-theme text-black shadow-lg shadow-neon-theme/20' 
                                : isDisabled
                                    ? 'bg-gray-950 text-gray-700 cursor-not-allowed border border-gray-800'
                                    : 'text-gray-500 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            {isDisabled ? <Lock size={14} /> : <m.icon size={16} />}
                            {m.label}
                        </button>
                      );
                  })}
              </div>

              {/* METHOD SPECIFIC CONTROLS */}
              {genMethod === 'ROLAGEM' && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
                      {!hasRolled ? (
                          <>
                            <p className="text-xs text-gray-400 mb-4">Role 4d6, rerole 1s e descarte o menor.</p>
                            <button onClick={handleRollStats} className="w-full py-4 bg-neon-theme text-black font-black uppercase rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(var(--theme-color),0.3)] transition-all">
                                Rolar Atributos
                            </button>
                          </>
                      ) : (
                          <div>
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Valores Gerados (Arraste para distribuir)</p>
                              <div className="flex justify-center gap-2 flex-wrap min-h-[50px]">
                                  {generatedValues.map((valObj) => {
                                      // Only show if not assigned
                                      const isAssigned = Object.values(assignedIds).includes(valObj.id);
                                      if (isAssigned) return null;

                                      return (
                                          <div 
                                            key={valObj.id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, valObj.id)}
                                            className="w-12 h-12 flex flex-col items-center justify-center bg-gray-800 border-2 border-neon-theme rounded-xl text-neon-theme font-display font-bold text-lg cursor-grab active:cursor-grabbing hover:bg-gray-700 transition-all shadow-[0_0_10px_rgba(var(--theme-color),0.2)]"
                                          >
                                              {valObj.val}
                                              <GripVertical size={10} className="opacity-50" />
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      )}
                  </div>
              )}

              {genMethod === 'PADRAO' && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
                       {!hasRolled ? (
                           <button onClick={handleStandardArray} className="w-full py-4 bg-neon-blue text-black font-black uppercase rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
                               Usar Array Padrão
                           </button>
                       ) : (
                           <div>
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Valores Padrão (Arraste para distribuir)</p>
                              <div className="flex justify-center gap-2 flex-wrap min-h-[50px]">
                                  {generatedValues.map((valObj) => {
                                      const isAssigned = Object.values(assignedIds).includes(valObj.id);
                                      if (isAssigned) return null;

                                      return (
                                          <div 
                                            key={valObj.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, valObj.id)}
                                            className="w-12 h-12 flex flex-col items-center justify-center bg-gray-800 border-2 border-neon-blue rounded-xl text-neon-blue font-display font-bold text-lg cursor-grab active:cursor-grabbing hover:bg-gray-700 transition-all"
                                          >
                                              {valObj.val}
                                              <GripVertical size={10} className="opacity-50" />
                                          </div>
                                      );
                                  })}
                              </div>
                           </div>
                       )}
                  </div>
              )}

              {genMethod === 'COMPRA' && (
                   <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md">
                       <span className="text-xs font-bold text-gray-400 uppercase">Pontos Restantes</span>
                       <div className={`text-2xl font-display font-black ${POINT_BUY_BUDGET - getPointBuyCost() < 0 ? 'text-neon-red' : 'text-neon-theme'}`}>
                           {POINT_BUY_BUDGET - getPointBuyCost()} <span className="text-sm text-gray-600">/ {POINT_BUY_BUDGET}</span>
                       </div>
                   </div>
              )}
              
              <div className="grid gap-5">
                {Object.keys(formData.attributes).map((key) => {
                  const val = (formData.attributes as any)[key];
                  const racialBonusFixed = (typeof formData.race?.aumento_atributo === 'object' ? (formData.race.aumento_atributo as any)[key] : 0) || 0;
                  const racialBonusAllocated = formData.racialAllocation[key];
                  const remainingPoints = getRemainingRacialPoints();
                  const canAdd = remainingPoints > 0;
                  const canRemove = racialBonusAllocated > 0;
                  const isChoiceAllowed = (!formData.race?.opcoes_atributo || formData.race.opcoes_atributo.includes(key));
                  const showAllocator = (formData.race?.tipo_distribuicao === 'livre' || formData.race?.tipo_distribuicao === 'escolha') && isChoiceAllowed;
                  const barWidth = Math.min(100, (val / 20) * 100);

                  const totalVal = Number(val) + Number(racialBonusFixed) + Number(racialBonusAllocated);
                  const modifier = Math.floor((totalVal - 10) / 2);
                  const modString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

                  const isDropMode = (genMethod === 'ROLAGEM' || genMethod === 'PADRAO') && hasRolled;
                  const assignedId = assignedIds[key];

                  return (
                    <div 
                        key={key} 
                        onDragOver={(e) => { if(isDropMode) handleDragOver(e); }}
                        onDrop={(e) => { if(isDropMode) handleDrop(e, key); }}
                        className={`bg-gray-950/80 p-5 rounded-[1.5rem] border relative overflow-hidden group transition-all duration-300 ${
                            isDropMode && !assignedId 
                            ? 'border-dashed border-gray-600 hover:border-neon-theme hover:bg-gray-900' 
                            : 'border-gray-800 hover:border-gray-600'
                        }`}
                    >
                      <div className="absolute bottom-0 left-0 h-1 bg-neon-theme transition-all duration-500 opacity-50" style={{ width: `${barWidth}%` }} />
                      
                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <span className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                            {key === 'FOR' && <Dumbbell size={14} className="text-neon-red" />}
                            {key === 'DES' && <Target size={14} className="text-neon-blue" />}
                            {key === 'CON' && <Activity size={14} className="text-neon-green" />}
                            {key === 'INT' && <Brain size={14} className="text-neon-theme" />}
                            {key === 'SAB' && <Eye size={14} className="text-purple-400" />}
                            {key === 'CAR' && <MessageCircle size={14} className="text-yellow-400" />}
                            {key}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                            MOD: <b className="text-white">{modString}</b>
                        </span>
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                         {/* Main Controls - Varies by Method */}
                         <div className="flex items-center gap-3">
                             {genMethod === 'COMPRA' && (
                                <div className="flex items-center bg-black/40 rounded-xl p-1 border border-gray-800">
                                    <button onClick={() => updateAttribute(key, -1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg">-</button>
                                    <span className={`w-10 text-center text-2xl font-display font-bold ${genMethod === 'COMPRA' && POINT_COST_TABLE[val] < 0 ? 'text-neon-red' : 'text-white'}`}>{val}</span>
                                    <button onClick={() => updateAttribute(key, 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-lg">+</button>
                                </div>
                             )}

                             {isDropMode && (
                                 <div className="w-24 h-12 flex items-center justify-center">
                                     {assignedId ? (
                                         <div 
                                            onClick={() => handleUnassign(key)}
                                            className="w-full h-full bg-gray-800 border-2 border-neon-theme rounded-xl flex items-center justify-center text-xl font-display font-bold text-white relative cursor-pointer hover:bg-red-900/20 hover:border-red-500 transition-all group-assigned"
                                         >
                                             {val}
                                             <div className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-lg opacity-0 group-assigned-hover:opacity-100 transition-opacity">
                                                 <X size={20} className="text-white" />
                                             </div>
                                         </div>
                                     ) : (
                                         <div className="w-full h-full border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center text-[9px] text-gray-600 uppercase tracking-widest pointer-events-none">
                                             Arraste
                                         </div>
                                     )}
                                 </div>
                             )}

                             {/* Point Buy Cost Indicator */}
                             {genMethod === 'COMPRA' && (
                                 <div className="flex flex-col items-center">
                                     <span className="text-[9px] font-bold text-gray-600 uppercase">Custo</span>
                                     <span className={`text-xs font-bold ${POINT_COST_TABLE[val] > 0 ? 'text-neon-red' : 'text-neon-green'}`}>
                                         {POINT_COST_TABLE[val] > 0 ? '+' : ''}{POINT_COST_TABLE[val]}
                                     </span>
                                 </div>
                             )}
                         </div>

                         {/* Bonus Allocator */}
                         <div className="flex items-center gap-2">
                              {showAllocator && (
                                  <div className="flex items-center bg-neon-theme/10 rounded-lg p-1 border border-neon-theme/20">
                                      <button disabled={!canRemove} onClick={() => updateRacialAllocation(key, -1)} className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold ${canRemove ? 'text-neon-theme hover:bg-neon-theme/20' : 'text-gray-600 cursor-not-allowed'}`}>-</button>
                                      <span className="text-xs font-black text-neon-theme min-w-[20px] text-center">+{racialBonusAllocated}</span>
                                      <button disabled={!canAdd} onClick={() => updateRacialAllocation(key, 1)} className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold ${canAdd ? 'text-neon-theme hover:bg-neon-theme/20' : 'text-gray-600 cursor-not-allowed'}`}>+</button>
                                  </div>
                              )}
                              {racialBonusFixed > 0 && (
                                  <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-[10px] text-gray-300 font-bold border border-gray-700">
                                      <Zap size={10} className="text-yellow-400" />
                                      +{racialBonusFixed}
                                  </div>
                              )}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {getRemainingRacialPoints() > 0 && (
                  <div className="sticky bottom-4 bg-black/80 border border-neon-theme p-4 rounded-xl flex items-center justify-between backdrop-blur-md shadow-[0_0_20px_rgba(var(--theme-color),0.2)] animate-pulse z-20">
                      <div className="flex items-center gap-3">
                          <Sparkles className="text-neon-theme" />
                          <div>
                              <p className="text-white font-bold text-sm uppercase tracking-wider">Pontos de Raça</p>
                              <p className="text-[10px] text-gray-400">Distribua nos atributos permitidos</p>
                          </div>
                      </div>
                      <span className="text-2xl font-display font-black text-neon-theme">{getRemainingRacialPoints()}</span>
                  </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
              <div className="text-center">
                  <h2 className="text-4xl font-display font-black text-white tracking-widest uppercase">ANTECEDENTE</h2>
                  <p className="text-gray-500 text-xs mt-2">O que você fazia antes de se tornar Hunter?</p>
              </div>
              <div className="grid gap-4">
                {SYSTEM_DB.personagem.antecedentes.map((bg: any) => {
                  const isSelected = formData.background?.nome === bg.nome;
                  const isExpanded = expandedBg === bg.nome;

                  return (
                    <div 
                        key={bg.nome} 
                        className={`rounded-[2rem] border-2 transition-all duration-300 overflow-hidden ${isSelected ? 'bg-neon-theme/5 border-neon-theme shadow-[0_0_20px_rgba(var(--theme-color),0.2)]' : 'bg-gray-900/60 border-gray-800 hover:border-gray-600'}`}
                    >
                        <button 
                            onClick={() => {
                                if (formData.background?.nome !== bg.nome) {
                                    setFormData({...formData, background: bg});
                                    setBgFeatureChoice(null); // Reset feature choice when changing background
                                }
                                setExpandedBg(isExpanded ? null : bg.nome);
                            }}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <div>
                                <h3 className={`text-lg font-display font-bold uppercase flex items-center gap-2 ${isSelected ? 'text-neon-theme' : 'text-white'}`}>
                                    {bg.nome}
                                    {isSelected && <Check size={16} className="text-neon-theme" />}
                                </h3>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider line-clamp-1">{bg.descricao}</p>
                            </div>
                            {isExpanded ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
                        </button>

                        {/* Expanded Details */}
                        {isExpanded && (
                            <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                                <div className="h-px w-full bg-gray-800 mb-4" />
                                <p className="text-xs text-gray-300 leading-relaxed italic mb-4">"{bg.descricao}"</p>
                                
                                <div className="grid gap-3">
                                    <div className="bg-black/20 p-3 rounded-xl border border-gray-800">
                                        <div className="flex items-center gap-2 mb-1 text-neon-blue">
                                            <GraduationCap size={12} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Proficiências</span>
                                        </div>
                                        <p className="text-xs text-white">{bg.proficiencias}</p>
                                    </div>

                                    <div className="bg-black/20 p-3 rounded-xl border border-gray-800">
                                        <div className="flex items-center gap-2 mb-1 text-neon-green">
                                            <Backpack size={12} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Equipamento</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {bg.equipamento.map((item: string, idx: number) => (
                                                <span key={idx} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-black/20 p-3 rounded-xl border border-gray-800">
                                        <div className="flex items-center gap-2 mb-2 text-neon-theme">
                                            <Star size={12} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Escolha uma Característica</span>
                                        </div>
                                        <div className="space-y-2">
                                            {bg.caracteristicas.map((feat: any, idx: number) => {
                                                const isFeatSelected = bgFeatureChoice?.nome === feat.nome;
                                                return (
                                                    <button 
                                                        key={idx} 
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent toggling accordion
                                                            setBgFeatureChoice(feat);
                                                        }}
                                                        className={`w-full text-left p-3 rounded-lg border transition-all ${isFeatSelected ? 'bg-neon-theme/10 border-neon-theme shadow-[0_0_10px_rgba(var(--theme-color),0.2)]' : 'bg-gray-800/50 border-transparent hover:bg-gray-800'}`}
                                                    >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <div className={`w-3 h-3 rounded-full border flex items-center justify-center flex-shrink-0 ${isFeatSelected ? 'border-neon-theme bg-neon-theme' : 'border-gray-500'}`}>
                                                                {isFeatSelected && <Check size={8} className="text-black" />}
                                                            </div>
                                                            <span className={`text-xs font-bold ${isFeatSelected ? 'text-white' : 'text-gray-300'}`}>{feat.nome}</span>
                                                        </div>
                                                        <p className={`text-[10px] pl-5 leading-relaxed ${isFeatSelected ? 'text-gray-200' : 'text-gray-500'}`}>{feat.efeito}</p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && renderInclinationSection()}

          {step === 5 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
              <div className="text-center">
                <h2 className="text-4xl font-display font-black text-white tracking-widest uppercase">TREINAMENTO</h2>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-2">
                    ETAPA FINAL
                </p>
                <p className="text-[9px] text-gray-600 mt-1">Defina suas competências de combate e perícias</p>
              </div>
              
              {/* Section 1: Skills and Saves */}
              <div>
                  <div className="flex justify-between items-center mb-4 px-2">
                      <h3 className="text-xs font-bold text-neon-blue uppercase tracking-widest">Perícias e Resistências</h3>
                      <span className={`text-[10px] font-bold ${formData.selectedTrainings.length === 5 ? 'text-neon-green' : 'text-gray-500'}`}>
                          {formData.selectedTrainings.length} / 5
                      </span>
                  </div>
                  <div className="grid gap-3">
                    {TRAINING_OPTIONS.map((option: any) => {
                      const isSelected = formData.selectedTrainings.includes(option.name);
                      return (
                        <button 
                            key={option.name}
                            onClick={() => toggleTraining(option.name)}
                            className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
                                isSelected 
                                ? 'bg-neon-theme border-neon-theme text-black shadow-[0_0_20px_rgba(var(--theme-color),0.3)]' 
                                : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {option.isSave ? (
                                    <Shield size={16} className={isSelected ? 'text-black' : 'text-neon-blue'} />
                                ) : (
                                    <Star size={16} className={isSelected ? 'text-black' : 'text-gray-600'} />
                                )}
                                <span className="text-xs font-black uppercase tracking-tight">{option.name}</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                                {option.attr}
                            </span>
                        </button>
                      );
                    })}
                  </div>
              </div>

              <div className="h-px bg-gray-800 w-full" />

              {/* Section 2: Equipments and Languages */}
              <div>
                  <div className="flex justify-between items-center mb-4 px-2">
                      <h3 className="text-xs font-bold text-neon-yellow uppercase tracking-widest">Equipamentos e Linguagens</h3>
                      <span className={`text-[10px] font-bold ${formData.selectedEquipmentProficiencies.length === 4 ? 'text-neon-green' : 'text-gray-500'}`}>
                          {formData.selectedEquipmentProficiencies.length} / 4
                      </span>
                  </div>
                  <p className="text-[9px] text-gray-500 px-2 mb-4 italic">A 5ª escolha é atribuída automaticamente pelo kit do antecedente.</p>
                  
                  <div className="grid gap-3">
                    {EQUIPMENT_OPTIONS.map((option) => {
                      const isSelected = formData.selectedEquipmentProficiencies.includes(option);
                      return (
                        <button 
                            key={option}
                            onClick={() => toggleEquipmentProficiency(option)}
                            className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${
                                isSelected 
                                ? 'bg-neon-yellow border-neon-yellow text-black shadow-[0_0_20px_rgba(255,230,0,0.3)]' 
                                : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                        >
                            <div className="flex items-center gap-3 text-left">
                                <Hammer size={16} className={isSelected ? 'text-black' : 'text-gray-600'} />
                                <span className="text-xs font-black uppercase tracking-tight leading-tight">{option}</span>
                            </div>
                            {isSelected && <Check size={16} className="text-black" />}
                        </button>
                      );
                    })}
                  </div>
              </div>

            </div>
          )}

        </div>
      </div>

      <div className="p-8 bg-neon-dark border-t border-gray-800 flex justify-between items-center z-50 shrink-0">
        <button onClick={handlePrev} className="flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] text-gray-500 hover:text-white uppercase group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {step === 0 ? 'Cancelar' : 'Voltar'}
        </button>
        <button onClick={handleNext} className="flex items-center gap-4 px-12 py-5 bg-neon-theme text-black rounded-2xl font-black text-[10px] tracking-[0.3em] shadow-[0_0_30px_rgba(var(--theme-color),0.5)] hover:brightness-110 active:scale-95 transition-all uppercase group">
          {step === STEPS.length - 1 ? 'Finalizar' : 'Próxima'}
          {step < STEPS.length - 1 && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </div>
  );
};