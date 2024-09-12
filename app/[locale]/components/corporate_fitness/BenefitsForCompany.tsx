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
      "Create a Wellbeing culture that retains and attracts the best talent.",
  },
  {
    title: "2. Support your employees' physical and mental health",
    description:
      "Sport and wellness activities have been proven to contribute to people's physical and mental health.",
  },
  {
    title: "3. Improve team collaboration and culture",
    description:
      "Employee Wellbeing programs promote teamwork and collaboration, and have a substantial positive impact on the work environment, fostering a shared sense of wellbeing.",
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
