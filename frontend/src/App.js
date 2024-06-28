// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import NavBar from "./components/NavBar";
import SignupForm from './pages/SignupForm'; 
import WriteBlog from './pages/WriteBlog';
import AllBlogs from './pages/AllBlogs';
import './styles/index.css';
import './styles/home.css';
import './styles/NavBar.css';
import './styles/write-blog.css';
import './styles/single-blog.css';
import './styles/all-blogs.css';
import { LoadingContextProvider } from './context/LoadingContext';
import { CategoriesContextProvider } from './context/CategoriesContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
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
              <Route exact path="/signup" element={<SignupForm />} /> 
              <Route exact path="/blogs" element={<AllBlogs />} /> 
            </Routes>
          </Router>
        </CategoriesContextProvider>
      </LoadingContextProvider>
    </div>
  );
}

export default App;
