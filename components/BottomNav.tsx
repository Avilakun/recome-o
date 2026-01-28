import React from 'react';
import { User, Flame, Star, Backpack, Dices, IdCard } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'FICHA', icon: User, label: 'FICHA' },
    { id: 'NEN', icon: Flame, label: 'NEN' },
    { id: 'TRACOS', icon: Star, label: 'TRAÇOS' },
    { id: 'INV', icon: Backpack, label: 'INV.' },
    { id: 'DADOS', icon: Dices, label: 'DADOS' },
    { id: 'ID', icon: IdCard, label: 'ID' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-neon-card border-t border-gray-800 rounded-t-3xl flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative group`}
          >
            {/* Active Indicator Glow */}
            {isActive && (
              <div className="absolute top-0 w-8 h-1 bg-neon-theme shadow-[0_0_15px_rgba(var(--theme-color),1)] rounded-b-full"></div>
            )}
            
            <Icon 
              size={24} 
              className={`transition-colors duration-300 ${isActive ? 'text-neon-theme stroke-[2.5px] drop-shadow-[0_0_5px_rgba(var(--theme-color),1)]' : 'text-gray-600 group-hover:text-gray-400'}`} 
            />
            
            <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-neon-theme' : 'text-gray-600'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
