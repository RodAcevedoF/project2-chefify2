import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../../hooks/authHooks/useLogin';
import {
	LoginSchema,
	type AuthFormProps,
	type LoginFormProps,
} from '../../../types/auth.types';
import { ArrowBigRight } from 'lucide-react';

export const LoginForm = ({ onSuccess, className = '' }: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
	});

	const loginMutation = useLogin({
		onSuccess: () => onSuccess?.(),
	});

	const onSubmit = (data: LoginFormProps) => {
		loginMutation.mutate(data);
	};

	return (
		<div
			className={`flex flex-col bg-amber-50 rounded-xl shadow-xl p-5 items-center justify-center w-[300px] h-[350px] ${className}`}>
			<div className='mb-8'>
				<h2 className='text-2xl font-bold text-amber-950'>Login</h2>
			</div>
			<form
				className='flex flex-col items-center justify-center'
				onSubmit={handleSubmit(onSubmit)}>
				<label
					htmlFor='email'
					className='flex flex-col text-sm font-medium text-gray-700 gap-1 w-[200px] mb-5'>
					Email
					<input
						className='bg-amber-950 text-amber-50 p-1 rounded-md'
						placeholder='chef@gourmet.es'
						{...register('email')}
					/>
					{errors.email && (
						<span className='text-red-800'>{errors.email.message}</span>
					)}
				</label>
				<label
					htmlFor='password'
					className='flex flex-col text-sm font-medium text-gray-700 mb-2 gap-1 w-[200px]'>
					Password
					<input
						className='bg-amber-950 text-amber-50 p-1 rounded-md'
						type='password'
						placeholder='********'
						{...register('password')}
					/>
					{errors.password && (
						<span className='text-red-800'>{'Invalid password'}</span>
					)}
				</label>

				<div className='flex items-center justify-center gap-2 mt-8'>
					<button
						className='bg-amber-600 w-[80%] text-amber-50 px-4 py-1 rounded-md hover:bg-amber-700 transition-colors duration-300'
						type='submit'
						disabled={loginMutation.isPending}>
						Login
					</button>
					<ArrowBigRight className='size-5 animate-ping text-amber-600' />
				</div>
				{loginMutation.isError && <span>Error al iniciar sesión</span>}
			</form>
		</div>
	);
};
