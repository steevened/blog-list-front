import { useState } from 'react';

const Blog = ({
  blogs,
  buttonIndex,
  setDetailsShowed,
  setButtonIndex,
  handleButtonIndex,
}) => {
  return (
    <ul className="flex flex-col gap-2 mt-5">
      {blogs.map((blog, i) => (
        <li key={blog.id} className="border p-2">
          <div className="flex  justify-between items-center">
            <div>
              <p>{blog.title}</p>
              {buttonIndex === i && (
                <>
                  <p>{blog.url}</p>
                  <div className="flex w-1/2  justify-between">
                    <p>{blog.likes}</p>
                    <button className="border">Like</button>
                  </div>
                  <p>{blog.author}</p>
                </>
              )}
            </div>
            <button
              onClick={() => handleButtonIndex(i)}
              className="border h-full"
            >
              {buttonIndex === i ? 'Hide' : 'Show'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Blog;
