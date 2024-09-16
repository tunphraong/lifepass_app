import {
  Container,
  Grid,
  Title,
  Text,
  List,
  Box,
  Group,
  Image,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from "./BenefitsForCompany.module.css";

const benefits = [
  {
    title: "1. Become the Employer of Choice",
    description:
      "Foster a wellness-focused culture that attracts top talent and enhances employee loyalty.",
  },
  {
    title: "2. Enhance Employee Wellbeing",
    description:
      "Fitness and wellness initiatives have demonstrated positive impacts on both physical health and mental resilience.",
  },
  {
    title: "3. Boost Team Synergy and Corporate Culture",
    description:
      "Wellness programs encourage teamwork and interpersonal connections, significantly improving the work atmosphere and creating a collective sense of wellbeing.",
  },
];

export default function BenefitsForCompany() {
  return (
    <Box className={classes.section}>
      <Container size="lg">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title order={2} className={classes.title}>
              Benefits for your company
            </Title>
            <List spacing="lg" className={classes.list}>
              {benefits.map((benefit, index) => (
                <List.Item key={index}>
                  <Text className={classes.benefitTitle}>{benefit.title}</Text>
                  <Text c="dimmed">{benefit.description}</Text>
                </List.Item>
              ))}
            </List>
            {/* <Box className={classes.infoBox}>
              <Group>
                <IconInfoCircle size={20} />
                <Text size="sm">
                  Information on special tax savings can be found below.
                </Text>
              </Group>
            </Box> */}
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Image
                  src="/yoga.jpg"
                  alt="Yoga class"
                  radius="md"
                  className={classes.image}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  src="/spa.jpg"
                  alt="Person using smartphone"
                  radius="md"
                  className={`${classes.image} ${classes.imageMt}`}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Image
                  src="/dance.jpg"
                  alt="Person exercising"
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
