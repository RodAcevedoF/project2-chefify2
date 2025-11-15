import React, { useMemo, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
	Card,
	CardContent,
	Typography,
	useTheme,
	ToggleButton,
	ToggleButtonGroup,
	Stack,
	type Theme,
} from '@mui/material';
import { alpha } from '@mui/material';
import useOperations from '@/features/admin/hooks/useDashboard';
import type { Operation } from '@/features/admin/services/admin.service';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
);

const DAYS = 14;
const RESOURCE_TYPES = ['recipe', 'like', 'follow'] as const;
type ResourceType = (typeof RESOURCE_TYPES)[number];

const formatDay = (date: Date) => date.toISOString().slice(0, 10);

const buildLastNDays = (n: number): string[] =>
	Array.from({ length: n }).map((_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - (n - 1 - i));
		return formatDay(d);
	});

const buildColorMap = (theme: Theme) => ({
	recipe: {
		border: theme.palette.success.light,
		bg: alpha(theme.palette.success.light, 0.2),
	},
	like: {
		border: theme.palette.background?.chartLikes ?? '#dc5786ff',
		bg: alpha(theme.palette.background?.chartLikes ?? '#ea6895ff', 0.2),
	},
	follow: {
		border: theme.palette.success?.main ?? '#4caf50',
		bg: alpha(theme.palette.success?.main ?? '#4caf50', 0.2),
	},
});

const aggregateOps = (
	items: Operation[],
	labels: string[],
): Record<ResourceType, number[]> => {
	// init maps: all days prefilled with 0
	const maps = Object.fromEntries(
		RESOURCE_TYPES.map((t) => [
			t,
			Object.fromEntries(labels.map((l) => [l, 0])),
		]),
	) as Record<ResourceType, Record<string, number>>;

	for (const op of items) {
		const created = op.createdAt ? new Date(op.createdAt) : null;
		const day = created ? formatDay(created) : null;
		if (!day) continue;

		const res = (op.resource ?? '').toLowerCase();
		const t = (op.type ?? '').toLowerCase();

		for (const r of RESOURCE_TYPES) {
			if (res === r || t.includes(r)) {
				if (maps[r][day] !== undefined) {
					maps[r][day] += 1;
				}
			}
		}
	}

	return Object.fromEntries(
		RESOURCE_TYPES.map((r) => [r, labels.map((l) => maps[r][l] ?? 0)]),
	) as Record<ResourceType, number[]>;
};

const RecentActivityChart: React.FC<{ days?: number }> = ({ days = DAYS }) => {
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
		if (!next || next.length === 0) return; // block deselecting last one
		setSelected(next);
	};

	const labels = useMemo(() => buildLastNDays(days), [days]);

	const aggregated = useMemo(
		() => aggregateOps(Array.isArray(data) ? data : [], labels),
		[data, labels],
	);

	const chartData = useMemo(() => {
		const colors = buildColorMap(theme);

		const datasets = selected.map((key) => ({
			label: `${key[0].toUpperCase()}${key.slice(1)}s`,
			data: aggregated[key],
			fill: true,
			tension: 0.4,
			borderColor: colors[key].border,
			backgroundColor: colors[key].bg,
			borderWidth: 2,
			pointRadius: 3,
			pointHoverRadius: 5,
		}));

		return { labels, datasets };
	}, [aggregated, labels, selected, theme]);

	const options: ChartOptions<'line'> = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				legend: { position: 'top', labels: { font: { size: 14 } } },
				tooltip: { mode: 'index', intersect: false, padding: 12 },
			},
			scales: {
				x: { ticks: { font: { size: 12 } }, grid: { display: false } },
				y: {
					beginAtZero: true,
					ticks: { font: { size: 12 }, precision: 0, stepSize: 1 },
					grid: { color: alpha(theme.palette.background?.default, 0.1) },
				},
			},
		}),
		[theme.palette.background.default],
	);

	return (
		<Card
			elevation={5}
			sx={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
			<CardContent>
				<Stack
					direction='column'
					alignItems='center'
					justifyContent='center'
					sx={{ mb: 4, gap: 2 }}>
					<Typography variant='h6' sx={{ fontFamily: 'Alegreya' }}>
						Recent activity
					</Typography>

					<ToggleButtonGroup
						value={selected}
						onChange={handleChange}
						size='small'
						sx={{
							backgroundColor: theme.palette.success.dark,
							borderRadius: 2,
							p: 0.5,
							'& .MuiToggleButton-root': {
								textTransform: 'none',
								color: theme.palette.primary.main,
								border: 'none',
								px: 1.5,
								fontWeight: 'bolder',
								transition: 'background-color 0.3s',
								'&:hover': {
									backgroundColor: 'success.selected',
								},
							},
							'& .Mui-selected': {
								backgroundColor: 'success.selected',
								color: 'whitesmoke',
							},
						}}>
						<ToggleButton value='recipe'>Recipes</ToggleButton>
						<ToggleButton value='like'>Likes</ToggleButton>
						<ToggleButton value='follow'>Follows</ToggleButton>
					</ToggleButtonGroup>
				</Stack>

				<CardContent sx={{ width: '100%' }}>
					<Line options={options} data={chartData} />
				</CardContent>
			</CardContent>
		</Card>
	);
};

export default RecentActivityChart;
