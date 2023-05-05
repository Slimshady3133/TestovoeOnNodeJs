/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import OneBlog from './OneBlog';
import { Blog } from './Types/types';
import './Pagination.css';

function LoadingBlogs({ blogs }: { blogs: Blog[] }): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {currentPosts.map((blog) => (
        <OneBlog key={blog.id} blog={blog} />
      ))}
      <div className="pagination">
        {currentPage > 1 && (
          <button type="button" onClick={() => paginate(currentPage - 1)}>
            Previous
          </button>
        )}

        {Array.from({ length: Math.ceil(blogs.length / postsPerPage) }, (_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => paginate(i + 1)}
            className={i + 1 === currentPage ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < Math.ceil(blogs.length / postsPerPage) && (
          <button type="button" onClick={() => paginate(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default LoadingBlogs;
