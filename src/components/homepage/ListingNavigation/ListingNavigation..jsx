import React from "react";
import styles from './ListingNavigation.module.css'
import clsx from "clsx";


const ListingNavigation = ({listings, onClick, activeListing}) => {
    return ( 
        <div className={styles.listingsButtonContainer}>
                {listings?.map((data, index) => {
                    return(
                        <div className={clsx(styles.listingsButton,
                         {[styles.listingsButtonActive]: activeListing === index})} 
                         onClick={()=> onClick(data, index)} key={data}
                         >
                            <div>{data}</div>
                        </div>
                    );
                })}
         </div>
    )
}

export default ListingNavigation;