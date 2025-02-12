// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Slide1 from '../Slider/Slide1';
import Slide2 from '../Slider/Slide2';
import Slide3 from '../Slider/Slide3';
import Slide4 from '../Slider/Slide4';


const Banner = () => {
    return (
        <div>
           
          <Swiper
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Slide4></Slide4>  
            </SwiperSlide>
            <SwiperSlide>
                <Slide1></Slide1>
            </SwiperSlide>
            <SwiperSlide>
                <Slide3></Slide3>
            </SwiperSlide>
          </Swiper>
        </div>
      );
};

export default Banner;