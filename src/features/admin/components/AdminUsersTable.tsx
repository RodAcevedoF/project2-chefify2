import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import UsersToolbar from './UsersToolbar';
import UsersTable from './UsersTable';
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
		() => ({ color: theme.palette.primary.main }),
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
		<Box p={5}>
			<Box p={3}>
				<Typography variant='h4' sx={{ mb: 1, fontFamily: 'Alegreya' }}>
					Users
				</Typography>
				<UsersToolbar value={searchInput} onChange={setSearchInput} />
			</Box>
			<UsersTable
				users={users as User[]}
				cellSx={cellSx}
				handleDelete={handleDelete}
				data={data}
				page={page}
				rowsPerPage={rowsPerPage}
				setPage={setPage}
				setRowsPerPage={setRowsPerPage}
				isLoading={isLoading}
				isError={isError}
			/>
		</Box>
	);
};

export default memo(AdminUsersPage);
