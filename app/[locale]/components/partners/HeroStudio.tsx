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
import { useTranslations } from "next-intl";

export default function HeroPartners() {
  const t = useTranslations("partners.HeroPartners");

  return (
    <section className={classes.heroSection}>
      <Container size="xl">
        <Grid align="center">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap="md" className={classes.stack_margin_bottom}>
              <Text size="lg" fw={600} className={classes.uppercase}>
                {t("subtitle")}
              </Text>
              <Title order={1} fw={800} className={classes.heroTitle}>
                {t("title")}
              </Title>
              <Text fw={600} size="lg" mr={10}>
                {t("description")}
              </Text>
              <Button
                className={classes.primaryButton}
                size="lg"
                radius="xl"
                mt="30px"
                component={Link}
                href="https://tally.so/r/mBGqV7"
              >
                {t("buttonText")}
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }} className={classes.hiddenMobile}>
            <Image
              src="/yoga_class.jpg?height=400&width=600"
              alt={t("imageAlt")}
              radius="lg"
              className={classes.heroImage}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
