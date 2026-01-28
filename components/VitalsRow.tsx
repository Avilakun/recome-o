import React from 'react';

interface VitalBlockProps {
  label: string;
  value: number;
  max?: number; // Optional for things like CA/Desl
  color: 'red' | 'green' | 'blue' | 'white' | 'yellow' | 'theme';
  isBar?: boolean;
}

const VitalBlock: React.FC<VitalBlockProps> = ({ label, value, max, color, isBar = false }) => {
  
  const colorMap: Record<string, string> = {
    red: 'text-neon-red',
    green: 'text-neon-green',
    blue: 'text-neon-blue',
    white: 'text-white',
    yellow: 'text-neon-yellow',
    theme: 'text-neon-theme',
  };

  const bgMap: Record<string, string> = {
    red: 'bg-neon-red shadow-[0_0_8px_#ff0055]',
    green: 'bg-neon-green shadow-[0_0_8px_#00ff9d]',
    blue: 'bg-neon-blue shadow-[0_0_8px_#00f0ff]',
    white: 'bg-white shadow-[0_0_8px_#ffffff]',
    yellow: 'bg-neon-yellow shadow-[0_0_8px_#ffe600]',
    theme: 'bg-neon-theme shadow-[0_0_8px_rgba(var(--theme-color),1)]',
  };

  const percentage = max ? (value / max) * 100 : 100;

  return (
    <div className="flex flex-col items-center justify-end w-full px-1">
      <span className={`text-[10px] font-bold uppercase mb-1 tracking-wider ${color === 'white' ? 'text-gray-300' : colorMap[color]}`}>
        {label}
      </span>
      
      <div className="flex items-center space-x-2">
        {isBar && <button className="text-gray-500 hover:text-white text-xs">-</button>}
        <span className="font-display text-2xl font-bold text-white">{value}</span>
        {isBar && <button className="text-gray-500 hover:text-white text-xs">+</button>}
      </div>

      {/* Progress Bar / Underline */}
      <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden relative">
        <div 
          className={`h-full absolute left-0 top-0 transition-all duration-500 ${bgMap[color]}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface VitalsRowProps {
  vitals: any;
}

export const VitalsRow: React.FC<VitalsRowProps> = ({ vitals }) => {
  return (
    <div className="grid grid-cols-6 gap-2 px-4 py-4 bg-neon-card border-t border-b border-gray-800">
      <VitalBlock label="PV" value={vitals.pv.current} max={vitals.pv.max} color="red" isBar />
      <VitalBlock label="AURA" value={vitals.aura.current} max={vitals.aura.max} color="theme" isBar />
      <VitalBlock label="SAN" value={vitals.san.current} max={vitals.san.max} color="white" isBar />
      <VitalBlock label="REA" value={vitals.rea.current} max={vitals.rea.max} color="white" isBar />
      <VitalBlock label="CA" value={vitals.ca} color="white" />
      <VitalBlock label="DESL" value={vitals.desl} color="white" />
    </div>
  );
};