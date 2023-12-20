import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import Wrapper from '../../components/Wrapper/Wrapper';
import { getSingleBookRequest } from '../../store/actions/books';
import readButton from '../../assets/icons/read.svg';
import downloadButton from '../../assets/icons/download.svg';
import cardButton from '../../assets/icons/cart.svg';
import wishlistButton from '../../assets/icons/wish.svg';
import classes from './singlebook.module.css';
import Reviews from '../../components/Reviews/Reviews';
import WriteReview from '../../components/Reviews/WriteReview';
import {
  userCardAddRequest,
  userCardRequest,
  userWishListAddRequest,
  userWishListRequest,
} from '../../store/actions/users';

function SingleBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleBook = useSelector((state) => state.books.singleBook);
  const reviews = useSelector((state) => state.books.reviews);
  const [information, setInformation] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (id) {
        dispatch(getSingleBookRequest({ bookId: id }));
      }
    })();
  }, [id]);
  console.log(singleBook);
  const handleAddWishList = useCallback(async () => {
    const { payload } = await dispatch(userWishListAddRequest({ bookId: id }));
    if (payload.status === 'error') {
      setError(true);
      setInformation(payload.message);
    } else if (payload.status === 'success') {
      setError(false);
      setInformation('item was successfully added to wishlist');
    }
    await dispatch(userWishListRequest());
  }, [information, error]);
  const handleAddCard = useCallback(async () => {
    const { payload } = await dispatch(userCardAddRequest({ bookId: id }));
    if (payload.status === 'error') {
      setError(true);
      setInformation(payload.message);
    } else if (payload.status === 'success') {
      setError(false);
      setInformation('item was successfully added to card');
    }
    await dispatch(userCardRequest());
    await dispatch(userWishListRequest());
  }, [information, error]);
  const handleRead = useCallback(() => {
    navigate(`/books/single/${id}/book`);
    console.log(singleBook.title);
  }, [singleBook]);

  return (
    <Wrapper>
      <div className={`${classes.single_book}`}>
        <div className={`${classes.container}`}>
          <img
            src={`http://localhost:4000/${singleBook?.bookFiles?.coverL}`}
            alt="cover"
            className={`${classes.image}`}
          />
          <div className={`${classes.info}`}>
            <h3 className={`${classes.title}`}>
              {' '}
              $
              {' '}
              {singleBook?.price}
            </h3>
            <h4 className={`${classes.title}`}>
              {' '}
              {singleBook.title}
            </h4>
            <Link to={`/authors/single/${singleBook?.author?.id}`} className={`${classes.link_info}`}>
              {' '}
              by
              {' '}
              {singleBook?.author?.fullName}
            </Link>
            <div className={`${classes.rating}`}>
              <ReactStars
                count={5}
                size={16}
                color2="#ffd700"
                half={false}
                value={singleBook?.averageRating}
                edit={false}
              />
              <p className={`${classes.reviews}`}>
                {reviews?.length}
                {' '}
                reviews
                {' '}
              </p>
            </div>
            <p className={`${classes.info_text}`}>
              {' '}
              {singleBook?.description}
            </p>
            <div className={`${classes.buttons_section}`}>
              <button type="button" className={`${classes.button}`} onClick={handleRead}>
                <img src={readButton} alt="read" />
              </button>
              <button type="button" className={`${classes.button}`} onClick={handleAddWishList}>
                <img src={wishlistButton} alt="wishlist" />
              </button>
              <button type="button" className={`${classes.button}`} onClick={handleAddCard}>
                <img src={cardButton} alt="card" />
              </button>
              <button type="button" className={`${classes.button}`}>
                <img src={downloadButton} alt="download" />
              </button>
            </div>
            {error ? (
              <p className={`${classes.fail_add}`}>
                {' '}
                {information }
              </p>
            ) : (
              <p className={`${classes.success_add}`}>
                {' '}
                {information }
              </p>
            )}
            <button type="button" className={`${classes.button_buy}`}> BUY </button>
          </div>
        </div>
      </div>
      <WriteReview />
      <Reviews />
    </Wrapper>
  );
}

export default SingleBook;
