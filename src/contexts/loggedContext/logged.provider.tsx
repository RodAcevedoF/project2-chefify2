import {
	useEffect,
	useState,
	useMemo,
	useCallback,
	type ReactNode,
	type SetStateAction,
} from 'react';
import { LoggedContext } from './logged.context';
import { useVerified } from '@/features/auth/hooks';
import { LoggedManager } from './LoggedManager';
import type { AIUsage } from '@/types/auth.types';

interface LoggedProviderProps {
	children: ReactNode;
	initialLogged?: boolean;
}

export const LoggedProvider = ({ children }: LoggedProviderProps) => {
	const [auth, setAuth] = useState<{
		logged: boolean | undefined;
		userId: string | null | undefined;
		role: string | null | undefined;
		aiUsage: AIUsage | undefined;
	}>(() => ({
		logged: undefined,
		userId: undefined,
		role: undefined,
		aiUsage: undefined,
	}));

	const { data, isLoading } = useVerified();

	const setLogged = useCallback((v: SetStateAction<boolean | undefined>) => {
		setAuth((p) => ({
			...p,
			logged: typeof v === 'function' ? v(p.logged) : v,
		}));
	}, []);

	useEffect(() => {
		LoggedManager.getInstance().setLoggedManager(setLogged);
	}, [setLogged]);

	useEffect(() => {
		if (!isLoading) {
			const maybe = data as unknown as
				| {
						id?: string;
						_id?: string;
						isVerified?: boolean;
						role?: string;
						aiUsage?: object;
				  }
				| undefined;
			const id = maybe?.id ?? maybe?._id ?? null;
			setAuth({
				logged: !!maybe?.isVerified,
				userId: id,
				role: maybe?.role ?? null,
				aiUsage: (data?.aiUsage as AIUsage) ?? null,
			});
		}
	}, [data, isLoading]);

	const contextValue = useMemo(
		() => ({
			logged: auth.logged,
			setLogged,
			isLoading,
			userId: auth.userId,
			role: auth.role ?? null,
			isAdmin: auth.role === 'admin',
			aiUsage: auth.aiUsage,
		}),
		[auth.logged, auth.userId, auth.role, isLoading, auth.aiUsage, setLogged],
	);

	if (auth.logged === undefined) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
				<span className='ml-4'>loading...</span>
			</div>
		);
	}

	return (
		<LoggedContext.Provider value={contextValue}>
			{children}
		</LoggedContext.Provider>
	);
};
