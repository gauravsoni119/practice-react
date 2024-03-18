import { render } from '@testing-library/react';

import PasswordChecker from './password-checker';

describe('PasswordChecker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordChecker />);
    expect(baseElement).toBeTruthy();
  });
});
