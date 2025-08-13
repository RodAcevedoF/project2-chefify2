import type { ReactNode } from 'react';
import { MenuItem } from '../buttons/MenuItem';

type MenuProps = {
  children: ReactNode;
};

export const Menu = ({ children }: MenuProps) => {
  return <ul className='flex gap-5 justify-end p-2 pr-10'>{children}</ul>;
};

Menu.Item = MenuItem;
