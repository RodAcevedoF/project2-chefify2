import { useState } from 'react';
import { Paper, Tabs, Tab, Box } from '@mui/material';
import FileUploadCard from './FileUploadCard';
import UsersTemplateButtons from './UsersTemplateButtons';

interface Props {
	recipesFile: File | null;
	setRecipesFile: (f: File | null) => void;
	recipesLoading?: boolean;
	onUploadRecipes: () => Promise<void> | void;

	usersFile: File | null;
	setUsersFile: (f: File | null) => void;
	usersLoading?: boolean;
	onUploadUsers: () => Promise<void> | void;
}

const CombinedUploadCard: React.FC<Props> = ({
	recipesFile,
	setRecipesFile,
	recipesLoading,
	onUploadRecipes,
	usersFile,
	setUsersFile,
	usersLoading,
	onUploadUsers,
}) => {
	const [tab, setTab] = useState<number>(0);

	return (
		<Paper
			sx={{
				p: 2,
				borderRadius: 3,
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
			elevation={3}>
			<Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label='upload-tabs'>
				{['Recipes', 'Users'].map((label, idx) => (
					<Tab
						key={`${label}+${idx}`}
						label={label}
						sx={{ color: 'primary.main', fontWeight: 'bolder' }}
					/>
				))}
			</Tabs>

			<Box sx={{ mt: 2 }}>
				{tab === 0 && (
					<FileUploadCard
						title='Recipes Upload'
						accept='.csv, .xlsx, .xls'
						file={recipesFile}
						setFile={setRecipesFile}
						uploadLabel='Upload Recipes'
						onUpload={onUploadRecipes}
						loading={recipesLoading}
						extraActions={<UsersTemplateButtons showRecipes />}
					/>
				)}

				{tab === 1 && (
					<FileUploadCard
						title='Users Upload'
						accept='.csv,.xls,.xlsx'
						file={usersFile}
						setFile={setUsersFile}
						uploadLabel='Upload Users'
						onUpload={onUploadUsers}
						loading={usersLoading}
						extraActions={<UsersTemplateButtons showUsers />}
					/>
				)}
			</Box>
		</Paper>
	);
};

export default CombinedUploadCard;
