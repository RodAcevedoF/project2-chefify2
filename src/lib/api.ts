import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { LoggedManager } from '@/contexts/loggedContext/LoggedManager';
import logger from '@/lib/logger';

const chefifyApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

chefifyApi.interceptors.response.use(
	(res) => {
		try {
			const payload = res?.data;
			if (
				payload &&
				typeof payload === 'object' &&
				'success' in payload &&
				'data' in payload
			) {
				return (payload as { success: boolean; data: unknown }).data;
			}
			return res.data ?? res;
		} catch {
			return res;
		}
	},
	async (
		error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } },
	) => {
		const originalRequest = error.config;

		logger.addBreadcrumb(
			'http',
			`request failed: ${originalRequest?.method} ${originalRequest?.url}`,
			{
				status: error.response?.status,
				url: originalRequest?.url,
			},
		);

		if (
			(error.response?.status === 401 || error.response?.status === 403) &&
			originalRequest
		) {
			LoggedManager.getInstance().getLoggedManager()?.(false);
		}

		const serverData = error.response?.data;
		if (serverData && typeof serverData === 'object') {
			return Promise.reject(serverData);
		}

		return Promise.reject(error);
	},
);

type ApiClient = {
	get: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>;
	post: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => Promise<T>;
	patch: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => Promise<T>;
	put: <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => Promise<T>;
	delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>;
};

const api: ApiClient = {
	get: async <T = unknown>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<T> => {
		const resp = await chefifyApi.get<T>(url, config);
		return resp as unknown as T;
	},
	post: async <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> => {
		const resp = await chefifyApi.post<T>(url, data, config);
		return resp as unknown as T;
	},
	patch: async <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> => {
		const resp = await chefifyApi.patch<T>(url, data, config);
		return resp as unknown as T;
	},
	put: async <T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> => {
		const resp = await chefifyApi.put<T>(url, data, config);
		return resp as unknown as T;
	},
	delete: async <T = unknown>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<T> => {
		const resp = await chefifyApi.delete<T>(url, config);
		return resp as unknown as T;
	},
};

export default api;
