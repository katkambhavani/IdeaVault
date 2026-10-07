export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  college: string;
  course: string;
  year: string;
  savedIdeaIds: string[];
};

export type Idea = {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  category: string;
  technologies: string[];
  difficulty: string;
  requiredTeamMembers: number;
  currentTeamMembers: number;
  status: string;
  creatorId: string;
  creatorName: string;
  interestedUserIds: string[];
  createdAt: string;
  isDemo: boolean;
};

export type IdeaDraft = Omit<
  Idea,
  'id' | 'creatorId' | 'creatorName' | 'interestedUserIds' | 'createdAt' | 'isDemo'
>;
