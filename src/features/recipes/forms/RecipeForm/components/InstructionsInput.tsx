import { Box, Chip, IconButton, Paper, TextField } from '@mui/material';
import { Plus } from 'lucide-react';
import { Controller, type Control } from 'react-hook-form';

export interface InstructionsInputProps {
	control: Control;
	color: string;
	inputValue: string;
	setInputValue: (value: string) => void;
	name: string;
}

const InstructionsInput = (props: InstructionsInputProps) => {
	return (
		<Controller
			control={props.control}
			name={props.name}
			render={({ field }) => {
				return (
					<Paper
						sx={{
							p: 0,
							width: '100%',
							background: 'transparent',
							boxShadow: 'none',
							height: 'fit-content',
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								position: 'relative',
								maxHeight: '40px',
								width: '100%',
							}}>
							<TextField
								placeholder='Add instruction...'
								value={props.inputValue}
								onChange={(e) => props.setInputValue(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										const v = props.inputValue.trim();
										if (v.length > 0) {
											field.onChange([...(field.value || []), v]);
											props.setInputValue('');
										}
										e.preventDefault();
									}
								}}
								size='small'
								fullWidth
								sx={{
									width: '100%',
									minWidth: '150px',
									'& .MuiOutlinedInput-input::placeholder': {
										color: props.color,
										opacity: 1,
									},
									'& .MuiOutlinedInput-input': {
										paddingRight: '25px',
									},
								}}
							/>

							<IconButton
								size='small'
								color='primary'
								disabled={!props.inputValue.trim()}
								onClick={() => {
									const v = props.inputValue.trim();
									if (!v) return;
									field.onChange([...(field.value || []), v]);
									props.setInputValue('');
								}}
								sx={{ zIndex: 500, position: 'absolute', right: 4 }}
								aria-label='Add instruction'>
								<Plus size={15} />
							</IconButton>
						</Box>
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pr: 1 }}>
							{(field.value || []).map((inst: string, idx: number) => (
								<Chip
									key={idx}
									label={`${idx + 1}. ${inst.slice(0, 30)}${
										inst.length > 30 ? '...' : ''
									}`}
									onDelete={() => {
										const newValue = [...(field.value || [])];
										newValue.splice(idx, 1);
										field.onChange(newValue);
									}}
									color='primary'
									variant='outlined'
									size='small'
									sx={{ maxWidth: '200px', mt: 1 }}
								/>
							))}
						</Box>
					</Paper>
				);
			}}
		/>
	);
};

export default InstructionsInput;
