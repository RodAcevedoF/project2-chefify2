import type { ReactNode } from 'react';

export type ListItemProps = {
  children: ReactNode;
  extraClass?: string;
};

export type TitleProps = {
  title: string;
  extraClass?: string;
};

export const ListItem = ({ children, extraClass = '' }: ListItemProps) => {
  return <li className={extraClass}>{children}</li>;
};

export const Title = ({ title, extraClass = '' }: TitleProps) => {
  return <h4 className={extraClass}>{title}</h4>;
};

export const Img = (title: string, url: string, extraClass: string = '') => {
  return <img className={extraClass} src={url} alt={title} />;
};
