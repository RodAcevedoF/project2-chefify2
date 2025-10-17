import ProfileForm from '@/features/profile/components/forms/ProfileForm';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { Box } from '@mui/material';

export const ProfileModal = () => {
	const { closeModal } = useModalContext();

	return (
		<Box>
			<ProfileForm onCancel={closeModal} />
		</Box>
	);
};

export default ProfileModal;
