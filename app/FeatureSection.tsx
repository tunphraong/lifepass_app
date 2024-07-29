// app/components/FeatureSection.tsx
"use client";

import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  ThemeIcon,
  Group,
  useMantineTheme,
  Stack,
  Box,
} from "@mantine/core";
import {
  IconHeart,
  IconCalendarStats,
  IconStar,
  IconMapPin,
  IconUserPlus,
  IconDiscount2,
} from "@tabler/icons-react";
import classes from "./HomePage.module.css";

function FeatureSection() {
  const theme = useMantineTheme();

  return (
    <section className={classes.section}>
      <Container size="xl" p={0}>
        <Title order={2} align="center" className={classes.sectionTitle}>
          Tại sao chọn LifePass?
        </Title>

        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "md" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
          ]}
        >
          <FeatureCard
            icon={<IconHeart size={24} />}
            title="Đặt lịch linh hoạt"
            description="Đặt trước các lớp học theo lịch trình của bạn, hủy bỏ bất cứ lúc nào với chính sách hủy linh hoạt."
          />
          <FeatureCard
            icon={<IconCalendarStats size={24} />}
            title="Đa dạng lựa chọn"
            description="Khám phá hàng loạt lớp học từ yoga đến tập luyện sức mạnh, khiêu vũ đến võ thuật."
          />
          <FeatureCard
            icon={<IconStar size={24} />}
            title="Phòng tập hàng đầu"
            description="Tìm kiếm các phòng tập và huấn luyện viên uy tín nhất trong khu vực
            của bạn, với đánh giá từ cộng đồng người dùng."
          />
          <FeatureCard
            icon={<IconUserPlus size={24} />}
            title="Cộng đồng sôi động"
            description="Kết nối và chia sẻ kinh nghiệm tập luyện với những người yêu thích
            thể thao và làm đẹp khác."
          />
          <FeatureCard
            icon={<IconDiscount2 size={24} />}
            title="Ưu đãi độc quyền"
            description="Nhận ưu đãi và khuyến mãi đặc biệt dành riêng cho thành viên LifePass."
          />
        </SimpleGrid>
      </Container>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card shadow="md" p="md" radius="md" withBorder>
      <ThemeIcon
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        size={40}
        radius="md"
        className={classes.featureCardIcon}
      >
        {icon}
      </ThemeIcon>
      <Stack gap="md">
        <Text fw={500} size="lg" mt="sm">
          {title}
        </Text>
        <Text size="sm" color="dimmed" mt="xs">
          {description}
        </Text>
      </Stack>
    </Card>
  );
}

export default FeatureSection;
