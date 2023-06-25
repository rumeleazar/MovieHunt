import React from 'react';
import noimage from '../../assets/images/noimage.png';

const LazyImageDefaultFallback = ({ src, ...otherAttributes }) => {
  return (
    <img
      src={src}
      alt="very cool item in here"
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null; // prevent an infinite error loop
        e.target.src = noimage;
      }}
      {...otherAttributes}
    />
  );
};

export default LazyImageDefaultFallback;
