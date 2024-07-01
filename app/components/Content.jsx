import React from 'react';
// import Yoga from "../../../public/yoga.jpg";
import Yoga from "../../public/yoga.jpg";
import Spa from "../../public/spa.jpg";
import Boxing from "../../public/boxing.jpg";
import Pilates from "../../public/pilates.jpg";
import RockClimbing from "../../public/rock-climbing.jpg";
import Salon from "../../public/salon.jpg";
import Image from 'next/image';

export default function Content() {
  return (
    <section className=" dark:bg-gray-900">
      <div className=" md:pb-16 md:pl-12 md:pr-12
       sm:text-center
        pl-4 pr-4 pb-8 pt-8 max-w-7xl ml-auto mr-auto
      ">
        <div className='sm:grid-cols-4 sm:grid sm:mt-12 mt-8
      gap-4'>
          <Image className='sm:mb-0 rounded-lg mb-4 col-span-2'
            src={Yoga}
            width={500}
            height={200}
          ></Image>

          <Image className='sm:mb-0 rounded-lg mb-4 col-span-1 sm:block hidden'
            src={Boxing}
            width={200}
            height={100}
          ></Image>

          <Image className='sm:mb-0 rounded-lg mb-4 col-span-1 sm:block hidden'
            src={Pilates}
            width={170}
            height={85}
          ></Image>

          <Image className='sm:mb-0 rounded-lg mb-4 col-span-1 sm:block hidden'
            src={RockClimbing}
            width={200}
            height={400}
          ></Image>

          <Image className='sm:mb-0 rounded-lg mb-4 col-span-1 sm:block hidden'
            src={Salon}
            width={200}
            height={400}
          ></Image>

          <Image className='sm:mb-0 rounded-lg mb-4 col-span-2'
            src={Spa}
            width={500}
            height={500}
          ></Image>

        </div>
      </div>
    </section>
  );
}
