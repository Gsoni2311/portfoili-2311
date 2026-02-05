
export enum GameState {
  START = 'START',
  PROFILE = 'PROFILE',
  SKILLS = 'SKILLS',
  MAP = 'MAP',
  BOSSES = 'BOSSES',
  CONTACT = 'CONTACT'
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  description: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  zone: 'Graphic Design' | 'UI/UX Design' | 'Video Editing' | 'AI Editing' | 'Video Production';
  subCategory?: 'Normal' | 'AI';
  description: string;
  fullStory: {
    objective: string;
    problem: string;
    strategy: string;
    process: string;
    result: string;
  };
  image: string;
  url?: string;
}

export interface Boss {
  id: string;
  name: string;
  title: string;
  avatar: string;
  hp: number;
  stats: {
    impact: number;
    challenge: number;
    innovation: number;
  };
  achievements: string[];
}
