import {
  useAccordionContext,
  useAccordionItemContext,
} from './accordion-context';

export interface AccordionBodyProps {
  children: React.ReactNode;
}

export function AccordionBody({ children }: AccordionBodyProps) {
  const { activeIds } = useAccordionContext();
  const id = useAccordionItemContext();
  return (
    <p id={id} className="p-3 w-full" hidden={!activeIds.includes(id)}>
      {children}
    </p>
  );
}

export default AccordionBody;
