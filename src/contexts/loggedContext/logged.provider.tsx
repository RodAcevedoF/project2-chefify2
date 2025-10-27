import { useEffect, useRef, useState, type ReactNode } from 'react';
import { LoggedContext } from './logged.context';
import { useVerified } from '@/features/auth/hooks';
import { LoggedManager } from './LoggedManager';

interface LoggedProviderProps {
	children: ReactNode;
	initialLogged?: boolean;
}

export const LoggedProvider = ({ children }: LoggedProviderProps) => {
	const [logged, setLogged] = useState<boolean | undefined>(undefined);
	const [userId, setUserId] = useState<string | null | undefined>(undefined);
	const setLoggedRef = useRef(setLogged);
	const setUserIdRef = useRef(setUserId);
	const { data, isLoading } = useVerified();

	useEffect(() => {
		setLoggedRef.current = setLogged;
	}, [setLogged]);

	useEffect(() => {
		setUserIdRef.current = setUserId;
	}, [setUserId]);

	useEffect(() => {
		LoggedManager.getInstance().setLoggedManager((value: boolean) =>
			setLoggedRef.current(value),
		);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			setLogged(!!data?.isVerified);
			const maybe = data as unknown as
				| { id?: string; _id?: string }
				| undefined;
			const id = maybe?.id ?? maybe?._id ?? null;
			setUserId(id);
		}
	}, [data, isLoading]);

	if (logged === undefined) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
				<span className='ml-4'>loading...</span>
			</div>
		);
	}

	return (
		<LoggedContext.Provider
			value={{ logged, setLogged, isLoading, userId, setUserId }}>
			{children}
		</LoggedContext.Provider>
	);
};
