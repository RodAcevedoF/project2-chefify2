import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import Toast from './Toast';
import { useHandleNavigate } from '@/utils/useHandleNavigate';

export default function LoginModalFromQuery() {
	const { openModal } = useModalContext();
	const location = useLocation();

	const goLoginClean = useHandleNavigate('/login', { replace: true });

	const [toastOpen, setToastOpen] = useState(false);

	useEffect(() => {
		if (location.pathname === '/login') {
			const verified = new URLSearchParams(location.search).get('verified');
			if (verified === 'true') {
				openModal('auth');
				setToastOpen(true);
				goLoginClean();
			}
		}
	}, [location, openModal, goLoginClean]);

	return (
		<Toast
			open={toastOpen}
			message='Email verified — please login'
			severity='success'
			onClose={() => setToastOpen(false)}
		/>
	);
}
