import { useState } from 'react';

const AddBlog = ({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  likes,
  setLikes,
}) => {
  return (
    <form onSubmit={addBlog}>
      <h2>Add a Blog</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Url</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Likes</label>
        <input
          type="number"
          name="likes"
          id="likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />
      </div>

      <button className="border px-2 py-1 rounded" type="submit">
        Create
      </button>
    </form>
  );
};

export default AddBlog;
