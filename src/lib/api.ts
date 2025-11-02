import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
// AuthService refresh endpoint removed in session-based auth migration
import { LoggedManager } from '@/contexts/loggedContext/LoggedManager';
import logger from '@/lib/logger';

const chefifyApi = axios.create({
	baseURL: 'http://localhost:3000/chefify/api/v1',
	withCredentials: true,
});

export const clearRefreshQueue = () => {};

chefifyApi.interceptors.response.use(
	(res) => res,
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

		if (error.response?.status === 401 && originalRequest) {
			LoggedManager.getInstance().getLoggedManager()?.(false);
		}

		return Promise.reject(error);
	},
);

export default chefifyApi;
