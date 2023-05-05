/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './MainPage.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function MainPage(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.users);
  return (
    <div className="main-page">
      <h1>Welcome to my Blog</h1>
      <p>My Blog</p>
      <ul>
        <li>Interesting fact #1</li>
        <li>Interesting fact #2</li>
        <li>Interesting fact #3</li>
      </ul>
      {user && 'email' in user ? (
        <NavLink to="/blog">
          <button type="button" className="cta-button">
            Blog
          </button>
        </NavLink>
      ) : (
        <NavLink to="/register">
          <button type="button" className="cta-button">
            Learn More
          </button>
        </NavLink>
      )}
    </div>
  );
}

export default MainPage;
