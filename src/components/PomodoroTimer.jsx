import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start/Stop the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset the timer
  const resetTimer = () => {
    setTimeLeft(25 * 60); // Reset to 25 minutes
    setIsRunning(false);
  };

  // Handle timer countdown
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="text-4xl font-mono mb-6">{formatTime(timeLeft)}</div>
      <div className="space-x-4">
        <button
          onClick={toggleTimer}
          className={`px-4 py-2 rounded ${
            isRunning ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
