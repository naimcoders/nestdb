import { z } from 'zod';

export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  password: string;
}

export const UserCreateSchema = z
  .object({
    email: z.string().max(40).email({ message: 'Masukkan email dengan benar' }),
    password: z.string().min(8).max(12),
  })
  .required();
