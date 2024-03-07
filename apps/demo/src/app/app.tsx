// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Autocomplete } from '@practice-react/autocomplete';
import Timer from './timer/timer';

export function App() {
  return (
    <>
      <Autocomplete />
      <Timer totalTime={5} />
    </>
  );
}

export default App;
