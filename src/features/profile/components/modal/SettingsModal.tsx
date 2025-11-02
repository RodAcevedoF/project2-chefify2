import { useModalContext } from '@/contexts/modalContext/modal.context';
import { Box } from '@mui/material';
import SettingsForm from '../forms/SettingsForm';

export const SettingsModal = () => {
	const { closeModal } = useModalContext();

	return (
		<Box>
			<SettingsForm onCancel={closeModal} />
		</Box>
	);
};

export default SettingsModal;
