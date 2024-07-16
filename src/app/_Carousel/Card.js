"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { data } from '@/data/dummyData';

export default function Card() {
   
    
    const openLink = (path) =>{
        window.open(path, '_blank').focus();
    }
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {data.map((item) => (

                    <SwiperSlide key={item.id} onClick={()=>{openLink(`//${item.targetURL}`)}}>
                     
                            {/* {item.title} */}
                            <img src={item.thumbnail} alt=''/>

                   
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    );
}