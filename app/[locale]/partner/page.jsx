import React from "react";
import Feature from "./components/Feature";
import CTA from "./components/CTA";
// import Pilates from "../../../public/pilates.jpg";
import Pilates from "../../public/pilates.jpg";
import Image from "next/image";
import Header from "../../components/Header";

export default function Partner() {
    return (
        <>
        <Header></Header>
        <section className="bg-[#fcfaf8] dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        Tăng doanh thu của bạn miễn phí với LifePass
                    </h1>
                    <p className="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        Đăng doanh nghiệp của bạn trên LifePass để tiếp cận hàng ngàn khách
                        hàng mới, lấp đầy khách hàng vào những phòng tập còn trống để tăng
                        doanh thu
                    </p>
                    <a
                        href="https://tally.so/r/mBGqV7"
                        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center
                rounded-lg
                 text-white bg-[#f5ac2d]
                 hover:bg-[#f4462c]
                  focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    >
                        Tham gia
                        <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </a>
                </div>

                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    {/* <img
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                        alt="mockup"
                    /> */}

                    <Image
                        src={Pilates}
                        width={500}
                        height={500}
                    >

                    </Image>

                </div>
            </div>

            <Feature></Feature>
            <CTA></CTA>
        </section>
        </>
        
    );
};