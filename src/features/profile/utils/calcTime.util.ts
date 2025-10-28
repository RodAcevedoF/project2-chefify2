export function timeAgo(input?: string | Date): string {
	if (!input) return '';
	const then = typeof input === 'string' ? new Date(input) : input;
	const diff = Date.now() - then.getTime();
	const sec = Math.floor(diff / 1000);
	if (sec < 60) return `${sec}s ago`;
	const min = Math.floor(sec / 60);
	if (min < 60) return `${min}m ago`;
	const hr = Math.floor(min / 60);
	if (hr < 24) return `${hr}h ago`;
	const days = Math.floor(hr / 24);
	return `${days}d ago`;
}
