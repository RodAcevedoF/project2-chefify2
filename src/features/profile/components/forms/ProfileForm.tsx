import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Avatar, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';

export type ProfileFormData = {
	name: string;
	email: string;
	bio?: string;
};

export const ProfileForm = ({
	onSubmit,
	onCancel,
	defaultValues,
}: {
	onSubmit: (data: ProfileFormData) => void;
	onCancel: () => void;
	defaultValues?: Partial<ProfileFormData>;
}) => {
	const { register, handleSubmit } = useForm<ProfileFormData>({
		defaultValues: defaultValues ?? { name: '', email: '', bio: '' },
	});

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		// Placeholder: in future, upload/avatar preview logic
		const url = URL.createObjectURL(file);
		// setValue('avatar', url as unknown as string);
		console.log('Selected avatar', file, url);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				width: 360,
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}>
			<Box sx={{ textAlign: 'center' }}>
				<Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }}>U</Avatar>
				<Typography variant='subtitle1'>Edit your profile</Typography>
			</Box>

			<Button variant='outlined' component='label'>
				Upload avatar
				<input hidden accept='image/*' type='file' onChange={handleFile} />
			</Button>

			<TextField label='Name' size='small' {...register('name')} />
			<TextField label='Email' size='small' {...register('email')} />
			<TextField
				label='Bio'
				size='small'
				multiline
				rows={3}
				{...register('bio')}
			/>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
				<Button variant='text' onClick={onCancel}>
					Cancel
				</Button>
				<Button variant='contained' type='submit'>
					Save
				</Button>
			</Box>
		</Box>
	);
};

export default ProfileForm;
