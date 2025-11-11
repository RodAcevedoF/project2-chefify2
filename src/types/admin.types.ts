import type { Recipe } from './recipe.types';
import type { User } from './user.types';

export type QueryData = {
	items: Recipe[];
	meta: { total: number; page: number; limit: number };
};

export type LocalQueryOptions = {
	queryKey: readonly unknown[];
	queryFn: () => Promise<QueryData>;
	staleTime?: number;
	refetchOnWindowFocus?: boolean;
	onSuccess?: ((data: QueryData) => void) | undefined;
	onError?: ((err: Error) => void) | undefined;
};

export type UsersQueryData = {
	items: User[];
	meta: { total: number; page: number; limit: number };
};

export type UsersQueryOptions = {
	queryKey: readonly unknown[];
	queryFn: () => Promise<UsersQueryData>;
	staleTime?: number;
	refetchOnWindowFocus?: boolean;
	onSuccess?: ((data: UsersQueryData) => void) | undefined;
	onError?: ((err: Error) => void) | undefined;
};
