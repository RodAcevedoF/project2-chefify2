import { useCallback } from 'react';

export type UploadFn = (file: File) => Promise<unknown> | unknown;

interface UseUploadHandlerOptions {
	file: File | null | undefined;
	uploadFn: UploadFn;
	maxSize?: number;
	resetNotifications?: () => void;
	setError?: (msg: string | null) => void;
}

export default function useUploadHandler({
	file,
	uploadFn,
	maxSize = 5 * 1024 * 1024,
	resetNotifications,
	setError,
}: UseUploadHandlerOptions) {
	const handler = useCallback(async () => {
		resetNotifications?.();

		if (!file) {
			setError?.('Please choose a file first.');
			return;
		}

		if (file.size > maxSize) {
			setError?.('File too large (max 5MB).');
			return;
		}

		await uploadFn(file);
	}, [file, uploadFn, maxSize, resetNotifications, setError]);

	return handler;
}
