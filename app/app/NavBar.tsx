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
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

export default function MobileNavbar({
  children,
  isLoggedIn,
}: Readonly<{
  children: React.ReactNode;
  isLoggedIn: boolean;
}>) {
  const supabase = createClient();
  console.log("isLoggedIn", isLoggedIn);
  // useEffect(() => {
  //   const getSession = async () => {
  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.getSession();
  //     if (error) {
  //       console.error("Error getting session:", error);
  //       return;
  //     }

  //     if (session && session.access_token && session.user) {
  //       console.log("get here");
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }

  //     console.log("session", session);
  //     // setIsLoggedIn(!!session); // Set login status based on session existence
  //   };

  //   getSession();
  // }, []);

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      // Perform logout logic here
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
      } else {
        console.log("Logged out successfully");
        // setIsLoggedIn(false);
      }
    } else {
      // Perform login logic here (you might redirect to a login page or show a login modal)
      console.log("Redirect to login page...");
      // Example: Redirect to login page
      window.location.href = "/app/login";
    }
  };

  const [opened, { toggle }] = useDisclosure();
  const [currentLocale, setCurrentLocale] = useState("en"); // Initial locale, 'en' for English
  const switchLocale = (locale) => {
    setCurrentLocale(locale);
    // Optionally, you can set a cookie or localStorage value to persist the selected locale
    // localStorage.setItem('app_locale', locale);
  };

  const [openedLocale, setOpened] = useState(false);

  // const { data: { user } } = await supabase.auth.getUser()
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
              <Link
                href={isLoggedIn ? "/app/logout" : "/app/login"}
                className={classes.link}
                passHref
              >
                <UnstyledButton
                  className={`${classes.control}`}
                  // onClick={handleLoginLogout}
                >
                  {isLoggedIn ? "Đăng Xuất" : "Đăng Nhập"}
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
        {/* <Link href="/app/login" className={classes.link} passHref>
          <UnstyledButton className={`${classes.control}`}>
            Đăng Nhập
          </UnstyledButton>
        </Link> */}
        <Link
          href={isLoggedIn ? "/app/logout" : "/app/login"}
          className={classes.link}
          passHref
        >
          <UnstyledButton
            className={`${classes.control}`}
            // onClick={handleLoginLogout}
          >
            {isLoggedIn ? "Đăng Xuất" : "Đăng Nhập"}
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
