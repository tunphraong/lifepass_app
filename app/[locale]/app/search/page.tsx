// search/page.tsx
"use client";
import useSWR from "swr";
import {
  Button,
  Card,
  Input,
  ActionIcon,
  Group,
  Text,
  Box,
  Stack,
  Center,
  Loader,
} from "@mantine/core";
import {
  IconChevronDown,
  IconX,
  IconMenu2,
  IconSearch,
  IconMapPin,
} from "@tabler/icons-react";
import StudioCard from "../../../components/StudioCard";
import { createClient } from "../../../../utils/supabase/client";
import { useRouter } from "../../../../navigation";
import styles from "./search.module.css";
import { useState } from "react";
import { ActivitiesDropdown } from "./ActivitiesDropdown";
import Footer from "../../Footer";

const supabase = createClient();

const fetcher = async (url: string) => {
  const { data, error } = await supabase
    .from("studios")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data as any[];
};

export default function SearchPage() {
  const {
    data: studios,
    error,
    isLoading,
  } = useSWR("/api/studios", fetcher, { revalidateOnFocus: false });

    const [selectedActivities, setSelectedActivities] = useState([]);

    const handleFilterChange = (activities) => {
      setSelectedActivities(activities);
    };

    const filteredStudios = studios?.filter(
      (studio) =>
        selectedActivities.length === 0 ||
        studio.categories.some((category) =>
          selectedActivities.includes(category)
        )
    );

  if (error) {
    return (
      <Center className="my-6">
        <Text>Error loading studios.</Text>
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center className="my-6">
        <Loader />
      </Center>
    );
  }

  return (
    <Box className={styles.container}>
      <Box p="md">
        <Input placeholder="Gyms, studios, activities" radius="xl" mb="md" />

        <Group mb="md" style={{ overflowX: "auto" }}>
          <ActivitiesDropdown onFilterChange={handleFilterChange} />
          {/* <Button
            variant="outline"
            radius="xl"
            leftSection={<IconSearch size={16} />}
          >
            Exclusive on LifePass
          </Button> */}
        </Group>

        <Stack>
          {filteredStudios?.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
