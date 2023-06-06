import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import noimage from '../../assets/images/noimage.png';
import styles from './Grid.module.css';
import clsx from 'clsx';

const contentTypeMapper = {
  movie: 'MOVIE',
  tv: 'SERIES',
};

const Grid = ({ gridData, className }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.gridContainer}>
      {gridData?.map((data, index) => {
        return (
          <div
            className={clsx(styles.cardContainer, className)}
            key={`${data.id}_${index}_${data.title || data.name}`}
          >
            <a
              href={`/details/${data.title}/${data.id}`}
              onClick={() => {
                navigate(`/details/${data.title}/${data.id}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              <ReactImageFallback
                src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                fallbackImage={noimage}
                alt="cool image should be here"
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
                    navigate(`/details/${data.title}/${data.id}`);
                  }}
                >
                  VIEW MORE
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
