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
  const [addedMessage, setAddedMessage] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');

  useEffect(() => {
    blogServices.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogsAppUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user));

      blogServices.setToken(user.token);
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

  const addBlog = async (e) => {
    e.preventDefault();

    const blogObject = { title, author, url, likes };
    await blogServices.create(blogObject);
    setBlogs(blogs.concat(blogObject));
    setAddedMessage(`A new blog ${title} by ${author} added`);
    setTimeout(() => {
      setAddedMessage(null);
    }, 5000);
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
  };

  return (
    <div className="h-full bg-stone-800 min-h-screen text-white">
      <h2>Blogs</h2>

      {addedMessage && <p>{addedMessage}</p>}
      {errorMessage && <p>Wrong username or password</p>}

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
          <p>{user.name} logged in</p>
          <button
            className="border px-2 py-1 rounded"
            onClick={() => {
              window.localStorage.removeItem('loggedBlogsAppUser');
              setUser(null);
            }}
          >
            Log out
          </button>
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
          {
            <ul>
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </ul>
          }
        </>
      )}
    </div>
  );
}

export default App;
