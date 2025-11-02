import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { Box, Tooltip } from '@mui/material';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';
import type { Recipe } from '@/types/recipe.types';

type Props = {
	recipe?: Partial<Recipe> | null;
};

const RecipeButtons = ({ recipe }: Props) => {
	const { openModal } = useModalContext();

	const { userId } = useLoggedContext();

	const recipeUserId =
		typeof recipe?.userId === 'string' ? recipe?.userId : recipe?.userId?._id;

	const isOwner = Boolean(userId && recipeUserId && userId === recipeUserId);

	const handleEdit = () => {
		openModal('recipe', { initialData: recipe });
	};

	const handleDelete = () => {
		openModal('recipeDelete', { id: recipe?._id, title: recipe?.title });
	};

	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
			}}>
			{isOwner ? (
				<ButtonUsage label='Edit' parentMethod={handleEdit} />
			) : (
				<Tooltip title='Only the recipe author can edit' placement='top'>
					<span>
						<ButtonUsage
							label='Edit'
							parentMethod={handleEdit}
							disabled
							loader={false}
						/>
					</span>
				</Tooltip>
			)}

			{isOwner ? (
				<ButtonUsage label='Delete' parentMethod={handleDelete} />
			) : (
				<Tooltip title='Only the recipe author can delete' placement='top'>
					<span>
						<ButtonUsage
							label='Delete'
							parentMethod={handleDelete}
							disabled
							loader={false}
						/>
					</span>
				</Tooltip>
			)}
		</Box>
	);
};

export default RecipeButtons;
