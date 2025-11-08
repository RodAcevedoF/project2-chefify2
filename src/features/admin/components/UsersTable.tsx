import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	TablePagination,
	CircularProgress,
	Typography,
} from '@mui/material';
import UserRow from './UserRow';
import { memo } from 'react';
import { areEqual } from '../utils/isEqual.util';
import type { UserTableProps } from '@/types/user.types';

const UsersTable = ({
	users,
	cellSx,
	handleDelete,
	data,
	page,
	rowsPerPage,
	setPage,
	setRowsPerPage,
	isLoading,
	isError,
}: UserTableProps) => {
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
					{users.map((u) => (
						<UserRow
							key={u._id ?? u.email}
							user={u}
							cellSx={cellSx}
							onDelete={handleDelete}
						/>
					))}
				</TableBody>
			</Table>

			{data && (
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
					<TablePagination
						component='div'
						count={data.meta?.total ?? 0}
						page={page}
						onPageChange={(_, newPage) => setPage(newPage)}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={(e) => {
							setRowsPerPage(parseInt(e.target.value, 10));
							setPage(0);
						}}
						rowsPerPageOptions={[5, 10, 25, 50]}
						slotProps={{
							root: { sx: { color: (cellSx as Record<string, string>).color } },
							actions: {
								firstButton: {
									sx: { color: (cellSx as Record<string, string>).color },
								},
								lastButton: {
									sx: { color: (cellSx as Record<string, string>).color },
								},
								nextButton: {
									sx: { color: (cellSx as Record<string, string>).color },
								},
								previousButton: {
									sx: { color: (cellSx as Record<string, string>).color },
								},
							},
							select: {
								sx: { color: (cellSx as Record<string, string>).color },
							},
							displayedRows: {
								sx: { color: (cellSx as Record<string, string>).color },
							},
						}}
					/>
				</Box>
			)}
		</TableContainer>
	);
};

export default memo(UsersTable, areEqual);
