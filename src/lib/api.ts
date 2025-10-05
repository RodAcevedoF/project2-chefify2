import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthService } from '@/features/auth/services/auth.service';
import { LoggedManager } from '@/contexts/loggedContext/LoggedManager';

const chefifyApi = axios.create({
	baseURL: 'http://localhost:3000/chefify/api/v1',
	withCredentials: true,
});

let isRefreshing = false;
type QueueItem = {
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
};

let queue: QueueItem[] = [];

const processQueue = (err: unknown | null) => {
	queue.forEach(({ resolve, reject }) =>
		err ? reject(err) : resolve(undefined),
	);
	queue = [];
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
						resolve: () => resolve(chefifyApi(originalRequest)),
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
