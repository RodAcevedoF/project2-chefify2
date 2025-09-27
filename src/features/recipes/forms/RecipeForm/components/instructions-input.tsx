import { Box, Chip, IconButton, Paper, TextField } from '@mui/material';
import { Plus } from 'lucide-react';
import { Controller, type Control } from 'react-hook-form';

export interface InstructionsInputProps {
	control: Control;
	color: string;
	backGroundColor: string;
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
							backgroundColor: props.backGroundColor,
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
								mb: 1,
							}}>
							<TextField
								placeholder='Add instruction...'
								value={props.inputValue}
								onChange={(e) => props.setInputValue(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && props.inputValue.trim().length > 0) {
										field.onChange([
											...(field.value || []),
											props.inputValue.trim(),
										]);
										props.setInputValue('');
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
								onClick={() => {
									field.onChange([
										...(field.value || []),
										props.inputValue.trim(),
									]);
									props.setInputValue('');
								}}
								sx={{ zIndex: 500, position: 'absolute', right: 0 }}
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
									sx={{ maxWidth: '200px' }}
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
