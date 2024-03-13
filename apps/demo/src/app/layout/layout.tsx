import { Link, Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LayoutProps {}

const ROUTES = [
  { id: 1, to: 'autocomplete', text: 'Autocomplete' },
  { id: 2, to: 'timer', text: 'timer' },
  { id: 3, to: 'accordion', text: 'accordion' },
] as const;

export function Layout(props: LayoutProps) {
  return (
    <div className="">
      <h2>Machine coding round questions</h2>
      <nav>
        <ul>
          {ROUTES.map((route) => (
            <li key={route.id}>
              <Link to={route.to}>{route.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
