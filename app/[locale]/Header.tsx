// 'use client'
// import { Menu, Group, Center, Burger, Container, Text } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { IconChevronDown } from "@tabler/icons-react";
// // import { MantineLogo } from "@mantinex/mantine-logo";
// import classes from "./Header.module.css";
// import LocaleSwitcher from "../components/LocaleSwitcher";
// import { useTranslations } from "next-intl";
// import {Link} from "../../navigation";
// import logo from "../../public/lifepass.svg";
// import { UnstyledButton } from "@mantine/core";
// import Image from "next/image";


// const links = [
//   { link: "/about", label: "Features" },
//   {
//     link: "#1",
//     label: "Learn",
//     links: [
//       { link: "/docs", label: "Documentation" },
//       { link: "/resources", label: "Resources" },
//       { link: "/community", label: "Community" },
//       { link: "/blog", label: "Blog" },
//     ],
//   },
//   { link: "/about", label: "About" },
//   { link: "/pricing", label: "Pricing" },
//   {
//     link: "#2",
//     label: "Support",
//     links: [
//       { link: "/faq", label: "FAQ" },
//       { link: "/demo", label: "Book a demo" },
//       { link: "/forums", label: "Forums" },
//     ],
//   },
// ];

// export default function Header() {
//   const [opened, { toggle }] = useDisclosure(false);
//   const t = useTranslations("Navigation");

//   const items = links.map((link) => {
//     const menuItems = link.links?.map((item) => (
//       <Menu.Item key={item.link}>{item.label}</Menu.Item>
//     ));

//     if (menuItems) {
//       return (
//         <Menu
//           key={link.label}
//           trigger="hover"
//           transitionProps={{ exitDuration: 0 }}
//           withinPortal
//         >
//           <Menu.Target>
//             <a
//               href={link.link}
//               className={classes.link}
//               onClick={(event) => event.preventDefault()}
//             >
//               <Center>
//                 <span className={classes.linkLabel}>{link.label}</span>
//                 <IconChevronDown size="0.9rem" stroke={1.5} />
//               </Center>
//             </a>
//           </Menu.Target>
//           <Menu.Dropdown>{menuItems}</Menu.Dropdown>
//         </Menu>
//       );
//     }

//     return (
//       <a
//         key={link.label}
//         href={link.link}
//         className={classes.link}
//         onClick={(event) => event.preventDefault()}
//       >
//         {link.label}
//       </a>
//     );
//   });

//   return (
//     <header className={classes.header}>
//       <Container size="md">
//         <div className={classes.inner}>
//           <Link href="/">
//             {/* <UnstyledButton component="a"> */}
//               <Image src={logo} alt="LifePass Logo" width={150} height={60} />
//             {/* </UnstyledButton> */}
//           </Link>
//           {/* Your navigation and other components go here */}
//           <LocaleSwitcher />
//         </div>
//       </Container>
//     </header>
//   );
// }


"use client";
import { Menu, Group, Center, Container } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
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
    const items = links.map((link) => (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    ));


  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <Link href="/">
            <Image src={logo} alt="Wellhub Logo" width={150} height={60} />
          </Link>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Group>
            <LocaleSwitcher />
          </Group>
        </div>
      </Container>
    </header>
  );
}