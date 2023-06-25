import React from 'react';

const LazyImageCustomFallback = ({ src, fallback, ...otherAttributes }) => {
  return (
    <img
      src={src}
      alt="very cool item in here"
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null; // prevent an infinite error loop
        e.target.src = fallback;
      }}
      {...otherAttributes}
    />
  );
};

export default LazyImageCustomFallback;
