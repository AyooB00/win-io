import { 
  User, 
  Player, 
  Team, 
  Match, 
  MedicalRecord,
  MentalReadinessSurvey,
  TacticalAnalysis,
  Activity,
  Message,
  Conversation
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'محمد العلي',
    email: 'coach@example.com',
    role: 'coach',
    avatar: '/images/avatars/coach.jpg',
  },
  {
    id: 'u2',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'player',
    position: 'مهاجم',
    avatar: '/images/avatars/player1.jpg',
  },
  {
    id: 'u3',
    name: 'د. خالد العمري',
    email: 'doctor@example.com',
    role: 'medical',
    specialization: 'طبيب فريق',
    avatar: '/images/avatars/doctor.jpg',
  },
  {
    id: 'u4',
    name: 'سعيد الشمري',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/images/avatars/admin.jpg',
  },
];

// Mock Players
export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    position: 'مهاجم',
    jerseyNumber: 10,
    age: 28,
    height: 182,
    weight: 76,
    nationality: 'مصري',
    joinedDate: '2020-08-15',
    image: '/images/players/player1.jpg',
    stats: {
      goals: 18,
      assists: 7,
      matches: 34,
      fitnessLevel: 92
    },
    medicalRecord: {
      status: 'available',
      lastCheckup: '2024-02-10',
      condition: 'بصحة جيدة',
    }
  },
  {
    id: '2',
    name: 'خالد العمري',
    position: 'مدافع',
    jerseyNumber: 4,
    age: 26,
    height: 187,
    weight: 82,
    nationality: 'سعودي',
    joinedDate: '2019-06-20',
    image: '/images/players/player2.jpg',
    stats: {
      goals: 2,
      assists: 1,
      matches: 30,
      fitnessLevel: 88
    },
    medicalRecord: {
      status: 'available',
      lastCheckup: '2024-02-15',
      condition: 'بصحة جيدة',
    }
  },
  {
    id: '3',
    name: 'محمود إبراهيم',
    position: 'وسط',
    jerseyNumber: 8,
    age: 25,
    height: 178,
    weight: 72,
    nationality: 'سوداني',
    joinedDate: '2021-01-10',
    image: '/images/players/player3.jpg',
    stats: {
      goals: 5,
      assists: 12,
      matches: 32,
      fitnessLevel: 95
    },
    medicalRecord: {
      status: 'available',
      lastCheckup: '2024-02-10',
      condition: 'بصحة جيدة',
    }
  },
  {
    id: '4',
    name: 'طارق يوسف',
    position: 'حارس مرمى',
    jerseyNumber: 1,
    age: 30,
    height: 190,
    weight: 85,
    nationality: 'سعودي',
    joinedDate: '2018-07-05',
    image: '/images/players/player4.jpg',
    stats: {
      goals: 0,
      assists: 0,
      matches: 36,
      fitnessLevel: 87
    },
    medicalRecord: {
      status: 'available',
      lastCheckup: '2024-02-12',
      condition: 'بصحة جيدة',
    }
  },
  {
    id: '5',
    name: 'علي الشمراني',
    position: 'مهاجم',
    jerseyNumber: 9,
    age: 24,
    height: 180,
    weight: 75,
    nationality: 'سعودي',
    joinedDate: '2021-08-10',
    image: '/images/players/player5.jpg',
    stats: {
      goals: 12,
      assists: 4,
      matches: 28,
      fitnessLevel: 94
    },
    medicalRecord: {
      status: 'injured',
      lastCheckup: '2024-02-20',
      expectedRecovery: '2024-03-15',
      condition: 'إصابة في الكاحل',
    }
  },
  {
    id: '6',
    name: 'فارس الدوسري',
    position: 'مدافع',
    jerseyNumber: 3,
    age: 27,
    height: 185,
    weight: 80,
    nationality: 'سعودي',
    joinedDate: '2020-01-15',
    image: '/images/players/player6.jpg',
    stats: {
      goals: 1,
      assists: 2,
      matches: 33,
      fitnessLevel: 90
    },
    medicalRecord: {
      status: 'recovering',
      lastCheckup: '2024-02-18',
      expectedRecovery: '2024-03-05',
      condition: 'تعافي من إصابة عضلية',
    }
  }
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: 'team1',
    name: 'النادي الأهلي',
    logo: '/logos/ahly.png',
    stadium: 'استاد القاهرة الدولي',
    coach: 'coach1',
    players: ['player1', 'player2', 'player3'],
    upcomingMatches: ['match1', 'match2'],
    pastMatches: ['match3', 'match4']
  },
  {
    id: 'team2',
    name: 'الزمالك',
    logo: '/logos/zamalek.png',
    stadium: 'استاد الجيش ببرج العرب',
    coach: 'coach2',
    players: ['player4', 'player5', 'player6'],
    upcomingMatches: ['match1'],
    pastMatches: ['match3']
  }
];

// Mock Tactical Analysis
export const mockTacticalAnalyses: TacticalAnalysis[] = [
  {
    id: '1',
    matchId: '2', // Upcoming match
    opponentStrengths: [
      'هجمات مرتدة سريعة',
      'قوة في الكرات الثابتة',
      'حارس مرمى متميز'
    ],
    opponentWeaknesses: [
      'بطء في الدفاع الأيمن',
      'ضعف في الكرات الهوائية',
      'نقص في اللياقة البدنية في الشوط الثاني'
    ],
    recommendedFormation: '4-3-3',
    keyPlayers: ['لاعب وسط المنافس', 'مهاجم المنافس الأساسي'],
    tacticalNotes: 'التركيز على الهجمات من الجانب الأيمن واستغلال ضعف المنافس في هذه المنطقة',
    playerInstructions: [
      { playerId: '1', instructions: 'التركيز على صناعة اللعب وتوزيع الكرات العرضية' },
      { playerId: '2', instructions: 'البقاء في الخلف لمراقبة هجمات المنافس المرتدة' }
    ],
    setPlays: [
      'ركلات الزاوية القصيرة من الجانب الأيمن',
      'الركلات الحرة المباشرة للاعب رقم 10'
    ],
    defensiveStrategy: 'ضغط عالي مع تأمين الخط الخلفي',
    offensiveStrategy: 'بناء الهجمات من العمق مع انتشار الأجنحة'
  }
];

// Mock Matches
export const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: { id: '101', name: 'الهلال', logo: '/images/teams/hilal.png', score: 2 },
    awayTeam: { id: '102', name: 'النصر', logo: '/images/teams/nassr.png', score: 1 },
    date: new Date('2024-03-10T18:00:00'),
    venue: 'استاد الملك فهد الدولي',
    status: 'completed',
    competition: 'دوري روشن السعودي',
    attendance: 62000,
    highlights: 'https://example.com/highlights/1',
    result: {
      homeTeamScore: 2,
      awayTeamScore: 1
    },
    stats: {
      possession: { home: 55, away: 45 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 5, away: 3 },
      corners: { home: 6, away: 4 },
      fouls: { home: 10, away: 12 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 0 }
    }
  },
  {
    id: '2',
    homeTeam: { id: '103', name: 'الاتحاد', logo: '/images/teams/ittihad.png', score: null },
    awayTeam: { id: '104', name: 'الأهلي', logo: '/images/teams/ahli.png', score: null },
    date: new Date('2024-03-15T19:30:00'),
    venue: 'استاد مدينة الملك عبدالله الرياضية',
    competition: 'كأس خادم الحرمين الشريفين',
    status: 'upcoming',
    attendance: null,
    highlights: null
  },
  {
    id: '3',
    homeTeam: { id: '105', name: 'الشباب', logo: '/images/teams/shabab.png', score: 3 },
    awayTeam: { id: '106', name: 'الفيصلي', logo: '/images/teams/faisaly.png', score: 0 },
    date: new Date('2024-03-05T20:00:00'),
    venue: 'استاد الأمير فيصل بن فهد',
    competition: 'دوري روشن السعودي',
    status: 'completed',
    attendance: 18000,
    highlights: 'https://example.com/highlights/3',
    result: {
      homeTeamScore: 3,
      awayTeamScore: 0
    },
    stats: {
      possession: { home: 60, away: 40 },
      shots: { home: 15, away: 6 },
      shotsOnTarget: { home: 7, away: 2 },
      corners: { home: 8, away: 2 },
      fouls: { home: 8, away: 14 },
      yellowCards: { home: 1, away: 4 },
      redCards: { home: 0, away: 1 }
    }
  }
];

// Mock Mental Readiness Surveys
export const mockMentalSurveys: MentalReadinessSurvey[] = [
  {
    id: '1',
    playerId: '1',
    matchId: '2', // For upcoming match
    date: new Date('2024-03-14'),
    energy: 8,
    focus: 9,
    confidence: 7,
    motivation: 10,
    anxiety: 3,
    notes: 'اللاعب جاهز ذهنياً للمباراة القادمة'
  },
  {
    id: '2',
    playerId: '2',
    matchId: '2', // For upcoming match
    date: new Date('2024-03-14'),
    energy: 6,
    focus: 7,
    confidence: 5,
    motivation: 8,
    anxiety: 6,
    notes: 'بعض القلق بسبب الإصابة السابقة لكن الحالة الذهنية جيدة'
  },
  {
    id: '3',
    playerId: '3',
    matchId: '2', // For upcoming match
    date: new Date('2024-03-14'),
    energy: 9,
    focus: 8,
    confidence: 9,
    motivation: 9,
    anxiety: 2,
    notes: 'جاهز تماماً ومتحمس للمباراة'
  }
];

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    playerId: '5',
    playerName: 'علي الشمراني',
    status: 'injured',
    diagnosis: 'إصابة في الكاحل',
    diagnosisDate: new Date('2024-02-20'),
    expectedRecovery: new Date('2024-03-15'),
    fitnessLevel: 65,
    notes: 'يحتاج إلى العلاج الطبيعي 3 مرات في الأسبوع'
  },
  {
    id: '2',
    playerId: '6',
    playerName: 'فارس الدوسري',
    status: 'recovering',
    diagnosis: 'إصابة عضلية',
    diagnosisDate: new Date('2024-02-20'),
    expectedRecovery: new Date('2024-03-15'),
    fitnessLevel: 80,
    notes: 'تحسن ملحوظ، يمكنه بدء التدريبات الخفيفة'
  },
  {
    id: '3',
    playerId: '2',
    playerName: 'خالد العمري',
    status: 'available',
    diagnosis: 'فحص دوري',
    diagnosisDate: new Date('2024-02-10'),
    expectedRecovery: null,
    fitnessLevel: 88,
    notes: 'بصحة جيدة، جاهز للعب'
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'goal',
    title: 'تم تسجيل هدف جديد',
    description: 'سجل أحمد محمد هدف في المباراة ضد النصر',
    timestamp: '2024-03-10T19:15:00',
    relatedId: 1
  },
  {
    id: 2,
    type: 'injury',
    title: 'إصابة لاعب',
    description: 'تعرض علي الشمراني لإصابة في الكاحل',
    timestamp: '2024-02-20T16:30:00',
    relatedId: 5
  },
  {
    id: 3,
    type: 'match',
    title: 'جدولة مباراة جديدة',
    description: 'تمت جدولة مباراة ضد الاتحاد',
    timestamp: '2024-02-28T10:00:00',
    relatedId: 2
  },
  {
    id: 4,
    type: 'training',
    title: 'جلسة تدريبية جديدة',
    description: 'تم جدولة جلسة تدريبية للياقة البدنية',
    timestamp: '2024-03-01T08:45:00'
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'u1', // coach
    senderName: 'محمد العلي',
    senderAvatar: '/images/avatars/coach.jpg',
    recipientId: 'u2', // player
    recipientName: 'أحمد محمد',
    content: 'أحمد، أود منك التركيز على تمارين اللياقة البدنية هذا الأسبوع. أداؤك في المباراة الأخيرة كان ممتازاً.',
    timestamp: new Date('2024-03-10T09:30:00'),
    read: true
  },
  {
    id: 'm2',
    senderId: 'u2', // player
    senderName: 'أحمد محمد',
    senderAvatar: '/images/avatars/player1.jpg',
    recipientId: 'u1', // coach
    recipientName: 'محمد العلي',
    content: 'شكراً مدرب. سأركز على ذلك.',
    timestamp: new Date('2024-03-10T10:15:00'),
    read: true
  },
  {
    id: 'm3',
    senderId: 'u1', // coach
    senderName: 'محمد العلي',
    senderAvatar: '/images/avatars/coach.jpg',
    recipientId: 'u3', // doctor
    recipientName: 'د. خالد العمري',
    content: 'دكتور، هل يمكننا مناقشة حالة علي الشمراني؟ أحتاج تقرير عن موعد عودته للملاعب.',
    timestamp: new Date('2024-03-11T14:20:00'),
    read: false
  },
  {
    id: 'm4',
    senderId: 'u3', // doctor
    senderName: 'د. خالد العمري',
    senderAvatar: '/images/avatars/doctor.jpg',
    recipientId: 'u1', // coach
    recipientName: 'محمد العلي',
    content: 'بالتأكيد، سأرسل لك التقرير الطبي الكامل خلال ساعة.',
    timestamp: new Date('2024-03-11T14:45:00'),
    read: false,
    attachment: {
      type: 'document',
      url: '/documents/medical-report.pdf',
      name: 'تقرير طبي - علي الشمراني.pdf'
    }
  },
  {
    id: 'm5',
    senderId: 'u4', // admin
    senderName: 'سعيد الشمري',
    senderAvatar: '/images/avatars/admin.jpg',
    recipientId: 'u1', // coach
    recipientName: 'محمد العلي',
    content: 'تم تأكيد موعد المباراة القادمة يوم الجمعة الساعة 7 مساءً. يرجى تجهيز الفريق.',
    timestamp: new Date('2024-03-12T11:00:00'),
    read: true
  }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    participants: ['u1', 'u2'], // coach & player
    lastMessage: mockMessages.find(m => m.id === 'm2'),
    unreadCount: 0,
    createdAt: new Date('2024-03-10T09:30:00'),
    updatedAt: new Date('2024-03-10T10:15:00')
  },
  {
    id: 'c2',
    participants: ['u1', 'u3'], // coach & doctor
    lastMessage: mockMessages.find(m => m.id === 'm4'),
    unreadCount: 1,
    createdAt: new Date('2024-03-11T14:20:00'),
    updatedAt: new Date('2024-03-11T14:45:00')
  },
  {
    id: 'c3',
    participants: ['u1', 'u4'], // coach & admin
    lastMessage: mockMessages.find(m => m.id === 'm5'),
    unreadCount: 0,
    createdAt: new Date('2024-03-12T11:00:00'),
    updatedAt: new Date('2024-03-12T11:00:00')
  }
];

// Helper functions
export const getUsersByRole = (role: string): User[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getUpcomingMatches = (): Match[] => {
  return mockMatches.filter(match => match.status === 'upcoming');
};

export const getPlayerById = (id: string): Player | undefined => {
  return mockPlayers.find(player => player.id === id);
};

export const getTeamById = (id: string): Team | undefined => {
  return mockTeams.find(team => team.id === id);
};

export const getMedicalRecordsByPlayerId = (playerId: string): MedicalRecord[] => {
  return mockMedicalRecords.filter(record => record.playerId === playerId);
};

export const getMatchById = (id: string): Match | undefined => {
  return mockMatches.find(match => match.id === id);
};

export const getMentalSurveysByPlayerId = (playerId: string): MentalReadinessSurvey[] => {
  return mockMentalSurveys.filter(survey => survey.playerId === playerId);
};

export const getTacticalAnalysisByMatchId = (matchId: string): TacticalAnalysis | undefined => {
  return mockTacticalAnalyses.find(analysis => analysis.matchId === matchId);
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (!conversation) return [];
  
  return mockMessages.filter(message => 
    conversation.participants.includes(message.senderId) && 
    conversation.participants.includes(message.recipientId)
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const getConversationsByUserId = (userId: string): Conversation[] => {
  return mockConversations.filter(conversation => 
    conversation.participants.includes(userId)
  ).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}; 