import Button from '@mui/material/Button';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface MainButtonProps {
	label: string | ReactNode;
	parentMethod?: () => void;
	disabled?: boolean;
	icon?: LucideIcon;
}

export const ButtonUsage = (props: MainButtonProps) => {
	const { label, parentMethod, disabled, icon: Icon } = props;
	return (
		<Button
			variant='outlined'
			onClick={parentMethod}
			disabled={disabled}
			sx={{
				color: 'whitesmoke',
				padding: '8px 16px',
				background: '#033018',
				borderRadius: 1,
				borderColor: '#0cea7460',
				'&:hover': {
					borderColor: '#0cea74',
					background: 'inherit',
				},
			}}>
			{Icon && <Icon style={{ marginRight: 8 }} />}
			{label}
		</Button>
	);
};
