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
import './styles/footer.css';
import { LoadingContextProvider } from './context/LoadingContext';
import { CategoriesContextProvider } from './context/CategoriesContext';
import Account from './pages/Account';
import { AuthContextProvider } from './context/AuthContext';
import Logout from './pages/Logout';
import Loader from "./components/Loader";
import Footer from "./components/footer";
import { LatestBlogsContextProvider } from './context/LatestBlogsContext';
import { PopularBlogsContextProvider } from './context/PopularBlogsContext';
import { UserBlogsContextProvider } from './context/UserBlogsContext';

export default function App() {
  const [displayFooter, setDisplayFooter] = React.useState(true);

  return (
    <div className="App">
      <LoadingContextProvider>
        <CategoriesContextProvider>
          <AuthContextProvider>
            <LatestBlogsContextProvider>
              <PopularBlogsContextProvider>
                <UserBlogsContextProvider>
                <Router>
                  <ScrollToTop />
                  <NavBar />
                    <Routes>
                      <Route exact path="/" element={<Home setDisplayFooter={setDisplayFooter} />} />
                      <Route exact path="/blog" element={<SingleBlog setDisplayFooter={setDisplayFooter} />} />
                      <Route exact path="/write" element={<WriteBlog setDisplayFooter={setDisplayFooter} />} />
                      <Route exact path="/blogs" element={<AllBlogs setDisplayFooter={setDisplayFooter} />} /> 
                      <Route exact path="/account" element={<Account setDisplayFooter={setDisplayFooter} />} /> 
                      <Route exact path="/signInUp" element={<SignInUp setDisplayFooter={setDisplayFooter} />} />
                      <Route exact path="/logout" element={<Logout setDisplayFooter={setDisplayFooter} />} />
                    </Routes>
                  {displayFooter && <Footer />}
                </Router>
              </UserBlogsContextProvider>
              </PopularBlogsContextProvider>
            </LatestBlogsContextProvider>
            <Loader />
          </AuthContextProvider>
        </CategoriesContextProvider>
      </LoadingContextProvider>
    </div>

    
  );
}
