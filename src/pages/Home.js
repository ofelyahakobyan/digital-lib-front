import React from 'react';
import Wrapper from '../components/layout/Wrapper';
import Authors from '../components/Authors';

function Home() {
  return (
    <Wrapper>
      <div style={{ height: 500, backgroundColor: 'white', paddingTop: 100 }}>
        <p> Home Page </p>
        <Authors />
      </div>
    </Wrapper>
  );
}

export default Home;
