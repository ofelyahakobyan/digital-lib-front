import React from 'react';
import Wrapper from '../components/layout/Wrapper';
import Authors from '../components/Authors';
import RatingComponent from '../components/RatingComponent';

function Home() {
  return (
    <Wrapper>
      <Authors />
      <RatingComponent />
    </Wrapper>
  );
}

export default Home;
