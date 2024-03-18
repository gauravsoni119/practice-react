/**
 * In this question, you need to build a password strength checker in React.js that shows the strength of the password (out of 10) and a progress bar where the progress is determined by the strength.
 * It is a good beginner-friendly question to practice for Machine Coding Round.
 *
 * Some points to remember:-
 * Password's length should be between 6 and 32 characters.
 * Strength of the password is a combination of its length and the type of characters in the password.
 * The max strength possible is 10.
 * If the password has at least one uppercase letter then strength increases by 1.
 * If the password has at least one lowercase letter then strength increases by 1.
 * If the password has at least one digit then strength increases by 1.
 * If the password has at least one special character then strength increases by 1.
 * If strength > 3 && strength <= 6 then password is considered to be weak.
 * If strength > 6 && strength <= 8 then password is considered to be moderate.
 * If strength > 8 then the password is considered to be strong.
 * If the password length is less than 3 then strength should be considered as 0.
 */

import { useMemo } from 'react';

const MAX_STRENGTH = 10;

type Strength = 'weak' | 'moderate' | 'strong';

const StrengthTypeMap = {
  weak: 'red',
  moderate: 'yellow',
  strong: 'green',
} as Record<Strength, 'red' | 'yellow' | 'green'>;

export interface PasswordCheckerProps {
  password: string;
}

const upperCase = new RegExp(/[A-Z]/, 'g');
const lowerCase = new RegExp(/[a-z]/, 'g');
const digit = new RegExp(/[0-9]/, 'g');
const specialChar = new RegExp(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/, 'g');

const isMatch = (password: string, regex: RegExp) => {
  if (password.length < 3) {
    return 0;
  }
  const match = password.match(regex);
  return match && match.length ? 1 : 0;
};

// Password strength by length can be max at 6 because of isMatch can strength upto 4(check regex length)
// and min of 3 because 3 is criteria to be at least weak
const getStrengthByLength = (min: number, max: number, password: string) => {
  return Math.min(max, Math.floor(password.length / min));
};

const getStrengthType: (strength: number) => Strength = (strength: number) => {
  if (strength > 8) {
    return 'strong';
  }
  if (strength > 6 && strength <= 8) {
    return 'moderate';
  }
  return 'weak';
};

export function PasswordChecker({ password }: PasswordCheckerProps) {
  const strength = useMemo(() => {
    return (
      isMatch(password, upperCase) +
      isMatch(password, lowerCase) +
      isMatch(password, digit) +
      isMatch(password, specialChar) +
      getStrengthByLength(3, MAX_STRENGTH - 4, password)
    );
  }, [password]);

  const strengthType = useMemo(() => getStrengthType(strength), [strength]);

  return (
    <>
      <div className="h-4 border-2 border-black rounded-md">
        <div
          className="h-full"
          style={{
            width: strength * 10 + '%',
            backgroundColor: StrengthTypeMap[strengthType],
          }}
        ></div>
      </div>
      <p>Strength of your password (out of 10) is {strength}</p>
    </>
  );
}

export default PasswordChecker;
