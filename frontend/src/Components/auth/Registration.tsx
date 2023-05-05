import React, { useEffect, useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { registrUser } from './authRegSlice';

function Registration(): JSX.Element {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { user, message } = useSelector((store: RootState) => store.users);

  useEffect(() => {
    if (user && 'email' in user) {
      nav('/');
    }
  }, [nav, user]);

  const registr = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registrUser({ login, password, email }));
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={registr}>
        <div className="form-group">
          <label htmlFor="login">Login:</label>
          <input
            name="login"
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
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

export default Registration;
