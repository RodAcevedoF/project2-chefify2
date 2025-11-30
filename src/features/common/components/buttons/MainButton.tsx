import Button from '@mui/material/Button';
import { Typography, useTheme } from '@mui/material';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CircularProgress } from '@mui/material';
import { commonStyles } from '../common.theme';
import {
	ButtonIconPositions,
	ButtonTypes,
	ButtonVariants,
} from '@/types/common.types';

interface MainButtonProps {
	label?: string | ReactNode;
	parentMethod?: () => void;
	disabled?: boolean;
	icon?: LucideIcon;
	type?: ButtonTypes;
	extraSx?: object;
	iconSx?: object;
	loader?: boolean;
	variant?: ButtonVariants;
	iconPos?: ButtonIconPositions;
	cyData?: string;
}

export const ButtonUsage = (props: MainButtonProps) => {
	const {
		label,
		parentMethod,
		disabled,
		icon: Icon,
		extraSx,
		iconSx,
		loader = true,
		variant = ButtonVariants.DEFAULT,
		iconPos = ButtonIconPositions.END,
		cyData = 'main-button',
	} = props;
	const cs = commonStyles(useTheme(), extraSx, disabled);

	const getButtonStyles = () => {
		switch (variant) {
			case ButtonVariants.CANCEL:
				return { ...cs.mainBtn, ...cs.cancelVariant };
			case ButtonVariants.LIGHT:
				return { ...cs.lightVariant };
			case ButtonVariants.OUTLINED:
				return { ...cs.outlinedVariant };
			case ButtonVariants.DEFAULT:
			default:
				return cs.mainBtn;
		}
	};

	return (
		<Button
			datatest-id={cyData}
			variant='outlined'
			{...(parentMethod ? { onClick: parentMethod } : {})}
			disabled={disabled}
			type={props.type || ButtonTypes.BUTTON}
			sx={getButtonStyles()}>
			{iconPos === ButtonIconPositions.START && Icon && <Icon style={iconSx} />}
			{disabled && loader && (
				<CircularProgress size={18} sx={{ color: '#ffffeb' }} />
			)}
			{disabled && <Typography sx={cs.typo}>{label}</Typography>}
			{!disabled && label}
			{iconPos === ButtonIconPositions.END && Icon && <Icon style={iconSx} />}
		</Button>
	);
};
