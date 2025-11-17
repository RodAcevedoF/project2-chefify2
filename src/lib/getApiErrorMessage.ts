import type { AxiosError } from 'axios';

export function getApiErrorMessage(
	err: unknown,
	fallback = 'An error occurred',
) {
	const axiosErr = err as
		| AxiosError<{ message?: string } | undefined>
		| undefined;
	const msg = axiosErr?.response?.data?.message;
	if (typeof msg === 'string' && msg.length > 0) return msg;
	const plain = (err as Error | undefined)?.message;
	if (typeof plain === 'string' && plain.length > 0) return plain;
	return fallback;
}

export default getApiErrorMessage;
