import {
	Box,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
	useTheme,
	TablePagination,
	TextField,
} from '@mui/material';
import { Trash2, Eye } from 'lucide-react';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';
import {
	memo,
	useState,
	useEffect,
	useMemo,
	useCallback,
	type ChangeEvent,
} from 'react';
import {
	useGetUsersPaginated,
	useDeleteUser,
} from '@/features/admin/hooks/useAdmin';
import type { User } from '@/types/user.types';

const AdminUsersPage = () => {
	const [page, setPage] = useState(0); // zero-based for MUI
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// Separate input state from debounced query state to avoid excessive re-renders/refetches
	const [searchInput, setSearchInput] = useState('');
	const [search, setSearch] = useState('');

	// Debounce the search input before updating the query param
	useEffect(() => {
		const t = setTimeout(() => {
			setSearch(searchInput);
			// reset to first page when a new search is applied
			setPage(0);
		}, 300);
		return () => clearTimeout(t);
	}, [searchInput]);

	const { data, isLoading, isError } = useGetUsersPaginated({
		page: page + 1,
		limit: rowsPerPage,
		search,
	});
	const users = data?.items ?? [];
	const theme = useTheme();
	const cellSx = useMemo(
		() => ({ color: theme.palette.primary.main }),
		[theme.palette.primary.main],
	);
	const deleteUser = useDeleteUser({
		onSuccess: () => {
			// noop - hook invalidates users query
		},
		onError: (err) => {
			// a simple fallback; production should use a toast
			console.error('Failed to delete user', err);
		},
	});

	const handleDelete = useCallback(
		(id: string) => {
			const ok = window.confirm(
				'Delete this user? This action cannot be undone.',
			);
			if (!ok) return;
			deleteUser.mutate(id);
		},
		[deleteUser],
	);

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Box sx={{ p: 4 }}>
				<Typography variant='h6'>Failed to load users.</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ p: 4 }}>
			<Typography variant='h3' sx={{ mb: 2, fontFamily: 'Alegreya' }}>
				Users
			</Typography>
			<Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
				<TextField
					label='Search users'
					size='small'
					value={searchInput}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setSearchInput(e.target.value);
					}}
				/>
			</Box>
			<TableContainer component={Paper} sx={{ borderRadius: 5, p: 4 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={cellSx}>Avatar</TableCell>
							<TableCell sx={cellSx}>Name</TableCell>
							<TableCell sx={cellSx} align='right'>
								Recipes
							</TableCell>
							<TableCell
								sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
								Email
							</TableCell>
							<TableCell
								sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
								Role
							</TableCell>
							<TableCell
								sx={{ ...cellSx, display: { xs: 'none', md: 'table-cell' } }}
								align='right'>
								Followers
							</TableCell>
							<TableCell
								sx={{ ...cellSx, display: { xs: 'none', md: 'table-cell' } }}
								align='right'>
								Following
							</TableCell>
							<TableCell
								sx={{ ...cellSx, display: { xs: 'none', md: 'table-cell' } }}
								align='right'>
								IA used
							</TableCell>
							<TableCell sx={cellSx} align='center'>
								Verified
							</TableCell>
							<TableCell
								sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
								Bio
							</TableCell>
							<TableCell sx={cellSx} align='right'>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users?.map((u: User) => (
							<TableRow key={u._id ?? u.email} hover>
								<TableCell sx={cellSx}>
									<UserAvatar
										name={u.name}
										imgUrl={u.imgUrl}
										size={40}
										sx={{ mx: 0, mb: 0 }}
									/>
								</TableCell>
								<TableCell sx={cellSx}>{u.name}</TableCell>
								<TableCell sx={cellSx} align='right'>
									{(u as unknown as { recipesCount?: number }).recipesCount ??
										0}
								</TableCell>
								<TableCell
									sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
									{u.email}
								</TableCell>
								<TableCell
									sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
									{u.role}
								</TableCell>
								<TableCell
									sx={{ ...cellSx, display: { xs: 'none', md: 'table-cell' } }}
									align='right'>
									{u.followersCount ?? 0}
								</TableCell>
								<TableCell
									sx={{ ...cellSx, display: { xs: 'none', md: 'table-cell' } }}
									align='right'>
									{u.followingCount ?? 0}
								</TableCell>
								<TableCell
									sx={{ ...cellSx, display: { xs: 'none', md: 'table-cell' } }}
									align='right'>
									{u.iaUsage?.count ?? 0}
								</TableCell>
								<TableCell sx={cellSx} align='center'>
									{u.isVerified ? 'Yes' : 'No'}
								</TableCell>
								<TableCell
									sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
									{typeof u.shortBio === 'string' && u.shortBio ? (
										<Tooltip title={u.shortBio}>
											<span>
												{u.shortBio.length > 60
													? `${u.shortBio.slice(0, 57)}...`
													: u.shortBio}
											</span>
										</Tooltip>
									) : (
										''
									)}
								</TableCell>
								<TableCell sx={cellSx} align='right'>
									<Tooltip title='View'>
										<IconButton size='small' aria-label='view-user' sx={cellSx}>
											<Eye size={16} />
										</IconButton>
									</Tooltip>
									<Tooltip title='Delete'>
										<span>
											<IconButton
												size='small'
												aria-label='delete-user'
												onClick={() => handleDelete(String(u._id))}
												disabled={deleteUser.status === 'pending'}
												sx={cellSx}>
												<Trash2 size={16} />
											</IconButton>
										</span>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{/* pagination */}
				{data && (
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
						<TablePagination
							component='div'
							sx={{ color: theme.palette.primary.main }}
							count={data.meta?.total ?? 0}
							page={page}
							onPageChange={(_, newPage) => setPage(newPage)}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={(e) => {
								setRowsPerPage(parseInt(e.target.value, 10));
								setPage(0);
							}}
							rowsPerPageOptions={[5, 10, 25, 50]}
						/>
					</Box>
				)}
			</TableContainer>
		</Box>
	);
};

export default memo(AdminUsersPage);
