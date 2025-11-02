import { useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { UserDTO } from '@/types/user.types';

interface UseProfileImageUploadProps {
	setValue: UseFormSetValue<UserDTO>;
	initialImageUrl?: string | undefined;
}

export interface UseProfileImageUploadResult {
	imgPreview: string | null;
	selectedFile: File | null;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleImageClear: () => void;
	clearSelectedFile: () => void;
	setImgPreview: (preview: string | null) => void;
}

export const useProfileImageUpload = ({
	setValue,
	initialImageUrl,
}: UseProfileImageUploadProps): UseProfileImageUploadResult => {
	const [imgPreview, setImgPreview] = useState<string | null>(
		initialImageUrl || null,
	);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (imgPreview?.startsWith('blob:')) {
			URL.revokeObjectURL(imgPreview);
		}

		const url = URL.createObjectURL(file);
		setImgPreview(url);
		setSelectedFile(file);

		setValue('imgUrl', url);
	};

	const handleImageClear = () => {
		if (imgPreview?.startsWith('blob:')) {
			URL.revokeObjectURL(imgPreview);
		}

		setValue('imgUrl', '');
		setImgPreview(null);
		setSelectedFile(null);

		const input = document.getElementById(
			'profile-image-input',
		) as HTMLInputElement | null;
		if (input) input.value = '';
	};

	const clearSelectedFile = () => {
		setSelectedFile(null);
	};

	return {
		imgPreview,
		selectedFile,
		handleImageChange,
		handleImageClear,
		clearSelectedFile,
		setImgPreview,
	};
};
