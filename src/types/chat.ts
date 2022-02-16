export interface Contact {
  id: string;
  avatar: string;
  isActive: boolean;
  lastActivity: number;
  name: string;
  username: string;
}

interface Attachment {
  id: string;
  url: string;
}

export interface Message {
  id: string;
  attachments: Attachment[];
  body: string;
  contentType: string;
  createdAt: number;
  senderId: string;
}

export interface Participant {
  id: string;
  avatar: string | null;
  name: string;
  username: string;
}

export interface Thread {
  id?: string;
  messages: Message[];
  participants: Participant[];
  type: 'ONE_TO_ONE' | 'GROUP';
  unreadCount: number;
}
