import React from 'react';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { Modal } from './Modal';
import MODALS from './modals.registry';

export const ModalRoot = () => {
	const { activeModal, modalParams } = useModalContext();

	if (!activeModal || !(activeModal in MODALS)) return null;

	const Component = MODALS[activeModal as keyof typeof MODALS];
	const child = React.createElement(
		Component,
		(modalParams ?? {}) as Record<string, unknown>,
	);

	return <Modal id={activeModal}>{child}</Modal>;
};
