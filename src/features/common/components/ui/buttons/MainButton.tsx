import Button from '@mui/material/Button';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface MainButtonProps {
	label?: string | ReactNode;
	parentMethod?: () => void;
	disabled?: boolean;
	icon?: LucideIcon;
	type?: 'button' | 'submit' | 'reset';
	extraSx?: object;
	iconSx?: object;
}

export const ButtonUsage = (props: MainButtonProps) => {
	const { label, parentMethod, disabled, icon: Icon, extraSx, iconSx } = props;
	return (
		<Button
			variant='outlined'
			{...(parentMethod ? { onClick: parentMethod } : {})}
			disabled={disabled}
			type={props.type || 'button'}
			sx={{
				color: 'whitesmoke',
				padding: '8px 16px',
				background: '#033018',
				borderRadius: 5,
				borderColor: '#ffffeb',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 1,
				'&:hover': {
					borderColor: '#0cea74',
					background: 'inherit',
					fontWeight: 'bold',
				},
				...extraSx,
			}}>
			{label}
			{Icon && <Icon style={iconSx} />}
		</Button>
	);
};
