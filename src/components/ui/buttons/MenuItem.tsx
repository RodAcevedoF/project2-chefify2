import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type MenuItemProps = {
  to: string;
  children: ReactNode;
};

export const MenuItem = ({ to, children }: MenuItemProps) => {
  return (
    <li className='menu-item'>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};
