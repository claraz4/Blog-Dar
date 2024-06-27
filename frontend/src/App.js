import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogBox from "./components/BlogBox";
import SingleBlog from "./pages/SingleBlog";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blog" element={<SingleBlog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
