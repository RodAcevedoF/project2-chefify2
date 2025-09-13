import axios from 'axios';
import { AuthService } from '@/features/auth/services/auth.service';
import { LoggedManager } from '@/contexts/loggedContext/LoggedManager';

const chefifyApi = axios.create({
	baseURL: 'http://localhost:3000/chefify/api/v1',
	withCredentials: true,
});

chefifyApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await AuthService.refresh();
				const setLogged = LoggedManager.getInstance().getLoggedManager();
				if (setLogged) setLogged(true);
				return chefifyApi(originalRequest);
			} catch (error) {
				const setLogged = LoggedManager.getInstance().getLoggedManager();
				if (setLogged) setLogged(false);
				window.location.href = '/';
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	},
);

export default chefifyApi;
