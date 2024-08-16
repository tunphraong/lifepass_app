import React from "react";
import {
  Container,
  Grid,
  Card,
  CardSection,
  GridCol,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import Image from "next/image";
import {
  IconCheck,
  IconGift,
  IconMapPin,
  IconEyeDollar,
} from "@tabler/icons-react";
import classes from "./FeatureSection.module.css";
import { useTranslations } from "next-intl";

interface Feature {
  icon: React.ReactNode;
  image: string;
}

const features: Feature[] = [
  {
    icon: <IconEyeDollar size={rem(24)} color="#f5ac2d" />,
    image: "/Savings-amico.svg", // Update with your downloaded image path
  },
  {
    icon: <IconMapPin size={rem(24)} color="#f5ac2d" />,
    image: "/Date-picker-cuate.svg", // Update with your downloaded image path
  },
  {
    icon: <IconGift size={rem(24)} color="#f5ac2d" />,
    image: "/Gym-amico.svg", // Update with your downloaded image path
  },
];
function FeatureSection() {
  const t = useTranslations("HomePage");
    const translatedFeatures = features.map((feature, index) => ({
      ...feature,
      title: t(`features.${index}.title`),
      description: t(`features.${index}.description`),
    }));
  return (
    <div className={classes.wrapper}>
      <Container size={1200} className={classes["content-inner"]}>
        <h2 className={classes.title}>{t("featuresTitle")}</h2>
        <Grid gutter="lg">
          {translatedFeatures.map((feature, index) => (
            <GridCol key={index} span={12}>
              <Card shadow="sm" padding="lg" className={classes.card}>
                <CardSection>
                  <Image
                    src={feature.image}
                    height={300}
                    width={300}
                    alt={feature.title}
                  />
                </CardSection>
                <ThemeIcon size={40} radius="xl" className={classes.icon}>
                  {feature.icon}
                </ThemeIcon>
                <Text size="lg" fw={500} className={classes.cardTitle}>
                  {feature.title}
                </Text>
                <Text
                  size="sm"
                  color="dimmed"
                  className={classes.cardDescription}
                >
                  {feature.description}
                </Text>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default FeatureSection;
