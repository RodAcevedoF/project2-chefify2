import type { UserDTO } from '@/types/user.types';
import { useUpdateUser } from '../hooks/useUser';

interface UseProfileSubmissionProps {
	onSuccess?: () => void;
}

export interface UseProfileSubmissionResult {
	handleSubmit: (
		data: UserDTO,
		selectedFile: File | null,
		clearSelectedFile: () => void,
	) => void;
	updateMutation: {
		isPending?: boolean;
		isLoading?: boolean;
		isError?: boolean;
	};
}

export const useProfileSubmission = ({
	onSuccess,
}: UseProfileSubmissionProps): UseProfileSubmissionResult => {
	const updateMutation = useUpdateUser();

	const submitWithFile = (data: UserDTO, selectedFile: File) => {
		const fd = new FormData();
		fd.append('payload', JSON.stringify(data));
		fd.append('mediafile', selectedFile);

		updateMutation.mutate(fd as unknown as UserDTO, {
			onSuccess: () => onSuccess?.(),
		});
	};

	const submitWithoutFile = (data: UserDTO) => {
		updateMutation.mutate(data, {
			onSuccess: () => onSuccess?.(),
			onError: () => {},
		});
	};

	const handleSubmit = (
		data: UserDTO,
		selectedFile: File | null,
		clearSelectedFile: () => void,
	) => {
		if (selectedFile) {
			submitWithFile(data, selectedFile);
			// Clear selected file (preview until backend returns)
			clearSelectedFile();
		} else {
			submitWithoutFile(data);
		}
	};

	return {
		handleSubmit,
		updateMutation,
	};
};
