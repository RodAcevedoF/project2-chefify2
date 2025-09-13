import Button from '@mui/material/Button';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface MainButtonProps {
	label: string | ReactNode;
	parentMethod?: () => void;
	disabled?: boolean;
	icon?: LucideIcon;
	type?: 'button' | 'submit' | 'reset';
}

export const ButtonUsage = (props: MainButtonProps) => {
	const { label, parentMethod, disabled, icon: Icon } = props;
	return (
		<Button
			variant='outlined'
			onClick={parentMethod}
			disabled={disabled}
			type={props.type || 'button'}
			sx={{
				color: 'whitesmoke',
				padding: '8px 16px',
				background: '#033018',
				borderRadius: 5,
				borderColor: '#ffffeb',
				'&:hover': {
					borderColor: '#0cea74',
					background: 'inherit',
					fontWeight: 'bold',
				},
			}}>
			{Icon && <Icon style={{ marginRight: 8 }} />}
			{label}
		</Button>
	);
};
