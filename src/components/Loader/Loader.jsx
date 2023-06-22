import React, { useState, useEffect } from 'react';
import styles from './Loader.module.css';

export let setLoadingIndicatorVisibility;
export let showLoader;

const LoadingSpinner = (showOnMount = true) => {
  const [showLoader, setShowLoader] = useState(showOnMount);

  useEffect(() => {
    !!showLoader
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'scroll');
  }, [showLoader]);

  useEffect(() => {
    setLoadingIndicatorVisibility = setShowLoader;

    return () => {
      setLoadingIndicatorVisibility = null;
    };
  }, []);

  return showLoader ? (
    <div className={styles.preloaderContainer}>
      <div className={styles.preloader} />
    </div>
  ) : null;
};

export default LoadingSpinner;
