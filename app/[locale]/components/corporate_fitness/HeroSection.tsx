// HeroSection.jsx
import {
  Container,
  Grid,
  Title,
  Text,
  TextInput,
  Button,
  Box,
  Group,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import classes from "./HeroSection.module.css";
import { Link } from "../../../../navigation";

export default function HeroSection() {
  return (
    <section className={classes.section}>
      <Container size="lg">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Box className={classes.content}>
              <Text className={classes.subtitle}>LIFEPASS FOR COMPANIES</Text>
              <Title className={classes.title}>
                Experience the
                <br />
                LifePass Effect
              </Title>
              <Text className={classes.description}>
                With widespread adoption, LifePass offers corporate wellness
                that drives better retention, higher productivity, and lower
                healthcare costs.
              </Text>
              <Group align="flex-start" className={classes.inputGroup}>
                {/* <TextInput placeholder="Work email" className={classes.input} /> */}
                <Button
                  component={Link}
                  href="https://tally.so/r/mOLjDM"
                  rightSection={<IconArrowRight size={14} />}
                  className={classes.button}
                >
                  Get quote
                </Button>
              </Group>
              <Text size="xs" className={classes.disclaimer}>
                You agree LifePass may use the information to contact you
                regarding relevant products and services. Questions? See our{" "}
                <a href="#" className={classes.link}>
                  Privacy Policy
                </a>
                .
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Box className={classes.imageWrapper}>
              <Image
                src="/pexels-elly.jpeg?height=400&width=400"
                alt="Wellhub user"
                layout="fill"
                objectFit="cover"
                className={classes.image}
              />
              <Text className={`${classes.label} ${classes.fitnessLabel}`}>
                Fitness
              </Text>
              <Text className={`${classes.label} ${classes.nutritionLabel}`}>
                Wellness
              </Text>
              <Text className={`${classes.label} ${classes.mindfulnessLabel}`}>
                Mindfulness
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
