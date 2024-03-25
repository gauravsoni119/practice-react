import { Autocomplete } from '@practice-react/autocomplete';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout';
import AccordionDemo from '../pages/accordion-demo/accordion-demo';
import CountryCapitalDemo from '../pages/country-capital-demo/country-capital-demo';
import PasswordCheckerDemo from '../pages/password-checker-demo/password-checker-demo';
import TabsDemo from '../pages/tabs-demo/tabs-demo';
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
      {
        path: 'password-checker',
        element: <PasswordCheckerDemo />,
      },
      {
        path: 'country-capital',
        element: <CountryCapitalDemo />,
      },
      {
        path: 'tabs',
        element: <TabsDemo />,
      },
    ],
  },
]);
