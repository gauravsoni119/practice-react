import { createContext, useContext } from 'react';

export const AccordionContext = createContext<null | {
  activeIds: string[];
  setActiveIds: React.Dispatch<React.SetStateAction<string[]>>;
}>(null);

export const AccordionItemContext = createContext<null | string>(null);

export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion context must be used with <Accordion>');
  }
  return context;
}

export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('Accordion item context must be used with <AccordionItem>');
  }
  return context;
}
