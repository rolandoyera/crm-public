import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from '../store';
import type { Contact, Thread, Participant } from '../types/chat';
import objFromArray from '../utils/objFromArray';
import { chatApi } from '../__fakeApi__/chatApi';

interface ChatState {
  activeThreadId?: string;
  contacts: {
    byId: Record<string, Contact>;
    allIds: string[];
  };
  threads: {
    byId: Record<string, Thread>;
    allIds: string[];
  };
  participants: Participant[];
  recipients: any[];
}

const initialState: ChatState = {
  activeThreadId: null,
  contacts: {
    byId: {},
    allIds: []
  },
  threads: {
    byId: {},
    allIds: []
  },
  participants: [],
  recipients: []
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getContacts(state: ChatState, action: PayloadAction<Contact[]>): void {
      const contacts = action.payload;

      state.contacts.byId = objFromArray(contacts);
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },
    getThreads(state: ChatState, action: PayloadAction<Thread[]>): void {
      const threads = action.payload;

      state.threads.byId = objFromArray(threads);
      state.threads.allIds = Object.keys(state.threads.byId);
    },
    getThread(state: ChatState, action: PayloadAction<Thread | null>): void {
      const thread = action.payload;

      if (thread) {
        state.threads.byId[thread.id] = thread;

        if (!state.threads.allIds.includes(thread.id)) {
          state.threads.allIds.push(thread.id);
        }

        state.activeThreadId = thread.id;
      } else {
        state.activeThreadId = null;
      }
    },
    markThreadAsSeen(state: ChatState, action: PayloadAction<string>): void {
      const threadId = action.payload;
      const thread = state.threads.byId[threadId];

      if (thread) {
        thread.unreadCount = 0;
      }
    },
    resetActiveThread(state: ChatState): void {
      state.activeThreadId = null;
    },
    getParticipants(state: ChatState, action: PayloadAction<Participant[]>): void {
      state.participants = action.payload;
    },
    addRecipient(state: ChatState, action: PayloadAction<any>): void {
      const recipient = action.payload;
      const exists = state.recipients.find((_recipient) => _recipient.id === recipient.id);

      if (!exists) {
        state.recipients.push(recipient);
      }
    },
    removeRecipient(state: ChatState, action: PayloadAction<string>): void {
      const recipientId = action.payload;

      state.recipients = state.recipients.filter((recipient) => recipient.id !== recipientId);
    }
  }
});

export const { reducer } = slice;

export const getContacts = (): AppThunk => async (dispatch): Promise<void> => {
  const data = await chatApi.getContacts();

  dispatch(slice.actions.getContacts(data));
};

export const getThreads = (): AppThunk => async (dispatch): Promise<void> => {
  const data = await chatApi.getThreads();

  dispatch(slice.actions.getThreads(data));
};

export const getThread = (threadKey: string): AppThunk => async (dispatch): Promise<void> => {
  const data = await chatApi.getThread(threadKey);

  dispatch(slice.actions.getThread(data));
};

export const markThreadAsSeen = (threadId: string): AppThunk => async (dispatch): Promise<void> => {
  await chatApi.markThreadAsSeen(threadId);

  dispatch(slice.actions.markThreadAsSeen(threadId));
};

export const resetActiveThread = () => (dispatch): void => {
  dispatch(slice.actions.resetActiveThread());
};

export const getParticipants = (threadKey: string): AppThunk => async (dispatch): Promise<void> => {
  const data = await chatApi.getParticipants(threadKey);

  dispatch(slice.actions.getParticipants(data));
};

export const addRecipient = (recipient: any): AppThunk => (dispatch): void => {
  dispatch(slice.actions.addRecipient(recipient));
};

export const removeRecipient = (recipientId: string): AppThunk => (dispatch): void => {
  dispatch(slice.actions.removeRecipient(recipientId));
};

export default slice;
