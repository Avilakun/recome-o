import React, { useState, useEffect } from 'react';
import { Character, InventoryItem } from '../types';
import { SYSTEM_DB } from './data';
import { 
  Backpack, 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Shield, 
  Sword, 
  Briefcase, 
  HeartPulse, 
  Box, 
  Zap, 
  Coins,
  X
} from 'lucide-react';

interface InventoryTabProps {
  character: Character;
  onUpdate: (character: Character) => void;
  initialFilter?: { category?: string, search?: string } | null;
  onClearFilter?: () => void;
}

type InvView = 'BACKPACK' | 'CATALOG';

export const InventoryTab: React.FC<InventoryTabProps> = ({ character, onUpdate, initialFilter, onClearFilter }) => {
  const [view, setView] = useState<InvView>('BACKPACK');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');

  useEffect(() => {
    if (initialFilter) {
      setView('CATALOG');
      if (initialFilter.category) setActiveCategory(initialFilter.category);
      if (initialFilter.search) setSearchTerm(initialFilter.search);
      onClearFilter?.();
    }
  }, [initialFilter, onClearFilter]);

  const totalWeight = character.inventory.reduce((sum, item) => sum + (item.espaco_peso * item.quantidade), 0);
  
  // CÁLCULO DE CARGA: (Modificador de FOR * 2) + 2 (Mínimo 1)
  const maxWeight = Math.max(1, (character.attributes.FOR.modifier * 2) + 2);

  const getAllItems = () => {
    const items: any[] = [];
    const db = SYSTEM_DB.equipamentos;

    Object.keys(db.armas).forEach(cat => {
      const sub = db.armas[cat as keyof typeof db.armas];
      if (Array.isArray(sub)) {
        sub.forEach(i => items.push({ ...i, categoria: 'ARMAS' }));
      } else {
        Object.keys(sub).forEach(s => {
          if (Array.isArray(sub[s])) {
            sub[s].forEach((i: any) => items.push({ ...i, categoria: 'ARMAS' }));
          }
        });
      }
    });

    Object.keys(db.armaduras).forEach(cat => {
      const armCategory = db.armaduras[cat as keyof typeof db.armaduras];
      if (Array.isArray(armCategory)) {
        armCategory.forEach((i: any) => items.push({ ...i, categoria: 'ARMADURAS' }));
      }
    });

    if (Array.isArray(db.kits_ferramentas)) db.kits_ferramentas.forEach((i: any) => items.push({ ...i, categoria: 'KITS' }));
    if (Array.isArray(db.itens_medicos)) db.itens_medicos.forEach((i: any) => items.push({ ...i, categoria: 'MÉDICOS' }));
    if (Array.isArray(db.itens_gerais)) db.itens_gerais.forEach((i: any) => items.push({ ...i, categoria: 'GERAIS' }));
    if (Array.isArray(db.municoes)) db.municoes.forEach((i: any) => items.push({ ...i, categoria: 'MUNIÇÕES' }));

    return items;
  };

  const catalogItems = getAllItems().filter(item => {
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'TODOS' || item.categoria === activeCategory;
    return matchesSearch && matchesCat;
  });

  const addItemToInventory = (item: any) => {
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
  };

  const updateQuantity = (id: string, delta: number) => {
    const newInventory = character.inventory.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantidade + delta);
        return { ...item, quantidade: newQty };
      }
      return item;
    }).filter(item => item.quantidade > 0);

    onUpdate({ ...character, inventory: newInventory });
  };

  const categories = [
    { id: 'TODOS', icon: Box },
    { id: 'ARMAS', icon: Sword },
    { id: 'ARMADURAS', icon: Shield },
    { id: 'KITS', icon: Briefcase },
    { id: 'MÉDICOS', icon: HeartPulse },
    { id: 'GERAIS', icon: Box },
    { id: 'MUNIÇÕES', icon: Zap },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#050505] animate-in fade-in duration-500">
      <div className="px-6 py-4 bg-neon-dark/80 border-b border-gray-800 flex justify-between items-center backdrop-blur-md">
        <div className="flex-1 mr-4">
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
             <span className="text-gray-500">Carga (Mod FORx2+2)</span>
             <span className={totalWeight > maxWeight ? 'text-neon-red' : 'text-neon-theme'}>
               {totalWeight.toFixed(1)} / {maxWeight.toFixed(1)} slots
             </span>
           </div>
           <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
             <div 
               className={`h-full transition-all duration-500 ${totalWeight > maxWeight ? 'bg-neon-red shadow-[0_0_10px_#ff0055]' : 'bg-neon-theme shadow-[0_0_10px_rgba(var(--theme-color),0.5)]'}`}
               style={{ width: `${Math.min(100, (totalWeight / maxWeight) * 100)}%` }}
             />
           </div>
        </div>
        <div className="flex items-center gap-2 bg-neon-yellow/10 border border-neon-yellow/30 px-3 py-1.5 rounded-lg">
           <Coins size={14} className="text-neon-yellow" />
           <span className="font-display font-bold text-neon-yellow text-sm">
             {character.dinheiro || 0} $
           </span>
        </div>
      </div>

      <div className="flex p-2 gap-2 bg-gray-900/50 border-b border-gray-800">
        <button 
          onClick={() => setView('BACKPACK')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${view === 'BACKPACK' ? 'bg-neon-theme text-black shadow-lg shadow-neon-theme/20' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Backpack size={16} /> MOCHILA
        </button>
        <button 
          onClick={() => setView('CATALOG')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${view === 'CATALOG' ? 'bg-neon-theme text-black shadow-lg shadow-neon-theme/20' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <ShoppingBag size={16} /> CATÁLOGO
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-24">
        {view === 'CATALOG' && (
          <div className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-theme transition-colors" size={16} />
              <input 
                type="text"
                placeholder="Buscar item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-10 text-sm focus:border-neon-theme outline-none transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black whitespace-nowrap border transition-all ${activeCategory === cat.id ? 'bg-neon-theme border-neon-theme text-black' : 'bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-600'}`}
                >
                  <cat.icon size={12} /> {cat.id}
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              {catalogItems.length > 0 ? catalogItems.map((item, idx) => (
                <div key={idx} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 flex justify-between items-center group hover:border-neon-theme/40 transition-colors">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold text-sm truncate uppercase tracking-tight">{item.nome}</span>
                      <span className="bg-gray-800 text-gray-500 text-[9px] px-1.5 py-0.5 rounded font-black">{item.categoria}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1"><Coins size={10} /> {item.custo}</span>
                      <span className="flex items-center gap-1"><Box size={10} /> {item.espaco_peso || 0} slots</span>
                      {item.dano_tipo && <span className="text-neon-red font-bold">{item.dano_tipo}</span>}
                    </div>
                  </div>
                  <button 
                    onClick={() => addItemToInventory(item)}
                    className="p-3 bg-neon-theme/10 text-neon-theme rounded-xl hover:bg-neon-theme hover:text-black transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              )) : (
                <div className="py-12 text-center text-gray-600 italic text-sm">Nenhum item encontrado.</div>
              )}
            </div>
          </div>
        )}

        {view === 'BACKPACK' && (
          <div className="space-y-4">
            {character.inventory.length > 0 ? (
              <div className="grid gap-3">
                {character.inventory.map((item) => (
                  <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-in slide-in-from-right-4 duration-300">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-white font-bold text-sm uppercase tracking-tight truncate">{item.nome}</h3>
                        <p className="text-[10px] text-gray-500 font-medium">
                          {item.categoria} • {(item.espaco_peso * item.quantidade).toFixed(1)} slots
                        </p>
                      </div>
                      <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-xl border border-gray-800">
                         <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
                           {item.quantidade === 1 ? <Trash2 size={16} className="text-neon-red" /> : <Minus size={16} />}
                         </button>
                         <span className="font-display font-bold text-neon-theme text-lg min-w-[20px] text-center">{item.quantidade}</span>
                         <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
                           <Plus size={16} />
                         </button>
                      </div>
                    </div>
                    {(item.tags || item.detalhe || item.dano_tipo) && (
                      <div className="px-4 pb-4 pt-1 bg-black/20 border-t border-gray-800/50">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {item.dano_tipo && <span className="bg-neon-red/20 text-neon-red px-2 py-0.5 rounded-full text-[9px] font-bold">{item.dano_tipo}</span>}
                          {item.tags?.map((tag, i) => (
                            <span key={i} className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full text-[9px] font-medium border border-gray-700">{tag}</span>
                          ))}
                        </div>
                        {item.detalhe && <p className="text-[11px] text-gray-500 leading-relaxed italic">{item.detalhe}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-gray-600 gap-4">
                 <Backpack size={48} strokeWidth={1} />
                 <p className="italic text-sm">Sua mochila está vazia.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};