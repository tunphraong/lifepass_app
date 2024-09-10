import { Button, Grid, Flex, Container, Title } from "@mantine/core";
import styles from "./CorporateFitness.module.css";

export default function CorporateFitness() {
  return (
    <div className={styles.container}>
      <Container size="lg" mb={30} mt={20}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex
              className={styles.textContainer}
              direction="column"
              justify="center"
            >
              <Title order={1} className={styles.title}>
                Empower Your Teams with LifePass Corporate Fitness
              </Title>
              <p className={styles.description}>
                Boost employee morale and health by offering exclusive fitness
                and wellness benefits. From gym access to online classes,
                LifePass provides flexible solutions that fit your company's
                unique needs.
              </p>
              <Button
                size="md"
                radius="xl"
                color="yellow"
                style={{ width: "auto", alignSelf: "flex-start" }}
              >
                More about corporate fitness
              </Button>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={styles.imageContainer}>
              <img
                src="/corporate-fitness.jpg"
                alt="Corporate fitness program"
                className={styles.image}
              />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
