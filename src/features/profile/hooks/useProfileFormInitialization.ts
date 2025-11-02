import { useEffect } from 'react';
import type { UseFormReset } from 'react-hook-form';
import type { UserDTO } from '@/types/user.types';
import { ProfileEditSchema } from '@/types/user.types';

interface UseProfileFormInitializationProps {
	userData?: Partial<UserDTO>;
	reset: UseFormReset<UserDTO>;
	setImgPreview: (preview: string | null) => void;
}

export const useProfileFormInitialization = ({
	userData,
	reset,
	setImgPreview,
}: UseProfileFormInitializationProps) => {
	useEffect(() => {
		if (!userData) return;

		try {
			const clean = ProfileEditSchema.parse(userData);
			reset(clean as Partial<UserDTO>);
		} catch {
			reset(userData as Partial<UserDTO>);
		}

		if (userData.imgUrl) {
			setImgPreview(userData.imgUrl);
		}
	}, [userData, reset, setImgPreview]);
};
