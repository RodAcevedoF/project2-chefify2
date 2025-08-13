import z from 'zod';

export type LoginResponse = {
	message: string;
};

export type RegisterResponse = {
	message: string;
};

export type VerifiedResponse = {
	isLogged?: boolean;
	isVerified?: boolean;
};

export type LogoutResponse = {
	message: string;
};

export type RefreshResponse = {
	message: string;
};

export type AuthError = {
	message?: string;
	error?: string;
	statusCode: number;
	errors?: string[];
};

export type UseAuthOptions = {
	onSuccess?: (
		data: LoginResponse | RegisterResponse | VerifiedResponse | LogoutResponse,
	) => void;
	onError?: (error: AuthError) => void;
	redirectTo?: () => void;
};

export const LoginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

export type LoginFormProps = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
	.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
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

export type AuthFormProps = {
	onSuccess?: () => void;
	className?: string;
	toggleForm?: () => void;
};
