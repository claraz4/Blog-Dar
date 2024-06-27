// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import NavBar from "./components/NavBar";
import SignupForm from './pages/SignupForm'; // Adjust the path as per your actual file structure
import WriteBlog from './pages/WriteBlog';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<SingleBlog />} />
          <Route exact path="/write" element={<WriteBlog />} />
          <Route exact path="/signup" element={<SignupForm />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
