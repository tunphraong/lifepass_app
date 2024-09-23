import { Container, Grid, Title, Text, Button, Box } from "@mantine/core";
import Image from "next/image";
import styles from "./RediscoverYourself.module.css";
import { Link } from "../../../navigation";
import { useTranslations } from "next-intl";

export default function RediscoverYourself() {
  const t = useTranslations("RediscoverYourself");

  return (
    <section className={styles.section}>
      <Container size="lg" className={styles.container}>
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Box className={styles.imageContainer}>
              <Image
                src="/acupunture.jpg"
                alt={t("image1Alt")}
                width={400}
                height={300}
                className={styles.image1}
              />
              <Image
                src="/pilates_class.jpg"
                alt={t("image2Alt")}
                width={400}
                height={300}
                className={styles.image2}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title order={2} className={styles.title}>
              {t("title")}
            </Title>
            <Text className={styles.description}>{t("description")}</Text>
            <Button component={Link} href="/prices" radius="xl" size="lg">
              {t("buttonText")}
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
