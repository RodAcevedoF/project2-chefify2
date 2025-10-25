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
					<ListItem key={step + idx}>
						<Carrot />
						<Typography variant='body2' ml={1}>
							{step}
						</Typography>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default Instructions;
