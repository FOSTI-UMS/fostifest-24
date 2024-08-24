import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

const swiperOptions = {
  modules: [Pagination, Navigation, Autoplay, EffectCoverflow],
  spaceBetween: -40,
  grabCursor: true,
  centeredSlides: true,
  initialSlide: 0,
  slidesPerView: "auto",
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  },
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: 40,
    depth: 150,
    modifier: 5,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletActiveClass: ".swiper-bullet",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

export const CarouselConstants = {
    swiperOptions
}