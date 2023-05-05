import React, { useState } from 'react';

import { useAppDispatch } from '../../store';
import { Blog } from './Types/types';
import { updateDPost } from './blogSlice';

export default function UpdatedBlogs({
  open,
  blog,
}: {
  blog: Blog;
  open: () => void;
}): JSX.Element {
  const [description, setDescription] = useState(blog.description);
  const dispatch = useAppDispatch();
  const updBlog = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(updateDPost({ id: blog.id, description }));
    open();
  };

  return (
    <div>
      <form onSubmit={updBlog}>
        <div>
          <label htmlFor="desc">Описание</label>
          <input
            type="text"
            id="desc"
            placeholder="Описание"
            name="description"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Изменить</button>
      </form>
    </div>
  );
}
