import { Container, Grid, Text, Title, Button, Image, Group } from "@mantine/core";
import { Link } from "../../../navigation";
import styles from "./HeroSection.module.css";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section className={styles.section}>
      <Container size="lg">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <div className={styles.content}>
              <Title order={1} className={styles.title}>
                {t("title")}
              </Title>
              <Text className={styles.description}>{t("description")}</Text>
              <Group>
                <div className={styles.buttonWrapper}>
                  <Button
                    className={styles.button}
                    component={Link}
                    href="/prices"
                    size="md"
                    prefetch={false}
                    radius="xl"
                  >
                    {t("viewMembership")}
                  </Button>
                </div>

                <div className={styles.buttonWrapper}>
                  <Button
                    className={styles.button}
                    component={Link}
                    variant="outline"
                    href="/app"
                    size="md"
                    prefetch={false}
                    radius="xl"
                  >
                    {t("searchGym")}
                  </Button>
                </div>
              </Group>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Image
              src="/lifepass_activities.png"
              alt={t("imageAlt")}
              width={550}
              height={550}
              fit="cover"
              className={styles.image}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
