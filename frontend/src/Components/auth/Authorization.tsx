import React, { useEffect, useState } from 'react';
import './Authorization.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { loginUser } from './authRegSlice';

function Authorization(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { user, message } = useSelector((store: RootState) => store.users);
  useEffect(() => {
    if (user && 'email' in user) {
      nav('/');
    }
  }, [user, nav]);

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="authorization-container">
      <h2>Authorization</h2>
      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <h2>{message}</h2>
      </form>
    </div>
  );
}

export default Authorization;
