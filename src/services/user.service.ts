import chefifyAPI from '../lib/api';

export const UserService = {
  async getUsers() {
    const res = await chefifyAPI.get('/users');
    console.log(res);
  },
};
