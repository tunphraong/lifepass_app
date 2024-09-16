import {
  Container,
  Title,
  Text,
  Grid,
  Group,
  TextInput,
  Button,
  Box,
  Stack,
} from "@mantine/core";
import { IconCheck, IconArrowRight } from "@tabler/icons-react";
import classes from "./DynamicList.module.css";
import { Link } from "../../../../navigation";

const benefits = [
  "Enhance total wellbeing",
  "Prevent employee burnout",
  "Lower health-related expenses",
  "Improve talent acquisition and retention",
  "Boost team satisfaction",
  "Become an HR champion",
];

export default function DynamicList() {
  return (
    <Box className={classes.section}>
      <Container size="lg">
        <Stack align="center" gap="md" className={classes.header}>
          <Title order={1} className={classes.title}>
            Get LifePass and support your healthiest workforce
          </Title>
          <Text size="xl" className={classes.description}>
            Become a wellness company today.
          </Text>
        </Stack>
        <Grid gutter="md" className={classes.benefitsGrid}>
          {benefits.map((item, index) => (
            <Grid.Col key={index} span={{ base: 12, md: 4 }}>
              <Group gap="xs">
                <IconCheck size={20} className={classes.checkIcon} />
                <Text size="lg" className={classes.benefitText}>{item}</Text>
              </Group>
            </Grid.Col>
          ))}
        </Grid>
        <Box className={classes.formWrapper}>
          <Group align="flex-start">
            {/* <TextInput
              placeholder="Work email"
              type="email"
              className={classes.input}
            /> */}
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
            You agree LifePass may use the information to contact you regarding
            relevant products and services. Questions? See our{" "}
            <a href="#" className={classes.link}>
              Privacy Policy
            </a>
            .
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
