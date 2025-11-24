import { useMemo, useState, type FC } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	type ChartOptions,
} from 'chart.js';
import {
	Card,
	CardContent,
	Typography,
	useTheme,
	Stack,
	Box,
} from '@mui/material';
import useOperations from '@/features/admin/hooks/useDashboard';
import ChartControls from './ChartControls';
import ActivityLine from './ActivityLine';
import type { ResourceType } from './chartUtils';
import { buildColorMap } from './chartUtils';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Filler,
	Legend,
);

const RecentActivityChart: FC<{ days?: number }> = () => {
	const theme = useTheme();
	const { data } = useOperations();

	const [selected, setSelected] = useState<ResourceType[]>([
		'recipe',
		'like',
		'follow',
	]);

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		next: ResourceType[] | null,
	) => {
		if (!next || next.length === 0) return;
		setSelected(next);
	};

	const chartData = useMemo(() => {
		const colors = buildColorMap(theme);

		const items = Array.isArray(data) ? data : [];
		const keys = selected;
		const dLabels = keys.map((k) => `${k[0].toUpperCase()}${k.slice(1)}s`);
		const totals = keys.map((k) =>
			items.reduce((s: number, op) => {
				const res = (op.resource ?? '').toLowerCase();
				const t = (op.type ?? '').toLowerCase();
				return res === k || t.includes(k) ? s + 1 : s;
			}, 0),
		);
		const backgroundColor = keys.map((k) => colors[k].bg);
		const borderColor = keys.map((k) => colors[k].border);

		return {
			labels: dLabels,
			datasets: [
				{
					data: totals,
					backgroundColor,
					borderColor,
					borderWidth: 1,
				},
			],
		};
	}, [data, selected, theme]);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: '60%',
		plugins: {
			legend: { display: false },
			tooltip: { mode: 'nearest', intersect: true, padding: 8 },
		},
		layout: { padding: { top: 0, bottom: 0, left: 0, right: 0 } },
	} as ChartOptions<'doughnut'>;

	const labels = (chartData.labels ?? []) as string[];
	const totals = ((chartData.datasets?.[0]?.data as number[]) ??
		[]) as number[];
	const bgColors = ((chartData.datasets?.[0]?.backgroundColor as string[]) ??
		[]) as string[];

	return (
		<Card
			elevation={5}
			sx={{
				width: { xs: '100%', md: '600px' },
				display: 'flex',
				flexDirection: 'column',
			}}>
			<CardContent>
				<Stack
					direction='column'
					alignItems='center'
					justifyContent='center'
					sx={{ gap: 2, mb: 3 }}>
					<Typography variant='h6' sx={{ fontFamily: 'Alegreya' }}>
						Recent activity
					</Typography>

					<ChartControls value={selected} onChange={handleChange} />
				</Stack>

				<CardContent sx={{ width: '100%' }}>
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							flexDirection: { xs: 'column', md: 'row' },
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Box sx={{ flex: 1 }}>
							<ActivityLine options={options} data={chartData} />
						</Box>

						<Box
							sx={{
								width: { xs: '100%', md: 220 },
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
								alignItems: { xs: 'center', md: 'flex-start' },
							}}>
							{labels.map((lbl, i) => (
								<Box
									key={lbl}
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 1,
										width: '100%',
										justifyContent: 'space-between',
									}}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Box
											sx={{
												width: 25,
												height: 25,
												bgcolor: bgColors[i] || theme.palette.grey[400],
												borderRadius: 1,
												border: `4px solid ${
													bgColors[i] || theme.palette.grey[400]
												}`,
											}}
										/>
										<Typography variant='body2'>{lbl}</Typography>
									</Box>
									<Typography variant='body2' sx={{ fontWeight: 'bolder' }}>
										{totals[i] ?? 0}
									</Typography>
								</Box>
							))}
						</Box>
					</Box>
				</CardContent>
			</CardContent>
		</Card>
	);
};

export default RecentActivityChart;
