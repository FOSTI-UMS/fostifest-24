"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
  Controller,
} from "swiper/modules";

import { PosterConstants } from "@/constants/poster_constants";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react"
import styles from "./styles.module.css";

const PosterCarousel = ({}) => {
  const [position, setPosition] = useState(1)
  
  return (
    <Swiper
    modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
    spaceBetween={-40}
    grabCursor={true}
    centeredSlides={true}
    // loop={true}
    onSlideChange={(e) => setPosition(e.activeIndex)}
    slidesPerView={"auto"}
      breakpoints={{
        640: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
        1024: {
          slidesPerView: 2,
          slidesPerGroup: 1,
        },
      }}
      effect={"coverflow"}
      coverflowEffect={{
        rotate: 0,
        stretch: 10,
        depth: 150,
        modifier: 5,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        bulletActiveClass: ".swiper-bullet",
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
    >
      {PosterConstants.map((poster, index) => (
        <SwiperSlide key={index} className="overflow-hidden">
            <div className={`flex justify-center items-center py-10`}>
              <div className={`${styles.image} bg-white`}>
                <Image
                    src={poster}
                    alt={`Poster-${index}`}
                    className={`${styles.image}`}
                />
              </div>
            </div>
        </SwiperSlide>
      ))}
        <div className="!flex items-center justify-center h-5">
          <ArrowLeft className="swiper-button-prev !relative mx-4" color="gray"/>
            {PosterConstants.map((_, index) => <div key={index} className={`rounded-full w-3 h-3 z-20 mx-1`} style={{backgroundColor:  index === position ? "#9700ff" : "#4c4c4c"}}/>)}
          <ArrowRight className="swiper-button-next !relative mx-4" color="gray"/>
      </div>
    </Swiper>
  );
};

export default PosterCarousel;