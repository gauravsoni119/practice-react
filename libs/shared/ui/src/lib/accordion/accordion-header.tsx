import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import {
  useAccordionContext,
  useAccordionItemContext,
} from './accordion-context';

export interface AccordionHeaderProps {
  children: React.ReactNode;
}

export function AccordionHeader({ children }: AccordionHeaderProps) {
  const { activeIds, setActiveIds } = useAccordionContext();
  const id = useAccordionItemContext();
  const isActive = activeIds.includes(id);
  const handleToggleClick = () => {
    if (activeIds.includes(id)) {
      setActiveIds((ids) => ids.filter((activeId) => activeId !== id));
      return;
    }
    setActiveIds((ids) => [...ids, id]);
    console.log();
  };
  return (
    <div
      aria-expanded={isActive}
      aria-controls={id}
      role="button"
      tabIndex={0}
      className="bg-gray-300 p-3 w-full cursor-pointer flex items-center justify-between rounded-md"
      onClick={handleToggleClick}
    >
      {children}
      {isActive ? <FaChevronUp /> : <FaChevronDown />}
    </div>
  );
}

export default AccordionHeader;
