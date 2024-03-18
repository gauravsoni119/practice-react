import { render } from '@testing-library/react';

import PasswordCheckerDemo from './password-checker-demo';

describe('PasswordCheckerDemo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordCheckerDemo />);
    expect(baseElement).toBeTruthy();
  });
});
