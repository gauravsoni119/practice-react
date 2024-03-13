import { useState } from 'react';
import { AccordionContext } from './accordion-context';

export interface AccordionProps {
  children: React.ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  const [activeIds, setActiveIds] = useState<string[]>([]);
  return (
    <AccordionContext.Provider value={{ activeIds, setActiveIds }}>
      <div className="border border-gray-500 w-full rounded-md">{children}</div>
    </AccordionContext.Provider>
  );
}

export default Accordion;
