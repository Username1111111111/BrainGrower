import Page from '../ui/page/Page';
import SignupForm from '../ui/SignupForm';
import withAuthRedirect from '../ui/withAuthRedirect';
import React from 'react';

function SignupPage() {
  return <Page content={<SignupForm />} />;
}

export default withAuthRedirect(SignupPage, '/', (token) => !!token);
