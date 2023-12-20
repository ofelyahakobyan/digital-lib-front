import React from 'react';
import { useSelector } from 'react-redux';
import BookInfo from '../BookInfo/BookInfo';
import Wrapper from '../Wrapper/Wrapper';
import classes from './wishlist.module.css';

function WishList() {
  const wishlist = useSelector((state) => state.users.wishlist);
  return (
    <Wrapper>
      <div className={`${classes.wishlist}`}>
        <div className={`${classes.container}`}>
          {wishlist ? wishlist.map((w) => (
            <BookInfo data={w} link="/books/single" name={w.title} icon="cancel" key={w.id} />
          )) : null}
        </div>
      </div>
    </Wrapper>
  );
}

export default WishList;
