import type { Idea } from './types';

export const USERS_KEY = 'ideavault_users';
export const SESSION_KEY = 'ideavault_session';
export const IDEAS_KEY = 'ideavault_ideas';

export const seedIdeas: Idea[] = [
  {
    id: 'demo-campus-events',
    title: 'Campus Event Manager',
    shortDescription: 'One calm place to discover what is happening on campus and bring people together.',
    detailedDescription: 'A student-first event hub with searchable listings, RSVP counts, reminders, and a lightweight organizer dashboard. The goal is to make the good stuff happening across departments easier to find.',
    category: 'Software',
    technologies: ['React', 'Firebase', 'Figma'],
    difficulty: 'Intermediate',
    requiredTeamMembers: 3,
    currentTeamMembers: 1,
    status: 'Looking for Team',
    creatorId: 'demo',
    creatorName: 'IdeaVault demo team',
    interestedUserIds: [],
    createdAt: '2025-02-08',
    isDemo: true,
  },
  {
    id: 'demo-skill-exchange',
    title: 'Student Skill Exchange',
    shortDescription: 'Trade a little of what you know for a little of what you want to learn.',
    detailedDescription: 'A campus skill-sharing board where students can offer short sessions in anything from portrait photography to calculus. Match by availability, topic, and what each person hopes to get out of it.',
    category: 'Education',
    technologies: ['Next.js', 'Supabase', 'TypeScript'],
    difficulty: 'Advanced',
    requiredTeamMembers: 4,
    currentTeamMembers: 2,
    status: 'Looking for Team',
    creatorId: 'demo',
    creatorName: 'IdeaVault demo team',
    interestedUserIds: [],
    createdAt: '2025-02-04',
    isDemo: true,
  },
  {
    id: 'demo-study-planner',
    title: 'Smart Study Planner',
    shortDescription: 'Turn the semester calendar into a realistic plan you can actually stick to.',
    detailedDescription: 'A thoughtful study planner that breaks assignments into focused work blocks, balances busy weeks, and helps friends study together. Start with a clean calendar and keep the planning friction low.',
    category: 'Education',
    technologies: ['Python', 'React', 'OpenAI'],
    difficulty: 'Advanced',
    requiredTeamMembers: 3,
    currentTeamMembers: 1,
    status: 'Looking for Team',
    creatorId: 'demo',
    creatorName: 'IdeaVault demo team',
    interestedUserIds: [],
    createdAt: '2025-01-30',
    isDemo: true,
  },
  {
    id: 'demo-lost-found',
    title: 'College Lost & Found',
    shortDescription: 'A searchable, campus-wide place for the things we leave behind.',
    detailedDescription: 'Post a found item with a photo, location, and date. Owners can search without needing to know which building desk is holding their lost water bottle, jacket, or student ID.',
    category: 'Mobile App',
    technologies: ['Vue', 'Node.js', 'PostgreSQL'],
    difficulty: 'Beginner',
    requiredTeamMembers: 2,
    currentTeamMembers: 1,
    status: 'Looking for Team',
    creatorId: 'demo',
    creatorName: 'IdeaVault demo team',
    interestedUserIds: [],
    createdAt: '2025-01-25',
    isDemo: true,
  },
  {
    id: 'demo-volunteer',
    title: 'Local Volunteer Platform',
    shortDescription: 'Make it easier for students to show up for the neighborhoods around them.',
    detailedDescription: 'A mobile-friendly directory of nearby community projects, with clear time commitments and group signups. Help students find a good first opportunity and help local organizations find reliable volunteers.',
    category: 'Social Impact',
    technologies: ['React Native', 'Mapbox', 'Supabase'],
    difficulty: 'Intermediate',
    requiredTeamMembers: 4,
    currentTeamMembers: 2,
    status: 'Looking for Team',
    creatorId: 'demo',
    creatorName: 'IdeaVault demo team',
    interestedUserIds: [],
    createdAt: '2025-01-19',
    isDemo: true,
  },
];

export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function normalizeStoredIdeas(ideas: Idea[]): Idea[] {
  const categoryMap: Record<string, string> = {
    'Campus life': 'Software',
    Community: 'Social Impact',
    Productivity: 'Software',
    'Social impact': 'Social Impact',
  };
  const statusMap: Record<string, string> = {
    'Looking for teammates': 'Looking for Team',
    'In progress': 'In Development',
  };
  return ideas.map((idea) => ({
    ...idea,
    category: categoryMap[idea.category] || idea.category,
    status: statusMap[idea.status] || idea.status,
  }));
}

export function createId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function getInitials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}
