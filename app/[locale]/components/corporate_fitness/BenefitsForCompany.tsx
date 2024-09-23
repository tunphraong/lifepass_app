import { Container, Grid, Title, Text, List, Box, Image } from "@mantine/core";
import classes from "./BenefitsForCompany.module.css";
import { useTranslations } from "next-intl";

export default function BenefitsForCompany() {
  const t = useTranslations("companies.BenefitsForCompany");

  const benefits = t.raw("benefits");
  const images = t.raw("images");

  return (
    <Box className={classes.section}>
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title order={2} className={classes.title}>
              {t("title")}
            </Title>
            <List spacing="lg" className={classes.list}>
              {benefits.map((benefit, index) => (
                <List.Item key={index}>
                  <Text size="xl" className={classes.benefitTitle}>{benefit.title}</Text>
                  <Text size="lg">{benefit.description}</Text>
                </List.Item>
              ))}
            </List>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Image
                  src="/yoga.jpg"
                  alt={images.yoga}
                  radius="md"
                  className={classes.image}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  src="/spa.jpg"
                  alt={images.spa}
                  radius="md"
                  className={`${classes.image} ${classes.imageMt}`}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Image
                  src="/dance.jpg"
                  alt={images.dance}
                  radius="md"
                  className={classes.imageTall}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
