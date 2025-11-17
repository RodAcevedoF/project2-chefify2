import { useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {
	Bot,
	SquareMenu,
	CircleUserRound,
	SquarePen,
	CircleEllipsis,
} from 'lucide-react';
import { useDrawerContext } from '../../drawer-context/drawer.context';
import { useMediaQuery, useTheme } from '@mui/material';
import { useHandleNavigate } from '@/utils/useHandleNavigate';
import { useModalContext } from '@/contexts/modalContext/modal.context';
import SearchElement from './components/SearchElement';
import MobileSearchBar from './components/MobileSearchBar';
import { useLoggedContext } from '@/contexts/loggedContext/logged.context';

export default function PrimarySearchAppBar() {
	const { aiUsage } = useLoggedContext();
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const { setDrawerOpen } = useDrawerContext();
	const theme = useTheme();
	const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { openModal } = useModalContext();
	const nav = useHandleNavigate((p?: string) => (p ? p : '/'));
	const LIMIT = 5;

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleNavClick = (path: string) => {
		if (!path) return () => {};
		return () => nav(path);
	};

	const aiCounter = useMemo(
		() => LIMIT - (aiUsage?.count ?? 0),
		[LIMIT, aiUsage?.count],
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<MobileSearchBar
			mobileAnchorEl={mobileMoreAnchorEl}
			isMenuOpen={isMobileMenuOpen}
			handleMenuClose={handleMobileMenuClose}
			handleNavClick={handleNavClick}
			openModal={openModal}
			theme={theme}
			mobileMenuId={mobileMenuId}
			aiCounter={aiCounter}
		/>
	);

	return (
		<Box sx={{ flexGrow: 1, zIndex: 1300 }}>
			<AppBar position='static' sx={{ display: 'flex' }}>
				<Toolbar
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}
						onClick={() => setDrawerOpen(true)}
						disabled={!isMdDown}>
						<SquareMenu />
					</IconButton>
					<SearchElement />
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
						}}>
						<IconButton
							size='large'
							aria-label='show 4 new mails'
							color='inherit'
							onClick={() => openModal('recipeSuggest')}>
							<Badge badgeContent={aiCounter} color='error'>
								<Bot />
							</Badge>
						</IconButton>
						<IconButton
							size='large'
							aria-label='show 17 new notifications'
							color='inherit'
							onClick={() => openModal('recipe')}>
							<SquarePen />
						</IconButton>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-haspopup='true'
							onClick={handleNavClick('/profile')}
							color='inherit'>
							<CircleUserRound />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<CircleEllipsis />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</Box>
	);
}
