import { RECIPE_CATEGORY_OPTIONS } from '@/types/recipe.types';
import { Units } from '@/types/ingredient.type';

export function normalizeSuggestedRecipeResponse(res: unknown): unknown {
	const isRecord = (v: unknown): v is Record<string, unknown> =>
		typeof v === 'object' && v !== null;

	let candidate: unknown = res;
	if (isRecord(res)) {
		const dataField = (res as Record<string, unknown>)['data'];
		if (isRecord(dataField)) {
			const topData = dataField as Record<string, unknown>;
			const nested = topData['data'];
			if (isRecord(nested) && 'recipe' in nested)
				candidate = (nested as Record<string, unknown>)['recipe'];
			else if ('recipe' in topData) candidate = topData['recipe'];
			else candidate = topData;
		} else {
			candidate = dataField ?? res;
		}
	}

	if (!isRecord(candidate)) return candidate;

	const out: Record<string, unknown> = {
		...(candidate as Record<string, unknown>),
	};

	try {
		const allowed = RECIPE_CATEGORY_OPTIONS.map((c) => String(c).toLowerCase());
		const rawCats = (candidate as Record<string, unknown>)['categories'];
		let cats: string[] = [];
		if (Array.isArray(rawCats)) {
			cats = rawCats
				.map((c) => String(c).toLowerCase().trim())
				.filter((c) => allowed.includes(c));
		}
		if (cats.length === 0) cats = ['dinner'];
		out['categories'] = cats;
	} catch {
		out['categories'] = ['dinner'];
	}

	const rawInstructions = (candidate as Record<string, unknown>)[
		'instructions'
	];
	if (Array.isArray(rawInstructions)) {
		out['instructions'] = rawInstructions
			.map((i) => String(i).trim())
			.filter(Boolean);
	} else if (typeof rawInstructions === 'string') {
		out['instructions'] = rawInstructions
			.split(/\n+/)
			.map((s) => s.trim())
			.filter(Boolean);
	} else {
		out['instructions'] = [];
	}

	const serv = (candidate as Record<string, unknown>)['servings'];
	if (serv !== undefined) out['servings'] = Number(serv) || 1;
	const prep =
		(candidate as Record<string, unknown>)['prepTime'] ??
		(candidate as Record<string, unknown>)['prep_minutes'];
	if (prep !== undefined) out['prepTime'] = Number(prep) || 0;

	const utensils = (candidate as Record<string, unknown>)['utensils'];
	if (Array.isArray(utensils))
		out['utensils'] = utensils.map((u) => String(u).trim()).filter(Boolean);

	const rawIngredients = (candidate as Record<string, unknown>)['ingredients'];
	const makeLocalId = (name: string) =>
		`local-${String(name)
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
	const defaultUnit = Units.options?.[0] ?? 'unit';

	const normalizedIngredients = Array.isArray(rawIngredients)
		? rawIngredients.map((ing) => {
				if (typeof ing === 'string') {
					const s = ing.trim();
					const isId = s.length === 24 && /^[a-f0-9]+$/i.test(s);
					if (isId) return { ingredient: s, quantity: 1 };
					return {
						ingredient: { _id: makeLocalId(s), name: s, unit: defaultUnit },
						quantity: 1,
					};
				}

				if (isRecord(ing)) {
					const qty =
						Number(
							(ing as Record<string, unknown>)['quantity'] ??
								(ing as Record<string, unknown>)['qty'] ??
								1,
						) || 1;

					const candidateIng =
						(ing as Record<string, unknown>)['ingredient'] ??
						(ing as Record<string, unknown>)['id'] ??
						(ing as Record<string, unknown>)['name'];
					if (typeof candidateIng === 'string') {
						const s = candidateIng.trim();
						const isId = s.length === 24 && /^[a-f0-9]+$/i.test(s);
						if (isId) return { ingredient: s, quantity: qty };
						return {
							ingredient: { _id: makeLocalId(s), name: s, unit: defaultUnit },
							quantity: qty,
						};
					}

					if (isRecord(candidateIng)) {
						const _id = String(
							(candidateIng as Record<string, unknown>)['_id'] ??
								makeLocalId(JSON.stringify(candidateIng)),
						);
						const name = String(
							(candidateIng as Record<string, unknown>)['name'] ?? _id,
						);
						const unit = String(
							(candidateIng as Record<string, unknown>)['unit'] ?? defaultUnit,
						);
						return { ingredient: { _id, name, unit }, quantity: qty };
					}

					const name = String(
						(ing as Record<string, unknown>)['name'] ?? JSON.stringify(ing),
					);
					return {
						ingredient: { _id: makeLocalId(name), name, unit: defaultUnit },
						quantity: qty,
					};
				}
				const name = String(ing ?? 'ingredient');
				return {
					ingredient: { _id: makeLocalId(name), name, unit: defaultUnit },
					quantity: 1,
				};
		  })
		: [];

	out['ingredients'] = normalizedIngredients;

	return out;
}

export default normalizeSuggestedRecipeResponse;
