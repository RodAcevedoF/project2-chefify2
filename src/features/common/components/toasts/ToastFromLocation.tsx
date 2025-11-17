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

	useEffect(() => {
		if (toast) setOpen(true);
	}, [toast]);

	if (!toast) return null;

	return (
		<Toast
			open={open}
			message={toast.message}
			severity={toast.severity}
			onClose={() => {
				setOpen(false);
				cleanNavigate();
			}}
		/>
	);
}
