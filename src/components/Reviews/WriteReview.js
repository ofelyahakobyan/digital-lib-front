import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { number } from 'prop-types';
import ReactStars from 'react-stars';
import comment from '../../assets/icons/comment.svg';
import { postReview } from '../../store/actions/reviews';
import classes from './writereviews.module.css';
import { getBookReviewsReq } from '../../store/actions/books';

function WriteReview() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [review, setreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 0,
  });
  // const [rating, setRating] = useState(0);
  const handleComment = useCallback(() => {
    setreview(true);
    setMessage('');
  }, [comment]);
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    const { payload } = await dispatch(postReview({
      bookId: id, title: formData.title, content: formData.content, rating: formData.rating,
    }));
    if (payload.status === 'error') {
      setMessage(payload.message);
    }
    if (payload.status === 'success') {
      await dispatch(getBookReviewsReq({ id }));
      setreview(false);
    }
  }, [formData]);
  const handleCancel = useCallback(() => {
    setreview(false);
    setFormData({});
    setMessage('');
  }, [review, formData]);
  const ratingChanged = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };
  console.log(formData);
  return (
    <div className={`${classes.reviews}`}>
      <h2 className={`${classes.main_title}`}> Customer Reviews</h2>
      {review ? (
        <button type="button" onClick={handleComment} disabled className={`${classes.disable}`}>
          <img src={comment} alt="comment" />
        </button>
      ) : (
        <button type="button" onClick={handleComment} className={`${classes.active}`}>
          <img src={comment} alt="comment" />
        </button>
      )}
      {review ? (
        <form onSubmit={handleSubmit} className={`${classes.form}`}>
          <h4 className={`${classes.title}`}> Your rating </h4>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            color2="#ffd700"
            value={formData.rating}
            half={false}
          />
          <h4 className={`${classes.title}`}> Title of review </h4>
          <input type="text" value={formData.title} onChange={handleChange('title')} className={`${classes.input_title}`} />
          <h4 className={`${classes.title}`}> Description </h4>
          <textarea value={formData.content} onChange={handleChange('content')} className={`${classes.desc_title}`} />
          <div className={`${classes.form_buttons}`}>
            <button type="button" onClick={handleCancel} className={`${classes.cancel_button}`}>
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className={`${classes.submit_button}`}> Submit </button>
          </div>
        </form>
      ) : null}
      {message ? (
        <p className={`${classes.error_message}`}>
          {' '}
          {message}
          {' '}
        </p>
      ) : null}
    </div>
  );
}

export default WriteReview;
