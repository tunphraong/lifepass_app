"use client";
import { useState } from "react";
import { Group, Container, Burger, Drawer } from "@mantine/core";
import classes from "./Header.module.css";
import LocaleSwitcher from "../components/LocaleSwitcher";
import { Link } from "../../navigation";
import logo from "../../public/lifepass.svg";
import Image from "next/image";

const links = [
  { link: "/prices", label: "Plans & Pricing" },
  { link: "/companies", label: "For Companies" },
  { link: "/partners", label: "List My Business" },
];

export default function Header() {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.logoContainer}>
            <Link href="/">
              <Image src={logo} alt="Wellhub Logo" width={150} height={60} />
            </Link>
          </div>
          <Group gap={5} className={classes.desktopMenu}>
            {items}
          </Group>
          <Group className={classes.desktopMenu}>
            <LocaleSwitcher />
          </Group>
          <div className={classes.burgerContainer}>
            <Burger
              opened={mobileMenuOpened}
              onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
              className={classes.menuButton}
              size="sm"
            />
          </div>
        </div>
      </Container>
      <Drawer
        opened={mobileMenuOpened}
        onClose={() => setMobileMenuOpened(false)}
        title="Menu"
        padding="xl"
        size="100%"
      >
        {/* <div className={classes.mobileMenu}>
          {items}
          <LocaleSwitcher />
        </div> */}
        <div className={classes.mobileMenu}>
          {links.map((link) => (
            <Link key={link.label} href={link.link} className={classes.link}>
              {link.label}
            </Link>
          ))}
          <LocaleSwitcher />
        </div>
      </Drawer>
    </header>
  );
}
