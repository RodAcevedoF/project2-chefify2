type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levelPriority: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

const DEFAULT_LEVEL: LogLevel = (
	import.meta.env.DEV ? 'debug' : 'info'
) as LogLevel;
const DEFAULT_SEND = import.meta.env.VITE_CLIENT_LOGS_ENABLED === 'true';
const API_BASE =
	import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/chefify/api/v1';

type Breadcrumb = {
	ts: number;
	category: string;
	message: string;
	data?: Record<string, unknown>;
};

class Logger {
	private level: LogLevel = DEFAULT_LEVEL;
	private sendToServer: boolean = DEFAULT_SEND;
	private breadcrumbs: Breadcrumb[] = [];
	private maxBreadcrumbs = 50;

	configure(
		opts: {
			level?: LogLevel;
			sendToServer?: boolean;
			maxBreadcrumbs?: number;
		} = {},
	) {
		if (opts.level) this.level = opts.level;
		if (typeof opts.sendToServer === 'boolean')
			this.sendToServer = opts.sendToServer;
		if (opts.maxBreadcrumbs) this.maxBreadcrumbs = opts.maxBreadcrumbs;
	}

	addBreadcrumb(
		category: string,
		message: string,
		data?: Record<string, unknown>,
	) {
		const bc: Breadcrumb = { ts: Date.now(), category, message, data };
		this.breadcrumbs.push(bc);
		if (this.breadcrumbs.length > this.maxBreadcrumbs) this.breadcrumbs.shift();
	}

	getBreadcrumbs() {
		return [...this.breadcrumbs];
	}

	private async transport(
		level: LogLevel,
		message: string,
		meta?: Record<string, unknown>,
	) {
		if (!this.sendToServer) return;

		try {
			// send via fetch to avoid depending on chefifyApi and creating import cycles
			await fetch(`${API_BASE}/client-logs`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					level,
					message,
					meta: meta ?? {},
					breadcrumbs: this.getBreadcrumbs(),
					ts: Date.now(),
				}),
			});
		} catch (e) {
			// swallow transport errors to avoid cascading failures
			console.warn('Logger transport failed', e);
		}
	}

	private shouldLog(level: LogLevel) {
		return levelPriority[level] >= levelPriority[this.level];
	}

	debug(message: string, meta?: Record<string, unknown>) {
		this.addBreadcrumb('log', message, { level: 'debug', ...(meta ?? {}) });
		if (this.shouldLog('debug')) console.debug(message, meta ?? {});
		void this.transport('debug', message, meta);
	}

	info(message: string, meta?: Record<string, unknown>) {
		this.addBreadcrumb('log', message, { level: 'info', ...(meta ?? {}) });
		if (this.shouldLog('info')) console.info(message, meta ?? {});
		void this.transport('info', message, meta);
	}

	warn(message: string, meta?: Record<string, unknown>) {
		this.addBreadcrumb('log', message, { level: 'warn', ...(meta ?? {}) });
		if (this.shouldLog('warn')) console.warn(message, meta ?? {});
		void this.transport('warn', message, meta);
	}

	error(message: string | Error, meta?: Record<string, unknown>) {
		const msg = typeof message === 'string' ? message : message.message;
		this.addBreadcrumb('error', msg, { ...(meta ?? {}) });
		if (this.shouldLog('error')) console.error(message, meta ?? {});
		void this.transport('error', msg, {
			...(meta ?? {}),
			stack:
				typeof message === 'object' && 'stack' in message
					? (message as Error).stack
					: undefined,
		});
	}
}

const logger = new Logger();
export default logger;
