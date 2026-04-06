import { request } from '@umijs/max';

export interface User {
  id: number;
  login: string;
  name: string;
}

// Логин
export async function login(login: string, password: string) {
  return request<{ token: string }>('/api/auth/login', {
    method: 'POST',
    data: { login, password },
  });
}

// Получение текущего пользователя по токену (используется в initialState)
export async function getInitialUser() {
  return request<User>('/api/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}