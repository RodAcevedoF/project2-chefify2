import axios from 'axios';

const noAuthApi = axios.create({
	baseURL: 'http://localhost:3000/chefify/api/v1',
	withCredentials: true,
});

export default noAuthApi;
