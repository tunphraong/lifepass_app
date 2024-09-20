import { Container, Title, Text, Button, Box } from "@mantine/core";
import styles from "./DiscoverPossibilities.module.css";
import { useTranslations } from "next-intl";

export default function DiscoverPossibilities() {
  const t = useTranslations("DiscoverPossibilities");

  return (
    <Box className={styles.wrapper}>
      <Container size="md" className={styles.container}>
        <Title order={2} className={styles.title}>
          {t("title")}
        </Title>
        <Text fw={500} className={styles.description}>
          {t("description")}
        </Text>
        <Button size="lg" radius="xl" className={styles.button}>
          {t("buttonText")}
        </Button>
      </Container>
    </Box>
  );
}
