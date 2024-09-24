"use client";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { supabase } from "@/lib/supabaseClient"; // Your Supabase client
import { createClient } from "../../utils/supabase/client";
import { Image, Skeleton } from "@mantine/core"; // Use Mantine's Image component
import { Carousel } from "@mantine/carousel";
import classes from "./StudioImageCarousel.module.css";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { rem } from "@mantine/core";

interface StudioCarouselProps {
  //   studio: Studio;
  studio: any; // Assuming you have a Studio interface defined
  // isLoading: boolean; // Indicate if data is still loading
}

const StudioImagesCarousel: React.FC<StudioCarouselProps> = ({
  studio,
  // isLoading,
}) => {
  const supabase = createClient();
  // Responsive settings for different screen sizes
  const responsive = {
    superSmall: { items: 1 }, // Example breakpoint, customize as needed
    small: { items: 2 }, // Example breakpoint, customize as needed
    medium: { items: 3 }, // Example breakpoint, customize as needed
  };

  const images = [
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
  ];

 const coverImageUrl = studio.imageUrl
   ? supabase.storage.from("public_photos").getPublicUrl(studio.imageUrl).data
       .publicUrl
   : null;

  // Fetch image URLs from Supabase Storage
  const imageUrls = [studio.imageUrl, ...studio.images].map((imagePath) => {
    const url = supabase.storage.from("public_photos").getPublicUrl(imagePath)
      .data.publicUrl;
    return url;
  });

  // if (isLoading) {
  //   return <Skeleton height={200} radius="md" />; // Placeholder while loading
  // }

    const slides = imageUrls.map((url) => (
      <Carousel.Slide key={url}>
        <Image src={url} />
      </Carousel.Slide>
    ));

  return (
    // <div className="mt-4">
    //   {/* Add margin-top to space carousel from other content */}
    //   <AliceCarousel
    //     items={imageUrls.map((imageUrl) => (
    //       <Image
    //         src={imageUrl}
    //         key={imageUrl}
    //         alt={studio.name}
    //         // width={300}
    //         // height={300}
    //         fit="cover"
    //       />
    //     ))}
    //     mouseTracking
    //     responsive={responsive}
    //     autoPlay={false}
    //     // autoPlay={studio.images.length > 1} // Autoplay only if there are multiple images
    //     // autoPlayInterval={2000}
    //     // infinite={true} // Make carousel loop infinitely
    //     disableDotsControls
    //     // disableButtonsControls
    //   />
    // </div>

    <Carousel
      withIndicators
      slideGap="sm"
      classNames={classes}
    >
      {slides}
    </Carousel>
  );
};

export default StudioImagesCarousel;
