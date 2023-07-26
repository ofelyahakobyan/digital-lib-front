import React from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../components/layout/Wrapper';

function SingleBook() {
  const { id } = useParams();
  return (
    <Wrapper>
      <div style={{ height: 200, paddingTop: 100 }}>
        {id}
      </div>
    </Wrapper>
  );
}

export default SingleBook;
