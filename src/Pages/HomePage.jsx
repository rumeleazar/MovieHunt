import React, { useState, useEffect } from 'react';
import Carousel from '../components/homepage/carousel';
import HeroCarousel from '../components/homepage/hero';
import { fetchHomePageData } from '../Services/Api/HomePageApi';
import { setLoadingIndicatorVisibility } from '../components/Loader/Loader';

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
                    <div className ='carouselContainer' key={`${data?.title}`}>
                        <h1 className = 'homeText'>{data?.title}</h1>
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