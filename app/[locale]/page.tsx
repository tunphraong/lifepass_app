'use client'
import {
  Container,
  Text,
  Button,
  Group,
  List,
  ListItem,
  ThemeIcon,
  rem,
  Title
} from "@mantine/core";
import {
  IconCheck,
  IconGift,
  IconMapPin,
  IconEyeDollar,
} from "@tabler/icons-react";
import classes from "./HomePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import FeatureSection from "./FeatureSection";
import { useTranslations } from "next-intl";
import { Link } from "../../navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import ChatWidget from "../components/9AssistantWidget";
import LifePassActivities from "../../public/lifepass_activities.png"
import Image from "next/image";
import PricingPage from "./PricingIntro";
import TestimonialSection from "./TestimonialSection";
import JoinCommunitySection from "./JoinCommunitySection";
import CorporateFitness from "./components/CorporateFitness";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import RediscoverYourself from "./components/RediscoverYourself";
import DiscoverPossibilities from "./components/DiscoverPossibilities";

export default function HeroTitle({ params: { locale } }) {
  //  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");
  return (
    <>
      <Header />

      <ChatWidget
        token="L3BmO6FyWdsy"
        assistantName="Penelope"
        options={{
          primaryBackgroundColor: "#000",
          secondaryBackgroundColor: "#f9f9f9",
          primaryTextColor: "#fff",
          secondaryTextColor: "#000",
          messageContainerBackgroundColor: "#f2f2f2",
          opacity: 1,
        }}
      />
      <HeroSection></HeroSection>
      <FeatureSection />
      <DiscoverPossibilities></DiscoverPossibilities>
      <RediscoverYourself></RediscoverYourself>
      <HowItWorks></HowItWorks>
      <TestimonialSection></TestimonialSection>

      {/* <PricingPage></PricingPage> */}

      <CorporateFitness></CorporateFitness>
      <JoinCommunitySection></JoinCommunitySection>

      <Footer />
    </>
  );
}
