import { Link, Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LayoutProps {}

const ROUTES = [
  { id: 1, to: 'autocomplete', text: 'Autocomplete' },
  { id: 2, to: 'timer', text: 'Timer' },
  { id: 3, to: 'accordion', text: 'Accordion' },
  { id: 4, to: 'password-checker', text: 'Password Checker' },
  { id: 5, to: 'country-capital', text: 'Country Capital' },
] as const;

export function Layout(props: LayoutProps) {
  return (
    <div className="flex w-full h-screen">
      <nav className="w-64 bg-indigo-500">
        <ul>
          {ROUTES.map((route) => (
            <li key={route.id}>
              <Link to={route.to}>{route.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full">
        <h2>Machine coding round questions</h2>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
