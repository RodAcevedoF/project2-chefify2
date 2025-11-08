import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { Box, Typography, useTheme } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { recipeFormStyles } from '../recipe-form.theme';
import { ButtonTypes } from '@/types/common.types';
import { CreateRecipeModes } from '@/types/recipe.types';

export interface CreateBtnProps {
	createRecipeMutation: {
		isPending?: boolean;
		isLoading?: boolean;
		isError?: boolean;
	};
	mode?: CreateRecipeModes;
}

const CreateBtn = ({
	createRecipeMutation,
	mode = CreateRecipeModes.CREATE,
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
					label={mode === CreateRecipeModes.CREATE ? 'CREATE' : 'SAVE'}
					disabled={isPending}
					type={ButtonTypes.SUBMIT}
					icon={CirclePlus}
					loader={isPending}
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
