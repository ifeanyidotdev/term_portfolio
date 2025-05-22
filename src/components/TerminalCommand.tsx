
"use client";
import type React from 'react';
import { useState, useEffect } from 'react';

interface TerminalCommandProps {
  command: string;
  showPrompt?: boolean;
  className?: string;
  onTypingComplete?: () => void;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({ command, showPrompt = true, className, onTypingComplete }) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [typingCompleted, setTypingCompleted] = useState(false);

  useEffect(() => {
    if (typingCompleted) return;

    setDisplayedCommand(''); // Reset if command changes
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < command.length) {
        setDisplayedCommand(prev => prev + command.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTypingCompleted(true);
        if (onTypingComplete) {
          onTypingComplete();
        }
      }
    }, 50); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [command, onTypingComplete, typingCompleted]);


  return (
    <div className={className}>
      {showPrompt && (
        <span className="text-lg md:text-xl">
          <span className="text-accent">user</span>
          <span className="text-foreground">@</span>
          <span className="text-primary">devterm</span>
          <span className="text-foreground">:~$ </span>
        </span>
      )}
      <span className="text-lg md:text-xl text-foreground font-semibold">{displayedCommand}</span>
      {!typingCompleted && <span className="animate-blink w-2 h-5 bg-foreground inline-block ml-1"></span>}
    </div>
  );
};

export default TerminalCommand;
