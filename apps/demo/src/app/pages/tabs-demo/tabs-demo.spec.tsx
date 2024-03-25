import { render } from '@testing-library/react';

import TabsDemo from './tabs-demo';

describe('TabsDemo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabsDemo />);
    expect(baseElement).toBeTruthy();
  });
});
