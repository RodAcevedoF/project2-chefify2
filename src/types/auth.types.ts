import z from 'zod';

export interface AuthResponse {
	message: string;
	isLogged?: boolean;
	isVerified?: boolean;
}

export const LoginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

export type LoginParams = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
	.object({
		name: z.string().min(3, 'Name must be at least 2 characters'),
		email: z.email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string(),
		role: z.string().optional(),
		isVerified: z.boolean().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords dont match',
		path: ['confirmPassword'],
	});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type RegisterParams = Omit<RegisterFormData, 'confirmPassword'>;

export interface AuthFormProps {
	onSuccess?: () => void;
	className?: string;
	toggleForm?: () => void;
}
