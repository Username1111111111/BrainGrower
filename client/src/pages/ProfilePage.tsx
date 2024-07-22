import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../ui/page/Page';
import withAuthRedirect from '../ui/withAuthRedirect';
import UserProfile from '../ui/UserProfile';

function ProfilePage() {
  const { id } = useParams();

  return id ? <Page content={<UserProfile userId={id} />} /> : <Page content={<UserProfile />} />;
}

export default withAuthRedirect(ProfilePage, '/', (token) => !token);
