import { createContext, useContext } from 'react';

export type ModalId = string | null;

type ModalContextType = {
	activeModal: ModalId;
	modalParams?: unknown;
	openModal: (id: string, params?: unknown) => void;
	closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
	undefined,
);

export const useModalContext = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModalContext must be used within ModalProvider');
	}
	return context;
};
