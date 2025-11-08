import { Box, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import { memo } from 'react';

type Props = {
	value: string;
	onChange: (val: string) => void;
};

const UsersToolbar = ({ value, onChange }: Props) => {
	return (
		<Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
			<TextField
				label='Search users'
				size='small'
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					onChange(e.target.value)
				}
			/>
		</Box>
	);
};

export default memo(UsersToolbar);
