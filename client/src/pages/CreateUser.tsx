import Page from '../ui/page/Page';
import SignupForm from '../ui/SignupForm';
import React from 'react';

export default function CreateUser() {
  return (
    <>
      <Page content={<SignupForm />} />
    </>
  );
}
