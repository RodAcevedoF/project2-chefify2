import ProfileForm, {
	type ProfileFormData,
} from '@/features/profile/components/forms/ProfileForm';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { Box } from '@mui/material';

export const ProfileModal = () => {
	const { closeModal } = useModalContext();

	const handleSubmit = async (data: ProfileFormData) => {
		// TODO: call update profile service
		// For now just log and close
		console.log('Profile submit', data);
		closeModal();
	};

	return (
		<Box>
			<ProfileForm onSubmit={handleSubmit} onCancel={closeModal} />
		</Box>
	);
};

export default ProfileModal;
