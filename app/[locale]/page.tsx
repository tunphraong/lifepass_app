'use client'
import {
  Container,
  Text,
  Button,
  Group,
  List,
  ListItem,
  ThemeIcon,
  rem,
  Title
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
import ChatWidget from "../components/9AssistantWidget";
import LifePassActivities from "../../public/lifepass_activities.png"
import Image from "next/image";

export default function HeroTitle({ params: { locale } }) {
  //  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");
  return (
    <>
      <Header />
      {/* <div className={classes.wrapper}>
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
            <Link href="/app/search">
              <Button
                size="xl"
                // variant="gradient"
                variant="filled"
                color="yellow"
                gradient={{ from: "#f5ac2d", to: "#f4b82c" }}
              >
                {t("getStartedButton")}
              </Button>
            </Link>

            <Link href="https://tally.so/r/3yxeAd">
              <Button
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
      </div> */}
      <div className={classes.wrapper}>
        <Container size="lg">
          <div className={classes.inner}>

            
            <div className={classes.content}>
              {/* <Title className={classes.title}>
                A <span className={classes.highlight}>modern</span> React <br />{" "}
                components library
              </Title> */}

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

              {/* <Text c="dimmed" mt="md">
                Build fully functional accessible web applications faster than
                ever – Mantine includes more than 120 customizable components
                and hooks to cover you in any situation
              </Text> */}

              <Text className={classes.description} c="dimmed">
                {t("description")}
              </Text>

              {/* <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>TypeScript based</b> – build type safe applications, all
                  components and hooks export types
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – all packages have MIT license,
                  you can use Mantine in any project
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b> – focus ring will appear only
                  when user navigates with keyboard
                </List.Item>
              </List> */}

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
                  <b>{t("listDiverseTitle")} </b> –{" "}
                  {t("listDiverseDescription")}
                </ListItem>
              </List>

              <Group mt={30}>
                <Link href="/app/search">
                  <Button
                    radius="xl"
                    color="yellow"
                    size="lg"
                    className={classes.control}
                  >
                    {t("getStartedButton")}
                  </Button>
                </Link>

                <Link href="https://tally.so/r/3yxeAd">
                  <Button
                    variant="default"
                    radius="xl"
                    size="lg"
                    className={classes.control}
                  >
                    {t("learnMoreButton")}
                  </Button>
                </Link>
              </Group>
            </div>
            <Image
              src={LifePassActivities}
              height={1000}
              className={classes.image}
              alt="LifePass activities"
            />
          </div>
        </Container>
      </div>

      <ChatWidget
        token="L3BmO6FyWdsy"
        assistantName="Penelope"
        options={{
          primaryBackgroundColor: "#000",
          secondaryBackgroundColor: "#f9f9f9",
          primaryTextColor: "#fff",
          secondaryTextColor: "#000",
          messageContainerBackgroundColor: "#f2f2f2",
          opacity: 1,
        }}
      />
      <FeatureSection />
      <Footer />
    </>
  );
}
