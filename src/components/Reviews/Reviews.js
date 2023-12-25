import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import ReactStars from 'react-stars';
import { getBookReviewsReq } from '../../store/actions/books';
import Pagination from '../Pagination/Pagination';
import classes from './reviews.module.css';
import 'reactjs-popup/dist/index.css';
import './popup.css';
import { deleteReview, editReview } from '../../store/actions/reviews';

function Reviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const reviews = useSelector((state) => state.books.reviews);
  const user = useSelector((state) => state.users.profile);
  const [errors, serErrors] = useState({});
  const [page, setPage] = useState(1);
  const pageCount = reviews.totalPages;
  const [formData, setFormData] = useState({
    changedTitle: '',
    changedContent: '',
    changedRating: 0,
  });
  useEffect(() => {
    (async () => {
      await dispatch(getBookReviewsReq({ id }));
    })();
  }, []);
  const handlePageChange = useCallback(
    (ev) => {
      setSearchParams({ page: ev.selected + 1 });
      setPage(ev.selected + 1);
    },
    [searchParams, page],
  );
  const handleChange = useCallback((key) => (ev) => {
    setFormData({ ...formData, [key]: ev.target.value });
  }, [formData]);
  const handleSubmit = useCallback(async (id) => {
    const { payload } = await dispatch(editReview({
      reviewId: id,
      title: formData.changedTitle,
      content: formData.changedContent,
      rating: formData.changedRating,
    }));
    if (payload.status === 'error') {
      serErrors(payload.errors);
    }
    if (payload.status === 'success') {
      window.location.reload();
    }
  }, [formData]);
  console.log(reviews);
  const handleDelete = useCallback(async (id) => {
    await dispatch(deleteReview({ reviewId: id }));
    await dispatch(getBookReviewsReq({ id }));
  }, [id]);
  const ratingChanged = (newRating) => {
    setFormData({ ...formData, changedRating: +newRating });
  };
  return (
    <div className={`${classes.reviews}`}>
      {reviews ? reviews.map((r) => (
        <div key={r.id}>
          <div className="rating">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              color2="#ffd700"
              value={r.rating}
              edit={false}
            />
            <span className={`${classes.date}`}>
              {new Date(
                r.createdAt,
              ).toLocaleDateString()}
            </span>
          </div>
          <div className={`${classes.user}`}>
            <img src={r.user.avatar} alt="avatar" className={`${classes.image}`} />
            <p className={`${classes.name}`}>
              {' '}
              {r.user.firstName}
              {' '}
              {r.user.lastName}
            </p>
          </div>
          <div className={`${classes.user_review}`}>
            {r.title ? (
              <h4 className={`${classes.review_title}`}>
                {' '}
                {r.title}
              </h4>
            ) : null}
            <p className={`${classes.desc}`}>
              {' '}
              {r.content}
            </p>
            {user.id === r.userId
              ? (
                <div className={`${classes.buttons}`}>
                  <Popup trigger={<button type="button" className={`${classes.edit_button}`}> EDIT </button>} position="left center">
                    <form>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        color2="#ffd700"
                        half={false}
                        value={formData.changedRating}
                      />
                      <input
                        type="text"
                        value={formData.changedTitle}
                        className={`${classes.popup_input}`}
                        onChange={handleChange('changedTitle')}
                        placeholder="title"
                      />
                      {errors.title ? (
                        <p className={`${classes.error_message}`}>
                          {' '}
                          {errors.title}
                          {' '}
                        </p>
                      ) : null}
                      <textarea
                        value={formData.changedContent}
                        className={`${classes.popup_text_input}`}
                        onChange={handleChange('changedContent')}
                        placeholder="content"
                      />
                      {errors.content ? (
                        <p className={`${classes.error_message}`}>
                          {' '}
                          {errors.content}
                          {' '}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        className={`${classes.popup_button}`}
                        onClick={() => handleSubmit(r.id)}
                      >
                        Submit
                      </button>
                    </form>
                  </Popup>
                  <button type="button" className={`${classes.delete_button}`} onClick={() => handleDelete(r.id)}> DELETE </button>
                </div>
              )
              : null}
          </div>
          <hr />
        </div>
      )) : null}
      {reviews.length > 10
        ? <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
        : null }
    </div>
  );
}

export default Reviews;
