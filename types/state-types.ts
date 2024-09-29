export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export interface GameType {
  id: number;
  name: string;
  releaseYear?: number;
  players: {
    min: number;
    max: number;
  };
  publisher?: string;
  expansions?: Array<number>;
  standalone?: boolean;
  type: string;
}

export interface OptionFilter {
  value: string;
  label: string;
  children?: OptionFilter[];
}
