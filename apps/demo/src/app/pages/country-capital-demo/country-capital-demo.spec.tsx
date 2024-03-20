import { render } from '@testing-library/react';

import CountryCapitalDemo from './country-capital-demo';

describe('CountryCapitalDemo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CountryCapitalDemo />);
    expect(baseElement).toBeTruthy();
  });
});
