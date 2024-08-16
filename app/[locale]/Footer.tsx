import React from "react";
import {
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconQuestionMark,
  IconPhone,
  IconHeartHandshake
} from "@tabler/icons-react";
import styles from "./Footer.module.css";
import NavigationLink from "../components/NavigationLink";
// import Link from "next/link";
import { Link } from "../../navigation";


export default function Footer() {
  return (
    // <div height={80} className={styles.footer}>
    <div className={styles.footer}>
      <Container className={styles.inner}>
        <Text className={styles.logo}>LifePass</Text>
        <Group>
          <Button
            variant="subtle"
            component="a"
            href="https://tally.so/r/mOLjDM"
            color="dark"
            leftSection={<IconPhone color="#323d56" />}
          >
            Contact Us
          </Button>

          <Button variant="subtle" component="a" href="/faq" color="dark">
            <IconQuestionMark />
            FAQ
          </Button>

          <Link href="/about">About
          </Link>

          {/* <Button variant="subtle" component="a" href="/faq" color="dark">
            <IconHeartHandshake />
            Partner with us
          </Button> */}
          {/* <Button
            variant="subtle"
            component="a"
            href="/privacy-policy"
            color="dark"
          >
            Privacy Policy
          </Button>
          <Button
            variant="subtle"
            component="a"
            href="/terms-of-service"
            color="dark"
          >
            Terms of Service
          </Button> */}
        </Group>
        <Text size="sm" color="dimmed">
          © 2024 LifePass. All rights reserved.
        </Text>
      </Container>
    </div>
  );
}
