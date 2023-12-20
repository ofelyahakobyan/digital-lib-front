import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { getUserReviewsRequest } from '../../store/actions/reviews';
import Wrapper from '../../components/Wrapper/Wrapper';
import classes from './profile.module.css';

function UserReviews() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.users.profile);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getUserReviewsRequest({ userID: profile.id }));
      setReviews(payload);
    })();
  }, []);
  console.log(reviews);

  return (
    <Wrapper>
      <div className={`${classes.review}`}>
        <h1 className={`${classes.review_title}`}> Your reviews </h1>
        {reviews?.reviews?.map((r) => (
          <div key={r.id} className={`${classes.review_block}`}>
            {' '}
            <h4>
              Title :
              {' '}
              {' '}
              {r.book.title}
            </h4>
            <p>
              {' '}
              Description:
              {' '}
              {r.book.description}
            </p>
            <ReactStars
              count={5}
              size={16}
              color2="#ffd700"
              half={false}
              value={r.rating}
              edit={false}
              className={`${classes.review_rating}`}
            />
            <h5 className={`${classes.review_tit}`}>
              {' '}
              {r.title}
            </h5>
            <p className={`${classes.review_info}`}>{r.content}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default UserReviews;
