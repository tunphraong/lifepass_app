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
  Divider,
  ActionIcon,
  Stack,
  Space,
  Spoiler,
  Center,
  Button,
  CardSection,
} from "@mantine/core";
import {
  IconUserPlus,
  IconHeart,
  IconStar,
  IconMapPin,
  IconInfoCircle,
  IconPhone,
  IconAt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBath,
  IconLock,
  IconParking,
  IconWallpaper,
  IconYoga,
  IconDroplet,
  IconCoffee,
  IconClock,
} from "@tabler/icons-react";
import Image from "next/image";
import StudioSchedule from "./StudioSchedule";
import styles from "./StudioInfo.module.css";
import { Link } from "../../navigation";
import StudioAddress from "./StudioAddress";
import { useState } from "react"; // Import useState
import { useTranslations } from "next-intl";
import StudioImagesCarousel from "./StudioImagesCarousel";
import ClassCard from "./ClassCard";

interface StudioInfoProps {
  studio: any;
  loggedIn: boolean;
}

export function StudioInfo({ studio, loggedIn }: StudioInfoProps) {
  // const categories = ["Rock Climbing", "Bouldering", "Fitness", "Yoga"];
  const photos = [
    { src: "/placeholder.svg?height=400&width=600", alt: "Climbing wall" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Bouldering area" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Fitness area" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Yoga studio" },
  ];
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
    categories
  } = studio;

  let logo;
  logo = "/test-icon.jpg";
  if (name == "Reborn Fitness & Health") {
    logo = "/reborn.png";
  }

      const classes = [
        {
          name: "Beginner Bouldering",
          time: "Today, 2:00 PM",
          duration: "90 min",
          spots: 3,
          type: "Bouldering",
        },
        {
          name: "Lead Climbing Basics",
          time: "Tomorrow, 10:00 AM",
          duration: "2 hours",
          spots: 5,
          type: "Rock Climbing",
        },
        {
          name: "Advanced Technique Workshop",
          time: "Sat, 1:00 PM",
          duration: "3 hours",
          spots: 2,
          type: "Rock Climbing",
        },
        {
          name: "Yoga for Climbers",
          time: "Today, 6:00 PM",
          duration: "60 min",
          spots: 8,
          type: "Yoga",
        },
        {
          name: "Core Strength for Climbing",
          time: "Tomorrow, 5:00 PM",
          duration: "45 min",
          spots: 10,
          type: "Fitness",
        },
      ];

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

  const [activeTab, setActiveTab] = useState<string | null>("info"); // State for active tab
  // const handleTabChange = (value: string | null) => {
  //   setActiveTab(value);
  //   if (value === "info") {
  //     setSelectedClassName(null); // Reset selected class when switching to Info tab
  //   }
  // };

  const [selectedClass, setSelectedClass] = useState(null); // State to manage selected class
  const [classFilter, setClassFilter] = useState(""); // State to manage class filter

  const handleClassClick = (classInfo) => {
    setSelectedClass(classInfo);
    setClassFilter(classInfo.name);
    // setActiveTab("schedule");
  };

  return (
    <main className={styles.main}>
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
          <Button>Book a Session</Button>
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
          <Tabs.Tab value="schedule">Schedule</Tabs.Tab>
          <Tabs.Tab value="amenities">Amenities</Tabs.Tab>
          <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="schedule">
          <Card>
            <div>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <Group
                  key={day}
                  // position="apart"
                  className={styles.scheduleItem}
                >
                  <Text>{day}</Text>
                  <Text>8:00 AM - 10:00 PM</Text>
                </Group>
              ))}
            </div>
          </Card>
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

      <div>
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
