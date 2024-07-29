import React from "react";
import {
  Container,
  Grid,
  Card,
  CardSection,
  GridCol,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import Image from "next/image";
import {
  IconCheck,
  IconGift,
  IconMapPin,
  IconEyeDollar,
} from "@tabler/icons-react";
import classes from "./FeatureSection.module.css";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const features: Feature[] = [
  {
    title: "Tiết kiệm chi phí",
    description:
      "Đặt lịch trên LifePass luôn giúp bạn tiết kiệm nhiều hơn so với mua vé lẻ.",
    icon: <IconEyeDollar size={rem(24)} color="#f5ac2d" />,
    image: "/Savings-amico.svg", // Update with your downloaded image path
  },
  {
    title: "Tiện lợi",
    description:
      "Dễ dàng tìm kiếm và đặt lịch các lớp học thể dục thể thao và các hoạt động giải trí gần bạn.",
    icon: <IconMapPin size={rem(24)} color="#f5ac2d" />,
    image: "/Date-picker-cuate.svg", // Update with your downloaded image path
  },
  {
    title: "Đa dạng",
    description:
      "Tham gia các lớp yoga, gym, dance, bơi lội và nhiều hoạt động khác.",
    icon: <IconGift size={rem(24)} color="#f5ac2d" />,
    image: "/Gym-amico.svg", // Update with your downloaded image path
  },
];
function FeatureSection() {
  return (
    <div className={classes.wrapper}>
      <Container size={1200} className={classes["content-inner"]}>
        <h2 className={classes.title}>Tính Năng Nổi Bật</h2>
        <Grid gutter="lg">
          {features.map((feature, index) => (
            <GridCol key={index} span={12}>
              <Card shadow="sm" padding="lg" className={classes.card}>
                <CardSection>
                  <Image src={feature.image} height={300} width={300}  alt={feature.title} />
                </CardSection>
                <ThemeIcon size={40} radius="xl" className={classes.icon}>
                  {feature.icon}
                </ThemeIcon>
                <Text size="lg" fw={500} className={classes.cardTitle}>
                  {feature.title}
                </Text>
                <Text
                  size="sm"
                  color="dimmed"
                  className={classes.cardDescription}
                >
                  {feature.description}
                </Text>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default FeatureSection;
