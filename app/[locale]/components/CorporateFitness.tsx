import { Button, Grid, Flex, Container, Title } from "@mantine/core";
import styles from "./CorporateFitness.module.css";
import { Link } from "../../../navigation";
import { useTranslations } from "next-intl";

export default function CorporateFitness() {
  const t = useTranslations("CorporateFitness");

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
              <Title order={2} className={styles.title}>
                {t("title")}
              </Title>
              <p className={styles.description}>{t("description")}</p>
              <Button
                component={Link}
                href="/companies"
                size="md"
                radius="xl"
                style={{ width: "auto", alignSelf: "flex-start" }}
              >
                {t("buttonText")}
              </Button>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className={styles.imageContainer}>
              <img
                src="/corporate-fitness.jpg"
                alt={t("imageAlt")}
                className={styles.image}
              />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
