// Types for user roles and authentication
export type UserRole = 'admin' | 'coach' | 'player' | 'medical';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamId?: string; // Made optional with ?
  avatar?: string;
  position?: string; // For players
  specialization?: string; // For medical staff
}

// Types for team and players
export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  height: number;
  weight: number;
  nationality: string;
  joinedDate: string;
  image?: string;
  stats: {
    goals: number;
    assists: number;
    matches: number;
    fitnessLevel: number;
  };
  medicalRecord?: {
    status: 'available' | 'injured' | 'recovering';
    lastCheckup: string;
    expectedRecovery?: string;
    condition?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  stadium: string;
  coach: string;
  players: string[];
  upcomingMatches: string[];
  pastMatches: string[];
}

// Types for matches
export interface Match {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    logo?: string;
    score?: number | null;
  };
  awayTeam: {
    id: string;
    name: string;
    logo?: string;
    score?: number | null;
  };
  date: Date;
  venue: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  competition: string;
  attendance?: number | null;
  highlights?: string | null;
  stats?: MatchStats;
  result?: {
    homeTeamScore: number;
    awayTeamScore: number;
  };
}

export interface MatchStats {
  possession: {
    home: number;
    away: number;
  };
  shots: {
    home: number;
    away: number;
  };
  shotsOnTarget: {
    home: number;
    away: number;
  };
  corners: {
    home: number;
    away: number;
  };
  fouls: {
    home: number;
    away: number;
  };
  yellowCards: {
    home: number;
    away: number;
  };
  redCards: {
    home: number;
    away: number;
  };
}

// Types for medical records
export interface MedicalRecord {
  id: string;
  playerId: string;
  playerName: string;
  status: 'available' | 'injured' | 'recovering';
  diagnosis: string;
  diagnosisDate: Date;
  expectedRecovery: Date | null;
  fitnessLevel: number;
  notes: string;
}

// Types for Mental Readiness
export interface MentalReadinessSurvey {
  id: string;
  playerId: string;
  matchId: string;
  date: Date;
  energy: number;
  focus: number;
  confidence: number;
  motivation: number;
  anxiety: number;
  notes: string;
}

// Types for Tactical Analysis
export interface TacticalAnalysis {
  id: string;
  matchId: string;
  opponentStrengths: string[];
  opponentWeaknesses: string[];
  recommendedFormation: string;
  keyPlayers: string[];
  tacticalNotes: string;
  playerInstructions: {
    playerId: string;
    instructions: string;
  }[];
  setPlays: string[];
  defensiveStrategy: string;
  offensiveStrategy: string;
}

// Types for StatCard component
export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: {
    type: 'increase' | 'decrease' | 'neutral';
    value: string;
  };
  description?: string;
  valueColor?: string;
}

// Types for Activity Feed
export interface Activity {
  id: number;
  type: 'goal' | 'injury' | 'match' | 'training' | 'transfer';
  title: string;
  description: string;
  timestamp: string;
  relatedId?: number;
  icon?: React.ReactNode;
}

// Types for Messages
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachment?: {
    type: 'image' | 'document' | 'video';
    url: string;
    name: string;
  };
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Types for Formations
export interface Formation {
  id: number;
  name: string;
  structure: string; // e.g., "4-3-3", "4-4-2"
  positions: PlayerPosition[];
}

export interface PlayerPosition {
  playerId: number | null;
  playerName?: string;
  position: string; // e.g., "GK", "CB", "ST"
  x: number; // X coordinate on pitch (0-100)
  y: number; // Y coordinate on pitch (0-100)
} 