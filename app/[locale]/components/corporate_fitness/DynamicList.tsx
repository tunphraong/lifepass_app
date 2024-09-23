import {
  Container,
  Title,
  Text,
  Grid,
  Group,
  Button,
  Box,
  Stack,
} from "@mantine/core";
import { IconCheck, IconArrowRight } from "@tabler/icons-react";
import classes from "./DynamicList.module.css";
import { Link } from "../../../../navigation";
import { useTranslations } from "next-intl";

export default function DynamicList() {
  const t = useTranslations("companies.DynamicList");

  const benefits = t.raw("benefits");

  return (
    <Box className={classes.section}>
      <Container size="lg">
        <Stack align="center" gap="md" className={classes.header}>
          <Title order={1} className={classes.title}>
            {t("title")}
          </Title>
          <Text size="xl" className={classes.description}>
            {t("description")}
          </Text>
        </Stack>
        <Grid gutter="md" className={classes.benefitsGrid}>
          {benefits.map((item, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Group gap="xs">
                <IconCheck size={20} className={classes.checkIcon} />
                <Text size="lg" className={classes.benefitText}>
                  {item}
                </Text>
              </Group>
            </Grid.Col>
          ))}
        </Grid>
        <Box className={classes.formWrapper}>
          <Group align="flex-start">
            <Button
              component={Link}
              href="https://tally.so/r/mOLjDM"
              rightSection={<IconArrowRight size={14} />}
              className={classes.button}
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
      </Container>
    </Box>
  );
}
