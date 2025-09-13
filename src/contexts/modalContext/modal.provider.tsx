import { useState, type ReactNode } from 'react';
import { ModalContext, type ModalId } from './modal.context';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalId>(null);

  const openModal = (id: string) => setActiveModal(id as ModalId);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
