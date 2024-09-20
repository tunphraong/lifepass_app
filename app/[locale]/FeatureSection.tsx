import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Image,
  ScrollArea,
  Center,
  Box,
} from "@mantine/core";
import styles from "./FeatureSection.module.css";
import { useTranslations } from "next-intl";

const activities = [
  { name: "Yoga", image: "/yoga.jpg?height=300&width=300" },
  { name: "Cycling", image: "/cycling.jpg?height=300&width=300" },
  { name: "Fitness", image: "/training.jpg?height=300&width=300" },
  { name: "Bouldering", image: "/bouldering.jpg?height=300&width=300" },
  { name: "Dance", image: "/dance.jpg?height=300&width=300" },
  { name: "Wellness", image: "/wellness.jpeg?height=320&width=320" },
];

export default function FeatureSection() {
  const t = useTranslations("FeatureSection");

  return (
    <>
      <Container size="lg" className={styles.box}>
        <Center>
          <Title order={3} mb="md" className={styles.mainTitle}>
            {t("mainTitle")}
          </Title>
        </Center>
      </Container>
      <div className={styles.featureSection}>
        <Container size="xl">
          <div className={styles.mobileContent}>
            <Title order={2} mb="md">
              {t("journeyTitle")}
            </Title>
          </div>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <ScrollArea className={styles.mobileScroll}>
                <div className={styles.scrollContent}>
                  {activities.map((activity, index) => (
                    <Card
                      key={index}
                      padding="sm"
                      radius="md"
                      className={styles.activityCard}
                    >
                      <Card.Section>
                        <Image
                          src={activity.image}
                          alt={t(`activities.${activity.name}`)}
                          width={300}
                          height={300}
                          className={styles.activityImage}
                        />
                      </Card.Section>
                      <Center>
                        <Text mt="sm">{t(`activities.${activity.name}`)}</Text>
                      </Center>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className={styles.mobileContent}>
                <Text size="lg">{t("mobileDescription")}</Text>
              </div>

              <Grid className={styles.desktopGrid}>
                {activities.slice(0, 6).map((activity, index) => (
                  <Grid.Col key={index} span={4}>
                    <Card
                      padding="none"
                      radius="md"
                      className={styles.activityCard}
                    >
                      <Card.Section>
                        <Image
                          src={activity.image}
                          alt={t(`activities.${activity.name}`)}
                          width={300}
                          height={300}
                          className={styles.activityImage}
                        />
                      </Card.Section>
                      <Text className={styles.activityName}>
                        {t(`activities.${activity.name}`)}
                      </Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Grid.Col>

            <Grid.Col
              span={{ base: 12, md: 6 }}
              className={styles.desktopContent}
            >
              <Title order={1} className={styles.title} mb="md">
                {t("journeyTitle")}
              </Title>
              <div className={styles.featureList}>
                <div>
                  <Title order={2} size="h1" mb="xs">
                    {t("endlessVariety.title")}
                  </Title>
                  <Text size="lg">{t("endlessVariety.description")}</Text>
                </div>
                <div>
                  <Title order={2} size="h1" mb="xs">
                    {t("discoverNew.title")}
                  </Title>
                  <Text size="lg">{t("discoverNew.description")}</Text>
                </div>
                <div>
                  <Title order={2} size="h1" mb="xs">
                    {t("saveMembership.title")}
                  </Title>
                  <Text size="lg">{t("saveMembership.description")}</Text>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
}
