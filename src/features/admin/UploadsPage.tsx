import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import type {
	ImportRecipesResult,
	ImportUsersResult,
} from '@/features/admin/services/admin.service';
import FileUploadCard from './components/cards/FileUploadCard';
import UsersTemplateButtons from './components/cards/UsersTemplateButtons';
import ReportPanel from './components/nav/ReportPanel';
import {
	useUploadRecipes,
	useUploadUsers,
} from '@/features/admin/hooks/useImports';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB (match server)

const UploadsPage = () => {
	const [recipesFile, setRecipesFile] = useState<File | null>(null);
	const [usersFile, setUsersFile] = useState<File | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [report, setReport] = useState<
		null | ImportRecipesResult | ImportUsersResult
	>(null);

	const resetNotifications = () => {
		setMessage(null);
		setError(null);
		setReport(null);
	};

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

	return (
		<Box p={{ md: 5, xs: 2 }}>
			<Box p={3}>
				<Typography variant='h2' sx={{ mb: 1, fontFamily: 'Alegreya' }}>
					Uploads
				</Typography>
				<Typography
					variant='body1'
					color='text.secondary'
					sx={{ fontWeight: 'bolder' }}>
					Upload CSV/Excel files to bulk import recipes or users. Files must be
					under 5MB.
				</Typography>
			</Box>

			<Box
				display='grid'
				gridTemplateColumns={{ lg: '1fr 1fr', xs: '1fr' }}
				gap={2}>
				<FileUploadCard
					title='Recipes CSV'
					accept='.csv, .xlsx, .xls'
					file={recipesFile}
					setFile={setRecipesFile}
					uploadLabel='Upload Recipes'
					onUpload={async () => {
						resetNotifications();
						const file = recipesFile;
						if (!file) return setError('Please choose a file first.');
						if (file.size > MAX_SIZE)
							return setError('File too large (max 5MB).');
						await uploadRecipesFn(file);
					}}
					loading={recipesLoading}
					extraActions={<UsersTemplateButtons showRecipes />}
				/>

				<FileUploadCard
					title='Users CSV / Excel'
					accept='.csv,.xls,.xlsx'
					file={usersFile}
					setFile={setUsersFile}
					uploadLabel='Upload Users'
					onUpload={async () => {
						resetNotifications();
						const file = usersFile;
						if (!file) return setError('Please choose a file first.');
						if (file.size > MAX_SIZE)
							return setError('File too large (max 5MB).');
						await uploadUsersFn(file);
					}}
					loading={usersLoading}
					extraActions={<UsersTemplateButtons showUsers />}
				/>
			</Box>

			<ReportPanel message={message} error={error} report={report} />
		</Box>
	);
};

export default UploadsPage;
