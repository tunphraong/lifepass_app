import { Button, Card, Tabs, Text, Group, Image } from "@mantine/core";
import {
  IconMapPin,
  IconPhone,
  IconStar,
  IconClock,
  IconCircle,
  IconCompass,
  IconMap,
} from "@tabler/icons-react";
import styles from "./Component.module.css";

export default function Component() {
  const categories = ["Rock Climbing", "Bouldering", "Fitness", "Yoga"];
  const photos = [
    { src: "/placeholder.svg?height=400&width=600", alt: "Climbing wall" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Bouldering area" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Fitness area" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Yoga studio" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>LifePass</h1>
          <Button variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.gymInfo}>
          <h2 className={styles.gymTitle}>Vertical Academy</h2>
          <Group gap="xs" className={styles.gymLocation}>
            <IconMap size={16} />
            <Text>123 Climb Street, Boulder City, 12345</Text>
          </Group>
          <Group gap="lg" className={styles.gymDetails}>
            <Group gap="xs">
              <IconStar size={20} color="yellow" />
              <Text>4.8</Text>
              <Text className={styles.grayText}>(120 reviews)</Text>
            </Group>
            <Group gap="xs">
              <IconClock size={16} />
              <Text className={styles.grayText}>Open until 10:00 PM</Text>
            </Group>
          </Group>
          <Text className={styles.gymDescription}>
            Vertical Academy is Boulder City's premier rock climbing gym,
            offering world-class facilities for climbers of all levels.
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
            <div className={styles.photoGrid}>
              {photos.map((photo, index) => (
                <Image
                  key={index}
                  src={photo.src}
                  alt={photo.alt}
                  className={styles.photo}
                />
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab
              value="gallery"
              leftSection={<IconCircle />}
            >
              Gallery
            </Tabs.Tab>
            <Tabs.Tab
              value="messages"
              leftSection={<IconCompass  />}
            >
              Messages
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              leftSection={<IconClock  />}
            >
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
      </main>
    </div>
  );
}
