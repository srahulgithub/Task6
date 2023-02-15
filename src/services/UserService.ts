import axios from 'axios';
import { User } from '../models/User';

const API_URL = 'http://localhost:5000/api/users';

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getUserById: async (id: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  createUser: async (user: User): Promise<User> => {
    const response = await axios.post(API_URL, user);
    return response.data;
  },
  updateUser: async (id: string, user: User): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, user);
  },
  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
