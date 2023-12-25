import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import wish from '../../assets/icons/wishlist.svg';
import card from '../../assets/icons/basket.svg';
import audio from '../../assets/icons/audio.svg';
import cancel from '../../assets/icons/cancels.svg';
import selectedHeart from '../../assets/icons/selected_heart.png';
import selectedCart from '../../assets/icons/download.png';
import {
  userCardAddRequest, userCardRequest,
  userWishListAddRequest,
  userWishListDeleteRequest,
  userWishListRequest,
} from '../../store/actions/users';
import classes from './bookinfo.module.css';

function BookInfo(props) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.users.wishlist);
  const [information, setInformation] = useState('');
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);
  const [added, setAdded] = useState(false);
  const {
    data, name, link, icon,
  } = props;
  console.log(link);
  const handleAddWishList = useCallback(async () => {
    const { payload } = await dispatch(userWishListAddRequest({ bookId: +`${data.id}` }));
    if (payload.status === 'error') {
      setError(true);
      setInformation(payload.message);
    } else if (payload.status === 'success') {
      setError(false);
      setInformation('item was successfully added to wishlist');
      setSelected(true);
    }
    await dispatch(userWishListRequest());
  }, [information, error]);
  const handleAddCard = useCallback(async () => {
    const { payload } = await dispatch(userCardAddRequest({ bookId: +`${data.id}` }));
    if (payload.status === 'error') {
      setError(true);
      setInformation(payload.message);
    } else if (payload.status === 'success') {
      setError(false);
      setInformation('item was successfully added to card');
      setAdded(true);
    }
    await dispatch(userCardRequest());
    await dispatch(userWishListRequest());
  }, [information, error]);
  const handleDelete = useCallback(async () => {
    await dispatch(userWishListDeleteRequest({ bookId: +`${data.id}` }));
    await dispatch(userWishListRequest());
  }, [wishlist.length]);
  const setHoverFunction = useCallback(() => {
    setHover(true);
  }, [hover]);
  const deleteHoverFunction = useCallback(() => {
    setHover(false);
    setInformation('');
    setError(false);
  }, [hover]);
  const handleAudioMessage = useCallback(() => {
    setInformation('You should buy the book, if you wish to listen');
  }, []);
  return (
    <div className={`${classes.info}`}>
      <div
        className={`${classes.image}`}
        onFocus={setHoverFunction}
        onMouseOver={setHoverFunction}
        onMouseOut={deleteHoverFunction}
        onBlur={deleteHoverFunction}
      >
        {!data.avatar ? (
          <img
            src={`http://localhost:4000/${data?.bookFiles?.coverM}`}
            alt="cover"
            className={`${classes.avatar}`}
          />
        )
          : <img src={`http://localhost:4000/${data?.avatar}`} alt="cover" className={`${classes.avatar}`} />}
        {hover && !data.avatar ? (
          <div className={`${classes.hover}`}>
            {icon === 'full' ? (
              <div className={`${classes.icons}`}>
                {selected
                  ? (
                    <button type="button" onClick={handleAddWishList} className={`${classes.button}`}>
                      <img src={selectedHeart} alt="wish" className={`${classes.delete_button}`} />
                    </button>
                  )
                  : (
                    <button type="button" onClick={handleAddWishList} className={`${classes.button}`}>
                      <img src={wish} alt="wish" />
                    </button>
                  )}
                {data.audio ? (
                  <button type="button" className={`${classes.button}`} onClick={handleAudioMessage}>
                    <img src={audio} alt="audio" />
                  </button>
                ) : null}
                {added ? (
                  <button type="button" onClick={handleAddCard} className={`${classes.button}`}>
                    <img src={selectedCart} alt="card" className={`${classes.delete_button}`} />
                  </button>
                ) : (
                  <button type="button" onClick={handleAddCard} className={`${classes.button}`}>
                    <img src={card} alt="card" />
                  </button>
                )}
              </div>
            ) : null}
            {icon === 'cancel' ? (
              <div className={`${classes.icons}`}>
                <button type="button" onClick={handleDelete} className={`${classes.button}`}>
                  <img src={cancel} alt="cancel" className={`${classes.delete_button}`} />
                </button>
                <button type="button" onClick={handleAddCard} className={`${classes.button}`}>
                  <img src={card} alt="card" />
                </button>
              </div>
            ) : null}
            {error ? (
              <div className={`${classes.data}`}>
                <p className={`${classes.error}`}>
                  {' '}
                  {information}
                  {' '}
                </p>
              </div>
            ) : (
              <div className={`${classes.data}`}>
                <p className={`${classes.success}`}>
                  {' '}
                  {information}
                  {' '}
                </p>
              </div>
            ) }
          </div>
        ) : null}
      </div>
      <div className={`${classes.data}`}>
        <p className={`${classes.price}`}>
          {' '}
          {data.price ? `$ ${data.price}` : null}
          {' '}
        </p>
        <br />
        <Link to={`${link}/${data.id}`} className={`${classes.link}`}>
          <p className={`${classes.name}`}>
            {' '}
            {name}
            {' '}
          </p>
        </Link>
        <Link to={`http://localhost:3000/authors/single/${data?.author?.id}`} className={`${classes.link}`}>
          <p className={`${classes.author}`}>
            {' '}
            {data.author ? `${data.author.fullName}` : null}
            {' '}
          </p>
        </Link>
        <div className={`${classes.rating}`}>
          {data.price
            ? (
              <ReactStars
                count={5}
                size={16}
                color2="#ffd700"
                half={false}
                value={data.averageRating}
                edit={false}
              />
            )
            : null }
          {data.totalReviews > 0 ? (
            <p className={`${classes.review}`}>
              {data.totalReviews}
              {' '}
              reviews
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
BookInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  name: PropTypes.string,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
BookInfo.defaultProps = {
  icon: '',
  name: '',
};

export default BookInfo;
