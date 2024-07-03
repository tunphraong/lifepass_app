'use client';

import { Anchor, Group, Container, Text} from '@mantine/core';
import classes from './FooterCentered.module.css';
import Link from 'next/link';

const links = [
  { link: '/contact', label: 'Contact' },
];

export function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      size="sm"
    >
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
