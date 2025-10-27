import { useState, type ReactNode } from 'react';
import { ModalContext, type ModalId } from './modal.context';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [activeModal, setActiveModal] = useState<ModalId>(null);

	const [modalParams, setModalParams] = useState<unknown>(undefined);

	const openModal = (id: string, params?: unknown) => {
		setModalParams(params);
		setActiveModal(id as ModalId);
	};

	const closeModal = () => {
		setActiveModal(null);
		setModalParams(undefined);
	};

	return (
		<ModalContext.Provider
			value={{ activeModal, modalParams, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	);
};
