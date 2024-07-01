import { Group, Text, ThemeIcon } from "@mantine/core";
import Link from "next/link";
import { IconMapPin } from "@tabler/icons-react"; // Assuming you use Tabler Icons for map pin

const StudioAddress = ({ address }) => {
  // Replace `address` with the actual address string you have
  const formattedAddress = encodeURIComponent(address);

  // Constructing the Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

  return (
    <Group mb="md">
      <ThemeIcon size={24} radius="md">
        <IconMapPin size={16} />
      </ThemeIcon>
      <Text size="sm" color="dimmed">
        <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          {address}
        </Link>
      </Text>
    </Group>
  );
};

export default StudioAddress;
