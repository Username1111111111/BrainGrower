import React from 'react';

export default function MainContent({ content }) {
  return (
    <div className="d-flex justify-content-center align-items-center pt-2">
      <div className="col-10 d-flex justify-content-center align-items-center">{content}</div>
    </div>
  );
}
