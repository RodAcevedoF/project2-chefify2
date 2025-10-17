import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Avatar, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEditSchema, type UserDTO } from '@/types/user.types';
import type { ChangeEvent } from 'react';
import { useGetUser, useUpdateUser } from '../../hooks/useUser';

export type ProfileFormData = UserDTO;

export const ProfileForm = ({ onCancel }: { onCancel: () => void }) => {
	const { data: me } = useGetUser();
	const update = useUpdateUser();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(ProfileEditSchema),
		defaultValues: me ?? {},
	});

	useEffect(() => {
		if (me) {
			try {
				const clean = ProfileEditSchema.parse(me);
				reset(clean as Partial<ProfileFormData>);
			} catch (err) {
				console.warn('Profile parsing failed, using raw me for reset', err);
				reset(me as Partial<ProfileFormData>);
			}
		}
	}, [me, reset]);

	const onSubmit = (data: ProfileFormData) => {
		console.log('Submitting profile update', data);
		update.mutate(data, {
			onSuccess: () => {
				onCancel();
			},
			onError: (err) => {
				console.error('Failed to update profile', err);
			},
		});
	};

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setValue('imgUrl', url);
		console.log('Selected avatar', file, url);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit, (errs) =>
				console.log('Validation errors on submit (form):', errs),
			)}
			onSubmitCapture={(e) =>
				console.log('form onSubmitCapture event', e?.type)
			}
			sx={{
				width: 360,
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}>
			<Box sx={{ textAlign: 'center' }}>
				<Avatar
					sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }}
					src={watch('imgUrl') ?? undefined}>
					U
				</Avatar>
				<Typography variant='subtitle1'>Edit your profile</Typography>
			</Box>

			<Button variant='outlined' component='label'>
				Upload avatar
				<input hidden accept='image/*' type='file' onChange={handleFile} />
			</Button>

			<TextField
				label='Name'
				size='small'
				{...register('name')}
				error={Boolean(errors.name)}
				helperText={errors.name?.message as string | undefined}
				slotProps={{
					inputLabel: { shrink: Boolean(watch('name')) },
				}}
			/>
			<TextField
				label='Email'
				size='small'
				{...register('email')}
				error={Boolean(errors.email)}
				helperText={errors.email?.message as string | undefined}
				slotProps={{
					inputLabel: { shrink: Boolean(watch('email')) },
				}}
			/>
			<TextField
				label='Food preference'
				size='small'
				{...register('foodPreference')}
				error={Boolean(errors.foodPreference)}
				helperText={errors.foodPreference?.message as string | undefined}
				slotProps={{
					inputLabel: { shrink: Boolean(watch('foodPreference')) },
				}}
			/>
			<TextField
				label='Short bio'
				size='small'
				multiline
				rows={3}
				{...register('shortBio')}
				error={Boolean(errors.shortBio)}
				helperText={errors.shortBio?.message as string | undefined}
				slotProps={{
					inputLabel: { shrink: Boolean(watch('shortBio')) },
				}}
			/>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
				<Button variant='text' onClick={onCancel}>
					Cancel
				</Button>
				<Button
					variant='contained'
					type='submit'
					onClick={handleSubmit(onSubmit, (errs) =>
						console.log('Validation errors on submit (click):', errs),
					)}>
					Save
				</Button>
			</Box>
		</Box>
	);
};

export default ProfileForm;
