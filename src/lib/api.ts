import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthService } from '@/features/auth/services/auth.service';
import { LoggedManager } from '@/contexts/loggedContext/LoggedManager';
import logger from '@/lib/logger';

const chefifyApi = axios.create({
	baseURL: 'http://localhost:3000/chefify/api/v1',
	withCredentials: true,
});

let isRefreshing = false;
type QueueItem = {
	originalRequest: AxiosRequestConfig;
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
};

let queue: QueueItem[] = [];

const processQueue = (err: unknown | null) => {
	queue.forEach(({ originalRequest, resolve, reject }) => {
		if (err) {
			reject(err);
			return;
		}

		// Retry the original request and resolve/reject accordingly
		chefifyApi(originalRequest)
			.then((res) => resolve(res))
			.catch((e) => reject(e));
	});

	queue = [];
};

export const clearRefreshQueue = (reason?: unknown) => {
	queue.forEach(({ reject }) => reject(reason ?? new Error('Queue cleared')));
	queue = [];
	isRefreshing = false;
};

const isRefreshEndpoint = (config?: AxiosRequestConfig) => {
	return config?.url?.endsWith('/auth/refresh');
};

chefifyApi.interceptors.response.use(
	(res) => res,
	async (
		error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } },
	) => {
		const originalRequest = error.config;

		// Breadcrumb for the failing request
		logger.addBreadcrumb(
			'http',
			`request failed: ${originalRequest?.method} ${originalRequest?.url}`,
			{
				status: error.response?.status,
				url: originalRequest?.url,
			},
		);

		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry &&
			!isRefreshEndpoint(originalRequest)
		) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise((resolve, reject) =>
					queue.push({
						originalRequest,
						resolve,
						reject,
					}),
				);
			}

			isRefreshing = true;
			try {
				await AuthService.refresh();
				isRefreshing = false;
				processQueue(null);
				LoggedManager.getInstance().getLoggedManager()?.(true);
				return chefifyApi(originalRequest);
			} catch (err) {
				isRefreshing = false;
				processQueue(err);
				LoggedManager.getInstance().getLoggedManager()?.(false);
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	},
);

export default chefifyApi;
