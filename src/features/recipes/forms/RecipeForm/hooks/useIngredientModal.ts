import { useState, useRef } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import type { Ingredient } from '@/types/ingredient.type';

export const useIngredientModal = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null);
	const [isCreatingNew, setIsCreatingNew] = useState(false);
	const [newIngredientName, setNewIngredientName] = useState('');
	const [selectedUnit, setSelectedUnit] = useState<string>('');
	const [quantity, setQuantity] = useState<string>('1');
	const fieldRef = useRef<ControllerRenderProps | null>(null);

	const openForExisting = (
		ingredient: Ingredient,
		field: ControllerRenderProps,
	) => {
		setSelectedIngredient(ingredient);
		setIsCreatingNew(false);
		setQuantity('1');
		fieldRef.current = field;
		setModalOpen(true);
	};

	const openForNew = (
		name: string,
		defaultUnit: string,
		field: ControllerRenderProps,
	) => {
		setNewIngredientName(name);
		setIsCreatingNew(true);
		setSelectedUnit(defaultUnit);
		setQuantity('1');
		fieldRef.current = field;
		setModalOpen(true);
	};

	const close = () => {
		setModalOpen(false);
		setSelectedIngredient(null);
		setIsCreatingNew(false);
		setNewIngredientName('');
		setQuantity('1');
		fieldRef.current = null;
	};

	return {
		modalOpen,
		selectedIngredient,
		isCreatingNew,
		newIngredientName,
		selectedUnit,
		quantity,
		fieldRef,
		setSelectedUnit,
		setQuantity,
		openForExisting,
		openForNew,
		close,
	};
};
