import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../components/Wrapper/Wrapper';
import Banner from '../../components/Banner/Banner';
import AdsComponent from '../../components/AdsComponent/AdsComponent';
import Authors from '../../components/Authors/Authors';
import { getCategoriesListRequest } from '../../store/actions/categories';
import BooksListComponent from '../../components/BooksListComponent/BooksListComponent';

function Home() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  useEffect(() => {
    (async () => {
      dispatch(getCategoriesListRequest());
    })();
  }, []);
  return (
    <Wrapper>
      <Banner />
      {categories ? categories.map((c) => (
        <Fragment key={c.id}>
          <BooksListComponent title={c.category} id={c.id} />
        </Fragment>
      )) : null}
      <AdsComponent />
      <Authors />
    </Wrapper>
  );
}

export default Home;
