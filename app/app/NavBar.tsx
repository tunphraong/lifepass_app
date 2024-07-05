"use client";
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  Menu,
  MenuItem,
  Button,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from "./Navbar.module.css";
import React, { useState } from "react";
import Link from "next/link";

export default function MobileNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const [currentLocale, setCurrentLocale] = useState("en"); // Initial locale, 'en' for English
  const switchLocale = (locale) => {
    setCurrentLocale(locale);
    // Optionally, you can set a cookie or localStorage value to persist the selected locale
    // localStorage.setItem('app_locale', locale);
  };

  const [openedLocale, setOpened] = useState(false);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            {/* <MantineLogo size={30} /> */}
            <p>LifePass</p>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Link href="/app/search" className={classes.link} passHref>
                <UnstyledButton className={`${classes.control}`}>
                  Home
                </UnstyledButton>
              </Link>
              <Link href="/app/login" className={classes.link} passHref>
                <UnstyledButton className={`${classes.control}`}>
                  Đăng Nhập
                </UnstyledButton>
              </Link>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Link href="/app/search" className={classes.link} passHref>
          <UnstyledButton className={`${classes.control}`}>Home</UnstyledButton>
        </Link>
        <Link href="/app/login" className={classes.link} passHref>
          <UnstyledButton className={`${classes.control}`}>
            Đăng Nhập
          </UnstyledButton>
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>
        {/* Navbar is only visible on mobile, links that are rendered in the header
        on desktop are hidden on mobile in header and rendered in navbar
        instead. */}
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
