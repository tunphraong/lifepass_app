import { Container, Title, Text, Button, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "./NetworkSection.module.css";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Image } from "@mantine/core";
import { Link } from "../../../../navigation";
import { useTranslations } from "next-intl";

export default function NetworkSection() {
  const t = useTranslations("companies.NetworkSection");

  const carouselImages = t.raw("carouselImages");

  return (
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text className={classes.subtitle}>{t("subtitle")}</Text>
          <Title order={1} className={classes.title}>
            {t("title")}
          </Title>
          <Text size="xl" className={classes.description}>
            {t("description")}
          </Text>
        </div>
        <Carousel
          withIndicators
          height={500}
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
        >
          {carouselImages.map((image, index) => (
            <Carousel.Slide key={index}>
              <Image src={image.src} alt={image.alt} height="500" />
            </Carousel.Slide>
          ))}
        </Carousel>
        <Group justify="center" className={classes.buttonGroup}>
          <Button
            component={Link}
            href="https://tally.so/r/mOLjDM"
            rightSection={<IconArrowRight size={14} />}
            className={classes.primaryButton}
            radius="lg"
          >
            {t("getQuoteButton")}
          </Button>
        </Group>
      </Container>
    </section>
  );
}
