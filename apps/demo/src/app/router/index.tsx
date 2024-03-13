import { Autocomplete } from '@practice-react/autocomplete';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import AccordionDemo from '../pages/accordion-demo/accordion-demo';
import Timer from '../timer/timer';

export default createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: 'autocomplete',
        element: <Autocomplete />,
      },
      {
        path: 'timer',
        element: <Timer totalTime={5} />,
      },
      {
        path: 'accordion',
        element: <AccordionDemo />,
      },
    ],
  },
]);
