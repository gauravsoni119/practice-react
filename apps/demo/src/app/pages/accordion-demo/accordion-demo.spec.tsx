import { render } from '@testing-library/react';

import AccordionDemo from './accordion-demo';

describe('AccordionDemo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccordionDemo />);
    expect(baseElement).toBeTruthy();
  });
});
