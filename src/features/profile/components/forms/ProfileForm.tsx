import {
	useForm,
	type UseFormRegister,
	type UseFormWatch,
} from 'react-hook-form';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import UserAvatar from '../../../common/components/avatar/UserAvatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEditSchema, type UserDTO } from '@/types/user.types';
import { useGetUser } from '../../hooks/useUser';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import UploadIUmageInput from '@/features/common/components/input/UploadImgInput';
import { useProfileImageUpload } from '../../hooks/useProfileImageUpload';
import { useProfileFormInitialization } from '../../hooks/useProfileFormInitialization';
import { useProfileSubmission } from '../../hooks/useProfileSubmission';
import { ButtonTypes, ButtonVariants } from '@/types/common.types';

export type ProfileFormData = UserDTO;

export const ProfileForm = ({ onCancel }: { onCancel: () => void }) => {
	const { data: me } = useGetUser();
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

	const {
		imgPreview,
		selectedFile,
		handleImageChange,
		handleImageClear,
		clearSelectedFile,
		setImgPreview,
	} = useProfileImageUpload({
		setValue,
		initialImageUrl: me?.imgUrl,
	});

	const { handleSubmit: handleProfileSubmit } = useProfileSubmission({
		onSuccess: onCancel,
	});

	// init
	useProfileFormInitialization({
		userData: me,
		reset,
		setImgPreview,
	});

	const onSubmit = (data: ProfileFormData) => {
		handleProfileSubmit(data, selectedFile, clearSelectedFile);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				width: { xs: 280, sm: 360 },
				p: 3,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				background: theme.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					textAlign: 'center',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<UserAvatar
					name={(
						watch('name') ??
						(me as Partial<ProfileFormData>)?.name ??
						''
					).toString()}
					imgUrl={watch('imgUrl') ?? undefined}
					size={100}
				/>
				<Typography variant='h6' fontFamily={'Alegreya'}>
					Edit your profile
				</Typography>
			</Box>

			<UploadIUmageInput
				imgPreview={imgPreview}
				parentMethod={handleImageChange}
				register={register as UseFormRegister<{ imgUrl?: string }>}
				watch={watch as UseFormWatch<{ imgUrl?: string }>}
				onClear={handleImageClear}
			/>

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
				<ButtonUsage
					label='Cancel'
					parentMethod={onCancel}
					variant={ButtonVariants.CANCEL}
				/>

				<ButtonUsage label='Save' type={ButtonTypes.SUBMIT} />
			</Box>
		</Box>
	);
};

export default ProfileForm;
