import { Box, Typography, Divider, Chip, useTheme } from '@mui/material';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import type { Recipe } from '@/types/recipe.types';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';

const ViewRecipeModal = () => {
	const { closeModal, modalParams } = useModalContext();
	const params = modalParams as { recipe?: Recipe } | undefined;
	const r = params?.recipe;
	const t = useTheme();

	if (!r) {
		return (
			<Box sx={{ p: 2, minWidth: 320 }}>
				<Typography variant='h6'>Recipe not found</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
					<ButtonUsage label='Close' parentMethod={() => closeModal()} />
				</Box>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				p: 2,
				minWidth: 360,
				background: t.palette.background.gradient,
				borderRadius: 3,
			}}>
			<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
				<UserAvatar
					name={r.title}
					imgUrl={r.imgUrl || '/default-recipe.png'}
					size={64}
				/>
				<Box>
					<Typography variant='h6' fontFamily={'Alegreya'}>
						{r.title}
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{ mt: 0.5, fontWeight: 'bolder' }}>
						Author:{' '}
						{typeof r.userId === 'string' ? r.userId : r.userId?.name ?? '—'}
					</Typography>
				</Box>
			</Box>
			<Divider
				sx={{ my: 1, py: '1px', bgcolor: 'background.semitransparent' }}
			/>
			<Box sx={{ display: 'grid', gap: 1 }}>
				<Typography variant='body1' component='div'>
					<strong>Categories:</strong>{' '}
					{(r.categories || []).map((c) => (
						<Chip key={c} label={c} size='small' sx={{ mr: 0.5 }} />
					))}
				</Typography>
				<Typography variant='body1'>
					<strong>Servings:</strong> {r.servings}
				</Typography>
				<Typography variant='body1'>
					<strong>Prep Time:</strong> {r.prepTime ?? '—'} minutes
				</Typography>
				<Typography variant='body1'>
					<strong>Likes:</strong> {r.likesCount ?? 0}
				</Typography>
				<Typography variant='body1'>
					<strong>Ingredients:</strong> {(r.ingredients || []).length}
				</Typography>
				<Typography variant='body1'>
					<strong>Instructions:</strong> {(r.instructions || []).length}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
				<ButtonUsage
					label='Close'
					parentMethod={() => closeModal()}
					variant={ButtonVariants.DEFAULT}
				/>
			</Box>
		</Box>
	);
};

export default ViewRecipeModal;
