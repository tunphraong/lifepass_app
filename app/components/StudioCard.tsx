import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Grid,
  Spoiler,
  CardSection,
} from "@mantine/core";
import { createClient } from "../../utils/supabase/client";
// import Link from "next/link";
import { Link } from "../../navigation";

// interface StudioCardProps {
//   studio: Studio; // Assuming you have a Studio interface defined
// }

export default function StudioCard({ studio }: any) {
  const supabase = createClient();
  const { name, categories, address, imageUrl, description } = studio;

  return (
    // <Card shadow="sm" p="lg" radius="md" withBorder>
    //   <Card.Section>
    //     <Image
    //       src={
    //         supabase.storage.from("public_photos").getPublicUrl(imageUrl).data
    //           .publicUrl
    //       }
    //       w="auto"
    //       fit="contain"
    //       h={200}
    //       alt={name}
    //     />
    //   </Card.Section>

    //   <Group position="apart" mt="md" mb="xs">
    //     <Text weight={500}>{name}</Text>
    //     <Badge color="pink" variant="light">
    //       4.9 (2500+)
    //     </Badge>
    //   </Group>

    //   <Group spacing={5} position="left" mb="xs">
    //     {categories.map((category) => (
    //       <Badge color="blue" variant="light" key={category}>
    //         {category}
    //       </Badge>
    //     ))}
    //   </Group>

    //   <Text size="sm" color="dimmed">
    //     {address}
    //   </Text>
    // </Card>

    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Grid>
        <Grid.Col span={4}>
          <Card.Section>
            <Link
              key={studio.id}
              href={`/app/studios/${studio.id}`}
              style={{ textDecoration: "none" }}
            >
              <Image
                src={
                  supabase.storage.from("public_photos").getPublicUrl(imageUrl)
                    .data.publicUrl
                }
                // fit="contain"
                width="auto"
                height={150}
                fit="contain"
                radius="sm"
                alt={name}
              />
            </Link>
          </Card.Section>
        </Grid.Col>

        <Grid.Col span={8}>
          <Group>
            <Link
              key={studio.id}
              href={`/app/studios/${studio.id}`}
              style={{ textDecoration: "none" }}
            >
              <Text fw={500}>{name}</Text>
            </Link>

            {/* <Badge color="pink" variant="light">
              4.9 (2500+)
            </Badge> */}
          </Group>

          <Group>
            {categories.map((category) => (
              <Badge color="blue" variant="light" key={category}>
                {category}
              </Badge>
            ))}
          </Group>

          <Text size="sm" c="dimmed" truncate>
            {address}
          </Text>

          <Badge color="pink" variant="light">
            4.9 (2500+)
          </Badge>

          <Spoiler
            maxHeight={0}
            showLabel={
              <Text c="my-color" size="sm">
                Learn More
              </Text>
            }
            hideLabel={
              <Text c="my-color" size="sm">
                Show Less
              </Text>
            }
          >
            {description}
          </Spoiler>
        </Grid.Col>
      </Grid>
    </Card>

    // <Card shadow="sm" p="lg" radius="md" withBorder>
    //   <Group noWrap>
    //     <Image
    //       src={
    //         supabase.storage.from("public_photos").getPublicUrl(imageUrl).data
    //           .publicUrl
    //       }
    //       width={150}
    //       height={150}
    //       fit="cover"
    //       radius="md"
    //       alt={name}
    //     />
    //     <div style={{ flex: 1 }}>
    //       <Group spacing={5}>
    //         {categories.map((category) => (
    //           <Badge color="gray" variant="light" key={category}>
    //             {category.toUpperCase()}
    //           </Badge>
    //         ))}
    //       </Group>
    //       <Text weight={700} size="lg" mt="xs">
    //         {name}
    //       </Text>
    //       <Text size="sm" color="dimmed">
    //         {address}
    //       </Text>
    //       <Group mt="xs" spacing="xs" align="center">
    //         <Text size="sm" weight={500}>
    //           4.9
    //         </Text>
    //         <Text size="sm" color="dimmed">
    //           (2500+)
    //         </Text>
    //         <Anchor href="#" size="sm" color="blue">
    //           more info
    //         </Anchor>
    //       </Group>
    //       <Group mt="xs" spacing="xs">
    //         <Badge color="yellow" variant="light">
    //           Safety guidelines
    //         </Badge>
    //       </Group>
    //     </div>
    //   </Group>
    // </Card>
  );
}
