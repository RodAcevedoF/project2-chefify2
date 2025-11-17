import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import Toast from '@/features/common/components/toasts/Toast';
import { PartyPopper } from 'lucide-react';

type Props = {
	to?: string;
	delay?: number;
};

const RedirectOnLogin = ({ to = '/home', delay = 900 }: Props) => {
	const { logged, isLoading } = useLoggedContext();
	const location = useLocation();
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!isLoading && logged && location.pathname === '/') {
			setOpen(true);
			const t = setTimeout(() => navigate(to, { replace: true }), delay);
			return () => clearTimeout(t);
		}
	}, [logged, isLoading, location.pathname, navigate, to, delay]);

	return (
		<Toast
			open={open}
			message={'Welcome back — redirecting to main page'}
			severity='info'
			autoHideDuration={3000}
			onClose={() => setOpen(false)}
			icon={PartyPopper}
		/>
	);
};

export default RedirectOnLogin;
