import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Services/Store/store';
import Carousel from '../components/HomePage/Carousel/Carousel';
import HeroCarousel from '../components/HomePage/Hero/Hero';
import Grid from '../components/Grid/Grid';
import clsx from 'clsx';
import { fetchHomePageData } from '../Services/Api/HomePageApi';
import { setLoadingIndicatorVisibility } from '../components/Loader/Loader';
import styles from './HomePage.module.css';


const listings = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

const discoverListings = ['Movies', 'Series']

const HomePage = () => {
    const [marqueeData, setMarqueeData] = useState([]);
    const [individualCarousel, setIndividualCarousel] = useState([]);
    const [discoverData, setDiscoverData] = useState([]);
    const [activeListing, setActiveListing] = useState(0);
    const [discoverListing, setDiscoverListing] = useState(0);
    const {storeData, setStoreData} = useContext(StoreContext)
    

    useEffect(() => {
        fetchHomePageData().then(data => {
            setStoreData({
                top_rated: data?.carouselData[0],
                popular: data?.carouselData[1],
                upcoming: data?.carouselData[2],
                now_playing: data?.carouselData[3],
                movies: data?.carouselData[4],
                series: data?.carouselData[5],
            })
            setIndividualCarousel(data?.carouselData[3]);
            setDiscoverData(data?.carouselData[4]);
            setMarqueeData(data?.marquee);
        
        }).catch(error => {
            throw(error)
        }).finally(() => {
            setLoadingIndicatorVisibility(false);
        })


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onListingButtonClick = (listingName, index) => {
        const listingParam = listingName.toLowerCase().replaceAll(' ', '_');
        setIndividualCarousel(storeData[listingParam])
        setActiveListing(index)
    }

    const onDiscoverListingButtonClick = (listingName, index) => {
        const listingParam = listingName.toLowerCase().replaceAll(' ', '_');
        setDiscoverData(storeData[listingParam])
        setDiscoverListing(index)
    }

    if(!marqueeData) {
        return null;
    }
    
    return (
        <div>
            {marqueeData  &&
             <HeroCarousel
                marqueeData = {marqueeData?.results}
            />
            }
            <div className={styles.listingsButtonContainer}>
                {listings.map((data, index) => {
                    return(
                        <div className={clsx(styles.listingsButton,
                         {[styles.listingsButtonActive]: activeListing === index})} 
                         onClick={()=> onListingButtonClick(data, index)} key={data}
                         >
                            <div>{data}</div>
                        </div>

                    );
                })}

            </div>
            {individualCarousel?.results?.length ? <Carousel movies ={individualCarousel?.results}  key={individualCarousel?.title}/> : null}
            <div className={styles.listingsButtonContainer}>
                {discoverListings.map((data, index) => {
                    return(
                        <div className={clsx(styles.listingsButton,
                         {[styles.listingsButtonActive]: discoverListing === index})} 
                         onClick={()=> onDiscoverListingButtonClick(data, index)} key={data}
                         >
                            <div>{data}</div>
                        </div>

                    );
                })}

            </div>
            {discoverData?.results?.length ? <Grid gridData={discoverData?.results} keyName={discoverData?.title} key={discoverData?.title}/> : null}
        
        </div>
    )
}


export default HomePage