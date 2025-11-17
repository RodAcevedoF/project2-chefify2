import React from 'react';
import { ToggleButtonGroup, ToggleButton, useTheme } from '@mui/material';
import { alpha } from '@mui/material';

export type ResourceType = 'recipe' | 'like' | 'follow';

interface Props {
	value: ResourceType[];
	onChange: (
		event: React.MouseEvent<HTMLElement>,
		next: ResourceType[] | null,
	) => void;
}

const ChartControls: React.FC<Props> = ({ value, onChange }) => {
	const t = useTheme();

	return (
		<ToggleButtonGroup
			value={value}
			onChange={onChange}
			size='small'
			sx={{
				backgroundColor: alpha(t.palette.success.dark, 0.8),
				borderRadius: 2,
				p: 0.5,
				'& .MuiToggleButton-root': {
					textTransform: 'none',
					color: t.palette.primary.light,
					border: 'none',
					px: 1.5,
					fontWeight: 'bolder',
					transition: 'background-color 0.3s',
					'&:hover': {
						backgroundColor: alpha(t.palette.success.selected, 0.9),
					},
				},
				'& .MuiToggleButton-root.Mui-selected': {
					backgroundColor: alpha(t.palette.success.selected, 0.2),
					color: t.palette.primary.main,
					'&:hover': {
						backgroundColor: t.palette.success.selected,
					},
				},
			}}>
			<ToggleButton value='recipe'>Recipes</ToggleButton>
			<ToggleButton value='like'>Likes</ToggleButton>
			<ToggleButton value='follow'>Follows</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default ChartControls;
