import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import noimage from '../../assets/images/noimage.png';
import styles from './Grid.module.css';
import clsx from 'clsx';

const Grid = ({ gridData, className, keyName }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.gridContainer} key={keyName}>
      {gridData?.map((data, index) => {
        console.log(data);
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
                <div className={styles.metadataTitle}>{data.title}</div>
                <div className={styles.metadataOverview}>{data.overview}</div>
                <div className={styles.metadataContentType}>
                  {data.media_type}
                </div>
                <div className={styles.viewMoreButton}>View More</div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
