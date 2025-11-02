import { useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { RecipeDTO } from '@/types/recipe.types';

interface UseImageUploadProps {
	setValue: UseFormSetValue<RecipeDTO>;
	initialImageUrl?: string | undefined;
}

export const useImageUpload = ({
	setValue,
	initialImageUrl,
}: UseImageUploadProps) => {
	const [imgPreview, setImgPreview] = useState<string | null>(
		initialImageUrl || null,
	);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const url = URL.createObjectURL(file);
		setImgPreview(url);
		setSelectedFile(file);

		setValue('imgUrl', file.name);
		setValue('imgPublicId', `local-${Date.now()}`);
	};

	const handleImageClear = () => {
		if (imgPreview?.startsWith('blob:')) {
			URL.revokeObjectURL(imgPreview);
		}

		setValue('imgUrl', '');
		setValue('imgPublicId', '');
		setImgPreview(null);
		setSelectedFile(null);

		const input = document.getElementById(
			'recipe-image-input',
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
