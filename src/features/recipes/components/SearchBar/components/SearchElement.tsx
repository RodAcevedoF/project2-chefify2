import React from 'react';
import { ScanSearch } from 'lucide-react';
import {
	Search,
	SearchIconWrapper,
	StyledInputBase,
} from '../searchbar.styles';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	Paper,
	Popper,
	List,
	ListItemButton,
	ListItemText,
	ClickAwayListener,
	CircularProgress,
	useTheme,
} from '@mui/material';
import { RECIPE_CATEGORY_OPTIONS } from '@/types/recipe.types';
import useSearchAutocomplete from '@/features/recipes/hooks/useSearchAutocomplete';
import { recipeFormStyles } from '@/features/recipes/forms/RecipeForm/recipe-form.theme';

const SearchElement: React.FC = () => {
	const {
		inputProps,
		category,
		onCategoryChange,
		mode,
		onModeChange,
		suggestions,
		suggestionsLoading,
		openSuggestions,
		closeTemporary,
		selectById,
		highlightIndex,
	} = useSearchAutocomplete();

	const anchorEl = inputProps.ref?.current ?? null;
	const theme = useTheme();
	const rs = recipeFormStyles(theme, { color: theme.palette.primary.main });

	return (
		<ClickAwayListener onClickAway={() => closeTemporary()}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexWrap: { xs: 'wrap', md: 'nowrap' },
					gap: { xs: 1, md: 0 },
					py: 1,
				}}>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<FormControl size='small' sx={{ minWidth: 80 }}>
						<InputLabel
							id='category-select-label'
							sx={{
								color: rs.categoriesInput.inputLabel.color || 'inherit',
								fontWeight: 'bolder',
							}}>
							Category
						</InputLabel>
						<Select
							labelId='category-select-label'
							id='category-select'
							value={category || 'all'}
							label='Category'
							variant='outlined'
							MenuProps={{
								PaperProps: {
									sx: {
										bgcolor: 'background.paper',
										color: 'primary.main',
										fontWeight: 'bolder',
									},
								},
								MenuListProps: { sx: { p: 0 } },
							}}
							sx={rs.searchElement.select}
							onChange={onCategoryChange}>
							<MenuItem value='all' sx={rs.searchElement.menuItem}>
								All
							</MenuItem>
							{RECIPE_CATEGORY_OPTIONS.map((opt) => (
								<MenuItem key={opt} value={opt} sx={rs.searchElement.menuItem}>
									{opt}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size='small' sx={{ minWidth: 50 }}>
						<InputLabel
							id='mode-select-label'
							sx={{
								color: rs.categoriesInput.inputLabel.color || 'inherit',
								fontWeight: 'bolder',
							}}>
							Mode
						</InputLabel>
						<Select
							labelId='mode-select-label'
							id='mode-select'
							value={mode}
							label='Mode'
							variant='outlined'
							sx={rs.searchElement.select}
							onChange={onModeChange}
							MenuProps={{
								PaperProps: {
									sx: {
										bgcolor: 'background.paper',
										color: 'primary.main',
										fontWeight: 'bolder',
									},
								},
								MenuListProps: { sx: { p: 0 } },
							}}>
							<MenuItem value='latest'>Latest</MenuItem>
							<MenuItem value='top'>Most voted</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Search
					sx={{
						minWidth: '60%',
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						justifyContent: 'space-between',
						position: 'relative',
					}}>
					<SearchIconWrapper>
						<ScanSearch />
					</SearchIconWrapper>

					<StyledInputBase
						value={inputProps.value}
						onChange={inputProps.onChange}
						placeholder={inputProps.placeholder}
						inputProps={{ 'aria-label': 'search' }}
						onKeyDown={inputProps.onKeyDown}
						inputRef={inputProps.ref}
					/>

					<Popper
						open={openSuggestions}
						anchorEl={anchorEl}
						placement='bottom-start'
						style={{ zIndex: 1400 }}>
						<Paper sx={{ width: anchorEl ? anchorEl.offsetWidth : 300, mt: 1 }}>
							{suggestionsLoading ? (
								<Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
									<CircularProgress size={20} />
								</Box>
							) : (
								<List dense>
									{(suggestions ?? []).map((s, idx) => (
										<ListItemButton
											key={s._id}
											onClick={() => selectById(s._id)}
											dense
											selected={highlightIndex === idx}>
											<ListItemText
												primary={s.title}
												secondary={`🤍 ${s.likesCount ?? 0}`}
											/>
										</ListItemButton>
									))}
								</List>
							)}
						</Paper>
					</Popper>
				</Search>
			</Box>
		</ClickAwayListener>
	);
};

export default SearchElement;
