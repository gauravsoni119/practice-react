import { render } from '@testing-library/react';

import TabPanels from './tab-panels';

describe('TabPanels', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabPanels />);
    expect(baseElement).toBeTruthy();
  });
});
