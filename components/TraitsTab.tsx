import React from 'react';
import { Character, InventoryItem } from '../types';
import { Star, Scroll, Backpack, GraduationCap, Plus, ExternalLink, Sword, ThumbsUp, ThumbsDown } from 'lucide-react';
import { SYSTEM_DB } from './data';

interface TraitsTabProps {
  character: Character;
  onUpdate: (character: Character) => void;
  onNavigateInventory: (filter: { category?: string, search?: string }) => void;
}

export const TraitsTab: React.FC<TraitsTabProps> = ({ character, onUpdate, onNavigateInventory }) => {

  // Helper para verificar se um item existe no DB
  const findItemInDB = (itemName: string) => {
    const db = SYSTEM_DB.equipamentos;
    let found = null;

    // Procura em todas as categorias
    const checkArray = (arr: any[]) => arr.find(i => i.nome.toLowerCase() === itemName.toLowerCase());

    // Armas
    Object.keys(db.armas).forEach(cat => {
      const sub = db.armas[cat as keyof typeof db.armas];
      if (Array.isArray(sub)) {
        const item = checkArray(sub);
        if (item) found = { ...item, categoria: 'ARMAS' };
      } else {
        Object.keys(sub).forEach(s => {
          if (Array.isArray(sub[s])) {
            const item = checkArray(sub[s]);
            if (item) found = { ...item, categoria: 'ARMAS' };
          }
        });
      }
    });

    if (found) return found;

    // Armaduras
    Object.keys(db.armaduras).forEach(cat => {
      const item = checkArray(db.armaduras[cat as keyof typeof db.armaduras]);
      if (item) found = { ...item, categoria: 'ARMADURAS' };
    });

    if (found) return found;

    const med = checkArray(db.itens_medicos);
    if (med) return { ...med, categoria: 'MÉDICOS' };

    const kit = checkArray(db.kits_ferramentas);
    if (kit) return { ...kit, categoria: 'KITS' };

    const ger = checkArray(db.itens_gerais);
    if (ger) return { ...ger, categoria: 'GERAIS' };

    const mun = checkArray(db.municoes);
    if (mun) return { ...mun, categoria: 'MUNIÇÕES' };

    return null;
  };

  const handleEquipmentAction = (equipString: string) => {
    const item = findItemInDB(equipString);

    if (item) {
        // Se o item existe, adiciona direto ao inventário
        const newInventory = [...character.inventory];
        const existingIndex = newInventory.findIndex(i => i.nome === item.nome);

        if (existingIndex >= 0) {
            newInventory[existingIndex].quantidade += 1;
        } else {
            newInventory.push({
                id: Date.now().toString() + Math.random(),
                nome: item.nome,
                custo: item.custo,
                espaco_peso: item.espaco_peso || 0,
                quantidade: 1,
                dano_tipo: item.dano_tipo,
                tags: item.tags,
                detalhe: item.detalhe,
                ca_bonus: item.ca_bonus,
                categoria: item.categoria
            });
        }
        onUpdate({ ...character, inventory: newInventory });
        alert(`${item.nome} adicionado ao inventário!`);
    } else {
        // Se não é um item específico, trata como categoria e navega
        let filter: { category?: string, search?: string } = {};
        const lower = equipString.toLowerCase();

        if (lower.includes('arma marcial')) filter = { category: 'ARMAS', search: 'Marcial' };
        else if (lower.includes('arma simples')) filter = { category: 'ARMAS', search: 'Simples' };
        else if (lower.includes('arma')) filter = { category: 'ARMAS' };
        else if (lower.includes('colete') || lower.includes('armadura')) filter = { category: 'ARMADURAS' };
        else if (lower.includes('kit')) filter = { category: 'KITS' };
        else if (lower.includes('médico') || lower.includes('pílula')) filter = { category: 'MÉDICOS' };
        else if (lower.includes('munição')) filter = { category: 'MUNIÇÕES' };
        else filter = { search: equipString }; // Tenta buscar o texto puro

        onNavigateInventory(filter);
    }
  };

  return (
    <div className="flex-1 px-4 py-6 flex flex-col space-y-6 overflow-y-auto pb-24 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Race Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
            <Star size={18} className="text-neon-theme" />
            <h2 className="text-lg font-display font-bold text-white tracking-wide">RAÇA</h2>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg">
            <span className="text-sm font-bold text-neon-theme block mb-2 uppercase">{character.race}</span>
            <div className="space-y-3">
                {character.raceFeatures && character.raceFeatures.length > 0 ? (
                    character.raceFeatures.map((feat, idx) => (
                        <div key={idx} className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-neon-theme">
                            <span className="text-xs font-bold text-white block mb-1">{feat.name}</span>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{feat.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-gray-500 italic">Nenhuma característica racial registrada.</p>
                )}
            </div>
        </div>
      </div>

      {/* Inclinations Section */}
      {character.inclinations && character.inclinations.length > 0 && (
          <div>
              <div className="flex items-center gap-2 mb-3">
                  <ThumbsUp size={18} className="text-neon-green" />
                  <h2 className="text-lg font-display font-bold text-white tracking-wide">INCLINAÇÕES</h2>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg space-y-3">
                  {character.inclinations.map((inc, idx) => {
                      const isNegative = SYSTEM_DB.inclinacoes_gerais_basicas?.negativas.some(n => n.nome === inc.nome);
                      return (
                          <div key={idx} className={`bg-gray-800/50 p-3 rounded-lg border-l-2 ${isNegative ? 'border-neon-red' : 'border-neon-green'}`}>
                              <div className="flex justify-between items-start mb-1">
                                  <span className={`text-xs font-bold ${isNegative ? 'text-neon-red' : 'text-neon-green'}`}>
                                      {inc.nome} {inc.selectedOption ? `(${inc.selectedOption})` : ''}
                                  </span>
                                  <span className="text-[10px] bg-gray-900 px-1.5 py-0.5 rounded text-gray-500 font-mono">
                                      {isNegative ? inc.valor_compensacao : inc.custo}
                                  </span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-relaxed">{inc.descricao}</p>
                              {inc.selectedOption && (
                                  <p className="text-[10px] text-gray-500 mt-1 italic border-t border-gray-700 pt-1">
                                      Opção selecionada: {inc.selectedOption}
                                  </p>
                              )}
                          </div>
                      );
                  })}
              </div>
          </div>
      )}

      {/* Background Section */}
      {character.backgroundData && (
          <div>
            <div className="flex items-center gap-2 mb-3">
                <Scroll size={18} className="text-neon-blue" />
                <h2 className="text-lg font-display font-bold text-white tracking-wide">ANTECEDENTE</h2>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg space-y-4">
                
                {/* Header */}
                <div className="border-b border-gray-800 pb-3">
                    <span className="text-sm font-bold text-neon-blue block mb-1 uppercase">{character.backgroundData.nome}</span>
                    <p className="text-[11px] text-gray-400 italic">{character.backgroundData.descricao}</p>
                </div>

                {/* Features */}
                <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Características</span>
                    <div className="space-y-2">
                        {character.backgroundData.caracteristicas.map((feat, idx) => (
                            <div key={idx} className="bg-gray-800/50 p-3 rounded-lg border-l-2 border-neon-blue">
                                <span className="text-xs font-bold text-white block mb-1">{feat.nome}</span>
                                <p className="text-[11px] text-gray-400 leading-relaxed">{feat.efeito}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Proficiencies */}
                <div className="flex gap-2">
                    <div className="bg-gray-800/50 p-3 rounded-lg flex-1">
                        <div className="flex items-center gap-1 mb-1 text-gray-500">
                            <GraduationCap size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Proficiências</span>
                        </div>
                        <p className="text-xs text-white font-medium">{character.backgroundData.proficiencias}</p>
                    </div>
                </div>

                {/* Equipment Section (Interativo) */}
                <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex items-center gap-1 mb-3 text-gray-500">
                        <Backpack size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Equipamento de Antecedente</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {character.backgroundData.equipamento.map((itemStr, idx) => {
                            const isSpecificItem = findItemInDB(itemStr);
                            return (
                                <button 
                                    key={idx}
                                    onClick={() => handleEquipmentAction(itemStr)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg border text-left group transition-all ${
                                        isSpecificItem 
                                        ? 'bg-neon-theme/5 border-neon-theme/20 hover:border-neon-theme/60' 
                                        : 'bg-neon-blue/5 border-neon-blue/20 hover:border-neon-blue/60'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {isSpecificItem ? (
                                            <div className="p-1 bg-neon-theme/10 rounded text-neon-theme">
                                                <Plus size={10} />
                                            </div>
                                        ) : (
                                            <div className="p-1 bg-neon-blue/10 rounded text-neon-blue">
                                                <Sword size={10} />
                                            </div>
                                        )}
                                        <span className="text-xs text-gray-200 group-hover:text-white transition-colors">{itemStr}</span>
                                    </div>
                                    <div className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                        {isSpecificItem ? (
                                            <span className="text-neon-theme font-bold">PEGAR</span>
                                        ) : (
                                            <>
                                                <span className="text-neon-blue font-bold">ESCOLHER</span>
                                                <ExternalLink size={10} className="text-neon-blue" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-3 text-[10px] text-gray-500 italic text-center">
                        Clique para adicionar itens específicos ou escolher em uma categoria.
                    </p>
                </div>

            </div>
          </div>
      )}

    </div>
  );
};