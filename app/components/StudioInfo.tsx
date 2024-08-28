"use client"; // If you are using Next.js App Router

import React from "react";
import {
  Box,
  Group,
  Text,
  ThemeIcon,
  Title,
  Tabs,
  Divider,
  Stack,
  Space,
  Spoiler,
  Center,
  Button,
  Loader,
  Card,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
} from "@mantine/core";
import { 
  IconPhone,
  IconAt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBath,
  IconLock,
  IconParking,
  IconClock,
  IconWallpaper,
  IconYoga,
  IconDroplet,
  IconCoffee,
} from "@tabler/icons-react";
import Image from "next/image";
import StudioSchedule from "./StudioSchedule";
import styles from "./StudioInfo.module.css";
import { Link } from "../../navigation";
import StudioAddress from "./StudioAddress";
import { useState } from "react"; // Import useState
import { useTranslations } from "next-intl";
import useSWR from "swr";
const fetcher = (url: any) => fetch(url).then((res) => res.json());

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
  } = studio;

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


  const {
    data: classData,
    isLoading: isClassLoading,
    error: classError,
  } = useSWR(
    studio.id ? `/api/classes-by-studio-id/${studio.id}` : null,
    fetcher
  );

  const [activeTab, setActiveTab] = useState<string | null>("info"); // State for active tab
  const [selectedClass, setSelectedClass] = useState(null); // State to manage selected class
  const [classFilter, setClassFilter] = useState(""); // State to manage class filter

  const handleClassClick = (classInfo) => {
    setSelectedClass(classInfo);
    setClassFilter(classInfo.name);
    setActiveTab("schedule");
  };

  if (classError) return <div>Error loading data. Please try again.</div>;
  if (isClassLoading) {
    return (
      <Center className="my-6">
        <Loader />
      </Center>
    );
  }

  return (
    <Box mt={4}>
      <Tabs
        value={activeTab}
        defaultValue="info"
        mt="lg"
        onChange={setActiveTab}
      >
        <Tabs.List grow>
          <Tabs.Tab value="info">{t("info")}</Tabs.Tab>
          <Tabs.Tab value="schedule">{t("schedule")}</Tabs.Tab>
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
            <Text color="dimmed">{t("noClassSelected")}</Text>
          )}

          <Divider my="md" />

          <StudioSchedule
            loggedIn={loggedIn}
            studioId={studio.id}
            filter={classFilter}
            onClassClick={handleClassClick}
          />
        </Tabs.Panel>

        <Tabs.Panel value="info" className={styles.tabPanel}>
          <Group align="center" justify="space-between">
            <Title order={3}>{name} 🌟</Title>
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
                  <ThemeIcon size={24} radius="md" color="yellow">
                    <IconBrandInstagram size={24} />
                  </ThemeIcon>
                </a>
              )}
            </Group>
          )}

          {socialMedia && (
            <Group mt={3} gap="xs">
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <ThemeIcon size={24} radius="md" color="yellow">
                    <IconBrandFacebook size={24} />
                  </ThemeIcon>
                </a>
              )}
            </Group>
          )}

          <Divider my="md" />

          <Space h="xl" />

          <Stack gap="sm">
            <Title order={3}>{t("bookClass")}</Title>

            <Stack>
              {classData.map((activity) => (
                <Card
                  key={activity.id}
                  shadow="sm"
                  padding="sm"
                  radius="md"
                  withBorder
                >
                  <Group justify="space-between" grow>
                    <div>
                      <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                          <Title order={6}>{activity.name}</Title>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          <Text size="sm">
                            {activity.description}
                          </Text>
                        </HoverCard.Dropdown>
                      </HoverCard>

                      <Text size="sm" color="dimmed">
                        <IconClock
                          size={16}
                          style={{ verticalAlign: "middle" }}
                        />{" "}
                        {activity.duration} mins
                      </Text>
                    </div>

                    <Button
                      className={styles.button}
                      fullWidth
                      color="yellow"
                      onClick={() => handleClassClick(activity)}
                      variant="filled"
                      radius="xl"
                      size="sm"
                    >
                      Book now
                    </Button>
                  </Group>
            
                </Card>
              ))}
            </Stack>
          </Stack>

          <Space h="xl" />

          <Divider my={10} />

          <Stack gap="sm">
            <Title order={3}>{t("preparation")}</Title>
            <Text>{prepare}</Text>
          </Stack>

          <Divider my={20} />

          <Stack gap="sm">
            <Title order={3}>{t("amenities")}</Title>
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
            <Title order={3}>{t("directions")}</Title>
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
