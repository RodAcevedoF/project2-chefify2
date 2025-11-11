import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import RecipesToolbar from '../nav/RecipesToolbar';
import GenericAdminTable from './GenericAdminTable';
import RecipeRow from './RecipeRow';
import { useGetRecipesPaginated } from '@/features/admin/hooks/useAdmin';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import type { Recipe } from '@/types/recipe.types';

const AdminRecipesPage = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchInput, setSearchInput] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		const t = setTimeout(() => {
			setSearch(searchInput);
			setPage(0);
		}, 300);
		return () => clearTimeout(t);
	}, [searchInput]);

	const { data, isLoading, isError } = useGetRecipesPaginated({
		page: page + 1,
		limit: rowsPerPage,
		search,
	});
	const recipes = useMemo(() => data?.items ?? [], [data?.items]);
	const theme = useTheme();
	const cellSx = useMemo(
		() => ({
			color: theme.palette.primary.main,
			align: 'center',
			fontFamily: undefined,
		}),
		[theme.palette.primary.main],
	);
	const headerCellSx = useMemo(
		() => ({
			color: theme.palette.primary.main,
			align: 'center',
			fontFamily: 'Alegreya',
		}),
		[theme.palette.primary.main],
	);
	const { openModal } = useModalContext();

	const handleDelete = useCallback(
		(id: string, title?: string) => {
			openModal('recipeDelete', { id, title });
		},
		[openModal],
	);

	const handleView = useCallback(
		(r?: Recipe) => {
			if (!r) return;
			openModal('adminRecipeView', { recipe: r });
		},
		[openModal],
	);

	return (
		<Box p={{ md: 5, xs: 1 }}>
			<Box p={3}>
				<Typography variant='h4' sx={{ mb: 1, fontFamily: 'Alegreya' }}>
					Recipes
				</Typography>
				<RecipesToolbar value={searchInput} onChange={setSearchInput} />
			</Box>

			<GenericAdminTable
				columns={useMemo(
					() => [
						{ key: 'title', label: 'Title' },
						{ key: 'author', label: 'Author' },
						{ key: 'categories', label: 'Categories', hideBelow: 'lg' },
						{ key: 'likes', label: 'Likes', hideBelow: 'md' },
						{ key: 'prepTime', label: 'Prep Time', hideBelow: 'md' },
						{ key: 'createdAt', label: 'Created', hideBelow: 'lg' },
						{ key: 'actions', label: 'Actions' },
					],
					[],
				)}
				rowRenderer={useCallback(
					(r: Recipe) => (
						<RecipeRow
							recipe={r}
							cellSx={cellSx}
							onDelete={handleDelete}
							onView={handleView}
						/>
					),
					[cellSx, handleDelete, handleView],
				)}
				watchKeys={['likesCount']}
				rows={recipes}
				data={data}
				page={page}
				rowsPerPage={rowsPerPage}
				setPage={setPage}
				setRowsPerPage={setRowsPerPage}
				isLoading={isLoading}
				isError={isError}
				cellSx={cellSx}
				headerCellSx={headerCellSx}
				btnColor={theme.palette.primary.main}
			/>
		</Box>
	);
};

export default memo(AdminRecipesPage);
