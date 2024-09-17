import { Card, Text, Group, Stack, Badge, Avatar } from "@mantine/core";
import { IconMapPin, IconBuilding } from "@tabler/icons-react";
import { Link } from "../../navigation";
import classes from "./StudioCard.module.css";
import { createClient } from "../../utils/supabase/client";

export default function StudioCard({ studio }: any) {
  const { id, name, categories, address, imageUrl, openingHours, distance } =
    studio;

  const supabase = createClient();

  const publicImageUrl = imageUrl
    ? supabase.storage.from("public_photos").getPublicUrl(imageUrl).data
        .publicUrl
    : null;

  return (
    <Card
      component={Link}
      href={`/app/studios/${id}`}
      className={classes.card}
      padding="md"
      styles={(theme) => ({
        root: {
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: "var(--mantine-color-rose-6)",
          },
        },
      })}
    >
      <Group wrap="nowrap" align="flex-start">
        <Avatar src={publicImageUrl} size="xl" radius="md">
          {name.charAt(0)}
        </Avatar>
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group grow wrap="nowrap">
            <div>
              <Group gap={4}>
                <IconBuilding size={16} stroke={1.5} />
                <Text size="xs" c="dimmed">
                  In Person
                </Text>
              </Group>
              <Text fw={700} size="lg">
                {name}
              </Text>
            </div>
          </Group>

          <Group gap="xs">
            <IconMapPin
              size={16}
              stroke={1.5}
              color="var(--mantine-color-pink-6)"
            />
            <Text size="sm" c="dimmed">
              {address}
            </Text>
          </Group>

          {/* <Text size="sm">{categories.join(" • ")}</Text> */}
          <Group gap="xs">
            {categories.map((category, index) => (
              <Badge key={index} variant="light" color="rose">
                {category}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
