import {
	TableRow,
	TableCell,
	IconButton,
	Tooltip,
	Box,
	Typography,
} from '@mui/material';
import { Eye, Trash2 } from 'lucide-react';
import type { Recipe } from '@/types/recipe.types';
import { memo } from 'react';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';

type RecipeRowProps = {
	recipe: Recipe;
	cellSx?: Record<string, unknown>;
	onDelete?: (id: string, title?: string) => void;
	onView?: (recipe?: Recipe) => void;
};

const RecipeRow = ({ recipe, cellSx, onDelete, onView }: RecipeRowProps) => {
	const isAuthorObject = (v: unknown): v is { _id?: string; name?: string } =>
		typeof v === 'object' &&
		v !== null &&
		'name' in (v as Record<string, unknown>);

	const authorName = isAuthorObject(recipe.userId)
		? recipe.userId.name ?? '—'
		: '—';
	return (
		<TableRow>
			<TableCell sx={cellSx}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						flexWrap: { xs: 'wrap', sm: 'nowrap' },
					}}>
					<UserAvatar
						name={recipe.title}
						imgUrl={recipe.imgUrl ?? '/default-recipe.png'}
						size={40}
						sx={{ mx: 0, mb: 0 }}
					/>
					<Typography
						variant='body1'
						sx={{ fontWeight: 'bolder', fontSize: { xs: 13, sm: 16 } }}>
						{recipe.title}
					</Typography>
				</Box>
			</TableCell>
			<TableCell sx={cellSx}>{authorName}</TableCell>
			<TableCell
				sx={{
					...cellSx,
					display: { xs: 'none', sm: 'none', md: 'table-cell' },
				}}>
				{(recipe.categories || []).join(', ')}
			</TableCell>
			<TableCell
				sx={{
					...cellSx,
					display: { xs: 'none', sm: 'none', md: 'table-cell' },
				}}>
				{recipe.likesCount ?? 0}
			</TableCell>
			<TableCell
				sx={{
					...cellSx,
					display: { xs: 'none', sm: 'none', md: 'table-cell' },
				}}>
				{recipe.prepTime ?? '—'}
			</TableCell>
			<TableCell
				sx={{
					...cellSx,
					display: { xs: 'none', sm: 'none', md: 'none', lg: 'table-cell' },
				}}>
				{recipe.createdAt
					? new Date(recipe.createdAt).toLocaleDateString()
					: '—'}
			</TableCell>
			<TableCell sx={cellSx}>
				<Tooltip title='View'>
					<IconButton
						size='small'
						aria-label='view-recipe'
						onClick={() => onView?.(recipe)}
						sx={cellSx}>
						<Eye size={20} />
					</IconButton>
				</Tooltip>
				<Tooltip title='Delete'>
					<span>
						<IconButton
							size='small'
							aria-label='delete-recipe'
							onClick={() =>
								onDelete?.((recipe._id as string) ?? '', recipe.title)
							}
							sx={cellSx}>
							<Trash2 size={20} />
						</IconButton>
					</span>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
};

export default memo(RecipeRow);
