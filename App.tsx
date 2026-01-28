import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InfoRow } from './components/InfoRow';
import { VitalsRow } from './components/VitalsRow';
import { AttributeGrid } from './components/AttributeGrid';
import { BottomNav } from './components/BottomNav';
import { CharacterCreator } from './components/CharacterCreator';
import { CharacterList } from './components/CharacterList';
import { IdTab } from './components/IdTab';
import { TraitsTab } from './components/TraitsTab';
import { InventoryTab } from './components/InventoryTab';
import { DiceTab } from './components/DiceTab';
import { Character, CharacterAttributes, RollEntry } from './types';
import { ArrowLeft } from 'lucide-react';

// Map colors from Creator for app-wide usage
const NEN_COLORS: Record<string, string> = {
  'INTENSIFICAÇÃO': '#00ff9d',
  'TRANSFORMAÇÃO': '#d946ef',
  'MATERIALIZAÇÃO': '#ff0055',
  'ESPECIALIZAÇÃO': '#00f0ff',
  'MANIPULAÇÃO': '#9ca3af',
  'EMISSÃO': '#ffe600'
};

// Tabela de XP
const XP_TABLE: Record<number, number> = {
  0: 50,
  1: 150,
  2: 350,
  3: 500,
  4: 800,
  5: 1000,
  6: 1500,
  7: 2500,
  8: 3200,
  9: 4000,
  10: 5000,
  11: 6500
};

const hexToRgbString = (hex: string) => {
  if (!hex) return '0, 255, 157';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

// --- STORAGE FUNCTIONS ---
const PREFIX_LEVEL0 = 'ficha_nivel0_';
const PREFIX_ACTIVE = 'ficha_';

const getStorageKey = (char: Character) => {
  if (!char.id) return null;
  return (char.level === 0 ? PREFIX_LEVEL0 : PREFIX_ACTIVE) + char.id;
};

const saveToStorage = (character: Character) => {
  const key = getStorageKey(character);
  if (key) {
    const dataToSave = {
      ...character,
      ultima_modificacao: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(dataToSave));
  }
};

const loadAllFromStorage = (): Character[] => {
  const chars: Character[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith(PREFIX_ACTIVE) || key.startsWith(PREFIX_LEVEL0))) {
      try {
        const item = localStorage.getItem(key);
        if (item) chars.push(JSON.parse(item));
      } catch (e) {
        console.error("Erro ao carregar ficha:", key, e);
      }
    }
  }
  return chars.sort((a, b) => {
    const dateA = a.ultima_modificacao ? new Date(a.ultima_modificacao).getTime() : 0;
    const dateB = b.ultima_modificacao ? new Date(b.ultima_modificacao).getTime() : 0;
    return dateB - dateA;
  });
};

const deleteFromStorage = (id: string, level: number) => {
  const prefix = level === 0 ? PREFIX_LEVEL0 : PREFIX_ACTIVE;
  localStorage.removeItem(prefix + id);
};

const App: React.FC = () => {
  const [view, setView] = useState<'LIST' | 'CREATOR' | 'SHEET'>('LIST');
  const [savedCharacters, setSavedCharacters] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [activeTab, setActiveTab] = useState('FICHA');
  
  // Estado para filtros de inventário vindos de outras abas
  const [invFilter, setInvFilter] = useState<{category?: string, search?: string} | null>(null);

  // Load characters on mount
  useEffect(() => {
    const loaded = loadAllFromStorage();
    setSavedCharacters(loaded);
  }, []);

  // Update Theme when character changes
  useEffect(() => {
    if (character && character.class) {
      const colorHex = NEN_COLORS[character.class] || '#00ff9d';
      const rgbString = hexToRgbString(colorHex);
      document.documentElement.style.setProperty('--theme-color', rgbString);
    } else {
      document.documentElement.style.setProperty('--theme-color', '0, 255, 157');
    }
  }, [character]);

  // Auto-Save Effect
  useEffect(() => {
    if (character && view === 'SHEET') {
      saveToStorage(character);
    }
  }, [character, view]);

  // --- ACTIONS ---

  const handleSelectCharacter = (char: Character) => {
    const updatedChar = {
        ...char,
        inventory: char.inventory || [],
        dinheiro: char.dinheiro !== undefined ? char.dinheiro : 2000,
        rollHistory: char.rollHistory || [] // Ensure history exists
    };
    setCharacter(updatedChar);
    setView('SHEET');
    setActiveTab('FICHA');
  };

  const handleDeleteCharacter = (id: string) => {
    const charToDelete = savedCharacters.find(c => c.id === id);
    if (charToDelete) {
        deleteFromStorage(id, charToDelete.level);
        setSavedCharacters(prev => prev.filter(c => c.id !== id));
        if (character?.id === id) {
          setCharacter(null);
          setView('LIST');
        }
    }
  };

  const handleStartCreation = () => {
    setView('CREATOR');
  };

  const handleCharacterCreated = (newChar: Character) => {
    const timestamp = new Date().toISOString();
    const finalChar: Character = {
      ...newChar,
      id: Date.now().toString(),
      level: 0,
      xp: 0,
      xp_next: 50,
      nen_unlocked: false,
      bloqueio_edicao: true,
      data_criacao: timestamp,
      ultima_modificacao: timestamp,
      inventory: [],
      dinheiro: 2000,
      rollHistory: []
    };

    saveToStorage(finalChar);
    setSavedCharacters(loadAllFromStorage());
    setCharacter(finalChar);
    setView('SHEET');
    setActiveTab('FICHA');
  };

  const handleCancelCreation = () => {
    setView('LIST');
  };

  const handleBackToList = () => {
    if (character) saveToStorage(character);
    setSavedCharacters(loadAllFromStorage());
    setCharacter(null);
    setView('LIST');
  };

  const handleAddXp = (charId: string, amount: number) => {
      const charIndex = savedCharacters.findIndex(c => c.id === charId);
      if (charIndex >= 0) {
          const updatedChar = { ...savedCharacters[charIndex] };
          updatedChar.xp = (updatedChar.xp || 0) + amount;
          saveToStorage(updatedChar);
          const newList = [...savedCharacters];
          newList[charIndex] = updatedChar;
          setSavedCharacters(newList);
          if (character?.id === charId) {
            setCharacter(updatedChar);
          }
      }
  };

  const handleLevelUp = (charId: string) => {
      const charIndex = savedCharacters.findIndex(c => c.id === charId);
      if (charIndex >= 0) {
          const char = savedCharacters[charIndex];
          const oldLevel = char.level;
          const newLevel = oldLevel + 1;
          const xpCost = char.xp_next;

          const updatedChar = {
              ...char,
              level: newLevel,
              xp: Math.max(0, char.xp - xpCost),
              xp_next: XP_TABLE[newLevel] || 999999,
              nen_unlocked: newLevel >= 1
          };

          if (oldLevel === 0 && newLevel === 1) {
              localStorage.removeItem(PREFIX_LEVEL0 + charId);
          }

          saveToStorage(updatedChar);
          setSavedCharacters(loadAllFromStorage());
          if (character?.id === charId) {
            setCharacter(updatedChar);
          }
          alert(`LEVEL UP! ${char.name} alcançou o nível ${newLevel}!`);
      }
  };
  
  // --- ATTRIBUTE LOGIC ---

  const handleAttributeChange = (key: string, newValue: number) => {
    if (!character) return;
    if (newValue < 1 || newValue > 30) return;

    const newAttributes = { ...character.attributes };
    const attrKey = key as keyof CharacterAttributes;
    
    const oldMod = newAttributes[attrKey].modifier;

    if (newAttributes[attrKey]) {
        const newModifier = Math.floor((newValue - 10) / 2);
        newAttributes[attrKey] = {
            ...newAttributes[attrKey],
            value: newValue,
            modifier: newModifier
        };
        
        const newVitals = { ...character.vitals };
        const modDiff = newModifier - oldMod;

        if (key === 'SAB') {
          newVitals.rea.max += modDiff;
          newVitals.rea.current += modDiff;
        }
        if (key === 'INT') {
           if (character.level === 0) {
               newVitals.san.max += modDiff;
               newVitals.san.current += modDiff;
           } else {
               const valDiff = newValue - character.attributes.INT.value;
               newVitals.san.max += valDiff;
               newVitals.san.current += valDiff;
           }
        }
        if (key === 'CON') {
            newVitals.ca += modDiff;
        }

        setCharacter({ ...character, attributes: newAttributes, vitals: newVitals });
    }
  };

  const handleToggleSaveProficiency = (attrKey: string) => {
    if (!character) return;
    const key = attrKey as keyof CharacterAttributes;
    const newAttributes = { ...character.attributes };
    if (newAttributes[key]) {
      newAttributes[key] = { ...newAttributes[key], saveProficiency: !newAttributes[key].saveProficiency };
      setCharacter({ ...character, attributes: newAttributes });
    }
  };

  const handleToggleSkillProficiency = (skillName: string) => {
    if (!character) return;
    let newSkillProficiencies = [...(character.skillProficiencies || [])];
    if (newSkillProficiencies.includes(skillName)) {
      newSkillProficiencies = newSkillProficiencies.filter(s => s !== skillName);
    } else {
      newSkillProficiencies.push(skillName);
    }
    setCharacter({ ...character, skillProficiencies: newSkillProficiencies });
  };

  const handleRegisterRoll = (entry: RollEntry) => {
    if (!character) return;
    const newHistory = [...(character.rollHistory || []), entry];
    // Optional: limit history size if needed, e.g. last 50
    if (newHistory.length > 50) newHistory.shift(); 
    setCharacter({ ...character, rollHistory: newHistory });
  };

  const handleClearHistory = () => {
      if (!character) return;
      if (confirm("Deseja limpar todo o histórico de rolagens?")) {
          setCharacter({ ...character, rollHistory: [] });
      }
  };

  // --- PROTAGONIST ACTION LOGIC ---

  const handleToggleProtagonistAction = () => {
    if (!character) return;
    setCharacter({ 
      ...character, 
      protagonistActionAvailable: !character.protagonistActionAvailable 
    });
  };

  const handleUseProtagonistAction = (type: 'A' | 'B' | 'C') => {
    if (!character) return;

    let rollEntry: RollEntry;
    const timestamp = new Date().toISOString();
    const id = Date.now().toString();

    if (type === 'A' || type === 'B') {
      const d20 = Math.floor(Math.random() * 20) + 1;
      const label = type === 'A' 
        ? "Protagonista: Novo Destino (Aliado)" 
        : "Protagonista: Impor Azar (Inimigo)";
      
      rollEntry = {
        id,
        timestamp,
        label,
        total: d20,
        diceResults: [d20],
        modifier: 0,
        mode: type === 'A' ? 'NOVO D20 (MAIOR)' : 'NOVO D20 (MENOR)'
      };
    } else {
      // Type C: 3d6
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const d3 = Math.floor(Math.random() * 6) + 1;
      const total = d1 + d2 + d3;

      rollEntry = {
        id,
        timestamp,
        label: "Protagonista: Intervenção",
        total: total,
        diceResults: [d1, d2, d3],
        modifier: 0,
        mode: '3D6 (ADD/RED)'
      };
    }

    // Add to history and consume action
    const newHistory = [...(character.rollHistory || []), rollEntry];
    if (newHistory.length > 50) newHistory.shift();

    setCharacter({
      ...character,
      rollHistory: newHistory,
      protagonistActionAvailable: false // Consume action
    });

    setActiveTab('DADOS'); // Redirect to Dice tab to show result
  };

  // --- RENDER ---

  if (view === 'LIST') {
    return (
      <div className="min-h-screen bg-[#050505] flex justify-center">
        <div className="w-full max-w-md bg-[#0a0a0f] min-h-screen border-x border-gray-900 shadow-2xl">
          <CharacterList 
            characters={savedCharacters}
            onSelect={handleSelectCharacter}
            onDelete={handleDeleteCharacter}
            onCreateNew={handleStartCreation}
            onAddXp={handleAddXp}
            onLevelUp={handleLevelUp}
          />
        </div>
      </div>
    );
  }

  if (view === 'CREATOR') {
    return <CharacterCreator onComplete={handleCharacterCreated} onCancel={handleCancelCreation} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'FICHA':
        return (
          <AttributeGrid 
            attributes={character!.attributes} 
            level={character!.level}
            skillProficiencies={character!.skillProficiencies || []}
            onAttributeChange={handleAttributeChange}
            onToggleSaveProficiency={handleToggleSaveProficiency}
            onToggleSkillProficiency={handleToggleSkillProficiency}
            onRegisterRoll={handleRegisterRoll}
          />
        );
      case 'ID':
        return <IdTab character={character!} onUpdate={setCharacter} />;
      case 'TRACOS':
        return (
          <TraitsTab 
            character={character!} 
            onUpdate={setCharacter}
            onNavigateInventory={(filter) => {
                setInvFilter(filter);
                setActiveTab('INV');
            }}
          />
        );
      case 'NEN':
        return character!.level > 0 
            ? <div className="flex-1 flex items-center justify-center text-gray-500">Módulo NEN em desenvolvimento</div> 
            : <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                <span className="text-4xl mb-4">🔒</span>
                <h3 className="text-white font-bold mb-2">Bloqueado</h3>
                <p className="text-sm">O sistema NEN só é desbloqueado no Nível 1.</p>
              </div>;
      case 'INV':
        return (
          <InventoryTab 
            character={character!} 
            onUpdate={setCharacter} 
            initialFilter={invFilter}
            onClearFilter={() => setInvFilter(null)}
          />
        );
      case 'DADOS':
        return <DiceTab character={character!} onClearHistory={handleClearHistory} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans flex justify-center">
      <div className="w-full max-w-md bg-[#0a0a0f] h-full min-h-screen relative flex flex-col shadow-2xl border-x border-gray-900">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-neon-theme/5 to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={handleBackToList}
            className="text-gray-500 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="relative">
           <Header 
             name={character!.name} 
             className={character!.class} 
             level={character!.level}
             xp={character!.xp}
             xpNext={character!.xp_next}
             protagonistActionAvailable={character!.protagonistActionAvailable}
             onAddXp={(amount) => handleAddXp(character!.id!, amount)}
             onLevelUp={() => handleLevelUp(character!.id!)}
             onToggleProtagonistAction={handleToggleProtagonistAction}
             onUseProtagonistAction={handleUseProtagonistAction}
           />
        </div>
        <InfoRow 
            character={character!} 
            onUpdate={(updates) => setCharacter({...character!, ...updates})} 
        />
        <VitalsRow vitals={character!.vitals} />
        {renderContent()}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
