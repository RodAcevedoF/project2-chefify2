import z from 'zod';

export interface AuthResponse {
	message: string;
	isLogged?: boolean;
	isVerified?: boolean;
	aiUsage?: AIUsage;
}

export interface AIUsage {
	count: number;
	lastReset: Date;
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

export const PasswordChangeSchema = z
	.object({
		currentPassword: z.string().min(1, 'Current password is required'),
		newPassword: z
			.string()
			.min(6, 'New password must be at least 6 characters'),
		repeatNewPassword: z.string().min(1, 'Please confirm your new password'),
	})
	.refine((data) => data.newPassword === data.repeatNewPassword, {
		message: 'Passwords do not match',
		path: ['repeatNewPassword'],
	});

export const ForgotSchema = z.object({
	email: z.string().email('Invalid email'),
});
export type ForgotData = z.infer<typeof ForgotSchema>;

export const ResetSchema = z
	.object({
		newPassword: z.string().min(6, 'Password must be at least 6 characters'),
		repeatNewPassword: z.string().min(1, 'Please confirm your new password'),
	})
	.refine((d) => d.newPassword === d.repeatNewPassword, {
		message: 'Passwords do not match',
		path: ['repeatNewPassword'],
	});

export type ResetData = z.infer<typeof ResetSchema>;
