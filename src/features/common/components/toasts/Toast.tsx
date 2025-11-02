import React from 'react';
import { Snackbar, Alert, type AlertColor, useTheme } from '@mui/material';
import type { LucideIcon } from 'lucide-react';

type ToastProps = {
	open: boolean;
	message?: React.ReactNode;
	severity?: AlertColor;
	autoHideDuration?: number;
	onClose?: () => void;
	anchorOrigin?: {
		vertical: 'top' | 'bottom';
		horizontal: 'left' | 'center' | 'right';
	};
	icon?: LucideIcon;
	iconSx?: object;
	textColor?: string;
};

const Toast = ({
	open,
	message,
	severity = 'info',
	autoHideDuration = 300000,
	onClose,
	anchorOrigin = { vertical: 'top', horizontal: 'center' },
	icon: Icon,
	iconSx = { color: '#182018ff', width: '24px', height: 'auto' },
	textColor,
}: ToastProps) => {
	const theme = useTheme();
	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			anchorOrigin={anchorOrigin}>
			<Alert
				onClose={onClose}
				severity={severity}
				icon={Icon ? <Icon style={iconSx} /> : undefined}
				sx={{
					width: '100%',
					backgroundColor: theme.palette.secondary.light,
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					fontFamily: 'Alegreya',
					color: textColor ?? theme.palette.background.paper,
					fontWeight: 'bold',
					fontSize: '1rem',
					p: 4,
					borderRadius: 3,
				}}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Toast;
