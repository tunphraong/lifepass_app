// HeroSection.jsx
import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Box,
  Group,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import classes from "./HeroSection.module.css";
import { Link } from "../../../../navigation";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("companies.HeroSection");

  return (
    <section className={classes.section}>
      <Container size="lg">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Box className={classes.content}>
              <Text className={classes.subtitle}>{t("subtitle")}</Text>
              <Title className={classes.title}>{t("title")}</Title>
              <Text className={classes.description}>{t("description")}</Text>
              <Group align="flex-start" className={classes.inputGroup}>
                <Button
                  component={Link}
                  href="https://tally.so/r/mOLjDM"
                  rightSection={<IconArrowRight size={14} />}
                  radius="lg"
                >
                  {t("getQuoteButton")}
                </Button>
              </Group>
              <Text size="xs" className={classes.disclaimer}>
                {t("disclaimer")}{" "}
                <a href="#" className={classes.link}>
                  {t("privacyPolicy")}
                </a>
                .
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Box className={classes.imageWrapper}>
              <Image
                src="/pexels-elly.jpeg?height=400&width=400"
                alt={t("imageAlt")}
                layout="fill"
                objectFit="cover"
                className={classes.image}
              />
              <Text className={`${classes.label} ${classes.fitnessLabel}`}>
                {t("fitnessLabel")}
              </Text>
              <Text className={`${classes.label} ${classes.nutritionLabel}`}>
                {t("wellnessLabel")}
              </Text>
              <Text className={`${classes.label} ${classes.mindfulnessLabel}`}>
                {t("mindfulnessLabel")}
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
