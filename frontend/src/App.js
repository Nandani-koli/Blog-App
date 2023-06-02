import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Blogs from './components/Blogs';
import Auth from './components/Auth';
import AddBlog from './components/AddBlog';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import { useDispatch,useSelector } from 'react-redux';
import {useEffect} from 'react'
import { authActions } from "./store";

function App() {

  const dispath = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);

  return (
    <Router>

      <header>
        <Header />
      </header>

      <main>

        <Routes>
          {!isLoggedIn ? <Route path='/auth' element ={<Auth />} /> :
          <>
          <Route path='/blogs' element ={<Blogs />} />

          <Route path = '/blogs/add' element ={<AddBlog />} />

          <Route path = '/myBlogs' element ={<UserBlogs />} />

          <Route path = '/myBlogs/:id' element ={<BlogDetail />} /> </>}
       </Routes>

      </main>
    </Router>
  );
}

export default App;
