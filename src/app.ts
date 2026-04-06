import React from 'react';
import { App as AntdApp } from 'antd';
import { getInitialUser } from './services/auth';

export async function getInitialState() {
  const token = localStorage.getItem('token');
  if (!token) return { user: null };
  try {
    const user = await getInitialUser();
    return { user };
  } catch {
    localStorage.removeItem('token');
    return { user: null };
  }
}

export const layout = ({ initialState }: any) => {
  const { user } = initialState || {};
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: { locale: false },
    rightRender: () => {
      if (!user) return null;
      return React.createElement(
        'div',
        null,
        React.createElement('span', { style: { marginRight: 16 } }, `Привет, ${user.name}!`),
        React.createElement(
          'a',
          {
            onClick: () => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            },
          },
          'Выйти'
        )
      );
    },
  };
};

export const rootContainer = (container: React.ReactNode) => {
  return React.createElement(AntdApp, null, container);
};

export const request = {
  requestInterceptors: [
    (url: string, options: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return { url, options };
    },
  ],
  errorConfig: {
    errorHandler(error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    },
  },
};