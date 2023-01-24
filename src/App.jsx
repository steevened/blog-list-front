import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import blogServices from './services/blog';
import Blog from './components/blog/Blog';
import Login from './components/login/Login';
import loginService from './services/login';
import AddBlog from './components/blog/AddBlog';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState(undefined);

  useEffect(() => {
    blogServices.getAll().then((blogs) => setBlogs(blogs));
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (e) => {
    e.preventDefault();
    console.log({ title, author, url, likes });
  };

  return (
    <div className="h-full bg-stone-800 min-h-screen text-white">
      <h2>Blogs</h2>

      {user === null ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <p>{user.name} logged-in</p>
          <AddBlog
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            likes={likes}
            setLikes={setLikes}
          />
        </>
      )}
      {
        <ul>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </ul>
      }
    </div>
  );
}

export default App;
