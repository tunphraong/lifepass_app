"use client";
import Header from "../Header";
import Footer from "../Footer";
import { useTranslations } from "next-intl";
import HeroPartners from "../components/partners/HeroStudio";
import Revenue from "../components/partners/Revenue";
import WhyLifepass from "../components/partners/WhyLifepass";
import GettingStarted from "../components/partners/GettingStarted";

export default function HeroTitle({ params: { locale } }) {
  //  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");
  return (
    <>
      <Header />
      <HeroPartners></HeroPartners>
      <Revenue></Revenue>
      <WhyLifepass></WhyLifepass>
      <GettingStarted></GettingStarted>
      <Footer />
    </>
  );
}
