import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleBlog from './pages/SingleBlog';
import NavBar from './components/NavBar';
import WriteBlog from './pages/WriteBlog';
import AllBlogs from './pages/AllBlogs';
import SignInUp from './pages/SignInUp';
import ScrollToTop from './components/ScrollToTop';
import './styles/index.css';
import './styles/home.css';
import './styles/NavBar.css';
import './styles/write-blog.css';
import './styles/single-blog.css';
import './styles/all-blogs.css';
import './styles/account.css';
import './styles/styles.css'; 
import { LoadingContextProvider } from './context/LoadingContext';
import { CategoriesContextProvider } from './context/CategoriesContext';
import Account from './pages/Account';

export default function App() {
  const [type, setType] = useState('signIn');

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = 'container ' + (type === 'signUp' ? 'right-panel-active' : '');

  return (
    <div className="App">
      <LoadingContextProvider>
        <CategoriesContextProvider>
          <Router>
            <ScrollToTop />
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/blog" element={<SingleBlog />} />
              <Route exact path="/write" element={<WriteBlog />} />
              <Route exact path="/blogs" element={<AllBlogs />} /> 
              <Route exact path="/account" element={<Account />} /> 
              <Route exact path="/signInUp" element={<SignInUp />} />
            </Routes>
          </Router>
        </CategoriesContextProvider>
      </LoadingContextProvider>
    </div>
  );
}
