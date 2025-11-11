import type { Column } from '@/features/admin/components/tables/GenericAdminTable';
import type { User } from '@/types/user.types';
import type { Recipe } from '@/types/recipe.types';
import UserAvatar from '@/features/common/components/avatar/UserAvatar';
import { IconButton, Tooltip } from '@mui/material';
import { Eye, Trash2 } from 'lucide-react';

export const getUsersColumns = (opts: {
	onDelete: (id: string, name?: string) => void;
	openModal: (key: string, payload?: Record<string, unknown>) => void;
}): Column<User>[] => {
	const { onDelete, openModal } = opts;
	return [
		{
			key: 'avatar',
			label: 'Avatar',
			render: (u) => (
				<UserAvatar
					name={u.name}
					imgUrl={u.imgUrl}
					size={40}
					sx={{ mx: 0, mb: 0 }}
				/>
			),
		},
		{ key: 'name', label: 'Name', render: (u) => u.name },
		{
			key: 'recipes',
			label: 'Recipes',
			hideBelow: 'sm',
			render: (u) =>
				(u as unknown as { recipesCount?: number }).recipesCount ?? 0,
		},
		{ key: 'email', label: 'Email', hideBelow: 'sm', render: (u) => u.email },
		{ key: 'role', label: 'Role', hideBelow: 'md', render: (u) => u.role },
		{
			key: 'followers',
			label: 'Followers',
			hideBelow: 'lg',
			render: (u) => u.followersCount ?? 0,
		},
		{
			key: 'following',
			label: 'Following',
			hideBelow: 'lg',
			render: (u) => u.followingCount ?? 0,
		},
		{
			key: 'ia',
			label: 'IA used',
			hideBelow: 'lg',
			render: (u) => u.iaUsage?.count ?? 0,
		},
		{
			key: 'verified',
			label: 'Verified',
			hideBelow: 'lg',
			render: (u) => (u.isVerified ? 'Yes' : 'No'),
		},
		{
			key: 'bio',
			label: 'Bio',
			hideBelow: 'lg',
			render: (u) => {
				const bio =
					typeof u.shortBio === 'string' && u.shortBio ? u.shortBio : '';
				return bio.length > 60 ? `${bio.slice(0, 57)}...` : bio;
			},
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (u) => (
				<>
					<Tooltip title='View'>
						<IconButton
							size='small'
							aria-label='view-user'
							onClick={() => openModal('adminUserView', { user: u })}>
							<Eye size={16} />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete'>
						<IconButton
							size='small'
							aria-label='delete-user'
							onClick={() => onDelete(String(u._id), u.name)}>
							<Trash2 size={16} />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];
};

export const getRecipesColumns = (opts: {
	onDelete: (id: string, title?: string) => void;
}): Column<Recipe>[] => {
	const { onDelete } = opts;
	return [
		{ key: 'title', label: 'Title', render: (r) => r.title },
		{
			key: 'author',
			label: 'Author',
			render: (r) =>
				typeof r.userId === 'string'
					? r.userId
					: typeof r.userId === 'object' &&
					  r.userId !== null &&
					  'name' in r.userId
					? (r.userId as { name?: string }).name ?? '—'
					: '—',
		},
		{
			key: 'categories',
			label: 'Categories',
			hideBelow: 'sm',
			render: (r) => (r.categories || []).join(', '),
		},
		{
			key: 'likes',
			label: 'Likes',
			hideBelow: 'md',
			render: (r) => r.likesCount ?? 0,
		},
		{
			key: 'prepTime',
			label: 'Prep Time',
			hideBelow: 'md',
			render: (r) => r.prepTime ?? '—',
		},
		{
			key: 'createdAt',
			label: 'Created',
			hideBelow: 'lg',
			render: (r) =>
				r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—',
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (r) => (
				<>
					<Tooltip title='View'>
						<IconButton size='small' aria-label='view-recipe'>
							<Eye size={16} />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete'>
						<IconButton
							size='small'
							aria-label='delete-recipe'
							onClick={() => onDelete((r._id as string) ?? '', r.title)}>
							<Trash2 size={16} />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];
};

export default {};
