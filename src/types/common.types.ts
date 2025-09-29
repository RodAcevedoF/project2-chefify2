export type UseCommonOptions<TData = void, TError = Error> = {
	onSuccess?: (data: TData) => void;
	onError?: (error: TError) => void;
	redirectTo?: () => void;
};

export interface QueryParams {
	id?: string;
	category?: string;
	userId?: string;
	title?: string;
	name?: string;
	sort?: 'asc' | 'desc';
	limit?: number;
	page?: number;
	enabled?: boolean;
}

export interface CommonResponse<T> {
	success: boolean;
	data: T;
}
