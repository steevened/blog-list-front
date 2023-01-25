const Blog = ({ blog, key }) => {
  return (
    <div key={key}>
      {blog.title} {blog.author}
    </div>
  );
};

export default Blog;
