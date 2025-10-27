import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemText,
	useTheme,
} from '@mui/material';
import { useGetRecentOperations } from '@/features/profile/hooks/useUser';
import { BrushCleaning } from 'lucide-react';

function timeAgo(input?: string | Date): string {
	if (!input) return '';
	const then = typeof input === 'string' ? new Date(input) : input;
	const diff = Date.now() - then.getTime();
	const sec = Math.floor(diff / 1000);
	if (sec < 60) return `${sec}s ago`;
	const min = Math.floor(sec / 60);
	if (min < 60) return `${min}m ago`;
	const hr = Math.floor(min / 60);
	if (hr < 24) return `${hr}h ago`;
	const days = Math.floor(hr / 24);
	return `${days}d ago`;
}

const RecentActivityCard: React.FC = () => {
	const theme = useTheme();
	const { data: ops, isLoading } = useGetRecentOperations();

	const items = Array.isArray(ops) ? ops : [];

	return (
		<Card elevation={1}>
			<CardContent>
				<Typography
					variant='h6'
					sx={{
						fontFamily: 'Alegreya',
						border: 1,
						borderColor: theme.palette.background.default,
						p: 1,
						borderRadius: 3,
					}}>
					Recent activity
				</Typography>
				<List>
					{isLoading && (
						<ListItem>
							<ListItemText primary='Loading...' />
						</ListItem>
					)}
					{!isLoading && items.length === 0 && (
						<ListItem
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}>
							<ListItemText
								primary='No recent activity'
								sx={{
									fontWeight: 'bolder',
									fontStyle: 'italic',
									maxWidth: '150px',
									fontSize: '16px',
								}}
							/>
							<BrushCleaning color={theme.palette.primary.main} />
						</ListItem>
					)}
					{!isLoading &&
						items.map((op, idx) => {
							const item = op as {
								summary?: string;
								type?: string;
								createdAt?: string | Date;
							};
							const primary = item?.summary ?? item?.type ?? 'Activity';
							const secondary = item?.createdAt ? timeAgo(item.createdAt) : '';
							return (
								<ListItem key={idx}>
									<ListItemText primary={primary} secondary={secondary} />
								</ListItem>
							);
						})}
				</List>
			</CardContent>
		</Card>
	);
};

export default RecentActivityCard;
