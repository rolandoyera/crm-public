export interface ProjectActivity {
  id: string;
  createdAt: number;
  description: string;
  subject: string;
  type: string;
}

export interface ProjectApplicant {
  id: string;
  avatar: string;
  commonConnections: number;
  cover: string;
  skills: string[];
  name: string;
}

export interface ProjectAuthor {
  id: string;
  avatar: string;
  name: string;
}

export interface ProjectFile {
  id: string;
  mimeType: string;
  name: string;
  size: number;
  url: string;
}

export interface ProjectMember {
  id: string;
  avatar: string;
  job: string;
  name: string;
}

export interface ProjectReview {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  comment: string;
  createdAt: number;
  value: number;
}

export interface Project {
  id: string;
  activities?: ProjectActivity[];
  applicants?: ProjectApplicant[];
  author: ProjectAuthor;
  budget: number;
  caption: string;
  currency: string;
  description?: string;
  endDate?: number;
  files?: ProjectFile[];
  image?: string;
  isActive?: boolean;
  isLiked: boolean;
  likes?: number;
  location: string;
  members?: ProjectMember[];
  membersCount?: number;
  rating: number;
  reviews?: ProjectReview[];
  startDate?: number;
  tags?: string[];
  technology?: string;
  title: string;
  type: 'Full-Time' | 'Part-Time';
  updatedAt: number;
}
