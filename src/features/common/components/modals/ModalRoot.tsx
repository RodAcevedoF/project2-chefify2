import { AuthModal } from '@/features/auth/components/nav/auth.modal';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { Modal } from './Modal';

export const MODALS = {
	auth: <AuthModal />,
} as const;

export const ModalRoot = () => {
	const { activeModal } = useModalContext();

	if (!activeModal || !(activeModal in MODALS)) return null;

	return <Modal id={activeModal}>{MODALS[activeModal]}</Modal>;
};
