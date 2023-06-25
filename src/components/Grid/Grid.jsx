import React from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImageDefaultFallback from '../LazyImage/LazyImageDefaultFallback';
import { setLoadingIndicatorVisibility } from '../Loader/Loader';
import styles from './Grid.module.css';
import clsx from 'clsx';

const contentTypeMapper = {
  movie: 'MOVIE',
  tv: 'SERIES',
};

const Grid = ({ gridData, className, mediaType }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.gridContainer}>
      {gridData?.map((data) => {
        return (
          <div
            className={clsx(styles.cardContainer, className)}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/details/${mediaType}/${data.id}`);
              setLoadingIndicatorVisibility(true);
            }}
          >
            <LazyImageDefaultFallback
              src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            />
            <div className={styles.metadataContainer}>
              <div className={styles.metadataTitle}>
                {data.title || data.name}
              </div>
              <div className={styles.metadataOverview}>{data.overview}</div>
              <div className={styles.metadataContentType}>
                {contentTypeMapper[data.media_type]}
              </div>
              <div
                className={styles.viewMoreButton}
                onClick={() => {
                  navigate(`/details/${mediaType}/${data.id}`);
                  setLoadingIndicatorVisibility(true);
                }}
              >
                VIEW MORE
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
