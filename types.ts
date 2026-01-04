
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export enum AIStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  ERROR = 'ERROR'
}
