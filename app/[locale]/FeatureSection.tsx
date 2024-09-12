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

const activities = [
  { name: "Yoga", image: "/yoga.jpg?height=300&width=300" },
  { name: "Cycling", image: "/cycling.jpg?height=300&width=300" },
  { name: "Fitness", image: "/training.jpg?height=300&width=300" },
  { name: "Bouldering", image: "/bouldering.jpg?height=300&width=300" },
  { name: "Dance", image: "/dance.jpg?height=300&width=300" },
  { name: "Wellness", image: "/wellness.jpeg?height=320&width=320" },
];

export default function FeatureSection() {
  return (
    <>
      <Container size="lg" className={styles.box}>
        <Center>
          <Title order={3} mb="md" className={styles.mainTitle}>
            Get access to the top studios and many additional fitness and
            wellness offers in your city and across Vietnam. Are you ready?
          </Title>
        </Center>
      </Container>
      <div className={styles.featureSection}>
        <Container size="xl">
          {/* <Title order={2} align="center" mb="xl" className={styles.mainTitle}> */}

          <div className={styles.mobileContent}>
            <Title order={2} mb="md">
              Embark on a new kind of fitness journey
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
                          alt={activity.name}
                          width={300}
                          height={300}
                          className={styles.activityImage}
                        />
                      </Card.Section>
                      <Center>
                        <Text mt="sm">{activity.name}</Text>
                      </Center>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className={styles.mobileContent}>
                <Text size="lg">
                  Sick of the same old? You'll never get bored with us. Discover
                  new activities every day.
                </Text>
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
                          alt={activity.name}
                          width={300}
                          height={300}
                          className={styles.activityImage}
                        />
                      </Card.Section>
                      <Text className={styles.activityName}>
                        {activity.name}
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
                Embark on a new kind of fitness journey
              </Title>
              <div className={styles.featureList}>
                <div>
                  <Title order={2} size="h1" mb="xs">
                    Endless variety
                  </Title>
                  <Text size="lg">
                    Choose from many types of sports and wellness offered by our
                    partners
                  </Text>
                </div>
                <div>
                  <Title order={2} size="h1" mb="xs">
                    Discover something new
                  </Title>
                  <Text size="lg">
                    Sick of the same old? You'll never get bored with us.
                    Discover new activities every day.
                  </Text>
                </div>
                <div>
                  <Title order={2} size="h1" mb="xs">
                    Save with a membership
                  </Title>
                  <Text size="lg">
                    Exclusive member rates and in-app promotions
                  </Text>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
}