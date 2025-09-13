import type { MODALS } from '@/features/common/components/modals/ModalRoot';
import { createContext, useContext } from 'react';

export type ModalId = keyof typeof MODALS | null;

type ModalContextType = {
	activeModal: ModalId;
	openModal: (id: string) => void;
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
