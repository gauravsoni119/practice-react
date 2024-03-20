/**
 * In this frontend coding challenge, the candidate needs to implement a game to match countries with their capitals.
 * Many users reported that this question was asked in the frontend interview process of Microsoft.
 * Functional Requirements
 * Implement a component <Game /> that will receive an object data as a prop. Each key of the object would be a country and corresponding value would be its capital.
 * const DATA = {
 *  'India': 'Delhi',
 *  'Russia': 'Moscow',
 *  'China': 'Berlin',
 *  ...
 * }
 * Render the list of countries and capitals in the random order on the UI.
 * The aim of the game is to select the country and its capitals.
 * The user can select 2 options. The default border color of an option should be #414141.
 * Selected option should have blue color border.
 * If the user selection is correct the selected options border color should change to #66cc99 and both options should disappear from the screen after 1000 ms.
 * If the user selection is incorrect then the selected options border color should change to red and reset after 1000 ms.
 * When there are no options left on the screen then show a message Congratulations.
 */

import clsx from 'clsx';
import { useEffect, useState } from 'react';

export interface CountryCapitalProps {
  countryMap: Record<string, string>;
}

function shuffle(array: string[]) {
  let currentIndex = array.length;
  let randomIndex: number;
  const res = [...array];

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [res[currentIndex], res[randomIndex]] = [
      res[randomIndex],
      res[currentIndex],
    ];
  }

  return res;
}

export function CountryCapital({ countryMap }: CountryCapitalProps) {
  const [options, setOption] = useState<string[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [correctSelection, setCorrectSelection] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());

  useEffect(() => {
    setOption(shuffle(Object.entries(countryMap).flat()));
  }, [countryMap]);

  const handleSelection = (option: string) => {
    if (selection.length === 1 && selection.includes(option)) {
      console.log(selection, option, '$$');
      return null;
    }
    const newSelection = selection.concat(option);
    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      if (countryMap[first] === second || countryMap[second] === first) {
        setCorrectSelection(newSelection);
        setTimeout(() => {
          setMatched(new Set([...matched, ...newSelection]));
          setCorrectSelection([]);
          setSelection([]);
        }, 1000);
      } else {
        setSelection(newSelection);
        setTimeout(() => setSelection([]), 1000);
      }
    } else {
      setSelection(newSelection);
    }
  };

  if (matched.size === options.length) {
    return (
      <div className="border-teal-500 border-2 border-dashed p-5 text-center">
        <p className="font-bold text-lg">Congratulations!</p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2 justify-center align-center">
      {options.map((option) => {
        if (matched.has(option)) {
          return null;
        }
        const isSelected = selection.includes(option);
        const isMatched = correctSelection.includes(option);
        const isIncorrect = selection.length === 2 && isSelected && !isMatched;
        return (
          <button
            key={option}
            className={clsx('border-2 border-black rounded-md px-3 py-2 ml-2', {
              'border-blue-500': isSelected,
              'border-red-500': isIncorrect,
              'border-green-500': isMatched,
            })}
            onClick={() => handleSelection(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default CountryCapital;
