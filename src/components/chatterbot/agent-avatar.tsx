
'use client';

/**
 * @fileoverview Component for the animated agent avatar.
 * It handles the agent's visual representation, including blinking, head tilting,
 * and lip-syncing based on audio volume.
 */

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useAgentStore } from '@/hooks/use-agent-store';
import { useVoiceChat } from '@/hooks/use-voice-chat';

export function AgentAvatar() {
  const { currentAgent, audioLevel } = useAgentStore();
  const { isTalking } = useVoiceChat();
  const eyeLidTopRef = useRef<SVGPathElement>(null);
  const eyeLidBottomRef = useRef<SVGPathElement>(null);
  const headTiltX = useMotionValue(0);
  const headTiltY = useMotionValue(0);

  const { name, bodyColor } = currentAgent;

  // Blinking animation effect
  useEffect(() => {
    const blink = () => {
      const topLid = eyeLidTopRef.current;
      const bottomLid = eyeLidBottomRef.current;
      if (topLid && bottomLid) {
        // Close eyes
        topLid.style.transform = 'translateY(12px)';
        bottomLid.style.transform = 'translateY(-12px)';
        // Open eyes after a short delay
        setTimeout(() => {
          topLid.style.transform = 'translateY(0)';
          bottomLid.style.transform = 'translateY(0)';
        }, 150);
      }
    };

    // Trigger blink at random intervals
    const blinkInterval = setInterval(blink, Math.random() * 5000 + 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Head tilting animation based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { innerWidth, innerHeight } = currentTarget as Window;
      // Calculate tilt based on mouse position relative to the center of the screen
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
      headTiltX.set(x * 10); // Tilt up to 10 degrees horizontally
      headTiltY.set(y * 10); // Tilt up to 10 degrees vertically
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [headTiltX, headTiltY]);

  // Lip-sync animation based on audio level
  const lipSyncScale = isTalking ? 1 + audioLevel * 1.5 : 1;

  return (
    <motion.div
      className="relative"
      style={{ rotateX: headTiltY, rotateY: headTiltX }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="h-64 w-64 rounded-full shadow-lg"
        style={{ backgroundColor: bodyColor }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          {/* Eyes */}
          <g transform="translate(0, -20)">
            {/* Left Eye */}
            <circle cx="70" cy="100" r="15" fill="white" />
            <circle cx="70" cy="100" r="7" fill="black" />
            <path
              ref={eyeLidTopRef}
              d="M 55 92 Q 70 80 85 92"
              fill={bodyColor}
              className="transition-transform duration-100"
            />
            <path
              ref={eyeLidBottomRef}
              d="M 55 108 Q 70 120 85 108"
              fill={bodyColor}
              className="transition-transform duration-100"
            />
            {/* Right Eye */}
            <circle cx="130" cy="100" r="15" fill="white" />
            <circle cx="130" cy="100" r="7" fill="black" />
            <path d="M 115 92 Q 130 80 145 92" fill={bodyColor} />
            <path d="M 115 108 Q 130 120 145 108" fill={bodyColor} />
          </g>

          {/* Mouth */}
          <motion.ellipse
            cx="100"
            cy="150"
            rx="20"
            ry={10 * lipSyncScale}
            fill="#6B21A8" // A dark purple for the mouth interior
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          />
        </svg>
      </motion.div>
      <div dir="ltr" className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1 text-center text-white shadow-md">
        {name}
      </div>
    </motion.div>
  );
}
