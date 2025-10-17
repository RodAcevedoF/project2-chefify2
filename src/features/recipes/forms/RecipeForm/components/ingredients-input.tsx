import { Paper, Snackbar, Alert } from '@mui/material';
import {
	Controller,
	type Control,
	type ControllerRenderProps,
} from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import {
	useGetIngredients,
	useCreateIngredient,
} from '@/features/ingredients/hooks';
import {
	Units,
	type Ingredient,
	type IngredientRefDTO,
} from '@/types/ingredient.type';
import IngredientAutocomplete from './IngredientInput/ingredient-autocomplete';
import IngredientsChips from './IngredientInput/ingredient-chip';
import AddIngredientDialog from './IngredientInput/ingredient-dialog';

export interface IngredientsInputProps {
	control: Control;
	color: string;
	backgroundColor: string;
	inputValue: string;
	setInputValue: (value: string) => void;
	name: string;
}

const IngredientsInput = (props: IngredientsInputProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const fieldRef = useRef<ControllerRenderProps | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null);
	const [isCreatingNew, setIsCreatingNew] = useState(false);
	const [newIngredientName, setNewIngredientName] = useState('');
	const [selectedUnit, setSelectedUnit] = useState<string>(Units.options[0]);
	const [quantity, setQuantity] = useState<string>('1');

	const [snackbar, setSnackbar] = useState<{
		open: boolean;
		message: string;
		severity: 'success' | 'info' | 'warning' | 'error';
	}>({ open: false, message: '', severity: 'info' });
	const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

	useEffect(() => {
		const id = setTimeout(() => setSearchTerm(props.inputValue.trim()), 300);
		return () => clearTimeout(id);
	}, [props.inputValue]);

	const { data: options = [], refetch } = useGetIngredients(
		{ name: searchTerm },
		{
			enabled: !!searchTerm && searchTerm.length >= 2,
			queryKey: ['ingredients', searchTerm],
		},
	);

	const createIngredientMutation = useCreateIngredient({
		onSuccess: () => {
			refetch();
		},
	});

	const openModalForExisting = (
		ingredient: Ingredient,
		field: ControllerRenderProps,
	) => {
		const current = Array.isArray(field.value) ? field.value : [];
		const exists = current.some(
			(item: IngredientRefDTO) =>
				typeof item.ingredient === 'object' &&
				item.ingredient?._id === ingredient._id,
		);

		if (exists) {
			setSnackbar({
				open: true,
				message: 'Ingredient already add',
				severity: 'info',
			});
			return;
		}

		setSelectedIngredient(ingredient);
		setIsCreatingNew(false);
		setQuantity('1');
		fieldRef.current = field;
		setModalOpen(true);
	};

	const openModalForNew = (name: string, field: ControllerRenderProps) => {
		setNewIngredientName(name);
		setIsCreatingNew(true);
		setSelectedUnit(Units.options[0]);
		setQuantity('1');
		fieldRef.current = field;
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedIngredient(null);
		setIsCreatingNew(false);
		setNewIngredientName('');
		setQuantity('1');
		fieldRef.current = null;
	};

	const handleAdd = async (value: string, field: ControllerRenderProps) => {
		if (!value.trim()) return;
		const ingredient = options.find(
			(opt) => opt.name.toLowerCase() === value.toLowerCase(),
		);

		if (!ingredient) {
			openModalForNew(value.trim(), field);
		} else {
			openModalForExisting(ingredient, field);
		}
	};

	const addIngredientWithQuantity = (
		ingredient: Ingredient,
		field: ControllerRenderProps,
	) => {
		const current = Array.isArray(field.value) ? field.value : [];
		const exists = current.some(
			(item: IngredientRefDTO) => item._id === ingredient._id,
		);

		if (exists) {
			setSnackbar({
				open: true,
				message: 'Ingredient already add',
				severity: 'info',
			});
			closeModal();
			return;
		}

		const quantityNum = parseFloat(quantity);
		if (isNaN(quantityNum) || quantityNum <= 0) {
			setSnackbar({
				open: true,
				message: 'Enter a valid quantity',
				severity: 'warning',
			});
			closeModal();
			return;
		}

		const safeIngredient = {
			_id: ingredient._id,
			name: ingredient.name,
			unit: ingredient.unit,
		} as unknown as Ingredient;

		const ingredientRef: IngredientRefDTO = {
			ingredient: safeIngredient,
			quantity: quantityNum,
		};

		field.onChange([...current, ingredientRef]);
		props.setInputValue('');
		closeModal();
	};
	const handleConfirmAdd = async () => {
		if (!fieldRef.current) return;

		if (isCreatingNew) {
			try {
				const payload = {
					name: newIngredientName.trim(),
					unit: selectedUnit as (typeof Units.options)[number],
				};

				await createIngredientMutation.mutateAsync(payload);

				const refetchResult = await refetch();
				const updatedOptions: Ingredient[] = refetchResult?.data ?? [];

				const ingredient = updatedOptions.find(
					(opt) =>
						opt.name.toLowerCase() === newIngredientName.trim().toLowerCase(),
				);

				if (ingredient) {
					addIngredientWithQuantity(ingredient, fieldRef.current);
					setSnackbar({
						open: true,
						message: 'Ingredient created and added',
						severity: 'success',
					});
				} else {
					setSnackbar({
						open: true,
						message:
							'Ingredient created, but not found to add. Please add it manually.',
						severity: 'info',
					});
				}

				closeModal();
			} catch (error) {
				console.error('Error creating ingredient:', error);
				setSnackbar({
					open: true,
					message: 'Error creating ingredient. Please try again.',
					severity: 'error',
				});
			}
		} else if (selectedIngredient) {
			addIngredientWithQuantity(selectedIngredient, fieldRef.current);
			closeModal();
		}
	};

	return (
		<>
			<Controller
				control={props.control}
				name={props.name}
				render={({ field }) => (
					<Paper
						sx={{
							p: 0,
							width: '100%',
							backgroundColor: props.backgroundColor,
							boxShadow: 'none',
							height: 'fit-content',
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 1,
						}}>
						<IngredientAutocomplete
							options={options}
							inputValue={props.inputValue}
							setInputValue={props.setInputValue}
							onAdd={(name) => handleAdd(name, field)}
							loading={createIngredientMutation.isPending}
							color={props.color}
						/>
						<IngredientsChips
							value={Array.isArray(field.value) ? field.value : []}
							onDelete={(idx) => {
								const newValue = Array.isArray(field.value)
									? field.value.filter((_, i) => i !== idx)
									: [];
								field.onChange(newValue);
							}}
						/>
					</Paper>
				)}
			/>
			<AddIngredientDialog
				open={modalOpen}
				isCreatingNew={isCreatingNew}
				newIngredientName={newIngredientName}
				selectedIngredient={selectedIngredient}
				selectedUnit={selectedUnit}
				quantity={quantity}
				onClose={closeModal}
				setSelectedUnit={setSelectedUnit}
				setQuantity={setQuantity}
				onConfirm={handleConfirmAdd}
			/>
			{/* Snackbar para notificaciones */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={(event, reason) => {
					if (reason !== 'clickaway') closeSnackbar();
					console.log(event);
				}}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<Alert
					onClose={closeSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default IngredientsInput;
