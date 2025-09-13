export type UseCommonOptions<T> = {
	onSuccess?: (data: T) => void;
	onError?: (error: Error) => void;
	redirectTo?: () => void;
};

export interface QueryParams {
	id?: string;
	category?: string;
	userId?: string;
	title?: string;
	sort?: 'asc' | 'desc';
	limit?: number;
	page?: number;
}

export interface CommonResponse<T> {
	success: boolean;
	data: T;
}
