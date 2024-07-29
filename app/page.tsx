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
import FeatureSection from "./FeatureSection-1";

export default function HeroTitle() {
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Container size={700} className={classes.inner}>
          <h1 className={classes.title}>
            Một app cho{" "}
            <Text
              component="span"
              variant="gradient"
              // gradient={{ from: "blue", to: "cyan" }}
              gradient={{ from: "#f5ac2d", to: "#f4b82c" }}
              inherit
            >
              tất cả
            </Text>{" "}
            nhu cầu thể dục, thể hình và làm đẹp của bạn
          </h1>

          <Text className={classes.description} color="dimmed">
            Khám phá hàng trăm phòng tập, spa và cơ sở làm đẹp trên khắp Việt
            Nam chỉ với một ứng dụng LifePass. Tiện lợi, đa dạng và tiết kiệm!
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
              <b>Tiết kiệm chi phí</b> – Đặt lịch trên LifePass luôn giúp bạn
              tiết kiệm nhiều hơn so với mua vé lẻ 💰
            </ListItem>
            <ListItem icon={<IconMapPin color="#f4b82c" />}>
              <b>Tiện lợi</b> – Dễ dàng tìm kiếm và đặt lịch các lớp học thể dục
              thể thao và các hoạt động giải trí gần bạn 📍
            </ListItem>
            <ListItem icon={<IconGift color="#f4b82c" />}>
              <b>Đa dạng</b> – Tham gia các lớp yoga, gym, dance, bơi lội và
              nhiều hoạt động khác 🎁
            </ListItem>
          </List>

          <Group className={classes.controls}>
            <Button
              size="lg"
              className={classes.control}
              variant="gradient"
              component="a"
              href="/app/search"
              gradient={{ from: "#f5ac2d", to: "#f4b82c" }}
            >
              Bắt đầu ngay
            </Button>

            <Button
              component="a"
              href="/app/search"
              size="xl"
              variant="default"
              className={classes.control}
              leftSection={<IconGift color="#323d56" />}
            >
              Tìm Hiểu
            </Button>
          </Group>
        </Container>
      </div>
      <FeatureSection />
      <Footer />
    </>
  );
}
