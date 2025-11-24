import { type FC } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import FixedIcon from '@/features/common/components/FixedIcon';
import { ThumbsUp } from 'lucide-react';

type PrivHomeheaderProps = {
	name?: string;
};

const PrivateHomeHeader: FC<PrivHomeheaderProps> = ({ name }) => {
	const t = useTheme();
	return (
		<Stack direction={'row'} alignItems='center' spacing={1} mb={4}>
			<Typography variant='h4' gutterBottom fontFamily={'Alegreya'}>
				Welcome back{name ? `, ${name}` : ''}!
			</Typography>
			<FixedIcon
				icon={ThumbsUp}
				size={30}
				boxSize={30}
				color={t.palette.primary.main}
			/>
		</Stack>
	);
};

export default PrivateHomeHeader;
