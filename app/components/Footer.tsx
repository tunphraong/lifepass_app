'use client'
import { Container, Group, Anchor } from "@mantine/core";
import classes from "./Footer.module.css";
import Link from "next/link";

const links = [
  { link: "/contact", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
//   { link: "#", label: "Careers" },
];


export default function Footer() {
  const items = links.map((link) => (
    <Anchor<"a"> c="dimmed" key={link.label} href={link.link} size="sm">
      <Link href={link.link}></Link>
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Group __size={28}>LifePass</Group>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
