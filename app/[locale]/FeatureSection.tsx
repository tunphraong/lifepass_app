// import React from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardSection,
//   GridCol,
//   Text,
//   ThemeIcon,
//   rem,
// } from "@mantine/core";
// import Image from "next/image";
// import {
//   IconCheck,
//   IconGift,
//   IconMapPin,
//   IconEyeDollar,
// } from "@tabler/icons-react";
// import classes from "./FeatureSection.module.css";
// import { useTranslations } from "next-intl";

// interface Feature {
//   icon: React.ReactNode;
//   image: string;
// }

// const features: Feature[] = [
//   {
//     icon: <IconEyeDollar size={rem(24)} color="#f5ac2d" />,
//     image: "/Savings-amico.svg", // Update with your downloaded image path
//   },
//   {
//     icon: <IconMapPin size={rem(24)} color="#f5ac2d" />,
//     image: "/Date-picker-cuate.svg", // Update with your downloaded image path
//   },
//   {
//     icon: <IconGift size={rem(24)} color="#f5ac2d" />,
//     image: "/Gym-amico.svg", // Update with your downloaded image path
//   },
// ];
// function FeatureSection() {
//   const t = useTranslations("HomePage");
//     const translatedFeatures = features.map((feature, index) => ({
//       ...feature,
//       title: t(`features.${index}.title`),
//       description: t(`features.${index}.description`),
//     }));
//   return (
//     <div className={classes.wrapper}>
//       <Container size={1200} className={classes["content-inner"]}>
//         <h2 className={classes.title}>{t("featuresTitle")}</h2>
//         <Grid gutter="lg">
//           {translatedFeatures.map((feature, index) => (
//             <GridCol key={index} span={12}>
//               <Card shadow="sm" padding="lg" className={classes.card}>
//                 <CardSection>
//                   <Image
//                     src={feature.image}
//                     height={300}
//                     width={300}
//                     alt={feature.title}
//                   />
//                 </CardSection>
//                 <ThemeIcon size={40} radius="xl" className={classes.icon}>
//                   {feature.icon}
//                 </ThemeIcon>
//                 <Text size="lg" fw={500} className={classes.cardTitle}>
//                   {feature.title}
//                 </Text>
//                 <Text
//                   size="sm"
//                   color="dimmed"
//                   className={classes.cardDescription}
//                 >
//                   {feature.description}
//                 </Text>
//               </Card>
//             </GridCol>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default FeatureSection;

import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Image,
  ScrollArea,
  Center,
  Box,
} from "@mantine/core";
import styles from "./FeatureSection.module.css";

const activities = [
  { name: "Yoga", image: "/yoga.jpg?height=300&width=300" },
  { name: "Cycling", image: "/cycling.jpg?height=300&width=300" },
  { name: "Fitness", image: "/training.jpg?height=300&width=300" },
  { name: "Bouldering", image: "/bouldering.jpg?height=300&width=300" },
  { name: "Dance", image: "/dance.jpg?height=300&width=300" },
  { name: "Wellness", image: "/wellness.jpeg?height=320&width=320" },
];

export default function FeatureSection() {
  return (
    <>
      <Container size="lg" className={styles.box}>
        <Title order={3} mb="md" className={styles.mainTitle}>
          Get access to the top studios and many additional fitness and wellness
          offers in your city and across Vietnam. Are you ready?
        </Title>
      </Container>
      <div className={styles.featureSection}>
        <Container size="xl">
          {/* <Title order={2} align="center" mb="xl" className={styles.mainTitle}> */}

          <div className={styles.mobileContent}>
            <Title order={2} mb="md">
              Embark on a new kind of fitness journey
            </Title>
          </div>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <ScrollArea className={styles.mobileScroll}>
                <div className={styles.scrollContent}>
                  {activities.map((activity, index) => (
                    <Card
                      key={index}
                      padding="sm"
                      radius="md"
                      className={styles.activityCard}
                    >
                      <Card.Section>
                        <Image
                          src={activity.image}
                          alt={activity.name}
                          width={300}
                          height={300}
                          className={styles.activityImage}
                        />
                      </Card.Section>
                      <Center>
                        <Text mt="sm">{activity.name}</Text>
                      </Center>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className={styles.mobileContent}>
                <Text>
                  Sick of the same old? You'll never get bored with us. Discover
                  new activities every day.
                </Text>
              </div>

              <Grid className={styles.desktopGrid}>
                {activities.slice(0, 6).map((activity, index) => (
                  <Grid.Col key={index} span={4}>
                    <Card
                      padding="none"
                      radius="md"
                      className={styles.activityCard}
                    >
                      <Card.Section>
                        <Image
                          src={activity.image}
                          alt={activity.name}
                          width={300}
                          height={300}
                          className={styles.activityImage}
                        />
                      </Card.Section>
                      <Text className={styles.activityName}>
                        {activity.name}
                      </Text>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Grid.Col>

            <Grid.Col
              span={{ base: 12, md: 6 }}
              className={styles.desktopContent}
            >
              <Title order={1} mb="md">
                Embark on a new kind of fitness journey
              </Title>
              <div className={styles.featureList}>
                <div>
                  <Title order={2} mb="xs">
                    Endless variety
                  </Title>
                  <Text>
                    Choose from many types of sports and wellness offered by our
                    partners
                  </Text>
                </div>
                <div>
                  <Title order={2} mb="xs">
                    Discover something new
                  </Title>
                  <Text>
                    Sick of the same old? You'll never get bored with us.
                    Discover new activities every day.
                  </Text>
                </div>
                <div>
                  <Title order={2} mb="xs">
                    Save with a membership
                  </Title>
                  <Text>Exclusive member rates and in-app promotions</Text>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
}