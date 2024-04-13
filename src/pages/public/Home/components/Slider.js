import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Slider = () => {
    return (
        <div className='slider'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={30}
                slidesPerView={1} // Hiển thị 3 ảnh trên mỗi slide
                loop={true} // Vòng lặp Swiper
                navigation // Bật điều hướng trước/sau
                pagination={{ clickable: true }} // Bật phân trang có thể click
                autoplay={{ delay: 3000 }} // Tự động chạy
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}

            >
                <SwiperSlide>
                    <img src="https://static-assets.diningcity.asia/DC%20homepage%20banner%20web-EN.jpg" alt="Ảnh 1" width="1530px" height="350" className='img1' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://static-assets.diningcity.asia/DC%20homepage%20banner%20web-EN.jpg" alt="Ảnh 2" width="1530px" height="350" className='img1' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://static-assets.diningcity.asia/DC%20homepage%20banner%20web-EN.jpg" alt="Ảnh 3" width="1530px" height="350" className='img1' />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider