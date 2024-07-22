import Page from '../ui/page/Page';
import { useTranslation } from 'react-i18next';
import withAuthRedirect from '../ui/withAuthRedirect';
import React from 'react';

function ProfilePage() {
  const { t } = useTranslation();
  return <Page content={<div>{t('profilePage')}</div>} />;
}

export default withAuthRedirect(ProfilePage, '/', (token) => !token);
