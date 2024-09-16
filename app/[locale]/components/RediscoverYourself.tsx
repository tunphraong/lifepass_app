import { Container, Grid, Title, Text, Button, Box } from "@mantine/core";
import Image from "next/image";
import styles from "./RediscoverYourself.module.css";
import { Link } from "../../../navigation";

export default function RediscoverYourself() {
  return (
    <section className={styles.section}>
      <Container size="lg" className={styles.container}>
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Box className={styles.imageContainer}>
              <Image
                src="/acupunture.jpg"
                alt="Acunpunture"
                width={400}
                height={300}
                className={styles.image1}
              />
              <Image
                src="/pilates_class.jpg"
                alt="Swimming pool"
                width={400}
                height={300}
                className={styles.image2}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title order={2} className={styles.title}>
              Rediscover yourself
            </Title>
            <Text className={styles.description}>
              Add variety to your workout and wellness plan by trying activities
              such as Ice Bath, Compression Booths or Acupunture.
            </Text>
            <Button
              component={Link}
              href="/prices"
              radius="xl"
              size="lg"
              // className={styles.button}
            >
              View memberships
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
