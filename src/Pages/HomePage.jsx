import React, { useState, useEffect } from 'react';
import { sendApiRequest } from '../Services/Api/utils';
import Carousel from '../components/homepage/carousel';
import HeroCarousel from '../components/homepage/hero';

const HomePage = () => {

    const [load, setLoad] = useState(false);
    const [carouselData, setCarouselData] = useState([]);
    const [marqueeData, setMarqueeData] = useState([]);

    useEffect(() => {

        const marqueeEndpoint = [`3/movie/now_playing`];

        const carouselUrlEndpoints = [`3/movie/top_rated`,`3/movie/popular`, `3/movie/upcoming` ];
        const railTitle = ['TOP RATED', 'POPULAR', 'UPCOMING']
        Promise.all([...marqueeEndpoint,...carouselUrlEndpoints].map(url => sendApiRequest(url).then(response => response))).then(data => {
            const marqueeData = data[0]
            data.shift()

            const newCarouselData = data.map((item,index) => {
                return {...item, title: railTitle[index]}
            })


            setMarqueeData(marqueeData)
            setCarouselData(newCarouselData)
        }).catch(error => {
            setCarouselData([]);
            throw(error);
        }).finally(()=> {
            setLoad(true)
        })
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(!load) {
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