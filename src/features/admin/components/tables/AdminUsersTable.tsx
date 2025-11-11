import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import UsersToolbar from '../nav/UsersToolbar';
import GenericAdminTable from './GenericAdminTable';
import UserRow from './UserRow';
import { useGetUsersPaginated } from '@/features/admin/hooks/useAdmin';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import type { User } from '@/types/user.types';

const AdminUsersPage = () => {
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

	const { data, isLoading, isError } = useGetUsersPaginated({
		page: page + 1,
		limit: rowsPerPage,
		search,
	});
	const users = useMemo(() => data?.items ?? [], [data?.items]);
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
		(id: string, name?: string) => {
			openModal('adminUserDelete', { id, name });
		},
		[openModal],
	);

	return (
		<Box p={{ md: 5, xs: 2 }}>
			<Box p={3}>
				<Typography variant='h4' sx={{ mb: 1, fontFamily: 'Alegreya' }}>
					Users
				</Typography>
				<UsersToolbar value={searchInput} onChange={setSearchInput} />
			</Box>
			<GenericAdminTable
				columns={useMemo(
					() => [
						{ key: 'avatar', label: 'Avatar' },
						{ key: 'name', label: 'Name' },
						{ key: 'recipes', label: 'Recipes', hideBelow: 'sm' },
						{ key: 'email', label: 'Email', hideBelow: 'sm' },
						{ key: 'role', label: 'Role', hideBelow: 'md' },
						{ key: 'followers', label: 'Followers', hideBelow: 'lg' },
						{ key: 'following', label: 'Following', hideBelow: 'lg' },
						{ key: 'ia', label: 'IA used', hideBelow: 'lg' },
						{ key: 'verified', label: 'Verified', hideBelow: 'lg' },
						{ key: 'bio', label: 'Bio', hideBelow: 'lg' },
						{ key: 'actions', label: 'Actions' },
					],
					[],
				)}
				rowRenderer={useCallback(
					(u: User) => (
						<UserRow user={u} cellSx={cellSx} onDelete={handleDelete} />
					),
					[cellSx, handleDelete],
				)}
				watchKeys={[
					'recipesCount',
					'followersCount',
					'followingCount',
					'iaUsage.count',
				]}
				rows={users}
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

export default memo(AdminUsersPage);
