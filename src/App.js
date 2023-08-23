import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import New from './pages/New';
import NotFound from './pages/NotFound';
import Popular from './pages/Popular';
import Bestseller from './pages/Bestseller';
import ContactUs from './pages/ContactUs';
import AuthorsList from './pages/AuthorsList';
import SingleAuthor from './pages/SingleAuthor';
import SingleBook from './pages/SingleBook';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import User from './pages/User';
import PersonalInfo from './components/user/PersonalInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user-profile" element={<PersonalInfo />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/authors" element={<AuthorsList />} />
        <Route path="/authors/single/:id" element={<SingleAuthor />} />
        <Route path="/books/single/:id" element={<SingleBook />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/new" element={<New />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/bestseller" element={<Bestseller />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
