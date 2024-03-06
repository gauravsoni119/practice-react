import {
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
  useReducer,
} from 'react';
import { GRAPHIC_URL } from './constant';
import { fetchBanks } from './api';
import { LoadingState, bankReducer, initialState } from './reducer';
import { useDebounce } from './debounce';

export function Autocomplete() {
  const [state, dispatch] = useReducer(bankReducer, initialState);
  const [upiId, setUpiId] = useState('');
  const [prediction, setPrediction] = useState('');
  const debouncedFetchBank = useDebounce((query: string) => {
    dispatch({ type: 'GET_BANKS', payload: [] });
    fetchBanks(query)
      .then((res) => dispatch({ type: 'GET_BANKS_SUCCESS', payload: res }))
      .catch((err) => dispatch({ type: 'GET_BANKS_ERROR', payload: err }));
  }, 500);

  useEffect(() => {
    const [userName, bankName] = upiId.split('@');
    if (bankName === undefined || !userName) {
      setPrediction('');
      return;
    }
    let currentPredictedBank = state.data[0];
    if (!state.data.length) {
      currentPredictedBank = '';
    }
    setPrediction(`${userName}@${currentPredictedBank}`);
  }, [state.data, upiId]);

  const handleUpiIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const bankName = event.target.value.split('@')[1];
    setUpiId(event.target.value);
    setPrediction('');
    dispatch({ type: 'RESET_BANKS' });
    if (bankName === undefined) return;
    debouncedFetchBank(bankName);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      setUpiId(prediction);
      dispatch({ type: 'RESET_BANKS' });
    }
  };

  const handleSuggestionClick = (bank: string) => {
    const [userName] = upiId.split('@');
    const updatedUpiId = `${userName}@${bank}`;
    setPrediction(updatedUpiId);
    setUpiId(updatedUpiId);
    dispatch({ type: 'RESET_BANKS' });
  };
  return (
    <div className="container payment">
      <img className="payment__img" src={GRAPHIC_URL} alt="payment gateway" />
      <form className="payment__form" onSubmit={(e) => e.preventDefault()}>
        <div className="payment__formcontrol">
          <input
            className="payment__input"
            type="text"
            value={prediction}
            onChange={() => ({})}
          />
          <input
            className="payment__input"
            type="search"
            placeholder="Enter your UPI ID"
            value={upiId}
            onChange={handleUpiIdChange}
            onKeyDown={handleKeyDown}
          />
          <ul className="payment__suggestions">
            {state.data.length > 0 &&
              state.data.map((bank, index) => (
                <li key={index} onClick={() => handleSuggestionClick(bank)}>
                  {bank}
                </li>
              ))}
          </ul>
        </div>
        <button
          className="payment__button"
          disabled={state.callState === LoadingState.LOADING}
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default Autocomplete;
