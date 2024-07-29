// Loading.js
import React from 'react';
import '../loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="shimmer"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
