import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Registration from '../Components/auth/Registration';
import Authorization from '../Components/auth/Authorization';
import { useAppDispatch } from '../store';
import { checkUser } from '../Components/auth/authRegSlice';
import MainPage from '../Components/MainPage/MainPage';
import BlogList from '../Components/blogs/BlogList';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
