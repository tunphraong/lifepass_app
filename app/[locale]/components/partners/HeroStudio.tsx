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

export default function HeroPartners() {
  return (
    <section className={classes.heroSection}>
      <Container size="lg">
        <Grid align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap="md" className={classes.stack_margin_bottom}>
              <Text className={classes.uppercase}>WELLHUB FOR PARTNERS</Text>
              <Title order={1} className={classes.heroTitle}>
                Drive membership and revenue with Wellhub - for free!
              </Title>
              <Text fw={600}>
                Our corporate wellness platform provides employees support for
                fitness, mindfulness, therapy, nutrition, and sleep. Become a
                partner and grow your business.
              </Text>
              <Button
              // className={classes.primaryButton}
              >
                Partner with Wellhub
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
