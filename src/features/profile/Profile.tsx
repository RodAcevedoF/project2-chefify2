import {
	Box,
	Typography,
	Button,
	Avatar,
	Paper,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ProfileLayout = () => {
	const nav = useNavigate();

	const handleNavigate = (path: string) => {
		return () => nav(path);
	};

	return (
		<Box sx={{ width: '100%', p: { xs: 2, md: 4 } }}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { xs: '1fr', md: '240px 1fr 240px' },
					gap: 3,
				}}>
				{/* Left: Profile Card */}
				<Box>
					<Paper sx={{ p: 3, textAlign: 'center' }} elevation={2}>
						<Avatar sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }}>U</Avatar>
						<Typography variant='h6' fontWeight={700} gutterBottom>
							User Name
						</Typography>
						<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
							Short bio — write a brief introduction or description here.
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
							<Button
								variant='contained'
								size='small'
								onClick={handleNavigate('/profile/edit')}>
								Editar perfil
							</Button>
							<Button
								variant='outlined'
								size='small'
								onClick={handleNavigate('/recipes')}>
								Mis recetas
							</Button>
						</Box>
					</Paper>
				</Box>

				{/* Center: Activity / Recipes */}
				<Box>
					<Card elevation={1} sx={{ mb: 2 }}>
						<CardContent>
							<Typography variant='h6' gutterBottom>
								Your recipes
							</Typography>
							<List>
								<ListItem>
									<ListItemText
										primary='Sample recipe 1'
										secondary='Last edited: 3 days ago'
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary='Sample recipe 2'
										secondary='Last edited: 2 weeks ago'
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary='Sample recipe 3'
										secondary='Created: 1 month ago'
									/>
								</ListItem>
							</List>
							<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
								<Button
									variant='contained'
									onClick={handleNavigate('/recipes')}>
									See all recipes
								</Button>
							</Box>
						</CardContent>
					</Card>

					<Card elevation={1}>
						<CardContent>
							<Typography variant='h6' gutterBottom>
								Recent activity
							</Typography>
							<List>
								<ListItem>
									<ListItemText
										primary='You saved a recipe'
										secondary='2 hours ago'
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary='You edited your profile'
										secondary='3 days ago'
									/>
								</ListItem>
							</List>
						</CardContent>
					</Card>
				</Box>

				{/* Right: Stats / Actions */}
				<Box>
					<Paper sx={{ p: 2 }} elevation={2}>
						<Typography variant='subtitle1' fontWeight={600} gutterBottom>
							Statistics
						</Typography>
						<Typography variant='body2'>Recipes: 12</Typography>
						<Typography variant='body2'>Favorites: 4</Typography>
						<Typography variant='body2' sx={{ mb: 2 }}>
							Followers: 34
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Button
								variant='outlined'
								onClick={handleNavigate('/profile/settings')}>
								Settings
							</Button>
							<Button
								variant='outlined'
								color='error'
								onClick={handleNavigate('/logout')}>
								Log out
							</Button>
						</Box>
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

export default ProfileLayout;
