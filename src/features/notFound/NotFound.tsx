import type { ReactNode } from 'react';

type NotFoundProps = {
  children?: ReactNode;
};

export const NotFound = ({ children }: NotFoundProps) => {
  return <div>{children || 'NOT FOUND PAGE'}</div>;
};
