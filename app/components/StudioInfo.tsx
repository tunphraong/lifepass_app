"use client"; // If you are using Next.js App Router

import React from "react";
import {
  Box,
  Group,
  Text,
  ThemeIcon,
  Title,
  Card,
  Rating,
  Tabs,
  Button,
  rem
} from "@mantine/core";
import {
  IconBath,
  IconLock,
  IconParking,
  IconWallpaper,
  IconYoga,
  IconDroplet,
  IconCoffee,
  IconClock,
  IconArrowLeft,
  IconPhone,
  IconStar,
  IconCalendar
} from "@tabler/icons-react";
import Image from "next/image";
import StudioSchedule from "./StudioSchedule";
import styles from "./StudioInfo.module.css";
import { Link } from "../../navigation";
import StudioAddress from "./StudioAddress";
import { useState, useRef } from "react"; // Import useState
import { useTranslations } from "next-intl";
import StudioImagesCarousel from "./StudioImagesCarousel";
import ClassCard from "./ClassCard";
import { useRouter } from "next/navigation";
import StudioHours from "./StudioHours";

interface StudioInfoProps {
  studio: any;
  loggedIn: boolean;
}

export function StudioInfo({ studio, loggedIn }: StudioInfoProps) {
  const t = useTranslations("StudioInfo");
  const {
    name,
    description,
    location,
    imageUrl,
    rating,
    phoneNumber,
    website,
    socialMedia,
    address,
    amenities,
    directions,
    prepare,
    categories,
  } = studio;
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const scheduleRef = useRef<HTMLDivElement>(null);

  const handleBookSessionClick = () => {
    if (scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  let logo;
  logo = "/test-icon.jpg";
  if (name == "Reborn Fitness & Health") {
    logo = "/reborn.png";
  }

  // Map amenities to corresponding icons (you'll need to import these icons)
  const amenityIcons = {
    Shower: <IconBath size={16} />,
    Locker: <IconLock size={16} />,
    Mat: <IconYoga size={16} />,
    Towel: <IconWallpaper size={16} />,
    Parking: <IconParking size={16} />,
    Water: <IconDroplet size={16} />,
    Coffee: <IconCoffee size={16} />,
    // Add more amenity mappings as needed
  };

  const [selectedClass, setSelectedClass] = useState(null); // State to manage selected class
  const [classFilter, setClassFilter] = useState(""); // State to manage class filter

  const handleClassClick = (classInfo) => {
    setSelectedClass(classInfo);
    setClassFilter(classInfo.name);
    // setActiveTab("schedule");
  };

  return (
    <main className={styles.main}>
      <Group mb="md">
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="filled"
          color="dark"
          radius="xl"
          onClick={handleBack}
        >
          Back
        </Button>
      </Group>
      <div className={styles.gymInfo}>
        <h2 className={styles.gymTitle}>{name}</h2>
        <Group gap="xs" className={styles.gymLocation}>
          {/* <IconMapPin size={16} /> */}
          {/* <Text>123 Climb Street, Boulder City, 12345</Text> */}
          <StudioAddress address={address}></StudioAddress>
        </Group>
        <Group gap="lg" className={styles.gymDetails}>
          {/* <Group gap="xs">
            <IconStar size={20} color="yellow" />
            <Text>4.8</Text>
            <Text className={styles.grayText}>(120 reviews)</Text>
          </Group> */}
          <Group gap="xs">
            <IconClock size={16} />
            <Text className={styles.grayText}>Open until 10:00 PM</Text>
          </Group>
        </Group>
        <Text size="lg" fw={600} className={styles.gymDescription}>
          {description}
        </Text>

        <Group className={styles.actions}>
          <Button onClick={handleBookSessionClick}>Book a Session</Button>
          <Button variant="outline" leftSection={<IconPhone size={16} />}>
            Contact
          </Button>
        </Group>

        <div className={styles.categories}>
          <h3>Categories</h3>
          <Group gap="sm" className={styles.categoryList}>
            {categories.map((category) => (
              <span key={category} className={styles.categoryItem}>
                {category}
              </span>
            ))}
          </Group>
        </div>

        <div className={styles.photos}>
          <h3>Photos</h3>

          {/* {photos.map((photo, index) => (
              <Image
                key={index}
                width={600}
                height={400}
                src={photo.src}
                alt={photo.alt}
                className={styles.photo}
              />
            ))} */}
          <StudioImagesCarousel studio={studio} />
        </div>
      </div>

      <Tabs defaultValue="schedule" className={styles.tab}>
        <Tabs.List grow>
          <Tabs.Tab
            leftSection={
              <IconCalendar style={{ width: rem(16), height: rem(16) }} />
            }
            value="schedule"
          >
            Schedule
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={
              <IconCoffee style={{ width: rem(16), height: rem(16) }} />
            }
            value="amenities"
          >
            Amenities
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={
              <IconStar style={{ width: rem(16), height: rem(16) }} />
            }
            value="reviews"
          >
            Reviews
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="schedule">
          {/* <Card> */}
          {/* <div>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <Group key={day} grow className={styles.scheduleItem}>
                  <Text>{day}</Text>
                  <Text>8:00 AM - 07:00 PM</Text>
                </Group>
              ))}
            </div> */}
          <StudioHours studioId={studio.id}></StudioHours>
          {/* </Card> */}
        </Tabs.Panel>

        <Tabs.Panel className={styles.tabPanel} value="amenities">
          <div className={styles.amenitiesList}>
            <ul>
              {amenities.map((amenity) => (
                <>
                  <li>{amenity}</li>
                </>
              ))}
            </ul>
          </div>
        </Tabs.Panel>

        {/* Other Tab Content */}
      </Tabs>

      <div ref={scheduleRef}>
        <h3>Upcoming Classes</h3>
        {/* {classes.map((cls, index) => (
          <ClassCard
            key={index}
            className={cls.name}
            time={cls.time}
            duration={cls.duration}
            spotsLeft={cls.spots}
          />
        ))} */}

        <StudioSchedule
          loggedIn={loggedIn}
          studioId={studio.id}
          filter={classFilter}
          onClassClick={handleClassClick}
        ></StudioSchedule>
      </div>
    </main>
  );
}
