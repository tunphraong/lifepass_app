import { Container, Title, Text, Button, Box } from "@mantine/core";
import styles from "./DiscoverPossibilities.module.css";

export default function DiscoverPossibilities() {
  return (
    <Box className={styles.wrapper}>
      <Container size="md" className={styles.container}>
        <Title order={2} className={styles.title}>
          Discover your possibilities
        </Title>
        <Text fw={500} className={styles.description}>
          Search and find all venues offering your favorite fitness and
          wellness activities. In your area, your city, and anywhere in Vietnam.
        </Text>
        <Button size="lg" color="yellow" radius="xl" className={styles.button}>
          Find venues
        </Button>
      </Container>
    </Box>
  );
}
