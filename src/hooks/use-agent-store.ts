'use client';

/**
 * @fileoverview Zustand store for managing the AI agent's state.
 * This includes the list of available agents, the currently selected agent,
 * and user settings that can personalize the agent's behavior.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const VALID_VOICES = [
  'Algenib', 'Antares', 'Sirius', 'Alnilam', 'Gacrux',
  'Achernar', 'Achird', 'Algieba', 'Rasalgethi', 'Schedar', 'Vindemiatrix'
] as const;

// Define the structure for a single AI agent
export interface Agent {
  name: string;
  personality: string;
  bodyColor: string;
  voice: (typeof VALID_VOICES)[number];
}

// Define the structure for user settings
export interface UserSettings {
  name: string;
  info: string;
}

// Define the structure of the entire store's state
interface AgentState {
  version: number; // Add version number for migration
  agents: Agent[];
  currentAgent: Agent;
  userSettings: UserSettings;
  audioLevel: number;
  setCurrentAgent: (agent: Agent) => void;
  setUserSettings: (settings: UserSettings) => void;
  setAudioLevel: (level: number) => void;
}

const STORAGE_VERSION = 3; // Increment this to force a state reset

// Define the default list of agents
const defaultAgents: Agent[] = [
  {
    name: 'Botty',
    personality: 'The best teacher in English who listens to users and corrects them if they make mistakes or struggle to speak. It is very conversational and will bring topics to speak about.',
    bodyColor: '#9333ea', // purple-600
    voice: 'Algenib',
  },
  {
    name: 'Captain Jack',
    personality: 'A witty and adventurous pirate captain with a love for treasure and a good joke.',
    bodyColor: '#ca8a04', // yellow-600
    voice: 'Antares',
  },
  {
    name: 'Professor Axiom',
    personality: 'A brilliant, slightly eccentric professor of theoretical physics who explains things with elaborate analogies.',
    bodyColor: '#1d4ed8', // blue-700
    voice: 'Sirius',
  },
];

const initialState = {
  version: STORAGE_VERSION,
  agents: defaultAgents,
  currentAgent: defaultAgents[0],
  userSettings: {
    name: '',
    info: '',
  },
  audioLevel: 0,
};


// Create the Zustand store with persistence middleware
export const useAgentStore = create<AgentState>()(
  persist(
    (set) => ({
      ...initialState,
      // Actions
      setCurrentAgent: (agent) => set({ currentAgent: agent }),
      setUserSettings: (settings) => set({ userSettings: settings }),
      setAudioLevel: (level) => set({ audioLevel: level }),
    }),
    {
      name: 'agent-storage', // Name for the storage item in localStorage
      storage: createJSONStorage(() => localStorage), // Explicitly set storage
      version: STORAGE_VERSION, // Set the version for the storage
      migrate: (persistedState, version) => {
        // If the stored version is older than the current version,
        // ignore the stored state and use the new initial state.
        if (version < STORAGE_VERSION) {
          return initialState;
        }
        return persistedState as AgentState;
      },
    }
  )
);
