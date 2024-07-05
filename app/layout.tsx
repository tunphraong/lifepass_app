import "@mantine/core/styles.css";
import React from "react";
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  ColorSchemeScript,
} from "@mantine/core";

import { i18n, type Locale } from "../i18n-config";

export const metadata = {
  title: "Lifepass",
  description: "Your one-access pass to all your favorite studios.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

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

const nudgeWhite: MantineColorsTuple = [
  "#f8f4f1",
  "#eae6e4",
  "#d7cac3",
  "#c3ab9f",
  "#b49281",
  "#ab826d",
  "#a77862",
  "#926752",
  "#835b47",
  "#744d3a",
];

const theme = createTheme({
  colors: {
    yellow: myColor,
    white: nudgeWhite,
  },
  autoContrast: true,
  luminanceThreshold: 0.31,
});

export default function RootLayout({
  children,
  params,
}: {
  children: any;
  params: { lang: Locale };
}) {
  return (
    <html lang= {params.lang}>
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
