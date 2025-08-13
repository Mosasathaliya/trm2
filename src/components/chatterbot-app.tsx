'use client';

/**
 * @fileoverview Main component for the Chatterbot voice agent application.
 * This component orchestrates the agent's appearance, controls, and interaction logic.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { AgentAvatar } from '@/components/chatterbot/agent-avatar';
import { VoiceControls } from '@/components/chatterbot/voice-controls';
import { AgentEditDialog } from '@/components/chatterbot/agent-edit-dialog';
import { UserSettingsDialog } from '@/components/chatterbot/user-settings-dialog';
import { useAgentStore } from '@/hooks/use-agent-store';

export function ChatterbotApp() {
  // Get the current agent and user settings from the Zustand store
  const { currentAgent } = useAgentStore();
  const { backgroundColor } = currentAgent;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {/* Animated background color that changes with the agent */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundColor }}
        transition={{ duration: 0.5 }}
      />

      {/* Header section with dialog triggers */}
      <header className="absolute top-0 flex w-full justify-between p-4 z-20">
        <AgentEditDialog />
        <UserSettingsDialog />
      </header>

      {/* Main content area for the agent avatar */}
      <main className="flex flex-grow flex-col items-center justify-center">
        <AgentAvatar />
      </main>

      {/* Footer section with voice controls */}
      <footer className="w-full p-4">
        <VoiceControls />
      </footer>
    </div>
  );
}
