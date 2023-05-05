import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { LogoutCheck } from '../auth/authRegSlice';

function Navbar(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.users);
  const dispatch = useAppDispatch();
  const vixod = (): void => {
    dispatch(LogoutCheck());
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">Home</NavLink>
      </div>
      <ul className="navbar__menu">
        {user && 'email' in user ? (
          <>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink onClick={vixod} to="/">
                Выйти
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/authorization">Authorization</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
