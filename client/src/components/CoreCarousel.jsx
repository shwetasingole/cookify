import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Testimonials from './Testimonials';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Navigation,Mousewheel, Pagination } from 'swiper/modules';





export default function App() {
  return (
    <>
      <Swiper
                direction='horizontal'
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                mousewheel={true}
                modules={[Navigation,Mousewheel, Pagination]}
                className="mySwiper h-64 w-full "
            >
        <SwiperSlide><Testimonials name="Naura" feedback="Cookify has completely changed the way I plan my meals. Super easy to use!"/></SwiperSlide>
        <SwiperSlide><Testimonials name="James Carter" feedback="Absolutely love it! The recipe suggestions are spot on and save me so much time."/></SwiperSlide>
        <SwiperSlide><Testimonials name="Emily Brown" feedback="A must-have for anyone who loves cooking! The chatbot feature is really helpful."/></SwiperSlide>
  
      </Swiper>
    </>
  );
}
