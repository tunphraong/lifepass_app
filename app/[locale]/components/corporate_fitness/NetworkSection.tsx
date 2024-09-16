import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Button,
  Group,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "./NetworkSection.module.css";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Image } from "@mantine/core";
import { Link } from "../../../../navigation";

const stats = [
  { number: "50,000+", description: "In-person gyms & studios" },
  { number: "2,500+", description: "Virtual personal trainers" },
  { number: "70+", description: "Premium wellbeing apps" },
];

export default function NetworkSection() {
  return (
    <section className={classes.section}>
      <Container size="lg">
        <div className={classes.header}>
          <Text className={classes.subtitle}>LIFEPASS NETWORK</Text>
          <Title order={1} className={classes.title}>
            Amazing variety of fitness and wellness facilities
          </Title>
          <Text size="xl" className={classes.description}>
            Employees get the most options to support their mental and physical
            wellbeing.
          </Text>
        </div>
        {/* <Grid gutter="lg" className={classes.statsGrid}>
          {stats.map((item, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Card className={classes.statCard}>
                <div className={classes.imagePlaceholder}></div>
                <Title order={3} className={classes.statNumber}>
                  {item.number}
                </Title>
                <Text size="sm">{item.description}</Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid> */}
        <Carousel
          withIndicators
          height={500}
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
        >
          <Carousel.Slide>
            <Image src="/acupunture.jpg" alt="acupunture" height="500" />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src="/pilates_class.jpg"
              alt="boxing"
              // width={500}
              height={500}
              // objectFit="cover"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src="/cycling.jpg"
              alt="pilates"
              // width={500}
              height={500}
              // objectFit="cover"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src="/bouldering.jpg"
              alt="bouldering"
              // width={500}
              height={500}
              // objectFit="cover"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image
              src="/sound-healing.jpeg"
              alt="sound-healing"
              // width={500}
              height={500}
              // objectFit="cover"
            />
          </Carousel.Slide>
        </Carousel>
        <Group justify="center" className={classes.buttonGroup}>
          <Button
            component={Link}
            href="https://tally.so/r/mOLjDM"
            rightSection={<IconArrowRight size={14} />}
            className={classes.primaryButton}
            radius="lg"
          >
            Get quote
          </Button>
          {/* <Button variant="outline" className={classes.secondaryButton}>
            Search gyms & studios
          </Button> */}
        </Group>
      </Container>
    </section>
  );
}
