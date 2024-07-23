import Navbar from './Navbar';
import MainContent from './Main';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import isTokenExpired from '../../lib/isTokenExpired';

export default function Page({ content }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
    }
  }, [location, token]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="flex-start w-100 p-0 m-0">
            <Navbar />
            <MainContent content={content} />
          </div>
        </div>
      </div>
    </>
  );
}
