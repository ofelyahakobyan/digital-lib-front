import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import axios from 'axios';
import { userCardDeleteRequest, userCardRequest } from '../../store/actions/users';
import deleteButton from '../../assets/icons/delete.svg';
import payments from '../../assets/icons/icon-pay 1.jpg';
import Wrapper from '../Wrapper/Wrapper';
import classes from './card.module.css';

function Card() {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.users.card);
  const info = useSelector((state) => state.users.info);
  const status = useSelector((state) => state.users.status);
  const handleDelete = useCallback(async (id) => {
    await dispatch(userCardDeleteRequest({ bookId: +`${id}` }));
    await dispatch(userCardRequest());
  }, [card.length]);
  console.log(card);
  const token = localStorage.getItem('token');
  const handleClick = useCallback(async () => {
    const data = await axios.post('http://localhost:4000/api/v1/ordesr/checkout-session', {
      headers: {
        authorization: token,
      },
      params: {
        books: [111, 115],
      },
    });
    console.log(data);
  }, []);
  return (
    <Wrapper>
      <div className={`${classes.card}`}>
        <h1 className={`${classes.card_title}`}> Card </h1>
        <div className={`${classes.container}`}>
          <div className={`${classes.card_general}`}>
            {status === 'pending' ? <p> Loading </p> : null}
            {card.length ? card.map((c) => (
              <div key={c.id} className={`${classes.card_item}`}>
                <div className={`${classes.card_info}`}>
                  <img src={`http://localhost:4000/${c.bookFiles.coverXS}`} alt="cover" className={`${classes.card_img}`} />
                  <div>
                    <h3 className={`${classes.price}`}>
                      {' '}
                      {c.price}
                      {' '}
                      $
                    </h3>
                    <h4 className={`${classes.title}`}>
                      {' '}
                      {c.title}
                      {' '}
                    </h4>
                    <Link to={`/authors/single/${c.author.id}`} className={`${classes.author}`}>
                      {' '}
                      <span> by </span>
                      {c.author.fullName}
                    </Link>
                    <ReactStars
                      count={5}
                      size={16}
                      color2="#ffd700"
                      half={false}
                      value={c.averageRating}
                      edit={false}
                    />
                  </div>
                </div>
                <button type="button" onClick={() => { handleDelete(c.id); }} className={`${classes.button}`}>
                  <img src={deleteButton} alt="delete" />
                </button>
              </div>
            )) : null}
          </div>
          <div className={`${classes.payment}`}>
            <div className={`${classes.info}`}>
              <span className={`${classes.info_title}`}> Subtotal </span>
              <span className={`${classes.count}`}>
                {' '}
                $
                {info.subTotal}
              </span>
            </div>
            <div className={`${classes.info}`}>
              <span className={`${classes.info_title}`}> Quantity </span>
              <span className={`${classes.count}`}>
                {' '}
                {info.quantity}
                {' '}
              </span>
            </div>
            <div className={`${classes.info}`}>
              <span className={`${classes.info_title}`}> Discount </span>
              <span className={`${classes.count}`}>
                {' '}
                $
                {info.discount}
              </span>
            </div>
            <hr className="hr" />
            <div className={`${classes.info}`}>
              <span className={`${classes.info_title_total}`}> Total </span>
              <span className={`${classes.count}`}>
                {' '}
                $
                {info.totalPrice}
              </span>
            </div>
            <button type="button" className={`${classes.check_button}`} onClick={handleClick}> Check out </button>
            <div className="payment_types">
              <p className={`${classes.semi_title}`}> We accept </p>
              <img src={payments} alt="payment" className={`${classes.payment_img}`} />
              <p className={`${classes.desc}`}>
                Prices and delivery costs are not confirmed until you have reached the checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Card;
