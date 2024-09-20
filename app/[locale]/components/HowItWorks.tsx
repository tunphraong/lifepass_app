import {
  Container,
  Grid,
  Title,
  Text,
  Box,
  Group,
  Stack,
  AspectRatio,
} from "@mantine/core";
import {
  IconUser,
  IconSparkles,
  IconCalendar,
  IconCircle,
} from "@tabler/icons-react";
import Image from "next/image";
import classes from "./HowItWorks.module.css";
import { useTranslations } from "next-intl";

const featureIcons = [IconUser, IconSparkles, IconCalendar, IconCircle];

export default function Component() {
  const t = useTranslations("HowItWorks");

  return (
    <Box className={classes.wrapper}>
      <Container size="xl">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <AspectRatio ratio={405 / 812} className={classes.imageWrapper}>
              <Image
                width={395}
                height={812}
                src="/screenshot.png"
                alt={t("imageAlt")}
                className={classes.image}
              />
              <Box className={classes.imageOverlay} />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title order={2} className={classes.title}>
                {t("title")}
              </Title>
              <Stack gap="xl">
                {featureIcons.map((Icon, index) => (
                  <Group key={index} align="flex-start" gap="md">
                    <Icon size={24} className={classes.icon} />
                    <div>
                      <Text className={classes.featureTitle}>
                        {t(`features.${index}.title`)}
                      </Text>
                      <Text fw={700} className={classes.featureDescription}>
                        {t(`features.${index}.description`)}
                      </Text>
                    </div>
                  </Group>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
