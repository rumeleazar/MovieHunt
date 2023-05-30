import React from "react";
import { useNavigate } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import noimage from "../../assets/images/noimage.png";
import styles from './Grid.module.css'
import clsx from "clsx";


const Grid = ({gridData, className, keyName}) => {
    const navigate = useNavigate();
    return ( 
        <div
            className={styles.gridContainer} 
            key = {keyName}
        >
            {gridData?.map((data, index) => {
              return(
                <div className={clsx(styles.cardContainer, className)} key={`${data.id}_${index}_${data.title || data.name}`}>
                    <a
                    href={`/details/${data.title}/${data.id}`}
                    onClick={() => {
                        navigate(
                        `/details/${data.title}/${data.id}`
                        );
                    }}
                    style={{ cursor: "pointer" }}
                    >
                    <ReactImageFallback
                        src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                        fallbackImage={noimage}
                        alt="cool image should be here"
                    />
                    <h1>{data.title || data.name}</h1>
                    </a>
                </div>
              )
            })}
        </div>
    )
}

export default Grid