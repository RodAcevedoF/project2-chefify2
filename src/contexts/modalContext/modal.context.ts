import { createContext, useContext } from 'react';
import type { MODALS } from '../../components/ui/modals/ModalRoot';

export type ModalId = keyof typeof MODALS | null;

type ModalContextType = {
  activeModal: ModalId;
  openModal: (id: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider');
  }
  return context;
};
