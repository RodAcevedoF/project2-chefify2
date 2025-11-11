import { z } from 'zod';

export const UserSchema = z
	.object({
		_id: z.string().optional(),
		name: z.string().min(1, 'Title is required'),
		email: z.email('Invalid email data'),
		password: z.string().min(8, 'At least 8 characters'),
		foodPreference: z.string().optional(),
		savedRecipes: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/)).optional(),
		imgUrl: z.string().optional(),
		imgPublicId: z.string().optional(),
		role: z.enum(['user', 'admin']).default('user'),
		shortBio: z
			.string()
			.max(160, 'Short bio must be at most 160 characters')
			.optional(),
		iaUsage: z
			.object({
				count: z.number(),
				lastReset: z.preprocess(
					(val) => (typeof val === 'string' ? new Date(val) : val),
					z.date(),
				),
			})
			.optional(),
		emailVerificationToken: z.string().optional(),
		emailVerificationExpires: z.date().optional(),
		resetPasswordToken: z.string().optional().nullable(),
		resetPasswordExpires: z.date().optional().nullable(),
		isVerified: z.boolean().default(false),
		followersCount: z.number().optional(),
		followingCount: z.number().optional(),
		isFollowing: z.boolean().optional(),
	})
	.strict();

export type User = z.infer<typeof UserSchema>;

export const ProfileEditSchema = UserSchema.pick({
	name: true,
	email: true,
	foodPreference: true,
	imgUrl: true,
	imgPublicId: true,
	savedRecipes: true,
	shortBio: true,
})
	.partial()
	.strip();

export type UserDTO = z.infer<typeof ProfileEditSchema>;

export type UserTableProps = {
	users: User[];
	cellSx: Record<string, unknown>;
	headerCellSx: Record<string, unknown>;
	handleDelete: (id: string, name?: string) => void;
	data?: {
		items: User[];
		meta: { total: number; page: number; limit: number };
	} | null;
	page: number;
	rowsPerPage: number;
	setPage: (p: number) => void;
	setRowsPerPage: (n: number) => void;
	isLoading?: boolean;
	isError?: boolean;
	btnColor?: string;
};
