import { Container, Grid, Title, Text, Box, Group, Stack, AspectRatio } from '@mantine/core';
import { IconUser, IconSparkles, IconCalendar, IconCircle } from '@tabler/icons-react';
import Image from 'next/image';
import classes from './HowItWorks.module.css';

const features = [
  {
    icon: IconUser,
    title: 'Become a member',
    description: 'Select one of our flexible memberships to start your fitness journey. That\'s all it takes.'
  },
  {
    icon: IconSparkles,
    title: 'Get inspired',
    description: 'Need some inspiration? Find partner venues and activities near you via your browser.'
  },
  {
    icon: IconCalendar,
    title: 'Book your workout',
    description: 'Secure yourself a spot in a class or for a solo workout and enjoy flexible cancellation, just in case plans change.'
  },
  {
    icon: IconCircle,
    title: 'Check in - just like that',
    description: 'Arrive at your chosen venue, and check in with the confirmation email. It\'s that simple!'
  }
];

export default function Component() {
  return (
    <Box className={classes.wrapper}>
      <Container size="xl">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <AspectRatio ratio={395 / 812} className={classes.imageWrapper}>
              <Image
                width={395}
                height={812}
                src="/screenshot.png"
                // fill
                alt="Fitness app interface showing various sports activities"
                className={classes.image}
              />
              <Box className={classes.imageOverlay} />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title order={2} className={classes.title}>
                Many activities to choose from in a single app
              </Title>
              <Stack gap="xl">
                {features.map((feature, index) => (
                  <Group key={index} align="flex-start" gap="md">
                    <feature.icon size={24} className={classes.icon} />
                    <div>
                      <Text className={classes.featureTitle}>
                        {feature.title}
                      </Text>
                      <Text fw={700} className={classes.featureDescription}>
                        {feature.description}
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
