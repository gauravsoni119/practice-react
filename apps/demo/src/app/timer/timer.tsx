import { useTimer } from '@practice-react/hooks';
import styles from './timer.module.css';

/* eslint-disable-next-line */
export interface TimerProps {
  totalTime: number;
}

export function Timer({ totalTime }: TimerProps) {
  const { isRunning, start, stop, seconds } = useTimer(totalTime);
  return (
    <div>
      <h1>UseTimer custom hook!</h1>
      <p>{!isRunning ? 'No timer running' : seconds}</p>
      <button onClick={start} disabled={isRunning}>
        Start Timer
      </button>
      <button onClick={stop} disabled={!isRunning}>
        Stop Timer
      </button>
    </div>
  );
}

export default Timer;
