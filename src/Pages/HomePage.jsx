import React, { useState, useEffect } from 'react';
import Carousel from '../components/HomePage/Carousel/Carousel';
import HeroCarousel from '../components/HomePage/Hero/Hero';
import { fetchHomePageData } from '../Services/Api/HomePageApi';
import { setLoadingIndicatorVisibility } from '../components/Loader/Loader';
import styles from './HomePage.module.css';
const HomePage = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [marqueeData, setMarqueeData] = useState([]);
    

    useEffect(() => {
        fetchHomePageData().then(data => {
            setMarqueeData(data?.marquee);
            setCarouselData(data?.carouselData);
            setLoadingIndicatorVisibility(false);
        }).catch(error => {
            throw(error)
        }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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