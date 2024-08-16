import {
  Container,
  Text,
  Button,
  Group,
  List,
  ListItem,
  ThemeIcon,
  rem,
} from "@mantine/core";
import {
  IconCheck,
  IconGift,
  IconMapPin,
  IconEyeDollar,
} from "@tabler/icons-react";
import classes from "./HomePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import FeatureSection from "./FeatureSection";
import { useTranslations } from "next-intl";
import { Link } from "../../navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export default function HeroTitle({ params: { locale } }) {
   unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Container size={700} className={classes.inner}>
          <h1 className={classes.title}>
            {t.rich("title", {
              all: (chunks) => (
                <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: "#f5ac2d", to: "#f4b82c" }}
                  inherit
                >
                  {chunks}
                </Text>
              ),
            })}
          </h1>

          <Text className={classes.description} color="dimmed">
            {t("description")}
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="md"
            icon={
              <ThemeIcon size={20} radius="xl" color="#f5ac2d">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <ListItem icon={<IconEyeDollar color="#f4b82c" />}>
              <b> {t("listSaveTitle")} </b> – {t("listSaveDescription")}
            </ListItem>
            <ListItem icon={<IconMapPin color="#f4b82c" />}>
              <b>{t("listEasyTitle")} </b> – {t("listEasyDescription")}
            </ListItem>
            <ListItem icon={<IconGift color="#f4b82c" />}>
              <b>{t("listDiverseTitle")} </b> – {t("listDiverseDescription")}
            </ListItem>
          </List>

          <Group className={classes.controls}>
            {/* <Button
              size="lg"
              className={classes.control}
              variant="gradient"
              component="a"
              href="/app/search"
              gradient={{ from: "#f5ac2d", to: "#f4b82c" }}
            >
              {t("getStartedButton")}
            </Button> */}

            <Link href="/app/search">
              <Button
                size="xl"
                className={classes.control}
                variant="gradient"
                gradient={{ from: "#f5ac2d", to: "#f4b82c" }}
              >
                {t("getStartedButton")}
              </Button>
            </Link>

            <Link href="/faq">
              <Button
                // component="a"
                size="lg"
                variant="default"
                className={classes.control}
                leftSection={<IconGift color="#323d56" />}
              >
                {t("learnMoreButton")}
              </Button>
            </Link>
          </Group>
        </Container>
      </div>
      <FeatureSection />
      <Footer />
    </>
  );
}
