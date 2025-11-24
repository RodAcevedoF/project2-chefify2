import { useState } from 'react';

type SnackbarState = {
	open: boolean;
	message: string;
	severity: 'success' | 'info' | 'warning' | 'error';
};

export const useSnackbar = () => {
	const [snackbar, setSnackbar] = useState<SnackbarState>({
		open: false,
		message: '',
		severity: 'info',
	});

	const show = (
		message: string,
		severity: SnackbarState['severity'] = 'info',
	) => {
		setSnackbar({ open: true, message, severity });
	};

	const close = () => {
		setSnackbar((s) => ({ ...s, open: false }));
	};

	return {
		snackbar,
		showSnackbar: show,
		closeSnackbar: close,
	};
};
