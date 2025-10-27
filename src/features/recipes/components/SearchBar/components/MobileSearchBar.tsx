import {
	Badge,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	type Theme,
} from '@mui/material';
import { Bot, CircleUserRound, SquarePen } from 'lucide-react';

type MobileSearchBarProps = {
	mobileAnchorEl: null | HTMLElement;
	isMenuOpen: boolean;
	handleMenuClose: () => void;
	handleNavClick: (path: string) => () => void;
	openModal: (modalType: string) => void;
	theme: Theme;
	mobileMenuId: string;
};

const MobileSearchBar = ({
	mobileAnchorEl,
	isMenuOpen,
	handleMenuClose,
	handleNavClick,
	openModal,
	theme,
	mobileMenuId,
}: MobileSearchBarProps) => {
	return (
		<Menu
			anchorEl={mobileAnchorEl}
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
			open={isMenuOpen}
			onClose={handleMenuClose}>
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
					handleMenuClose();
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
};

export default MobileSearchBar;
