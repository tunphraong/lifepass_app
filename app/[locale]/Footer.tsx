// import React from "react";
// import {
//   Text,
//   Container,
//   Group,
//   Button,
// } from "@mantine/core";
// import {
//   IconBrandFacebook,
//   IconBrandTwitter,
//   IconBrandInstagram,
//   IconQuestionMark,
//   IconPhone,
//   IconHeartHandshake
// } from "@tabler/icons-react";
// import styles from "./Footer.module.css";
// import { Link } from "../../navigation";


// export default function Footer() {
//   return (
//     // <div height={80} className={styles.footer}>
//     <div className={styles.footer}>
//       <Container className={styles.inner}>
//         <Text className={styles.logo}>LifePass</Text>
//         <Group>
//           <Button
//             variant="subtle"
//             component="a"
//             href="https://tally.so/r/mOLjDM"
//             color="dark"
//             leftSection={<IconPhone color="#323d56" />}
//           >
//             Contact Us
//           </Button>

//           <Link href="/faq">
//             <Button variant="subtle" component="a" color="dark">
//               <IconQuestionMark />
//               FAQ
//             </Button>
//           </Link>

//           {/* <Button variant="subtle" component="a" href="/faq" color="dark">
//             <IconHeartHandshake />
//             Partner with us
//           </Button> */}
//           {/* <Button
//             variant="subtle"
//             component="a"
//             href="/privacy-policy"
//             color="dark"
//           >
//             Privacy Policy
//           </Button>
//           <Button
//             variant="subtle"
//             component="a"
//             href="/terms-of-service"
//             color="dark"
//           >
//             Terms of Service
//           </Button> */}
//         </Group>
//         <Text size="sm" color="dimmed">
//           © 2024 LifePass. All rights reserved.
//         </Text>
//       </Container>
//     </div>
//   );
// }

// import { Text, Container, ActionIcon, Group, rem } from "@mantine/core";
// import {
//   IconBrandTwitter,
//   IconBrandYoutube,
//   IconBrandInstagram,
// } from "@tabler/icons-react";
// import MantineLogo from "../../public/lifepass.svg"
// import Image from "next/image";
// import classes from "./Footer.module.css";

// const data = [
//   {
//     title: "Company",
//     links: [
//       { label: "Features", link: "#" },
//       { label: "Pricing", link: "#" },
//       { label: "Support", link: "#" },
//       { label: "Forums", link: "#" },
//     ],
//   },
//   {
//     title: "B2B",
//     links: [
//       { label: "Contribute", link: "#" },
//       { label: "Media assets", link: "#" },
//       { label: "Changelog", link: "#" },
//       { label: "Releases", link: "#" },
//     ],
//   },
//   {
//     title: "Community",
//     links: [
//       { label: "Join Discord", link: "#" },
//       { label: "Follow on Twitter", link: "#" },
//       { label: "Email newsletter", link: "#" },
//       { label: "GitHub discussions", link: "#" },
//     ],
//   },
// ];

// export default function Footer() {
//   const groups = data.map((group) => {
//     const links = group.links.map((link, index) => (
//       <Text<"a">
//         key={index}
//         className={classes.link}
//         component="a"
//         href={link.link}
//         onClick={(event) => event.preventDefault()}
//       >
//         {link.label}
//       </Text>
//     ));

//     return (
//       <div className={classes.wrapper} key={group.title}>
//         <Text className={classes.title}>{group.title}</Text>
//         {links}
//       </div>
//     );
//   });

//   return (
//     <footer className={classes.footer}>
//       <Container className={classes.inner}>
//         <div className={classes.groups}>{groups}</div>
//       </Container>
//       <Container className={classes.afterFooter}>
//         <div className={classes.logo}>
//           <Image src={MantineLogo} width={120} alt="Lifepass logo" />
//           {/* <Text size="xs" c="dimmed" className={classes.description}>
//             Build fully functional accessible web applications faster than ever
//           </Text> */}
//         </div>
//         <Text c="dimmed" size="sm">
//           © 2024 lifepass.one. All rights reserved.
//         </Text>

//         <Group
//           gap={0}
//           className={classes.social}
//           justify="flex-end"
//           wrap="nowrap"
//         >
//           <ActionIcon size="lg" color="gray" variant="subtle">
//             <IconBrandTwitter
//               style={{ width: rem(18), height: rem(18) }}
//               stroke={1.5}
//             />
//           </ActionIcon>
//           <ActionIcon size="lg" color="gray" variant="subtle">
//             <IconBrandYoutube
//               style={{ width: rem(18), height: rem(18) }}
//               stroke={1.5}
//             />
//           </ActionIcon>
//           <ActionIcon size="lg" color="gray" variant="subtle">
//             <IconBrandInstagram
//               style={{ width: rem(18), height: rem(18) }}
//               stroke={1.5}
//             />
//           </ActionIcon>
//         </Group>
//       </Container>
//     </footer>
//   );
// }


import { Text, Container, ActionIcon, Group, rem, Stack } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import MantineLogo from "../../public/lifepass.svg";
import Image from "next/image";
import classes from "./Footer.module.css";
// import { Link } from "react-alice-carousel";
import { Link } from "../../navigation";

const data = [
  {
    title: "Company",
    links: [
      // { label: "Features", link: "#" },
      // { label: "Pricing", link: "#" },
      // { label: "Support", link: "#" },
      // { label: "Forums", link: "#" },
      { label: "Contact", link: "https://tally.so/r/mOLjDM" },
    ],
  },
  {
    title: "B2B",
    links: [
      { label: "Company Sports", link: "/en/companies" },
      { label: "Become a Partner", link: "/en/partners" },
    ],
  },
  // {
  //   title: "Community",
  //   links: [
  //     { label: "Join Discord", link: "#" },
  //     { label: "Follow on Twitter", link: "#" },
  //     { label: "Email newsletter", link: "#" },
  //     { label: "GitHub discussions", link: "#" },
  //   ],
  // },
];

export default function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        {/* <div className={classes.logo}>
          <Image src={MantineLogo} width={120} alt="Lifepass logo" />
        </div> */}
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        {/* <div className={classes.logo}>
          <Image src={MantineLogo} width={120} alt="Lifepass logo" />
        </div> */}
        <Group>
          <Text c="white" size="sm" ta="center">
            © 2024 lifepass.one. All rights reserved.
          </Text>
          {/* <Link href="/privacy" className={classes.link} passHref>
            <Text>Privacy Policy</Text>
          </Link>
          <Text>|</Text>
          <Link href="/terms-of-service" className={classes.link} passHref>
            <Text>Term of Use</Text>
          </Link> */}
        </Group>

        <Group gap="xs" className={classes.social} justify="center">
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
