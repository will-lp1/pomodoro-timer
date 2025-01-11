'use client';

import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  
  const [playSound] = useSound('/timer-end.mp3', {
    onplayerror: () => {
      console.log('Failed to play sound');
    }
  });

  useEffect(() => {
    document.title = `${formatTime(minutes)}:${formatTime(seconds)} - ${isBreak ? 'Break' : 'Focus'}`;
  }, [minutes, seconds, isBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            playSound();
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, playSound]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 ${inter.className}`}>
      <div className="p-12 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl">
        <h1 className="text-3xl font-medium text-white/90 mb-10 text-center tracking-tight">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h1>
        <div className="text-[120px] font-light text-white mb-10 text-center tracking-tight leading-none">
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTimer}
            className="px-10 py-4 rounded-xl bg-white/20 hover:bg-white/25 text-white text-lg font-medium transition-all duration-200 hover:scale-105"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-10 py-4 rounded-xl bg-white/15 hover:bg-white/20 text-white/90 text-lg font-medium transition-all duration-200 hover:scale-105"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;