import { ButtonUsage } from '@/features/common/components/buttons/MainButton';
import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemButton,
	Box,
	CardMedia,
	useTheme,
	Chip,
	CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/material';
import { CookingPot, ChevronRight } from 'lucide-react';
import { useGetSavedRecipes } from '@/features/profile/hooks/useUser';
import NoSavedRecipesCard from './NoSavedRecipesCard';
import { useHandleNavigate } from '@/utils/useHandleNavigate';

const DEFAULT_THUMB = '/default-recipe.png';

const ProfileRecipesCard = () => {
	const theme = useTheme();
	const goRecipes = useHandleNavigate('/recipes');
	const goRecipe = useHandleNavigate((id?: string) => `/recipes/${id}`);

	const { data: recipes, isLoading } = useGetSavedRecipes();

	const uniqueRecipes = (recipes ?? []).filter(
		(r, i, arr) => arr.findIndex((x) => x._id === r._id) === i,
	);

	return (
		<Card elevation={1} sx={{ mb: 2 }}>
			<CardMedia
				src='/banner.png'
				component='img'
				alt='recipes banner'
				sx={{ mb: 3, height: 350, objectFit: 'cover', objectPosition: 'top' }}
			/>

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
					Your recipes
				</Typography>

				<List>
					{isLoading ? (
						<ListItem>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									py: 2,
								}}>
								<CircularProgress
									size={28}
									sx={{ color: theme.palette.primary.main }}
								/>
							</Box>
						</ListItem>
					) : !recipes || recipes.length === 0 ? (
						<ListItem>
							<NoSavedRecipesCard />
						</ListItem>
					) : (
						uniqueRecipes.map((recipe) => (
							<ListItem key={recipe._id} disablePadding>
								<ListItemButton
									onClick={() => goRecipe(recipe._id)}
									sx={{
										alignItems: 'flex-start',
										px: 2,
										py: 1.25,
										borderRadius: 2,
										border:
											'1px solid ' + alpha(theme.palette.primary.main, 0.1),
										transition:
											'transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease',
										'&:hover': {
											backgroundColor: 'action.hover',
											transform: 'translateY(-2px)',
											boxShadow: `0 10px 24px ${alpha(
												theme.palette.primary.main,
												0.12,
											)}`,
										},
										display: 'flex',
										gap: 2,
										mt: 2,
									}}>
									<Box
										component='img'
										src={!recipe.imgUrl ? DEFAULT_THUMB : recipe.imgUrl}
										alt={recipe.title}
										sx={{
											width: 64,
											height: 64,
											borderRadius: 1,
											objectFit: 'cover',
											flex: '0 0 64px',
										}}
									/>

									<Box sx={{ flex: 1, minWidth: 0 }}>
										<Typography variant='h6' fontWeight={700} noWrap>
											{recipe.title}
										</Typography>
										<Typography
											variant='body1'
											color='primary'
											display='block'
											sx={{ mt: 0.5 }}>
											Prep: {recipe.prepTime ?? '-'} min • Servings:{' '}
											{recipe.servings ?? '-'}
										</Typography>
										<Box sx={{ mt: 0.5 }}>
											{Array.isArray(recipe.categories) &&
												recipe.categories
													.slice(0, 3)
													.map((cat) => (
														<Chip
															key={cat}
															label={cat}
															size='medium'
															variant='outlined'
															color='primary'
															sx={{ mr: 0.5 }}
														/>
													))}
										</Box>
									</Box>

									<ChevronRight size={18} color={theme.palette.primary.main} />
								</ListItemButton>
							</ListItem>
						))
					)}
				</List>

				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
					<ButtonUsage
						label='See all recipes'
						parentMethod={goRecipes}
						icon={CookingPot}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};

export default ProfileRecipesCard;
