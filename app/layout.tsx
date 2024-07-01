import "@mantine/core/styles.css";
import React from "react";
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  ColorSchemeScript,
} from "@mantine/core";
// import { theme } from "../theme";

export const metadata = {
  title: "Lifepass",
  description: "Your one-access pass to all your favorite studios.",
};

const myColor: MantineColorsTuple = [
  "#fff6e1",
  "#ffedcc",
  "#fbd99d",
  "#f8c56a",
  "#f6b33f",
  "#f4a822",
  "#f4a210",
  "#da8d01",
  "#c17c00",
  "#a96b00",
];

const theme = createTheme({
  colors: {
    'yellow': myColor,
  },
  autoContrast: true,
  luminanceThreshold: 0.31,
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
