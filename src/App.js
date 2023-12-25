import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Catalog from './pages/Catalog/Catalog';
import NotFound from './pages/NotFound/NotFound';
import SingleAuthor from './pages/SingleAuthor/SingleAuthor';
import SingleBook from './pages/SingleBook/SingleBook';
import Profile from './pages/UserProfile/Profile';
import Wishlist from './components/Wishlist/Wishlist';
import Card from './components/Card/Card';
import BooksByCategory from './pages/BooksByCategory/BooksByCategory';
import Authors from './pages/Authors/Authors';
import New from './pages/New/New';
import Popular from './pages/Popular/Popular';
import BookPreview from './components/Book/BookPreview';
import BookFull from './components/Book/BookFull';
import Payment from './components/Payment/Payment';
import ChangeInfo from './pages/UserProfile/ChangeInfo';
import UserReviews from './pages/UserProfile/UserReviews';
import Audio from './pages/Audio/Audio';
import Contact from './pages/Contact/Contact';
import PurchaseSuccess from './components/PurchaseSuccess/PurchaseSuccess';
import UserBooks from './pages/UserProfile/UserBooks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/user/verification" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/new-books" element={<New />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/authors/single/:id" element={<SingleAuthor />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books/single/:id" element={<SingleBook />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/user/:id/update-info" element={<ChangeInfo />} />
        <Route path="/user/:id/wishlist" element={<Wishlist />} />
        <Route path="/user/:id/card" element={<Card />} />
        <Route path="/user/:id/reviews" element={<UserReviews />} />
        <Route path="/books/category/:id" element={<BooksByCategory />} />
        <Route path="/books/audio/:id" element={<Audio />} />
        <Route path="/books/single/:id/book-preview" element={<BookPreview />} />
        <Route path="/books/single/:id/book-full" element={<BookFull />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/user-books/:id" element={<UserBooks />} />
        <Route path="/purchase-success" element={<PurchaseSuccess />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
