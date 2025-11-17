import chefifyAPI from '@/lib/api';

const BASE = '/user';

export const ContactService = {
	async sendContact(payload: {
		name: string;
		replyTo: string;
		message: string;
	}) {
		return chefifyAPI.post<void>(`${BASE}/contact`, payload);
	},
};

export default ContactService;
