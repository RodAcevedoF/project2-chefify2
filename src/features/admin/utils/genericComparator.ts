type GenericPropsLocal = {
	rows?: unknown[];
	page?: number;
	rowsPerPage?: number;
	isLoading?: boolean;
	isError?: boolean;
	data?: { meta?: { total?: number } } | undefined;
	cellSx?: unknown;
	headerCellSx?: unknown;
	watchKeys?: string[];
};

function getIdFromRow(r: unknown) {
	if (!r || typeof r !== 'object') return String(r ?? '');
	const obj = r as Record<string, unknown>;
	if (obj._id) return String(obj._id);
	if (obj.id) return String(obj.id);
	return JSON.stringify(obj);
}

function getPath(obj: unknown, path: string) {
	if (!obj || typeof obj !== 'object') return undefined;
	const parts = path.split('.');
	let curObj = obj as Record<string, unknown> | undefined;
	for (let i = 0; i < parts.length; i++) {
		if (curObj == null) return undefined;
		const val = curObj[parts[i]];
		if (val === undefined) return undefined;
		if (i === parts.length - 1) return val;
		if (typeof val !== 'object' || val === null) return undefined;
		curObj = val as Record<string, unknown>;
	}
	return undefined;
}

export const genericComparator = (
	prev: GenericPropsLocal,
	next: GenericPropsLocal,
) => {
	if (prev.page !== next.page) return false;
	if (prev.rowsPerPage !== next.rowsPerPage) return false;
	if (prev.isLoading !== next.isLoading) return false;
	if (prev.isError !== next.isError) return false;
	const pRows = prev.rows ?? [];
	const nRows = next.rows ?? [];

	if (pRows === nRows) return true;

	if (pRows.length !== nRows.length) return false;
	if (prev.cellSx !== next.cellSx) return false;
	if (prev.headerCellSx !== next.headerCellSx) return false;

	const watch = prev.watchKeys ?? next.watchKeys ?? [];
	for (let i = 0; i < pRows.length; i++) {
		const a = getIdFromRow(pRows[i]);
		const b = getIdFromRow(nRows[i]);
		if (a !== b) return false;
		if (watch.length > 0) {
			for (let k = 0; k < watch.length; k++) {
				const key = watch[k];
				const pv = getPath(pRows[i], key);
				const nv = getPath(nRows[i], key);
				if (pv !== nv) return false;
			}
		}
	}

	const prevTotal = prev.data?.meta?.total ?? 0;
	const nextTotal = next.data?.meta?.total ?? 0;
	if (prev.cellSx !== next.cellSx) return false;
	if (prev.headerCellSx !== next.headerCellSx) return false;
	if (prevTotal !== nextTotal) {
		return true;
	}

	return true;
};

export default genericComparator;
