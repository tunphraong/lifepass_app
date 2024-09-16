import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import React from "react";
import { Notifications } from "@mantine/notifications";
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  ColorSchemeScript,
} from "@mantine/core";
import { i18n, type Locale } from "../../i18n-config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import Head from "next/head";
import "@mantine/carousel/styles.css";


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

const lightVanilla: MantineColorsTuple = [
  "#fdf8ed",
  "#f7f0db",
  "#f1dfaf",
  "#eace81",
  "#e5bf5b",
  "#e1b543",
  "#e0b036",
  "#c79a29",
  "#b08921",
  "#997615",
];

const deepRoseRed: MantineColorsTuple = [
  "#ffecf2",
  "#fad8e0",
  "#ecaebe",
  "#e0839a",
  "#d65f7c",
  "#d04769",
  "#ce3a5f",
  "#b72c4f",
  "#a42445",
  "#91193c",
];

const lightPeachCream: MantineColorsTuple = [
  "#fef4e9",
  "#f6e8d8",
  "#ecd0b1",
  "#e1b685",
  "#d8a05f",
  "#d39248",
  "#d18b3a",
  "#b9772c",
  "#a56925",
  "#905a1a",
];



const theme = createTheme({
  colors: {
    yellow: myColor,
    white: nudgeWhite,
    rose: deepRoseRed,
    background: lightVanilla,
    light_peach_cream: lightPeachCream
  },
  primaryColor: "rose",
  // autoContrast: true,
  luminanceThreshold: 0.31,
});

export default async function RootLayout({
  children,
  params: {locale},
}: {
  
  children: any;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const timeZone = "Asia/Ho_Chi_Minh";
  return (
    <html lang={locale} style={{ backgroundColor: "#fcfaf9" }}>
      <Head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <body>
        <NextIntlClientProvider timeZone={timeZone} messages={messages}>
          <MantineProvider theme={theme}>
            <Notifications position="top-center" />
            {children}
            <Analytics />
            <SpeedInsights />
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
