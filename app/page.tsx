'use client';
import React from 'react';
import PomodoroTimer from './components/PomodoroTimer';

export default function Home() {
  return (
    <div className="w-full h-screen">
      <PomodoroTimer />
    </div>
  );
}