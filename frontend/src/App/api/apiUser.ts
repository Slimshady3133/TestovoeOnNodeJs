import { State, User } from '../../Components/auth/Types/types';

export const regUser = async (newUser: User): Promise<State> => {
  const res = await fetch('http://localhost:4000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      login: newUser.login,
      email: newUser.email,
      password: newUser.password,
    }),
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  return data;
};

export const loginUser = async (users: User): Promise<State> => {
  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: users.email,
      password: users.password,
    }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  return data;
};

export const getCheckUser = async (): Promise<State> => {
  const res = await fetch('http://localhost:4000/api/auth/check', {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};

export const Logout = async (): Promise<State> => {
  const res = await fetch('http://localhost:4000/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  localStorage.removeItem('authToken');
  const data = await res.json();
  return data;
};
