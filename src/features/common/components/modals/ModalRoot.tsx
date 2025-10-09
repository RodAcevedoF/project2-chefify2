import { AuthModal } from '@/features/auth/components/nav/auth.modal';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { Modal } from './Modal';
import { RecipeModal } from '@/features/auth/components/nav/recipe.modal';
import ProfileModal from '@/features/profile/components/ProfileModal';

export const MODALS = {
	auth: <AuthModal />,
	recipe: <RecipeModal />,
	profileEdit: <ProfileModal />,
} as const;

export const ModalRoot = () => {
	const { activeModal } = useModalContext();

	if (!activeModal || !(activeModal in MODALS)) return null;

	return <Modal id={activeModal}>{MODALS[activeModal]}</Modal>;
};
