import chefifyAPI from '../lib/api';
import type { LoginParams, RegisterParams } from '../types/auth.types';

export const IngredientService = {
  async create({ email, password }: LoginParams) {
    const res = await chefifyAPI.post('/auth/login', {
      email,
      password,
    });
    return res;
  },

  async findByTitle({ name, email, password }: RegisterParams) {
    const res = await chefifyAPI.post('/auth/register', {
      name,
      email,
      password,
    });
    return res;
  },

  async findById() {
    const res = await chefifyAPI.get('/auth/me');
    return res;
  },
};
