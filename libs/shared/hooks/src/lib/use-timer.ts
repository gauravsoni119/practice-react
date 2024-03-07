import { useRef, useState, useEffect, useCallback } from 'react';

export function useTimer(totalTime: number) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(totalTime);
  const timeoutRef = useRef<number | undefined>();
  const start = useCallback(() => {
    setIsRunning(true);
    timeoutRef.current = window.setInterval(() => {
      setSeconds((second) => second - 1);
    }, 1000);
  }, [setIsRunning, setSeconds]);

  const stop = useCallback(() => {
    clearInterval(timeoutRef.current);
    setIsRunning(false);
    setSeconds(totalTime);
  }, [setIsRunning, setSeconds, totalTime]);

  useEffect(() => {
    if (seconds < 1) {
      stop();
    }
  }, [seconds, stop, isRunning]);

  useEffect(() => timeoutRef && clearTimeout(timeoutRef.current), []);

  return { isRunning, seconds, start, stop };
}
