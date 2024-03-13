import { useEffect } from 'react';
import { AccordionItemContext, useAccordionContext } from './accordion-context';

export interface AccordionItemProps {
  children: React.ReactNode;
  defaultActive?: boolean;
  id: string;
}

export function AccordionItem({
  children,
  defaultActive,
  id,
}: AccordionItemProps) {
  const { setActiveIds } = useAccordionContext();
  useEffect(() => {
    if (defaultActive) {
      setActiveIds((ids) => [...ids, id]);
    }
  }, [defaultActive, id, setActiveIds]);
  return (
    <AccordionItemContext.Provider value={id}>
      {children}
    </AccordionItemContext.Provider>
  );
}

export default AccordionItem;
