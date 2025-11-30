import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Toast from './Toast';
import { useHandleNavigate } from '@/utils/useHandleNavigate';

export default function ToastFromLocation() {
	const location = useLocation();

	const cleanNavigate = useHandleNavigate(() => location.pathname, {
		replace: true,
		state: {},
	});

	const [open, setOpen] = useState(false);

	const toast = location.state?.toast;

	const searchParams = new URLSearchParams(location.search);
	const verified = searchParams.get('verified');

	const verifiedToast =
		verified === 'true'
			? {
					message: '✓ Email verified successfully! You can now log in.',
					severity: 'success' as const,
			  }
			: null;

	const activeToast = verifiedToast || toast;

	useEffect(() => {
		if (activeToast) setOpen(true);
	}, [activeToast]);

	const handleClose = () => {
		setOpen(false);
		if (verified) {
			// Remove the verified query param
			cleanNavigate();
		} else if (toast) {
			cleanNavigate();
		}
	};

	if (!activeToast) return null;

	return (
		<Toast
			open={open}
			message={activeToast.message}
			severity={activeToast.severity}
			onClose={handleClose}
		/>
	);
}
