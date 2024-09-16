import React from "react";
import {
  Button,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "./HeroStudio.module.css";
import { Link } from "react-alice-carousel";

export default function HeroPartners() {
  return (
    <section className={classes.heroSection}>
      <Container size="xl">
        <Grid align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap="md" className={classes.stack_margin_bottom}>
              <Text size="lg" fw={600} className={classes.uppercase}>
                LIFEPASS FOR PARTNERS
              </Text>
              <Title order={1} fw={800} className={classes.heroTitle}>
                {/* Drive membership and revenue with LifePass - for free!  */}
                Boost your membership and earnings with LifePass - at no cost!
              </Title>
              <Text fw={600} size="lg" mr={10}>
                Our holistic wellness platform connects employees with services
                spanning fitness, mental health, nutrition, and sleep. Join our
                partner network to expand your reach and grow your business.
              </Text>
              <Button
                className={classes.primaryButton}
                size="lg"
                radius="xl"
                mt="30px"
                component={Link}
                href="https://tally.so/r/mBGqV7"
              >
                Partner with LifePass
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }} className={classes.hiddenMobile}>
            <Image
              src="/yoga_class.jpg?height=400&width=600"
              alt="People exercising"
              radius="lg"
              className={classes.heroImage}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
