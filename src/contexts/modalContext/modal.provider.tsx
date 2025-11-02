import { useState, type ReactNode, useCallback, useMemo } from 'react';
import { ModalContext, type ModalId } from './modal.context';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [activeModal, setActiveModal] = useState<ModalId>(null);

	const [modalParams, setModalParams] = useState<unknown>(undefined);

	const openModal = useCallback((id: string, params?: unknown) => {
		setModalParams(params);
		setActiveModal(id as ModalId);
	}, []);

	const closeModal = useCallback(() => {
		setActiveModal(null);
		setModalParams(undefined);
	}, []);

	const value = useMemo(
		() => ({ activeModal, modalParams, openModal, closeModal }),
		[activeModal, modalParams, openModal, closeModal],
	);

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};
