import React, { useState } from 'react';
import { Blog } from './Types/types';
import { useAppDispatch } from '../../store';
import { deletePosts } from './blogSlice';
import UpdatedBlogs from './UpdatedBlog';
import './OneBlog.css';

function OneBlog({ blog }: { blog: Blog }): JSX.Element {
  const [modal, setModal] = useState(false);
  const open = (): void => {
    setModal((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  const del = (): void => {
    dispatch(deletePosts(blog.id));
  };
  return (
    <>
      {modal && <UpdatedBlogs open={open} blog={blog} />}
      <div className="one-blog">
        <h1>{blog.description}</h1>
        <div className="date">
          {new Date(blog.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>

        <div className="author">{blog['User.login']}</div>
        <div className="buttons">
          <button className="delete" onClick={del} type="button">
            Delete
          </button>
          <button onClick={open} type="button">
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default OneBlog;
