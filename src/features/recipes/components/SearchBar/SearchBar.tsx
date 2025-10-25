import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {
	Bot,
	SquareMenu,
	ScanSearch,
	CircleUserRound,
	SquarePen,
	CircleEllipsis,
} from 'lucide-react';
import { useState } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './searchbar.styles';
import { useDrawerContext } from '../../drawer-context/drawer.context';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '@/contexts/modalContext/modal.context';

export default function PrimarySearchAppBar() {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const { setDrawerOpen } = useDrawerContext();
	const theme = useTheme();
	const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { openModal } = useModalContext();
	const nav = useNavigate();

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleNavClick = (path: string) => {
		if (!path) return;
		return () => nav(path);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton
					size='large'
					aria-label='show ai recipes token left'
					color='inherit'>
					<Badge badgeContent={4} color='error'>
						<Bot color={theme.palette.primary.main} />
					</Badge>
				</IconButton>
				<Typography>AI Recipe</Typography>
			</MenuItem>
			<MenuItem
				onClick={() => {
					openModal('recipe');
					handleMobileMenuClose();
				}}>
				<IconButton size='large' aria-label='create new recipe' color='inherit'>
					<SquarePen color={theme.palette.primary.main} />
				</IconButton>
				<Typography>Create Recipe</Typography>
			</MenuItem>
			<MenuItem onClick={handleNavClick('/profile')}>
				<IconButton
					size='large'
					aria-label='account of current user'
					color='inherit'>
					<CircleUserRound color={theme.palette.primary.main} />
				</IconButton>
				<Typography>Profile</Typography>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
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
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bolder' }}>
						CHEFIFY
					</Typography>
					<Search>
						<SearchIconWrapper>
							<ScanSearch />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton
							size='large'
							aria-label='show 4 new mails'
							color='inherit'>
							<Badge badgeContent={4} color='error'>
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
