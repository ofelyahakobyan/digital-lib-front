import React from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../components/layout/Wrapper';
import UserNavigation from '../components/user/UserNavigation';

function User() {
  const { id } = useParams();
  return (
    <Wrapper>
      <UserNavigation />
      {id}
    </Wrapper>
  );
}

export default User;
