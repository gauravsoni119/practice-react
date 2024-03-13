import { useRef, useState, useEffect, useCallback } from 'react';

export function useTimer(totalTime: number) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(totalTime);
  const timeoutRef = useRef<number | undefined>();
  const start = useCallback(() => {
    setIsRunning(true);
    timeoutRef.current = window.setInterval(() => {
      // React hooks will use the same closure function in the next render.
      // Hence, setSeconds(seconds - 1); will not work and we need to use setSeconds((second) => second - 1);
      // The other possible fix will be to use useRef to store the closure function and call that with callback.current().
      // See https://overreacted.io/making-setinterval-declarative-with-react-hooks/#:~:text=wait%2C%20can%20you%3F-,Refs%20to%20the%20Rescue!,-The%20problem%20boils
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
