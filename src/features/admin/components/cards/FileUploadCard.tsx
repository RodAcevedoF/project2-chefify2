import { useRef, type FC } from 'react';
import {
	Box,
	Typography,
	Paper,
	Divider,
	CircularProgress,
	useTheme,
} from '@mui/material';
import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import { ButtonVariants } from '@/types/common.types';
import { MonitorUp } from 'lucide-react';
import UploadAnimation from './UploadAnimation';

interface FileUploadProps {
	title: string;
	accept?: string;
	file: File | null;
	setFile: (f: File | null) => void;
	uploadLabel?: string;
	onUpload: () => Promise<void> | void;
	disabled?: boolean;
	loading?: boolean;
	extraActions?: React.ReactNode;
}

const IMAGES: string[] = [
	'/anim/anim1.webp',
	'/anim/anim2.webp',
	'/anim/anim3.webp',
	'/anim/anim4.webp',
];

const FileUploadCard: FC<FileUploadProps> = ({
	title,
	accept,
	file,
	setFile,
	uploadLabel = 'Upload',
	onUpload,
	disabled,
	loading,
	extraActions,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0] ?? null;
		setFile(f);
	};

	const handleAnimationClick = () => {
		inputRef.current?.click();
	};

	const t = useTheme();

	return (
		<Paper sx={{ p: 2, borderRadius: 3 }}>
			<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
				<MonitorUp color={t.palette.primary.main} />
				<Typography
					variant='h5'
					sx={{ fontWeight: 'bolder', fontFamily: 'Alegreya' }}>
					{title}
				</Typography>
			</Box>
			<Divider sx={{ my: 1 }} />

			<Box
				onClick={handleAnimationClick}
				sx={{
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'center',
					my: 2,
					'&:hover': {
						opacity: 0.8,
					},
				}}>
				<UploadAnimation images={IMAGES} />
			</Box>

			<input
				ref={inputRef}
				type='file'
				accept={accept}
				onChange={onFileChange}
				style={{ display: 'none' }}
			/>

			<Box
				sx={{
					mt: 2,
					display: 'flex',
					flexWrap: { xs: 'wrap', md: 'nowrap' },
					gap: 2,
					alignItems: 'center',
				}}>
				<ButtonUsage
					label={uploadLabel}
					parentMethod={() => onUpload()}
					disabled={!!disabled || !!loading || !file}
					loader={!!loading}
					variant={ButtonVariants.DEFAULT}
				/>
				{extraActions}
				{loading && <CircularProgress size={22} />}
				<Typography variant='body1' sx={{ ml: 1, px: 1, fontWeight: 'bolder' }}>
					{file ? file.name : 'No file selected'}
				</Typography>
			</Box>
		</Paper>
	);
};

export default FileUploadCard;
