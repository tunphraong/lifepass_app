import { Container, Grid, Title, Text, Button, Box, Group } from "@mantine/core";
import { Link } from "../../navigation";
import classes from "./JoinCommunitySection.module.css";

function JoinCommunitySection() {
  return (
    <Box component="section" className={classes.section}>
      <Container size="lg">
        <Grid align="center" gutter="xl" mt={30}>
          <Grid.Col>
            <Box className={classes.content}>
              <Title order={2} className={classes.title}>
                Join the LifePass Community
              </Title>
              <Text className={classes.description}>
                Subscribe to our newsletter and we’ll update you when we onboard
                new partners and activities. You’ll also have exclusive
                access to discounts, fitness, wellness, nutrition and lifestyle stories.
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
        <Group mt={30} mb={30}>
          <Button
            component={Link}
            href={"https://tally.so/r/3yxeAd"}
            size="md"
            radius="xl"
            className={classes.primaryButton}
          >
            Sign Up Now
          </Button>
        </Group>
      </Container>
    </Box>
  );
}

export default JoinCommunitySection;
