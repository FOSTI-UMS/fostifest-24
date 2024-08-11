"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PosterConstants } from "@/constants/posterConstants";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useState } from "react"
import { CarouselConstants } from "@/constants/carouselConstants";

const PosterCarousel = ({}) => {
  const [position, setPosition] = useState(3)

  const handleSlideChange = (e) => {
    setPosition(e.realIndex);
  }
  
  return (
    <Swiper {...CarouselConstants.swiperOptions} className="!p-3 mt-20 md:container container-none" onSlideChange={handleSlideChange}>
      {PosterConstants.map((poster, index) => (
        <SwiperSlide key={index} className={`rounded-lg`}>
          <div className="relative lg:w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
            <Image src={poster} alt={`Poster-${index}`} className="absolute top-0 overflow-hidden rounded-2xl left-0 w-full h-full object-cover" />
          </div>
        </SwiperSlide>
      ))}
        <div className="!flex items-center justify-center h-5 mt-5">
          <ArrowLeft className="swiper-button-prev !relative mx-4" color="gray"/>
            {PosterConstants.map((_, index) => <div key={index} className={`rounded-full w-3 h-3 z-20 mx-1`} style={{backgroundColor:  index === position ? "#616BDA" : "#4c4c4c"}}/>)}
          <ArrowRight className="swiper-button-next !relative mx-4" color="gray"/>
      </div>
    </Swiper>
  );
};

export default PosterCarousel;