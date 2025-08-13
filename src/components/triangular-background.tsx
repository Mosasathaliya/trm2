/**
 * @fileoverview Renders a dynamic, animated background with morphing shapes.
 */
"use client";
import React from 'react';

const AnimatedBlob = ({
  color,
  x,
  y,
  size,
  duration,
  delay,
  xEnd,
  yEnd
}: {
  color: string;
  x: string;
  y: string;
  size: string;
  duration: string;
  delay: string;
  xEnd: string;
  yEnd: string;
}) => (
  <div
    className="animate-move absolute rounded-full opacity-50 mix-blend-multiply blur-xl"
    style={{
      backgroundColor: `hsl(var(${color}))`,
      top: y,
      left: x,
      width: size,
      height: size,
      animationDuration: duration,
      animationDelay: delay,
      '--x-end': xEnd,
      '--y-end': yEnd,
    } as React.CSSProperties}
  />
);

export function BackgroundShapes() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-background overflow-hidden">
        <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 backdrop-blur-[100px]"></div>

            <div className="relative h-full w-full">
                 <AnimatedBlob color="--bg-color-1" x="10%" y="20%" size="300px" duration="30s" delay="0s" xEnd="80vw" yEnd="30vh" />
                 <AnimatedBlob color="--bg-color-2" x="70%" y="10%" size="350px" duration="35s" delay="-5s" xEnd="20vw" yEnd="80vh" />
                 <AnimatedBlob color="--bg-color-3" x="30%" y="70%" size="300px" duration="25s" delay="-10s" xEnd="90vw" yEnd="60vh" />
                 <AnimatedBlob color="--bg-color-4" x="80%" y="60%" size="250px" duration="40s" delay="-15s" xEnd="10vw" yEnd="10vh" />
            </div>
        </div>
    </div>
  );
}
