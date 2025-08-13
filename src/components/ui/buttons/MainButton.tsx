import type { ReactNode } from 'react';

interface MainButtonProps {
  label: string | ReactNode;
  parentMethod?: () => void;
  onSucess?: () => void;
  onError?: () => void;
  extraClasses?: string;
}

export const MainButton = ({
  label,
  parentMethod,
  extraClasses,
}: MainButtonProps) => {
  return (
    <button className={`cursor-pointer ${extraClasses}`} onClick={parentMethod}>
      {label}
    </button>
  );
};
