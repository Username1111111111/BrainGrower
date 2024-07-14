import Page from '../ui/page/Page';
import UpdateUserForm from '../ui/UpdateUserForm';
import UserTable from '../ui/UserTable';
import withAuthRedirect from '../ui/withAuthRedirect';
import React from 'react';

function UpdateUserPage() {
  const content = (
    <div>
      <UpdateUserForm />
      <UserTable />
    </div>
  );

  return <Page content={content} />;
}

export default withAuthRedirect(UpdateUserPage, '/', (token, role) => !token || role !== 'admin');
