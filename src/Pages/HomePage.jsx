import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Services/Store/store';
import Carousel from '../components/HomePage/Carousel/Carousel';
import HeroCarousel from '../components/HomePage/Hero/Hero';
import { fetchHomePageData } from '../Services/Api/HomePageApi';
import { setLoadingIndicatorVisibility } from '../components/Loader/Loader';
import styles from './HomePage.module.css';


const listings = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

const HomePage = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [marqueeData, setMarqueeData] = useState([]);
    const [individualCarousel, setIndividualCarousel] = useState([]);

    const {storeData, setStoreData} = useContext(StoreContext)
    

    useEffect(() => {
        fetchHomePageData().then(data => {
            setStoreData({
                top_rated: data?.carouselData[0],
                popular: data?.carouselData[1],
                upcoming: data?.carouselData[2],
                now_playing: data?.carouselData[3]
            })
            setIndividualCarousel(data?.carouselData[3]);
            setMarqueeData(data?.marquee);
            setCarouselData(data?.carouselData);
            setLoadingIndicatorVisibility(false);
        }).catch(error => {
            throw(error)
        }) 


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onListingButtonClick = (listingName) => {
        const listingParam = listingName.toLowerCase().replaceAll(' ', '_');
        setIndividualCarousel(storeData[listingParam])
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
                {listings.map((data) => {
                    return(
                        <div className={styles.listingsButton} onClick={()=> onListingButtonClick(data)} key={data}>
                            <div>{data}</div>
                        </div>

                    );
                })}

            </div>

            {individualCarousel?.results?.length ? <Carousel movies ={individualCarousel?.results}/> : null}
           
            {carouselData?.map((data, index) => {
                return (
                    <div key={`${data?.title}`}>
                        <div className = {styles.homeTitle}>{data?.title}</div>
                            <Carousel
                                movies={data?.results}
                                key={`${data?.title}`}
                            />
                    </div>
                )
            })}
        </div>
    )
}


export default HomePage