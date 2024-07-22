import Page from '../ui/page/Page';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Page content={<>{t('welcomeMessage')}</>} />
    </>
  );
}
