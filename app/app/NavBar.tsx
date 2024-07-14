"use client";
import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  Menu,
  MenuItem,
  Button,
  Modal,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js"; // Import Session type
import LoginForm from "../components/LoginForm"; // Import LoginForm component
import styles from "./layout.module.css";

export default function MobileNavbar({
  children,
}: // isLoggedIn,
Readonly<{
  children: React.ReactNode;
  // isLoggedIn: boolean;
}>) {
  const router = useRouter();
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [loginModalOpened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        setIsLoading(false);
        return;
      }
      setSession(session);
      setIsLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("Auth state changed:", session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // const isLoggedIn = !!user;
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/app/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [opened, { toggle }] = useDisclosure();

  if (isLoading) {
    return <Skeleton />;
  }

  // const { data: { user } } = await supabase.auth.getUser()
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
        className={styles.wrapper}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between" style={{ flex: 1 }}>
              {/* <MantineLogo size={30} /> */}
              <p>LifePass</p>
              <Group ml="xl" gap={0} visibleFrom="sm">
                <Link href="/app/search" className={classes.link} passHref>
                  <UnstyledButton className={`${classes.control}`}>
                    Home
                  </UnstyledButton>
                </Link>
                {/* {session ? (
                <UnstyledButton
                  className={`${classes.control}`}
                  onClick={handleLogout}
                >
                  Đăng Xuất
                </UnstyledButton>
              ) : (
                <Link href="/app/login" className={classes.link} passHref>
                  <UnstyledButton className={`${classes.control}`}>
                    Đăng Nhập
                  </UnstyledButton>
                </Link>
              )} */}
                {session ? (
                  <>
                    {/* Upcoming Schedule Button (if logged in) */}
                    <Link
                      href="/app/upcoming-schedule"
                      className={classes.link}
                      passHref
                    >
                      <UnstyledButton
                        className={`${classes.control}`}
                        onClick={toggle}
                      >
                        Lớp sắp tới
                      </UnstyledButton>
                    </Link>

                    {/* Logout Button */}
                    <UnstyledButton
                      className={`${classes.control}`}
                      onClick={handleLogout}
                    >
                      Đăng Xuất
                    </UnstyledButton>
                  </>
                ) : (
                  <Link href="/app/login" className={classes.link} passHref>
                    <UnstyledButton
                      className={`${classes.control}`}
                      onClick={toggle}
                    >
                      Đăng Nhập
                    </UnstyledButton>
                  </Link>
                )}
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <Link href="/app/search" className={classes.link} passHref>
            <UnstyledButton className={`${classes.control}`} onClick={toggle}>
              Home
            </UnstyledButton>
          </Link>
          {/* <Link
            href={session ? "/app/logout" : "/app/login"}
            className={classes.link}
            passHref
          >
            <UnstyledButton className={`${classes.control}`}>
              {session ? "Đăng Xuất" : "Đăng Nhập"}
            </UnstyledButton>
          </Link> */}

          {session ? (
            <>
              {/* Upcoming Schedule Button (if logged in) */}
              <Link
                href="/app/upcoming-schedule"
                className={classes.link}
                passHref
              >
                <UnstyledButton
                  className={`${classes.control}`}
                  onClick={toggle}
                >
                  Lớp sắp tới
                </UnstyledButton>
              </Link>

              {/* Logout Button */}
              <UnstyledButton
                className={`${classes.control}`}
                onClick={() => {
                  handleLogout();
                  toggle();
                }}
                // onClick={handleLogout}
              >
                Đăng Xuất
              </UnstyledButton>
            </>
          ) : (
            // <Group>
            //   <UnstyledButton
            //     className={`${classes.control}`}
            //     onClick={() => {
            //       handleLogout();
            //       toggle();
            //     }}
            //   >
            //     Logout
            //   </UnstyledButton>
            // </Group>
            <UnstyledButton
              className={`${classes.control}`}
              onClick={() => {
                open();
                toggle();
              }}
            >
              Đăng Nhập
            </UnstyledButton>
          )}
        </AppShell.Navbar>

        <AppShell.Main>
          {/* Navbar is only visible on mobile, links that are rendered in the header
        on desktop are hidden on mobile in header and rendered in navbar
        instead. */}
          {children}
        </AppShell.Main>
      </AppShell>

      <Modal opened={loginModalOpened} onClose={close} title="Login">
        <LoginForm onClose={close} />
      </Modal>
    </>
  );
}
