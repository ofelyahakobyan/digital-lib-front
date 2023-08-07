import React, { Fragment, useEffect, useState } from 'react';
import Wrapper from '../components/layout/Wrapper';
import Authors from '../components/Authors';
import AdvertisementComponent from '../components/AdvertisementsComponent';
import BooksComponent from '../components/BooksComponent';
import Api from '../Api';

function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await Api.getCategoriesList(2, 3);
      setCategories(data.categories);
    })();
  }, []);
  return (
    <Wrapper>
      {categories ? categories.map((c) => (
        <Fragment key={c.id}>
          <BooksComponent title={c.category} id={c.id} />
        </Fragment>
      )) : null}
      <AdvertisementComponent />
      <Authors />
    </Wrapper>
  );
}

export default Home;
