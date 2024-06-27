import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import NavBar from "./components/NavBar";
import WriteBlog from "./pages/WriteBlog";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar /> {/* Add the NavBar component here */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<SingleBlog />} />
          <Route exact path="/write" element={<WriteBlog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
