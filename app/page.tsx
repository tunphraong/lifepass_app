import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  ListItem,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
// import image from "./19333424.jpg";
import image from "./10172354_8225.svg";
import classes from "./HeroBullets.module.css";

export default function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Một app cho <span className={classes.highlight}>tất cả</span> <br />{" "}
            mọi thứ liên quan tới thể dục, thể hình và làm đẹp
          </Title>
          <Text c="dimmed" mt="md">
            Bạn có thể đi hàng trăm fitness studio, gym, spa và cơ sở làm đẹp
            trên khắp Việt Nam chỉ với một app LifePass
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="md"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <ListItem>
              <b>Tiết kiệm chi phí</b> – Đặt lịch trên LifePass luôn tiết kiệm chi phí so với việc mua vé lẻ
            </ListItem>
            <ListItem>
              <b>Tiện lợi</b> – dễ dàng tìm kiếm và đặt lịch tham gia các lớp
              học thể dục thể thao và các hoạt động giải trí khác tại các địa
              điểm gần gũi
            </ListItem>
            <ListItem>
              <b>Đa dạng:</b> – Người dùng có thể tham gia các lớp học yoga,
              gym, dance, bơi lội, v.v.
            </ListItem>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Tìm Lớp
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Tìm hiểu thêm
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}
