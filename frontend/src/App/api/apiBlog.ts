import { Blog, BlogId } from '../../Components/blogs/Types/types';

export const loadBlogs = async (): Promise<Blog[]> => {
  const token = localStorage.getItem('authToken');
  const res = await fetch('/api/blog', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const delBlogs = async (id: BlogId): Promise<BlogId> => {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const updateBlogs = async (text: Blog): Promise<Blog> => {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`/api/blog/${text.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: text.id,
      description: text.description,
    }),
  });
  return res.json();
};
