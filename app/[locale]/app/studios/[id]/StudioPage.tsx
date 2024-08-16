"use client";
import useSWR from "swr";
import { Center, Text, Loader, Image } from "@mantine/core";
const fetcher = (url: any) => fetch(url).then((res) => res.json());
import React from "react";
import StudioImagesCarousel from "../../../../components/StudioImagesCarousel";
import { StudioInfo } from "../../../../components/StudioInfo";
import StudioSchedule from "../../../../components/StudioSchedule";

const StudioPage = ({ id, loggedIn }: any) => {
  const {
    data: studio,
    error,
    isLoading,
  } = useSWR(`/api/studio/${id}`, fetcher);

  const isUserLoggedIn = loggedIn;

  console.log('logged in', loggedIn);

  if (error) {
    return (
      <Center className="my-6">
        <Text>Lỗi hiển thì studio. Bạn vui lòng thử lại sau</Text>
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center className="my-6">
        <Loader />
      </Center>
    );
  }

  if (!studio) return <div>Studio not found</div>;
  return (
    <>
      <StudioImagesCarousel studio={studio} isLoading={isLoading} />
      <StudioInfo studio={studio} loggedIn={isUserLoggedIn}></StudioInfo>
      {/* <StudioSchedule studioId={studio.id}></StudioSchedule> */}
    </>
  );
};

export default StudioPage;
