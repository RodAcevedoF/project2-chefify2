import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import { Eye, Trash2 } from 'lucide-react';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import type { User } from '@/types/user.types';
import { memo } from 'react';

type Props = {
	user: User;
	cellSx: Record<string, unknown>;
	onDelete: (id: string, name?: string) => void;
};

const UserRow = ({ user: u, cellSx, onDelete }: Props) => {
	const { openModal } = useModalContext();
	return (
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
				{(u as unknown as { recipesCount?: number }).recipesCount ?? 0}
			</TableCell>
			<TableCell sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
				{u.email}
			</TableCell>
			<TableCell sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
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
			<TableCell sx={{ ...cellSx, display: { xs: 'none', sm: 'table-cell' } }}>
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
					<IconButton
						size='small'
						aria-label='view-user'
						onClick={() => openModal('adminUserView', { user: u })}
						sx={cellSx}>
						<Eye size={16} />
					</IconButton>
				</Tooltip>
				<Tooltip title='Delete'>
					<span>
						<IconButton
							size='small'
							aria-label='delete-user'
							onClick={() => onDelete(String(u._id), u.name)}
							sx={cellSx}>
							<Trash2 size={16} />
						</IconButton>
					</span>
				</Tooltip>
			</TableCell>
		</TableRow>
	);
};

export default memo(UserRow);
