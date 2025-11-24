import { Paper, Snackbar, Alert } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
	useGetIngredients,
	useCreateIngredient,
} from '@/features/ingredients/hooks';
import { Units, type Ingredient } from '@/types/ingredient.type';
import IngredientAutocomplete from './IngredientInput/IngredientAutocomplete';
import IngredientsChips from './IngredientInput/IngredientChip';
import AddIngredientDialog from './IngredientInput/IngredientDialog';
import { useIngredientModal } from '../hooks/useIngredientModal';
import { useSnackbar } from '../hooks/useSnackbar';
import { useIngredientOperations } from '../hooks/useIngredientOperations';

export interface IngredientsInputProps {
	control: Control;
	color: string;
	inputValue: string;
	setInputValue: (value: string) => void;
	name: string;
}

const IngredientsInput = (props: IngredientsInputProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const modal = useIngredientModal();
	const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
	const { checkIfExists, addIngredient, removeIngredient } =
		useIngredientOperations();

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

	const handleOpenExisting = (
		ingredient: Ingredient,
		field: typeof modal.fieldRef.current,
	) => {
		if (!field) return;

		if (checkIfExists(field, ingredient._id ?? '')) {
			showSnackbar('Ingredient already add', 'info');
			return;
		}

		modal.openForExisting(ingredient, field);
	};

	const handleOpenNew = (
		name: string,
		field: typeof modal.fieldRef.current,
	) => {
		if (!field) return;
		modal.openForNew(name, Units.options[0], field);
	};

	const handleAdd = async (
		value: string,
		field: typeof modal.fieldRef.current,
	) => {
		if (!value.trim() || !field) return;

		const ingredient = options.find(
			(opt) => opt.name.toLowerCase() === value.toLowerCase(),
		);

		if (!ingredient) {
			handleOpenNew(value.trim(), field);
		} else {
			handleOpenExisting(ingredient, field);
		}
	};

	const addIngredientWithQuantity = (
		ingredient: Ingredient,
		field: typeof modal.fieldRef.current,
	) => {
		if (!field) return;

		const quantityNum = parseFloat(modal.quantity);

		addIngredient(
			field,
			ingredient,
			quantityNum,
			() => {
				props.setInputValue('');
				modal.close();
			},
			(message) => {
				showSnackbar(message, message.includes('valid') ? 'warning' : 'info');
				modal.close();
			},
		);
	};
	const handleConfirmAdd = async () => {
		if (!modal.fieldRef.current) return;

		if (modal.isCreatingNew) {
			try {
				const payload = {
					name: modal.newIngredientName.trim(),
					unit: modal.selectedUnit as (typeof Units.options)[number],
				};

				await createIngredientMutation.mutateAsync(payload);

				const refetchResult = await refetch();
				const updatedOptions: Ingredient[] = refetchResult?.data ?? [];

				const ingredient = updatedOptions.find(
					(opt) =>
						opt.name.toLowerCase() ===
						modal.newIngredientName.trim().toLowerCase(),
				);

				if (ingredient) {
					addIngredientWithQuantity(ingredient, modal.fieldRef.current);
					showSnackbar('Ingredient created and added', 'success');
				} else {
					showSnackbar(
						'Ingredient created, but not found to add. Please add it manually.',
						'info',
					);
					modal.close();
				}
			} catch (error) {
				console.error('Error creating ingredient:', error);
				showSnackbar('Error creating ingredient. Please try again.', 'error');
			}
		} else if (modal.selectedIngredient) {
			addIngredientWithQuantity(
				modal.selectedIngredient,
				modal.fieldRef.current,
			);
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
							background: 'transparent',
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
							onDelete={(idx) => removeIngredient(field, idx)}
						/>
					</Paper>
				)}
			/>
			<AddIngredientDialog
				open={modal.modalOpen}
				isCreatingNew={modal.isCreatingNew}
				newIngredientName={modal.newIngredientName}
				selectedIngredient={modal.selectedIngredient}
				selectedUnit={modal.selectedUnit}
				quantity={modal.quantity}
				onClose={modal.close}
				setSelectedUnit={modal.setSelectedUnit}
				setQuantity={modal.setQuantity}
				onConfirm={handleConfirmAdd}
			/>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={(_, reason) => {
					if (reason !== 'clickaway') closeSnackbar();
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
