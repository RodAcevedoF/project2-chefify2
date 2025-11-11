import type { FC } from 'react';
import {
	Box,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemText,
	useTheme,
} from '@mui/material';
import { Ban } from 'lucide-react';

type Report = null | {
	inserted?: unknown[];
	skipped?: { row: number; reason: string; data?: unknown }[];
};

interface ReportPanelProps {
	message?: string | null;
	error?: string | null;
	report?: Report;
}

const ReportPanel: FC<ReportPanelProps> = ({ message, error, report }) => {
	const t = useTheme();

	return (
		<Box
			sx={{
				mt: 3,
				backgroundColor: 'background.paper',
				p: 2,
				borderRadius: 3,
			}}>
			{message && (
				<Typography
					sx={{
						color: 'success.main',
						fontWeight: 'bolder',
						fontFamily: 'Alegreya',
						fontSize: 22,
					}}>
					{message}
				</Typography>
			)}
			{error && <Typography color='error.main'>{error}</Typography>}

			{report?.skipped && report.skipped.length > 0 && (
				<Box sx={{ mt: 2 }}>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Typography variant='subtitle1' sx={{ fontWeight: 'bolder' }}>
							Skipped rows
						</Typography>
						<Ban color={t.palette.primary.main} />
					</Box>
					<Divider sx={{ my: 1 }} />
					<List dense>
						{report.skipped.map((s, idx) => (
							<ListItem key={idx}>
								<ListItemText primary={`Row ${s.row}: ${s.reason}`} />
							</ListItem>
						))}
					</List>
				</Box>
			)}
		</Box>
	);
};

export default ReportPanel;
