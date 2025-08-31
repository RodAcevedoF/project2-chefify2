import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/hooks/authHooks/useRegister';
import {
	type AuthFormProps,
	type RegisterFormData,
	type RegisterParams,
	RegisterSchema,
} from '@/types/auth.types';
import { ArrowBigRight } from 'lucide-react';

export const RegisterForm = ({ onSuccess, className = '' }: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterSchema),
	});

	const registerMutation = useRegister({
		onSuccess: (data) => {
			onSuccess?.();
			console.log('Usuario registrado:', data);
		},
		onError: (error) => {
			console.error('Error detallado:', error);
		},
	});

	const onSubmit = (data: RegisterFormData) => {
		const { confirmPassword, ...registerData } = data;
		console.log('Confirmed password:', confirmPassword);
		registerMutation.mutate(registerData as RegisterParams);
	};

	const getErrorMessage = () => {
		const errorData: string = registerMutation.error?.response?.data as string;
		return errorData || 'Error at Register';
	};

	return (
		<div
			className={`flex flex-col rounded-xl shadow-xl p-5 items-center justify-center w-[300px] h-[350px]  ${className}`}>
			<div className='mb-2'>
				<h2 className='text-2xl font-bold text-violet-950'>Register</h2>
			</div>

			<form
				className='flex flex-col items-center justify-center'
				onSubmit={handleSubmit(onSubmit)}>
				{/* Campo Name */}
				<label
					htmlFor='name'
					className='flex flex-col text-sm font-medium text-gray-700 mb-2 gap-1 w-[200px]'>
					Name
					<input
						className='bg-violet-950 text-green-50 p-1 rounded-md'
						placeholder='John Doe'
						{...register('name')}
					/>
					{errors.name && (
						<span className='text-red-800'>{errors.name.message}</span>
					)}
				</label>

				{/* Campo Email */}
				<label
					htmlFor='email'
					className='flex flex-col text-sm font-medium text-gray-700 mb-2 gap-1 w-[200px]'>
					Email
					<input
						className='bg-violet-950 text-green-50 p-1 rounded-md'
						placeholder='chef@gourmet.es'
						{...register('email')}
					/>
					{errors.email && (
						<span className='text-red-800'>{errors.email.message}</span>
					)}
				</label>

				{/* Campo Password */}
				<label
					htmlFor='password'
					className='flex flex-col text-sm font-medium text-gray-700 mb-2 gap-1 w-[200px]'>
					Password
					<input
						className='bg-violet-950 text-green-50 p-1 rounded-md'
						type='password'
						placeholder='********'
						{...register('password')}
					/>
					{errors.password && (
						<span className='text-red-800'>{errors.password.message}</span>
					)}
				</label>

				<label
					htmlFor='confirmPassword'
					className='flex flex-col text-sm font-medium text-gray-700 mb-2 gap-1 w-[200px]'>
					Confirm Password
					<input
						className='bg-violet-950 text-green-50 p-1 rounded-md'
						type='password'
						placeholder='********'
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword && (
						<span className='text-red-800'>
							{errors.confirmPassword.message}
						</span>
					)}
				</label>

				{/* Botón Submit */}
				<div className='flex items-center justify-center gap-2'>
					<button
						className='bg-violet-600 w-[80%] text-green-50 px-4 py-1 rounded-md hover:bg-violet-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed mt-2'
						type='submit'
						disabled={registerMutation.isPending}>
						{registerMutation.isPending ? 'Registering...' : 'Register'}
					</button>
					<ArrowBigRight className='size-5 animate-ping text-violet-600' />
				</div>

				{/* Mensajes de estado */}
				{registerMutation.isError && (
					<span className='text-red-800 text-sm mt-2'>{getErrorMessage()}</span>
				)}

				{registerMutation.isSuccess && (
					<span className='text-violet-600 text-sm mt-2'>
						✅ Register successful!
					</span>
				)}
			</form>
		</div>
	);
};
