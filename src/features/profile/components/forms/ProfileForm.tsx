import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import UserAvatar from '../avatar/UserAvatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEditSchema, type UserDTO } from '@/types/user.types';
import type { ChangeEvent } from 'react';
import { useGetUser, useUpdateUser } from '../../hooks/useUser';

export type ProfileFormData = UserDTO;

export const ProfileForm = ({ onCancel }: { onCancel: () => void }) => {
	const { data: me } = useGetUser();
	const update = useUpdateUser();
	const theme = useTheme();

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
			} catch {
				reset(me as Partial<ProfileFormData>);
			}
		}
	}, [me, reset]);

	const onSubmit = (data: ProfileFormData) => {
		update.mutate(data, {
			onSuccess: () => {
				onCancel();
			},
			onError: () => {},
		});
	};

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		setValue('imgUrl', url);
	};

	// UserAvatar handles color and initial logic

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
				<UserAvatar
					name={(
						watch('name') ??
						(me as Partial<ProfileFormData>)?.name ??
						''
					).toString()}
					imgUrl={watch('imgUrl') ?? undefined}
					size={64}
				/>
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
					inputLabel: {
						shrink: Boolean(watch('shortBio')),
						sx: { color: theme.palette.primary.main },
					},
					input: { sx: { color: theme.palette.primary.main } },
				}}
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
