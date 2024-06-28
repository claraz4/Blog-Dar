// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import NavBar from "./components/NavBar";
import SignupForm from './pages/SignupForm'; 
import WriteBlog from './pages/WriteBlog';
import './styles/index.css';
import './styles/home.css';
import './styles/NavBar.css';
import './styles/write-blog.css';
import './styles/single-blog.css';
import { LoadingContextProvider } from './context/LoadingContext';

function App() {
  return (
    <div className="App">
      <LoadingContextProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/blog" element={<SingleBlog />} />
            <Route exact path="/write" element={<WriteBlog />} />
            <Route exact path="/signup" element={<SignupForm />} /> 
          </Routes>
        </Router>
      </LoadingContextProvider>
    </div>
  );
}

export default App;
