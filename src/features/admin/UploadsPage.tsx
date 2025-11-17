import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import type {
	ImportRecipesResult,
	ImportUsersResult,
} from '@/features/admin/services/admin.service';
import CombinedUploadCard from './components/cards/CombinedUploadCard';
import ReportPanel from './components/nav/ReportPanel';
import {
	useUploadRecipes,
	useUploadUsers,
} from '@/features/admin/hooks/useImports';
import useUploadHandler from '@/features/admin/hooks/useUploadHandler';
import { ArrowBigLeft, FileUp } from 'lucide-react';
import { ButtonIconPositions } from '@/types/common.types';
import { useHandleNavigate } from '@/utils/useHandleNavigate';
import { ButtonUsage } from '../common/components/buttons/MainButton';

const MAX_SIZE_MB = Number(import.meta.env.VITE_MAX_UPLOAD_SIZE_MB ?? 5);
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const UploadsPage = () => {
	const [recipesFile, setRecipesFile] = useState<File | null>(null);
	const [usersFile, setUsersFile] = useState<File | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [report, setReport] = useState<
		null | ImportRecipesResult | ImportUsersResult
	>(null);
	const t = useTheme();

	const resetNotifications = () => {
		setMessage(null);
		setError(null);
		setReport(null);
	};

	const nav = useHandleNavigate('/admin');

	const {
		upload: uploadRecipesFn,
		data: recipesResult,
		isLoading: recipesLoading,
		error: recipesError,
	} = useUploadRecipes();

	const {
		upload: uploadUsersFn,
		data: usersResult,
		isLoading: usersLoading,
		error: usersError,
	} = useUploadUsers();

	useEffect(() => {
		if (recipesResult) {
			const insertedCount = recipesResult.inserted?.length ?? 0;
			setMessage(`Imported ${insertedCount} recipes`);
			setReport(recipesResult);
			setRecipesFile(null);
		}
	}, [recipesResult]);

	useEffect(() => {
		if (recipesError) {
			setError((recipesError as Error)?.message ?? 'Upload failed');
		}
	}, [recipesError]);

	useEffect(() => {
		if (usersResult) {
			const created = usersResult.inserted?.length ?? 0;
			setMessage(`Imported ${created} users`);
			setReport(usersResult);
			setUsersFile(null);
		}
	}, [usersResult]);

	useEffect(() => {
		if (usersError) {
			setError((usersError as Error)?.message ?? 'Upload failed');
		}
	}, [usersError]);

	const handleUploadRecipes = useUploadHandler({
		file: recipesFile,
		uploadFn: uploadRecipesFn,
		maxSize: MAX_SIZE,
		resetNotifications,
		setError,
	});

	const handleUploadUsers = useUploadHandler({
		file: usersFile,
		uploadFn: uploadUsersFn,
		maxSize: MAX_SIZE,
		resetNotifications,
		setError,
	});

	return (
		<Box p={{ md: 5, xs: 2 }}>
			<Box p={3}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Typography variant='h2' sx={{ mb: 1, fontFamily: 'Alegreya' }}>
						Uploads
					</Typography>
					<FileUp color={t.palette.primary.main} width={50} height={50} />
				</Box>
				<Typography
					variant='body1'
					color='text.secondary'
					sx={{ fontWeight: 'bolder' }}>
					Upload CSV/Excel files to bulk import recipes or users. Files must be
					under 5MB.
				</Typography>
			</Box>

			<Box display='flex'>
				<CombinedUploadCard
					recipesFile={recipesFile}
					setRecipesFile={setRecipesFile}
					recipesLoading={recipesLoading}
					onUploadRecipes={handleUploadRecipes}
					usersFile={usersFile}
					setUsersFile={setUsersFile}
					usersLoading={usersLoading}
					onUploadUsers={handleUploadUsers}
				/>
			</Box>
			<ReportPanel message={message} error={error} report={report} />
			<ButtonUsage
				label='Back'
				icon={ArrowBigLeft}
				parentMethod={nav}
				extraSx={{ mt: 5 }}
				iconPos={ButtonIconPositions.START}
			/>
		</Box>
	);
};

export default UploadsPage;
