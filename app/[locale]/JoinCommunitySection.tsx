import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Box,
  Group,
} from "@mantine/core";
import { Link } from "../../navigation";
import classes from "./JoinCommunitySection.module.css";
import { useTranslations } from "next-intl";

function JoinCommunitySection() {
  const t = useTranslations("JoinCommunitySection");

  return (
    <Box component="section" className={classes.section}>
      <Container size="lg">
        <Grid align="center" gutter="xl" mt={30}>
          <Grid.Col>
            <Box className={classes.content}>
              <Title order={2} className={classes.title}>
                {t("title")}
              </Title>
              <Text className={classes.description}>{t("description")}</Text>
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
            {t("buttonText")}
          </Button>
        </Group>
      </Container>
    </Box>
  );
}

export default JoinCommunitySection;
