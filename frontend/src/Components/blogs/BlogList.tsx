import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import LoadingBlogs from './LoadingBlogs';
import { initBlogs } from './blogSlice';

function BlogList(): JSX.Element {
  const { blogs } = useSelector((store: RootState) => store.blog);
  const dispatch = useAppDispatch();
  useEffect((): void => {
    dispatch(initBlogs());
  }, [dispatch]);

  const { user } = useSelector((store: RootState) => store.users);
  return <div>{'email' in user && <LoadingBlogs blogs={blogs} />}</div>;
}

export default BlogList;
