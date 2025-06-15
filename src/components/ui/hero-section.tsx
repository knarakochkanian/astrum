'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const slides = [
    {
        image: 'https://admgel.ru/upload/medialibrary/b07/foto-2.jpg',
        title: 'Путешествие в горы',
        description: 'Ощутите величие природы и чистый воздух высокогорья.',
    },
    {
        image: 'https://sutochno.ru/doc/images/galleries/180/otdyh-sochi1.jpg',
        title: 'Морской бриз',
        description: 'Расслабьтесь у моря и наслаждайтесь солнцем.',
    },
    {
        image: 'https://traveller-eu.ru/sites/default/files/styles/main_img/public/59f1c7e415e9f9181233f83c.webp?itok=Obrm-YKe',
        title: 'Городские приключения',
        description: 'Исследуйте улицы, музеи и культуру мегаполисов.',
    },
];

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative h-screen min-h-[600px] flex items-center justify-center text-primary-foreground overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src="/home/bus.jpg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    className="z-0"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-20 container mx-auto px-4 md:px-6 animate-fade-in mb-52">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper mb-12"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className=" gap-x-10 overflow-hidden shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row text-black">
                                <div className="relative  w-full md:w-1/2 h-84 md:h-auto">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="w-full h-full rounded-3xl"
                                    />
                                </div>

                                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-left">
                                    <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                                    <p className="text-base mb-6">{slide.description}</p>
                                    <Button
                                        variant="accent"
                                        className="font-semibold text-sm px-6 py-3 shadow-md hover:scale-105 transition-transform"
                                    >
                                        Подробнее
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
}
