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
import { BrushCleaning, ClipboardList } from 'lucide-react';
import { timeAgo } from '../../utils/calcTime.util';

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
								<ListItem
									key={idx}
									sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<ClipboardList color={theme.palette.primary.main} />
									<ListItemText
										primary={primary}
										secondary={secondary}
										slotProps={{
											primary: {
												sx: {
													fontWeight: 700,
													fontSize: '18px',
												},
											},
											secondary: {
												sx: { color: 'primary', fontSize: '14px' },
											},
										}}
									/>
								</ListItem>
							);
						})}
				</List>
			</CardContent>
		</Card>
	);
};

export default RecentActivityCard;
