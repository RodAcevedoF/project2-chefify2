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

export const enum ButtonVariants {
	DEFAULT = 'default',
	CANCEL = 'cancel',
	LIGHT = 'light',
	OUTLINED = 'outlined',
}

export const enum ButtonTypes {
	BUTTON = 'button',
	SUBMIT = 'submit',
	RESET = 'reset',
}

export const enum ButtonIconPositions {
	START = 'start',
	END = 'end',
}
