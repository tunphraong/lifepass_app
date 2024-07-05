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
} from "@tabler/icons-react";
import Image from "next/image";
import StudioSchedule from "./StudioSchedule";
import styles from "./StudioInfo.module.css";
import Link from "next/link";
import StudioAddress from "./StudioAddress";

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

  // console.log(studio);

  // Map amenities to corresponding icons (you'll need to import these icons)
  const amenityIcons = {
    Shower: <IconBath size={16} />,
    Locker: <IconLock size={16} />,
    Mat: <IconYoga size={16} />,
    Towel: <IconWallpaper size={16} />,
    Parking: <IconParking size={16} />,
    // Add more amenity mappings as needed
  };

  return (
    <div className="mt-4">
      <Group justify="space-between">
        <Title order={2}>{name}</Title>
        <Space w="md" />
        <Image
          src={"/test-icon.jpg"}
          width={70}
          height={70}
          alt={name}
          style={{ marginLeft: "auto" }}
        />
      </Group>

      {/* Rating, Reviews, and Location */}
      {/* <Group spacing="xs">
        <Rating value={rating ?? 0} readOnly />
        <Text size="sm" color="dimmed">
          ({rating}) • (20,000+) reviews
        </Text>
        <ThemeIcon color="gray" variant="light">
          <IconMapPin size={14} />
        </ThemeIcon>
        <Text size="sm" color="dimmed">
          {location}
        </Text>
      </Group> */}

      {/* Description */}
      {/* <Text c="dimmed" size="sm" mt={5}>
        {description}
      </Text> */}

      <Spoiler
        maxHeight={50}
        showLabel={
          <Text c="my-color" size="sm">
            Đọc thêm
          </Text>
        }
        hideLabel={
          <Text c="my-color" size="sm">
            Ẩn
          </Text>
        }
      >
        {description}
      </Spoiler>

      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Thông tin</Tabs.Tab>
          <Tabs.Tab value="schedule">Lịch</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="schedule">
          <StudioSchedule studioId={studio.id}></StudioSchedule>
        </Tabs.Panel>

        <Tabs.Panel value="info" className={styles.tabPanel}>
          {/* Render the studio info here */}
          {/* <div>Studio Information</div> */}

          {/* <Group mb="md">
            <ThemeIcon size={24} radius="md">
              <IconMapPin size={16} />
            </ThemeIcon>
            <Text size="sm" color="dimmed">
              {address}
            </Text>
          </Group> */}

          <StudioAddress address={address}></StudioAddress>

          <Group wrap="nowrap" mb="md">
            <ThemeIcon size={24} radius="md">
              <IconPhone size={16} />
            </ThemeIcon>
            <Text size="sm" color="dimmed">
              {phoneNumber}
            </Text>
          </Group>

          {website && (
            <Group wrap="nowrap" mb="md">
              <ThemeIcon className={styles.iconWrapper} size={24} radius="md">
                <IconAt size={16} />
              </ThemeIcon>
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {website}
              </Link>
            </Group>
          )}

          {/* Social Media Links */}
          {socialMedia && (
            <Group gap="xs" mb="md">
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Group>
                    <IconBrandInstagram size={20} />
                    <Text size="sm" c="dimmed">
                      {new URL(socialMedia.instagram).pathname.slice(1)}
                    </Text>
                  </Group>
                </a>
              )}
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Group>
                    <IconBrandFacebook size={20} />
                    <Text size="sm" c="dimmed">
                      {new URL(socialMedia.facebook).pathname.slice(1)}
                    </Text>
                  </Group>
                </a>
              )}
              {socialMedia.twitter && (
                <a
                  href={socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Group>
                    <IconBrandTwitter size={20} />
                    <Text size="sm" c="dimmed">
                      {new URL(socialMedia.facebook).pathname.slice(1)}
                    </Text>
                  </Group>
                </a>
              )}
            </Group>
          )}

          <Divider my="md" />

          <StudioSchedule studioId={studio.id}></StudioSchedule>

          <Divider my="md" />

          <div>
            <Title order={3}>Chuẩn bị</Title>
            <Text size="md" style={{ marginBottom: "1rem" }}>
              {prepare}
            </Text>
          </div>

          <Divider my="md" />

          <div>
            <Title order={3}>Tiện nghi</Title>
            <div className={styles.amenitiesGrid}>
              {" "}
              {/* Apply grid layout from CSS module */}
              {/* {amenities.map((amenity) => (
                <Group key={amenity} spacing="xs">
                  <ThemeIcon size={35} radius="md">
                    {amenityIcons[amenity]}
                  </ThemeIcon>
                  <Text size="md">{amenity}</Text>
                </Group>
              ))} */}
              {amenities.map((amenity) => (
                <Stack key={amenity} align="center" gap="xs">
                  <ThemeIcon size={35} radius="md">
                    {amenityIcons[amenity]}
                  </ThemeIcon>
                  <Text size="md">{amenity}</Text>
                </Stack>
              ))}
            </div>
          </div>

          <Divider my="md" />

          {/* How to Get There Section */}
          <div>
            <Title order={3}>Chỉ dẫn đường</Title>
            <Spoiler
              maxHeight={50}
              showLabel="Đọc thêm"
              hideLabel="Ẩn"
              classNames={{
                control: styles.spoilerControl,
                content: styles.spoilerContent,
              }}
            >
              <Text size="md">
                {directions}
                {/* Assuming 'studio.directions' contains your detailed instructions */}
              </Text>
            </Spoiler>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
