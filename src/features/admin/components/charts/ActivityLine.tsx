import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import type { ChartOptions, ChartData } from 'chart.js';
import type { FC } from 'react';

interface ChartProps {
	data: ChartData<'doughnut'>;
	options: ChartOptions<'doughnut'>;
}

const ActivityLine: FC<ChartProps> = ({ data, options }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				maxHeight: 400,
			}}>
			<Doughnut options={options} data={data} />
		</Box>
	);
};

export default ActivityLine;
