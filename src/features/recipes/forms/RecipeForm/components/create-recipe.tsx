import { ButtonUsage } from '@/features/common/components/ui/buttons/MainButton';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { recipeFormStyles } from '../recipe-form.theme';

export interface CreateBtnProps {
	createRecipeMutation: {
		isPending: boolean;
		isError: boolean;
	};
}

const CreateBtn = ({ createRecipeMutation }: CreateBtnProps) => {
	const theme = useTheme();
	const rs = recipeFormStyles(theme, {});
	return (
		<>
			<Box sx={rs.createBtnBox}>
				<ButtonUsage
					label={
						createRecipeMutation.isPending ? (
							<CircularProgress
								size={20}
								sx={{ color: theme.palette.primary.main }}
							/>
						) : (
							'CREATE'
						)
					}
					disabled={createRecipeMutation.isPending}
					type='submit'
					icon={CirclePlus}
				/>
			</Box>
			{createRecipeMutation.isError && (
				<Typography color='error' mt={2}>
					Error while creating the recipe. Please try again.
				</Typography>
			)}
		</>
	);
};

export default CreateBtn;
