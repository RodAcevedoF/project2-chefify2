import { useEffect, useMemo, useRef, useReducer } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHandleNavigate } from '@/utils/useHandleNavigate';
import type { SelectChangeEvent } from '@mui/material';
import { useGetRecipes } from '@/features/recipes/hooks';
import type { Recipe } from '@/types/recipe.types';

const DEBOUNCE_MS = 350;
const SUGGEST_DEBOUNCE_MS = 250;

export function useSearchAutocomplete() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useHandleNavigate((id?: string) => `/recipes/${id}`);

	const initial = searchParams.get('title') ?? '';
	const initialCategory = searchParams.get('category') ?? '';
	const initialMode = searchParams.get('mode') ?? 'latest';

	const inputRef = useRef<HTMLInputElement | null>(null);

	type State = {
		value: string;
		debouncedTitle: string;
		category: string;
		mode: string;
		openSuggestions: boolean;
		highlightIndex: number | null;
	};

	type Action =
		| { type: 'SET_VALUE'; payload: string }
		| { type: 'SET_DEBOUNCED_TITLE'; payload: string }
		| { type: 'SET_CATEGORY'; payload: string }
		| { type: 'SET_MODE'; payload: string }
		| { type: 'OPEN' }
		| { type: 'CLOSE' }
		| { type: 'SET_HIGHLIGHT'; payload: number | null };

	const initialState: State = {
		value: initial,
		debouncedTitle: '',
		category: initialCategory,
		mode: initialMode,
		openSuggestions: false,
		highlightIndex: null,
	};

	function reducer(state: State, action: Action): State {
		switch (action.type) {
			case 'SET_VALUE':
				return { ...state, value: action.payload };
			case 'SET_DEBOUNCED_TITLE':
				return { ...state, debouncedTitle: action.payload };
			case 'SET_CATEGORY':
				return { ...state, category: action.payload };
			case 'SET_MODE':
				return { ...state, mode: action.payload };
			case 'OPEN':
				return { ...state, openSuggestions: true };
			case 'CLOSE':
				return { ...state, openSuggestions: false };
			case 'SET_HIGHLIGHT':
				return { ...state, highlightIndex: action.payload };
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);
	const valueRef = useRef(state.value);
	const categoryRef = useRef(state.category);

	const suppressOpenRef = useRef(false);

	useEffect(() => {
		valueRef.current = state.value;
	}, [state.value]);

	useEffect(() => {
		categoryRef.current = state.category;
	}, [state.category]);

	useEffect(() => {
		const q = searchParams.get('title') ?? '';
		if (q !== valueRef.current) dispatch({ type: 'SET_VALUE', payload: q });
		const c = searchParams.get('category') ?? '';
		if (c !== categoryRef.current)
			dispatch({ type: 'SET_CATEGORY', payload: c });
	}, [searchParams]);

	useEffect(() => {
		const t = setTimeout(() => {
			if (!state.value) {
				const next = Object.fromEntries(searchParams.entries()) as Record<
					string,
					string
				>;
				delete next.title;
				setSearchParams(next);
				return;
			}
			setSearchParams({
				...Object.fromEntries(searchParams.entries()),
				title: state.value,
			});
		}, DEBOUNCE_MS);
		return () => clearTimeout(t);
	}, [state.value, searchParams, setSearchParams]);

	useEffect(() => {
		const t = setTimeout(
			() =>
				dispatch({ type: 'SET_DEBOUNCED_TITLE', payload: state.value.trim() }),
			SUGGEST_DEBOUNCE_MS,
		);
		return () => clearTimeout(t);
	}, [state.value]);

	useEffect(() => {
		if (!state.category) {
			const next = Object.fromEntries(searchParams.entries()) as Record<
				string,
				string
			>;
			delete next.category;
			setSearchParams(next);
			return;
		}
		setSearchParams({
			...Object.fromEntries(searchParams.entries()),
			category: state.category,
		});
	}, [state.category, searchParams, setSearchParams]);

	useEffect(() => {
		if (!state.mode || state.mode === 'latest') {
			const next = Object.fromEntries(searchParams.entries()) as Record<
				string,
				string
			>;
			delete next.mode;
			setSearchParams(next);
			return;
		}
		setSearchParams({
			...Object.fromEntries(searchParams.entries()),
			mode: state.mode,
		});
	}, [state.mode, searchParams, setSearchParams]);

	const { data: suggestions = [], isFetching: suggestionsLoading } =
		useGetRecipes({
			title: state.debouncedTitle,
			category: state.category,
			limit: 6,
		});

	const sortedSuggestions = useMemo(() => {
		if (state.mode === 'top') {
			return [...suggestions].sort(
				(a, b) => (b.likesCount ?? 0) - (a.likesCount ?? 0),
			);
		}
		return suggestions;
	}, [suggestions, state.mode]);

	useEffect(() => {
		if (suppressOpenRef.current) return;
		if (!state.debouncedTitle && !state.category) {
			if (state.openSuggestions) dispatch({ type: 'CLOSE' });
			return;
		}

		if (sortedSuggestions?.length) {
			if (!state.openSuggestions) dispatch({ type: 'OPEN' });
		} else {
			if (state.openSuggestions) dispatch({ type: 'CLOSE' });
		}

		if (state.highlightIndex !== null)
			dispatch({ type: 'SET_HIGHLIGHT', payload: null });
	}, [
		state.debouncedTitle,
		sortedSuggestions,
		state.category,
		state.openSuggestions,
		state.highlightIndex,
	]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		suppressOpenRef.current = false;
		dispatch({ type: 'SET_VALUE', payload: e.target.value });
	};

	const onCategoryChange = (e: SelectChangeEvent<string>) => {
		const next = e.target.value === 'all' ? '' : (e.target.value as string);
		suppressOpenRef.current = false;
		dispatch({ type: 'SET_CATEGORY', payload: next });

		dispatch({ type: 'SET_DEBOUNCED_TITLE', payload: state.value.trim() });
		dispatch({ type: 'OPEN' });
	};

	const onModeChange = (e: SelectChangeEvent<string>) => {
		suppressOpenRef.current = false;
		dispatch({ type: 'SET_MODE', payload: e.target.value as string });
	};

	const open = () => dispatch({ type: 'OPEN' });
	const close = () => dispatch({ type: 'CLOSE' });

	const closeTemporary = () => {
		suppressOpenRef.current = true;
		dispatch({ type: 'CLOSE' });
	};
	const clear = () => {
		suppressOpenRef.current = true;
		dispatch({ type: 'SET_VALUE', payload: '' });
		dispatch({ type: 'SET_DEBOUNCED_TITLE', payload: '' });
		dispatch({ type: 'SET_HIGHLIGHT', payload: null });
		dispatch({ type: 'CLOSE' });
	};

	const selectById = (id?: string) => {
		if (!id) return;
		close();
		navigate(id);
	};

	const moveHighlight = (delta: number) => {
		if (!sortedSuggestions || !sortedSuggestions.length)
			return dispatch({ type: 'SET_HIGHLIGHT', payload: null });
		const len = sortedSuggestions.length;
		const prev = state.highlightIndex;
		const next =
			prev === null ? (delta > 0 ? 0 : len - 1) : (prev + delta + len) % len;
		dispatch({ type: 'SET_HIGHLIGHT', payload: next });
	};

	const selectHighlighted = () => {
		const hi = state.highlightIndex;
		if (hi !== null && sortedSuggestions?.[hi])
			selectById(sortedSuggestions[hi]._id);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!state.openSuggestions) return;
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				moveHighlight(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				moveHighlight(-1);
				break;
			case 'Enter':
				e.preventDefault();
				selectHighlighted();
				break;
			case 'Escape':
				close();
				break;
		}
	};

	const placeholder = useMemo(() => 'Search…', []);

	const inputProps = {
		value: state.value,
		onChange,
		onKeyDown: handleKeyDown,
		ref: inputRef,
		placeholder,
	} as const;

	return {
		inputProps,
		category: state.category,
		onCategoryChange,
		mode: state.mode,
		onModeChange,
		suggestions: sortedSuggestions as Recipe[],
		suggestionsLoading,
		openSuggestions: state.openSuggestions,
		open,
		close,
		closeTemporary,
		clear,
		selectById,
		selectHighlighted,
		moveHighlight,
		highlightIndex: state.highlightIndex,
	};
}

export default useSearchAutocomplete;
