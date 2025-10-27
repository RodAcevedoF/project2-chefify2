import { Box, List, ListItem, Typography } from '@mui/material';
import { Carrot } from 'lucide-react';

type InstructionsProps = {
	instructions: string[];
};
const Instructions = ({ instructions }: InstructionsProps) => {
	return (
		<Box>
			<Typography variant='h6' fontFamily={'Alegreya'}>
				Instructions:
			</Typography>
			<List style={{ color: 'whitesmoke', fontSize: 12 }}>
				{instructions.map((step, idx) => (
					<ListItem
						key={step + idx}
						sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Carrot size={20} style={{ flexShrink: 0, marginTop: 4 }} />
						<Typography variant='body1' ml={1} sx={{ whiteSpace: 'pre-line' }}>
							{step}
						</Typography>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Instructions;
