import type { UserTableProps } from '@/types/user.types';

export const areEqual = (prev: UserTableProps, next: UserTableProps) => {
	// quick checks
	if (prev.page !== next.page) return false;
	if (prev.rowsPerPage !== next.rowsPerPage) return false;
	if (prev.isLoading !== next.isLoading) return false;
	if (prev.isError !== next.isError) return false;
	const prevTotal = prev.data?.meta?.total ?? 0;
	const nextTotal = next.data?.meta?.total ?? 0;
	if (prevTotal !== nextTotal) return false;
	if (prev.cellSx !== next.cellSx) return false;
	if (prev.handleDelete !== next.handleDelete) return false;

	const pUsers = prev.users ?? [];
	const nUsers = next.users ?? [];
	if (pUsers === nUsers) return true;
	if (pUsers.length !== nUsers.length) return false;
	for (let i = 0; i < pUsers.length; i++) {
		const a = pUsers[i] as unknown as Record<string, unknown>;
		const b = nUsers[i] as unknown as Record<string, unknown>;
		if (String(a._id) !== String(b._id)) return false;
		if (Number(a.recipesCount ?? 0) !== Number(b.recipesCount ?? 0))
			return false;
		if (Number(a.followersCount ?? 0) !== Number(b.followersCount ?? 0))
			return false;
		if (Number(a.followingCount ?? 0) !== Number(b.followingCount ?? 0))
			return false;
	}

	return true;
};
