import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { recipeFormStyles } from '../recipe-form.theme';
import { ButtonTypes } from '@/types/common.types';

export interface CreateBtnProps {
	createRecipeMutation: {
		isPending?: boolean;
		isLoading?: boolean;
		isError?: boolean;
	};
	mode?: 'create' | 'edit';
}

const CreateBtn = ({
	createRecipeMutation,
	mode = 'create',
}: CreateBtnProps) => {
	const theme = useTheme();
	const rs = recipeFormStyles(theme, {});
	const isPending =
		createRecipeMutation?.isPending ?? createRecipeMutation?.isLoading ?? false;
	const isError = createRecipeMutation?.isError ?? false;

	return (
		<>
			<Box sx={rs.createBtnBox}>
				<ButtonUsage
					label={
						isPending ? (
							<CircularProgress
								size={20}
								sx={{ color: theme.palette.primary.main }}
							/>
						) : mode === 'edit' ? (
							'SAVE'
						) : (
							'CREATE'
						)
					}
					disabled={isPending}
					type={ButtonTypes.SUBMIT}
					icon={CirclePlus}
				/>
			</Box>
			{isError && (
				<Typography color='error' mt={2}>
					Error while processing the recipe. Please try again.
				</Typography>
			)}
		</>
	);
};

export default CreateBtn;
