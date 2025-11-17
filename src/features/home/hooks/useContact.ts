import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { ContactService } from '../services/contact.service';
import type { AxiosError } from 'axios';
import type { UseCommonOptions } from '@/types/common.types';

export const useContact = (
	options?: UseCommonOptions<void>,
): UseMutationResult<
	void,
	AxiosError,
	{ name: string; replyTo: string; message: string },
	unknown
> => {
	return useMutation<
		void,
		AxiosError,
		{ name: string; replyTo: string; message: string }
	>({
		mutationKey: ['home', 'contact'],
		mutationFn: async (payload) => {
			await ContactService.sendContact(payload);
		},
		onSuccess: () => {
			options?.onSuccess?.();
			options?.redirectTo?.();
		},
		onError: (err) => {
			console.error('Error sending contact message', err);
			options?.onError?.(err as unknown as Error);
		},
	});
};

export default useContact;
