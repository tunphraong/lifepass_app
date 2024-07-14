"use client";
import useSWR from "swr";
import {
  Card,
  Image,
  Text,
  Stack,
  Badge,
  SimpleGrid,
  Rating,
  Center,
  Loader,
} from "@mantine/core"; // Import Mantine components
import { CardWithStats } from "../../components/CardWithStats";
import StudioCard from "../../components/StudioCard";
import { createClient } from "../../../utils/supabase/client"; // Import your Supabase client
const supabase = createClient();
import styles from "./search.module.css"
// Fetcher function for SWR
const fetcher = async (url: string) => {
  const { data, error } = await supabase
    .from("studios")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data as any[];
};

export default function MyComponent() {
  const {
    data: studios,
    error,
    isLoading,
  } = useSWR("/api/studios", fetcher, { revalidateOnFocus: false });

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
    <div className="styles.wrapper">
        <Stack>
        {studios?.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
        ))}
      </Stack>
    </div>
  );
}
