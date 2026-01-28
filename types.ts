
export interface Attribute {
  name: string;
  value: number;
  modifier: number;
  temp: number;
  saveProficiency?: boolean;
}

export interface CharacterAttributes {
  FOR: Attribute;
  DES: Attribute;
  CON: Attribute;
  INT: Attribute;
  SAB: Attribute;
  CAR: Attribute;
}

export interface Vitals {
  pv: { current: number; max: number };
  aura: { current: number; max: number };
  san: { current: number; max: number };
  rea: { current: number; max: number };
  ca: number;
  desl: number;
}

export interface InventoryItem {
  id: string;
  nome: string;
  custo: string;
  espaco_peso: number;
  quantidade: number;
  dano_tipo?: string;
  tags?: string[];
  detalhe?: string;
  ca_bonus?: string;
  categoria: string;
}

export interface RollEntry {
  id: string;
  timestamp: string;
  label: string;
  total: number;
  diceResults: number[];
  modifier: number;
  mode: string; // 'NORMAL', 'VANTAGEM', etc.
}

export interface Inclination {
  nome: string;
  custo?: string; // Para positivas
  valor_compensacao?: string; // Para negativas
  descricao?: string;
  efeito?: string;
  opcoes?: any[];
  beneficios?: string[];
  categorias?: any[];
  tipo?: string;
  pre_requisito?: string;
  penalidades?: string[];
  recuperacao?: string;
  regra_especial?: string;
  // Campos para seleção
  selectedOption?: string; // Para sub-opções
}

export interface Character {
  // Storage Fields
  id?: string;
  bloqueio_edicao?: boolean;
  data_criacao?: string;
  ultima_modificacao?: string;

  // Progression Fields
  xp: number;
  xp_next: number;
  nen_unlocked: boolean;

  // Core Fields
  name: string;
  playerName?: string; // Nome do Jogador
  alignment?: string; // Tendência
  class: string; // Nen Type / Class
  race?: string;
  background?: string;
  level: number;
  attributes: CharacterAttributes;
  vitals: Vitals;
  image?: string | null;
  skillProficiencies: string[];
  equipmentProficiencies?: string[]; // Novas proficiências de equipamentos/linguagens
  
  // Traits
  raceFeatures: { name: string; description: string }[];
  backgroundData?: {
    nome: string;
    descricao: string;
    proficiencias: string;
    equipamento: string[];
    caracteristicas: { nome: string; efeito: string }[];
  };
  inclinations?: Inclination[]; // Novas Inclinações

  // Inventory
  inventory: InventoryItem[];
  dinheiro: number;

  // History
  rollHistory: RollEntry[];
  
  // Protagonist Action State
  protagonistActionAvailable?: boolean;
}

// --- Database Types ---

export interface Weapon {
  nome: string;
  custo: string;
  dano_tipo: string;
  espaco_peso: number;
  tags: string[];
  detalhe?: string;
  testes_provocados?: {
    tipo: string;
    cd: number;
    area_alcance?: string;
  };
  area_alcance?: string;
  efeito_condicao?: string;
}

export interface RaceFeature {
  nome: string;
  efeito?: string;
  mecanica?: string;
  nota?: string;
  vulnerabilidade?: string;
  tipo?: string;
  fraqueza?: string;
  imunidade?: string;
  escolha?: string;
  requisito?: string;
  efeito_mecanico?: string;
  opcoes?: string[];
  alcance?: string;
}

export interface Race {
  nome: string;
  descricao: string;
  aumento_atributo?: Record<string, number> | string;
  aumento_atributo_adicional?: string;
  tipo_distribuicao?: string; // 'fixo', 'escolha', 'livre', etc.
  pontos_distribuir?: number;
  opcoes_atributo?: string[]; // Array of attribute keys for choice
  caracteristicas_especiais?: RaceFeature[];
  caracteristicas_escolha?: RaceFeature[];
  deslocamento?: any;
  tamanho?: string;
  visao?: string;
  hierarquia?: any;
  gatilhos_olhos_escarlates?: string[];
  mecanica_especial?: any;
  resistencias?: string[];
  imunidades?: string[];
  vulnerabilidades?: string[];
  tabela_ancestral_dragao?: any;
  fraquezas?: string[];
  regeneracao?: string;
  tipo?: string;
}

export interface BackgroundFeature {
  nome: string;
  efeito: string;
}

export interface Background {
  nome: string;
  descricao: string;
  proficiencias: string;
  equipamento: string[];
  caracteristicas: BackgroundFeature[];
}

export interface SystemData {
  sistema: string;
  versao_database: string;
  data_compilacao?: string; // Added field
  inclinacoes_gerais_basicas?: {
    regras_de_aquisicao: string;
    positivas: Inclination[];
    negativas: Inclination[];
  };
  equipamentos: {
    armas: {
      comuns_rudimentares: {
        simples_corpo_a_corpo: Weapon[];
        marciais_corpo_a_corpo: Weapon[];
        marciais_distancia: Weapon[];
      };
      cientificas_explosivas: {
        simples: Weapon[];
        complexas: Weapon[];
        especiais: Weapon[];
      };
      cerco: any[];
    };
    armaduras: {
      leves: any[];
      medias: any[];
      pesadas: any[];
    };
    kits_ferramentas: any[];
    itens_medicos: any[];
    itens_gerais: any[];
    municoes: any[];
    [key: string]: any;
  };
  personagem: {
    racas: {
      humanos_e_tribos: Race[];
      clas_especiais: Race[];
      modificados_e_fantasia: Race[];
      tecnologicos_e_sobrenaturais: Race[];
      formigas_quimera: any;
    };
    antecedentes: Background[];
  };
  [key: string]: any;
}