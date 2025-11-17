import { alpha } from '@mui/material';
import type { Theme } from '@mui/material';
import type { Operation } from '@/features/admin/services/admin.service';

export const DAYS = 14;

export const RESOURCE_TYPES = ['recipe', 'like', 'follow'] as const;
export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const formatDay = (date: Date) => date.toISOString().slice(0, 10);

export const buildLastNDays = (n: number): string[] =>
	Array.from({ length: n }).map((_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - (n - 1 - i));
		return formatDay(d);
	});

export const buildColorMap = (theme: Theme) => ({
	recipe: {
		border: theme.palette.success.light,
		bg: alpha(theme.palette.success.light, 0.2),
	},
	like: {
		border: theme.palette.background?.chartLikes ?? '#dc5786ff',
		bg: alpha(theme.palette.background?.chartLikes ?? '#ea6895ff', 0.2),
	},
	follow: {
		border: theme.palette.success?.main ?? '#4caf50',
		bg: alpha(theme.palette.success?.main ?? '#4caf50', 0.2),
	},
});

export const aggregateOps = (
	items: Operation[],
	labels: string[],
): Record<ResourceType, number[]> => {
	const maps = Object.fromEntries(
		RESOURCE_TYPES.map((t) => [
			t,
			Object.fromEntries(labels.map((l) => [l, 0])),
		]),
	) as Record<ResourceType, Record<string, number>>;

	for (const op of items) {
		const created = op.createdAt ? new Date(op.createdAt) : null;
		const day = created ? formatDay(created) : null;
		if (!day) continue;

		const res = (op.resource ?? '').toLowerCase();
		const t = (op.type ?? '').toLowerCase();

		for (const r of RESOURCE_TYPES) {
			if (res === r || t.includes(r)) {
				if (maps[r][day] !== undefined) {
					maps[r][day] += 1;
				}
			}
		}
	}

	return Object.fromEntries(
		RESOURCE_TYPES.map((r) => [r, labels.map((l) => maps[r][l] ?? 0)]),
	) as Record<ResourceType, number[]>;
};
