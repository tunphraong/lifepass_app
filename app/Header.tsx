import {
  Group,
  Button,
  Text,
  Container,
} from "@mantine/core";
import { IconApiApp } from "@tabler/icons-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Text className={styles.logo}>LifePass</Text>
        {/* <Group grow className={styles.links}>
          <Button variant="subtle">Contact</Button>
        </Group> */}
        <Button
          component="a"
          href="/app/search"
          leftSection={<IconApiApp />}
          variant="outline"
          className={styles.githubButton}
        >
          App
        </Button>
      </Container>
    </header>
  );
}
