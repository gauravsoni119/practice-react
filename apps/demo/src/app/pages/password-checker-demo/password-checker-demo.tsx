import { PasswordChecker } from '@practice-react/ui';
import { useState } from 'react';

export function PasswordCheckerDemo() {
  const [password, setPassword] = useState('');
  return (
    <div className="w-1/2">
      <label htmlFor="password" className="font-bold">
        Password Strength Checker
      </label>
      <div className="flex flex-col">
        <input
          className="border-black border-2 mb-1 w-full rounded-md"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordChecker password={password} />
      </div>
    </div>
  );
}

export default PasswordCheckerDemo;
