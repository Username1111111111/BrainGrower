import Navbar from './Navbar';
import MainContent from './Main';
import React from 'react';

export default function Page({ content }) {
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
