export type AuthorLike = string | AuthorObject | null | undefined;

export interface AuthorObject {
	_id?: string;
	id?: string;
	userId?: string;
	name?: string;
	userName?: string;
	username?: string;
}

function isAuthorObject(v: unknown): v is AuthorObject {
	return typeof v === 'object' && v !== null;
}

export function getAuthorId(rawAuthor: AuthorLike): string | undefined {
	if (!rawAuthor) return undefined;
	if (typeof rawAuthor === 'string') return rawAuthor;
	if (isAuthorObject(rawAuthor)) {
		return rawAuthor._id ?? rawAuthor.id ?? rawAuthor.userId ?? undefined;
	}
	return undefined;
}

export function getAuthorName(rawAuthor: AuthorLike): string {
	if (!rawAuthor) return 'Unknown';
	if (typeof rawAuthor === 'string') return rawAuthor;
	if (isAuthorObject(rawAuthor)) {
		return (
			rawAuthor.name ?? rawAuthor.userName ?? rawAuthor.username ?? 'Unknown'
		);
	}
	return 'Unknown';
}

export default { getAuthorId, getAuthorName };
