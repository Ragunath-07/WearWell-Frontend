import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import banner1 from '../assets/images/Banner 1.png'
import banner2 from '../assets/images/Banner 2.png'
import banner3 from '../assets/images/Banner 3.png'
import banner4 from '../assets/images/Banner 4.png'

function Slider() {

    const sliderImages = [
        { img: banner1 },
        { img: banner2 },
        { img: banner3 },
        { img: banner4 }
    ]

    return (
        <section className='slider flex justify-center mt-10 mx-5'>
            <Swiper modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                className='slider__swiper rounded-2xl overflow-hidden max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl'
            >
                    {sliderImages.map(function (sliderImg, index) {
                        return (
                            <SwiperSlide key={index} className='flex items-center justify-center'>
                                <img src={sliderImg.img} alt={`${sliderImg}:${index}`} />
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </section>
    )
}

export default Slider