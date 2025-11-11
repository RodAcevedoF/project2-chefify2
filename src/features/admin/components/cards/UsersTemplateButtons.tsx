import { type FC } from 'react';
import { Box } from '@mui/material';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';
import { AdminService } from '@/features/admin/services/admin.service';
import logger from '@/lib/logger';

interface TemplateBtnProps {
	showUsers?: boolean;
	showRecipes?: boolean;
}

const UsersTemplateButtons: FC<TemplateBtnProps> = ({
	showUsers = false,
	showRecipes = false,
}) => {
	const downloadBlob = (blob: Blob, filename: string) => {
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(url);
	};

	const downloadUsers = async (format: 'csv' | 'xlsx') => {
		try {
			const blob = await AdminService.getUsersTemplate(format);
			downloadBlob(blob, `users-template.${format}`);
		} catch (e: Error | unknown) {
			logger.error(
				'Error downloading users template:',
				e instanceof Error ? { message: e.message, stack: e.stack } : undefined,
			);
		}
	};

	const downloadRecipes = async (format: 'csv' | 'xlsx') => {
		try {
			const blob = await AdminService.getRecipesTemplate(format);
			downloadBlob(blob, `recipes-template.${format}`);
		} catch (e: Error | unknown) {
			logger.error(
				'Error downloading recipes template:',
				e instanceof Error ? { message: e.message, stack: e.stack } : undefined,
			);
		}
	};

	return (
		<Box sx={{ display: 'flex', gap: 1 }}>
			<ButtonUsage
				label='CSV template'
				parentMethod={() => {
					if (showUsers) return downloadUsers('csv');
					if (showRecipes) return downloadRecipes('csv');
					return Promise.resolve();
				}}
				variant={ButtonVariants.OUTLINED}
			/>

			<ButtonUsage
				label='XLSX template'
				parentMethod={() => {
					if (showUsers) return downloadUsers('xlsx');
					if (showRecipes) return downloadRecipes('xlsx');
					return Promise.resolve();
				}}
				variant={ButtonVariants.OUTLINED}
			/>
		</Box>
	);
};

export default UsersTemplateButtons;
