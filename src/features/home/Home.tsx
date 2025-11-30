import { useRef, useEffect } from 'react';
import LandingCard from '@/features/home/components/cards/LandingCard';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import { useScrollContext } from '@/contexts/scrollContext/scroll.context';
import { Box, Typography, Container, useTheme, CardMedia } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { homeStyles } from './home.theme';
import ComposedImage from './components/cards/ComposedImage';
import {
	imageSlide,
	imgVariant,
	listContainer,
	listItem,
	textSlide,
	titleVariants,
	viewportOptions,
} from './animation.home';
import { landingCards } from './components/cards/data/constants';

export const Home = () => {
	const { scrolled } = useScrollContext();
	const { openModal } = useModalContext();
	const theme = useTheme();
	const hs = homeStyles(theme, scrolled);

	const sectionRef = useRef<HTMLDivElement>(null);
	const shouldReduceMotion = useReducedMotion();

	const initialState = shouldReduceMotion ? 'show' : 'hidden';

	useEffect(() => {
		if (scrolled && sectionRef.current) {
			const offset = -80;
			const top =
				sectionRef.current.getBoundingClientRect().top +
				window.scrollY +
				offset;
			window.scrollTo({ top, behavior: 'smooth' });
		}
	}, [scrolled]);

	return (
		<Container maxWidth={false}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					mt: 10,
					mb: 5,
					minHeight: '60vh',
				}}>
				<motion.div
					initial={initialState}
					whileInView='show'
					variants={titleVariants}
					viewport={viewportOptions}>
					<Typography sx={hs.mainTypo}>CHEFIFY</Typography>
				</motion.div>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '51%',
						transform: 'translate(-50%, -50%)',
						zIndex: -10,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
					}}>
					<motion.div
						initial={initialState}
						whileInView='show'
						variants={imgVariant}
						viewport={viewportOptions}>
						<ComposedImage />
					</motion.div>
				</Box>
			</Box>
			<motion.div
				initial={initialState}
				whileInView='show'
				viewport={viewportOptions}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 1,
						mt: 40,
					}}>
					<motion.div
						initial={initialState}
						whileInView='show'
						variants={textSlide}
						viewport={viewportOptions}>
						<Box
							sx={{ visibility: scrolled ? 'visible' : 'hidden' }}
							ref={sectionRef}>
							<Typography
								variant='body1'
								fontSize={50}
								fontWeight={'bolder'}
								color={scrolled ? 'primary.dark' : 'primary.main'}
								sx={{
									width: '100%',
									textAlign: 'center',
									fontSize: { md: '3rem', xs: '26px' },
									fontFamily: 'Alegreya',
								}}>
								Your culinary journey starts here.
							</Typography>

							<Typography
								variant='body1'
								color={scrolled ? 'primary.dark' : 'primary.main'}
								onClick={() => openModal('auth')}
								sx={{
									cursor: 'pointer',
									width: '100%',
									textAlign: 'center',
									fontSize: { md: '3rem', xs: '22px' },
									transition: 'transform 0.3s, font-weight 0.3s, color 0.3s',
									'&:hover': {
										transform: 'scale(1.05)',
										fontWeight: 'bolder',
										color: theme.palette.background.default,
									},
								}}>
								Please log in or register to continue.
							</Typography>
						</Box>
					</motion.div>

					<motion.div
						initial={initialState}
						whileInView='show'
						variants={imageSlide}
						viewport={viewportOptions}>
						<CardMedia
							component='img'
							image='/landing-default/landingchef.webp'
							alt='divider wave'
							sx={{
								height: '180px',
								width: 'auto',
								pointerEvents: 'none',
								userSelect: 'none',
							}}
						/>
					</motion.div>
				</Box>
			</motion.div>
			<Box
				component='section'
				width='100%'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					paddingY: 10,
					paddingX: { xs: 2, md: 5 },
					gap: 20,
					borderRadius: 3,
					marginY: 5,
					backgroundColor: theme.palette.secondary.light,
					visibility: scrolled ? 'visible' : 'hidden',
				}}>
				<motion.div
					initial={initialState}
					whileInView='show'
					variants={listContainer}
					viewport={viewportOptions}>
					{landingCards.map((card, index) => (
						<motion.div key={`${card.label}-${index}`} variants={listItem}>
							<LandingCard props={card} />
						</motion.div>
					))}
				</motion.div>
			</Box>
		</Container>
	);
};
