import { Container, Grid, Text, Title, Button, Image } from "@mantine/core";
import { Link } from "../../../navigation";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <div className={styles.content}>
              <Title order={1} className={styles.title}>
                Elevate Your Fitness and Wellness Journey in Vietnam
              </Title>
              <Text className={styles.description}>
                Discover and choose from hundreds of studios across Vietnam with
                just one Lifepass application. Convenient, diverse and
                economical!
              </Text>
              <div className={styles.buttonWrapper}>
                <Button
                  component={Link}
                  href="/prices"
                  size="md"
                  color="yellow"
                  className={styles.button}
                  prefetch={false}
                  radius="xl"
                >
                  View membership
                </Button>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Image
              src="/lifepass_activities.png"
              alt="Hero"
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
