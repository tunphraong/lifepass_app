import React from 'react';
import Image from 'next/image';
import YogaImage from "../../public/yoga.jpg";
import SpaImage from "../../public/spa.jpg";
import BoxingImage from "../../public/boxing.jpg";
import PilatesImage from "../../public/pilates.jpg";
import RockClimbingImage from "../../public/rock-climbing.jpg";
import SalonImage from "../../public/salon.jpg";
import styles from './content.module.css';
export default function Content() {
  return (
    <section className={styles.section}>
      <div className={`${styles.contentContainer} md:pb-16 md:pl-12 md:pr-12 sm:text-center pl-4 pr-4 pb-8 pt-8 max-w-7xl ml-auto mr-auto`}>
        <div className={`${styles.grid} mt-8`}>
          <Image className={`${styles.image} rounded-lg mb-4 col-span-2`} src={YogaImage} alt="Yoga" width={500} height={200} />

          <Image className={`${styles.image} rounded-lg mb-4 col-span-1 sm:block hidden`} src={BoxingImage} alt="Boxing" width={200} height={100} />

          <Image className={`${styles.image} rounded-lg mb-4 col-span-1 sm:block hidden`} src={PilatesImage} alt="Pilates" width={170} height={85} />

          <Image className={`${styles.image} rounded-lg mb-4 col-span-1 sm:block hidden`} src={RockClimbingImage} alt="Rock Climbing" width={200} height={400} />

          <Image className={`${styles.image} rounded-lg mb-4 col-span-1 sm:block hidden`} src={SalonImage} alt="Salon" width={200} height={400} />

          <Image className={`${styles.image} rounded-lg mb-4 col-span-2`} src={SpaImage} alt="Spa" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}
