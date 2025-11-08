import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import type { RecipeDTO } from '@/types/recipe.types';
import { Box, CardMedia, IconButton, TextField, Tooltip } from '@mui/material';
import { Camera, Trash2 } from 'lucide-react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

export interface UploadImageInputProps {
	imgPreview: string | null;
	parentMethod: (e: React.ChangeEvent<HTMLInputElement>) => void;
	register: UseFormRegister<RecipeDTO>;
	watch: UseFormWatch<RecipeDTO>;
	onClear: () => void;
}

const UploadIUmageInput = (props: UploadImageInputProps) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				width: '100%',
			}}>
			<input
				id='recipe-image-input'
				type='file'
				accept='image/*'
				style={{ display: 'none' }}
				onChange={props.parentMethod}
			/>
			<ButtonUsage
				parentMethod={() =>
					document.getElementById('recipe-image-input')?.click()
				}
				icon={Camera}
				extraSx={{ fontSize: 10 }}
			/>
			<TextField
				label='Image URL'
				size='small'
				{...props.register('imgUrl')}
				slotProps={{
					inputLabel: { shrink: !!(props.watch('imgUrl') || props.imgPreview) },
				}}
				sx={{ flex: 1 }}
			/>
			{props.imgPreview && (
				<Box
					sx={{
						position: 'relative',
						width: 64,
						height: 64,
						borderRadius: 1,
						overflow: 'hidden',
						cursor: 'pointer',
						'&:hover .overlay': {
							opacity: 1,
						},
					}}>
					<CardMedia
						component='img'
						image={props.imgPreview}
						alt='preview'
						sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
					<Box
						className='overlay'
						sx={{
							position: 'absolute',
							inset: 0,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							background: 'rgba(0,0,0,0.45)',
							opacity: 0,
							transition: 'opacity 150ms ease',
						}}>
						<Tooltip title='Remove image'>
							<IconButton
								size='small'
								onClick={() => props.onClear()}
								sx={{ color: 'common.white', bgcolor: 'transparent' }}>
								<Trash2 size={16} />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default UploadIUmageInput;
