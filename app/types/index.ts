// User role types
export type UserRole = 'coach' | 'player' | 'medical' | 'admin';

// User profile
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teamId?: string; // Made optional with ?
  avatar?: string;
  position?: string;
  specialization?: string;
}

// Player data 
export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  nationality: string;
  joinedDate: string;
  image?: string;
  height: number;
  weight: number;
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

export interface PlayerStatistics {
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  matchesPlayed: number;
  // More stats can be added here
}

export interface MedicalRecord {
  id: string;
  playerId: string;
  playerName: string;
  status: 'available' | 'injured' | 'recovering';
  diagnosis: string;
  diagnosisDate: Date;
  expectedRecovery: Date | null;
  fitnessLevel: number;
  notes?: string;
}

// Team data
export interface Team {
  id: string;
  name: string;
  logo?: string;
  stadium: string;
  coach: string;
  players: string[]; // Player IDs
  upcomingMatches: string[]; // Match IDs
  pastMatches: string[]; // Match IDs
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
  status: 'upcoming' | 'completed' | 'cancelled' | 'live';
  attendance?: number | null;
  highlights?: string | null;
  stats?: MatchStatistics;
  competition?: string;
  result?: {
    homeTeamScore: number;
    awayTeamScore: number;
  };
}

export interface MatchResult {
  homeTeamScore: number;
  awayTeamScore: number;
  scorers: {playerId: string, minute: number}[];
  stats: MatchStatistics;
}

export interface MatchStatistics {
  possession: {home: number, away: number};
  shots: {home: number, away: number};
  shotsOnTarget: {home: number, away: number};
  corners: {home: number, away: number};
  fouls: {home: number, away: number};
  yellowCards: {home: number, away: number};
  redCards: {home: number, away: number};
}

export interface TacticalAnalysis {
  id: string;
  matchId: string;
  opponentStrengths: string[];
  opponentWeaknesses: string[];
  recommendedFormation: string;
  keyPlayers: string[];
  tacticalNotes: string;
  playerInstructions?: { playerId: string, instructions: string }[];
  setPlays?: string[];
  defensiveStrategy?: string;
  offensiveStrategy?: string;
}

// Mental readiness survey
export interface MentalReadinessSurvey {
  id: string;
  playerId: string;
  matchId: string;
  date: Date;
  energy: number; // 1-10
  focus: number; // 1-10
  confidence: number; // 1-10
  motivation: number; // 1-10
  anxiety: number; // 1-10
  notes?: string;
}

// Activity type for tracking events
export interface Activity {
  id: number;
  type: 'goal' | 'injury' | 'match' | 'training';
  title: string;
  description: string;
  timestamp: string;
  relatedId?: number;
}

// Dashboard data
export interface DashboardData {
  upcomingMatches: Match[];
  teamPerformance: TeamPerformance;
  playerUpdates: PlayerUpdate[];
}

export interface TeamPerformance {
  recentResults: {
    wins: number;
    draws: number;
    losses: number;
  };
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
}

export interface PlayerUpdate {
  playerId: string;
  statusChange?: string;
  fitnessUpdate?: number;
  newInjury?: boolean;
} 