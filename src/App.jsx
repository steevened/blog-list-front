import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import blogServices from './services/blog';
import Blog from './components/blog/Blog';
import Login from './components/login/Login';
import loginService from './services/login';
import AddBlog from './components/blog/AddBlog';
import Toggeable from './components/Toggeable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addedMessage, setAddedMessage] = useState(null);
  const [buttonIndex, setButtonIndex] = useState(-1);
  const [detailsShowed, setDetailsShowed] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const result = await blogServices.getAll();
      setBlogs(result);
    };
    fetchData();
    // blogServices.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogsAppUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const handleButtonIndex = (i) => {
    if (buttonIndex === i) {
      setButtonIndex(-1);
    } else {
      setButtonIndex(i);
    }
  };

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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await blogServices.create(blogObject);
    setBlogs((prevBlogs) => [...prevBlogs, blogObject]);
    setTimeout(() => {
      setAddedMessage(null);
    }, 5000);
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
          <Toggeable buttonLabel="New Blog" ref={blogFormRef}>
            <AddBlog addBlog={addBlog} setAddedMessage={setAddedMessage} />
          </Toggeable>

          <Blog
            blogs={blogs}
            setDetailsShowed={setDetailsShowed}
            setButtonIndex={setButtonIndex}
            buttonIndex={buttonIndex}
            handleButtonIndex={handleButtonIndex}
          />
        </>
      )}
    </div>
  );
}

export default App;
