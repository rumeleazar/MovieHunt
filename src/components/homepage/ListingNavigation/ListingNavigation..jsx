import React from 'react';
import styles from './ListingNavigation.module.css';
import clsx from 'clsx';

const ListingNavigation = ({
  listings,
  onClick,
  activeListing,
  onClickProps,
}) => {
  return (
    <div className={styles.listingsButtonContainer}>
      {listings?.map((listingName, index) => {
        return (
          <div
            className={clsx(styles.listingsButton, {
              [styles.listingsButtonActive]: activeListing === index,
            })}
            onClick={() => onClick({ ...onClickProps, listingName, index })}
            key={listingName}
          >
            <div>{listingName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListingNavigation;
