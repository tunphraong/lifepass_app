"use client"; // If you are using Next.js App Router

import React from "react";
import {
  Box,
  Group,
  Text,
  ThemeIcon,
  Title,
  Rating,
  Tabs,
  Divider,
  ActionIcon,
  Stack,
  Space,
  Spoiler,
  Center,
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
} from "@tabler/icons-react";
import Image from "next/image";
import StudioSchedule from "./StudioSchedule";
import styles from "./StudioInfo.module.css";
import { Link } from "../../navigation";
import StudioAddress from "./StudioAddress";
import { useState } from "react"; // Import useState
import { log } from "console";

interface StudioInfoProps {
  //   studio: Studio;
  studio: any;
}

export function StudioInfo({ studio }: StudioInfoProps) {
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
  } = studio;

  let logo;
  logo = "/test-icon.jpg";
  if (name == "Reborn Fitness & Health") {
    logo = "/reborn.png"
  }

  // Map amenities to corresponding icons (you'll need to import these icons)
  const amenityIcons = {
    Shower: <IconBath size={16} />,
    Locker: <IconLock size={16} />,
    Mat: <IconYoga size={16} />,
    Towel: <IconWallpaper size={16} />,
    Parking: <IconParking size={16} />,
    Water: <IconDroplet size={16} />,
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
    setActiveTab("schedule");
  };

  return (
    <Box mt={4}>
      <Tabs
        value={activeTab}
        defaultValue="info"
        mt="lg"
        onChange={setActiveTab}
      >
        <Tabs.List grow>
          <Tabs.Tab value="info">Thông tin ℹ️</Tabs.Tab>
          <Tabs.Tab value="schedule">Lịch 📅</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="schedule">
          <Group align="center" justify="space-between">
            <Title
              order={2}
              // color="yellow"
            >
              {name} 🌟
            </Title>
            <Image
              src={logo}
              // src={imageUrl} // Assuming imageUrl is provided from props
              width={70}
              height={70}
              alt={name}
              className={styles.studioImage}
            />
          </Group>

          {selectedClass ? (
            <Spoiler
              maxHeight={60}
              showLabel={<Text color="yellow">Read more</Text>}
              hideLabel={<Text color="yellow">Hide</Text>}
              mt="md"
            >
              <Text color="dimmed">{selectedClass.description}</Text>
            </Spoiler>
          ) : (
            <Text color="dimmed">
              No class selected. Please select a class to see its description.
            </Text>
          )}

          <Divider my="md" />

          <StudioSchedule
            studioId={studio.id}
            filter={classFilter}
            onClassClick={handleClassClick}
          />
        </Tabs.Panel>

        <Tabs.Panel value="info" className={styles.tabPanel}>
          <Group align="center" justify="space-between">
            <Title
              order={3}
            >
              {name} 🌟
            </Title>
            <Image
              src={logo}
              // src={imageUrl} // Assuming imageUrl is provided from props
              width={100}
              height={100}
              alt={name}
              className={styles.studioImage}
            />
          </Group>

          <Spoiler
            maxHeight={60}
            showLabel={<Text color="yellow">Read more</Text>}
            hideLabel={<Text color="yellow">Hide</Text>}
            mt="md"
          >
            <Text color="dimmed">{description}</Text>
          </Spoiler>

          <Divider my="md" />

          <StudioAddress address={address}></StudioAddress>
          <Group mt={3} align="center">
            <ThemeIcon size={24} radius="md" color="yellow">
              <IconPhone size={16} />
            </ThemeIcon>
            <Text size="sm" color="dimmed">
              {phoneNumber}
            </Text>
          </Group>

          {website && (
            <Group mt={3} align="center">
              <ThemeIcon size={24} radius="md" color="yellow">
                <IconAt size={16} />
              </ThemeIcon>
              <Link
                href={website}
                target="_blank"
                // rel="noopener noreferrer"
                className={styles.link}
              >
                {website}
              </Link>
            </Group>
          )}

          {socialMedia && (
            <Group mt={3} gap="xs">
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <IconBrandInstagram size={24} />
                </a>
              )}
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <IconBrandFacebook size={24} />
                </a>
              )}
              {/* {socialMedia.twitter && (
                <a
                  href={socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <IconBrandTwitter size={24} color="yellow" />
                </a>
              )} */}
            </Group>
          )}

          <Divider my="md" />

          <Space h="xl" />

          <Stack gap="sm">
            <Title order={3}>Đặt lớp 🎟️</Title>
            <StudioSchedule
              studioId={studio.id}
              filter=""
              onClassClick={handleClassClick}
            ></StudioSchedule>
          </Stack>

          <Space h="xl" />

          <Divider my={10} />

          <Stack gap="sm">
            <Title order={3}>Chuẩn bị 📋</Title>
            <Text>{prepare}</Text>
          </Stack>

          <Divider my={20} />

          <Stack gap="sm">
            <Title order={3}>Tiện nghi 🛀</Title>
            <div className={styles.amenitiesGrid}>
              {amenities.map((amenity) => (
                <Center key={amenity}>
                  <ThemeIcon size={35} radius="md" color="yellow">
                    {amenityIcons[amenity]}
                  </ThemeIcon>
                  <Text>{amenity}</Text>
                </Center>
              ))}
            </div>
          </Stack>

          <Divider my={20} />

          <Stack gap="sm">
            <Title order={3}>Chỉ dẫn đường 🗺️</Title>
            <Spoiler
              maxHeight={80}
              showLabel="Đọc thêm"
              hideLabel="Ẩn"
              classNames={{
                control: styles.spoilerControl,
                content: styles.spoilerContent,
              }}
            >
              <Text>{directions}</Text>
            </Spoiler>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
