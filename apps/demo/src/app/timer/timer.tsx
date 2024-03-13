import { useTimer } from '@practice-react/hooks';

export interface TimerProps {
  totalTime: number;
}

export function Timer({ totalTime }: TimerProps) {
  const { isRunning, start, stop, seconds } = useTimer(totalTime);
  return (
    <div className="flex w-2/5">
      <button
        className="bg-green-600 text-white px-3 py-1 rounded-lg cursor-pointer"
        onClick={start}
        disabled={isRunning}
      >
        Start Timer
      </button>
      <p className="bg-gray-200 rounded-sm text-center p-1 flex-1">
        {!isRunning ? 'No timer running' : seconds}
      </p>
      <button
        className="bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer"
        onClick={stop}
        disabled={!isRunning}
      >
        Stop Timer
      </button>
    </div>
  );
}

export default Timer;
